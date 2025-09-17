<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Api extends App_Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Public endpoint to fetch SaaS packages for the landing page
     * Finds API user with name "landing" and proxies to /saas/api/plans with its token
     * Route: /landing_pages_api/api/plans
     */
    public function plans()
    {
        try {
            // Inline handler to avoid controller instantiation issues
            $api_users = perfex_saas_api_users();
            if (!$api_users || !is_array($api_users)) {
                header('Content-Type: application/json');
                set_status_header(404);
                echo json_encode(['error' => 'No API users found']);
                exit;
            }

            $landingUser = null;
            foreach ($api_users as $user) {
                $name = strtolower(trim((string)($user->name ?? '')));
                $username = strtolower(trim((string)($user->username ?? '')));
                $label = strtolower(trim((string)($user->label ?? '')));
                $keyname = strtolower(trim((string)($user->key ?? '')));
                if (in_array('landing', [$name, $username, $label, $keyname], true)) {
                    $landingUser = $user;
                    break;
                }
            }

            if (!$landingUser || empty($landingUser->token)) {
                header('Content-Type: application/json');
                set_status_header(404);
                echo json_encode(['error' => 'Landing API key not found']);
                exit;
            }

            // Directly fetch packages internally to avoid proxy/curl issues
            $id = (int)$this->input->get('id', true);
            $_packages = $this->perfex_saas_model->packages($id);
            if (!is_array($_packages)) {
                $_packages = [$_packages];
            }

            // Build module slug => display name map
            $modules_map = [];
            $all_modules = $this->perfex_saas_model->modules();
            foreach ($all_modules as $m) {
                $system = $m['system_name'] ?? '';
                $custom = $m['custom_name'] ?? $system;
                $modules_map[$system] = _l($custom, '', false);
            }

            $package_list = [];
            // Filter out "surveys" from all package modules
            foreach ($_packages as $pkg) {
                if (isset($pkg->modules) && is_array($pkg->modules)) {
                    $pkg->modules = array_values(array_filter($pkg->modules, function($mod) {
                        return strtolower($mod) !== 'surveys';
                    }));
                }
            }
            foreach ($_packages as $pkg) {
                if (!$pkg) { continue; }
                $metadata = is_object($pkg->metadata ?? null) ? $pkg->metadata : (object)[];

                $module_slugs = is_array($pkg->modules ?? null) ? $pkg->modules : [];
                $module_names = [];
                foreach ($module_slugs as $slug) {
                    if (empty($slug)) continue;
                    $module_names[] = isset($modules_map[$slug]) ? $modules_map[$slug] : ucwords(str_replace('_', ' ', (string)$slug));
                }

                $package_list[] = [
                    'id' => (int)($pkg->id ?? 0),
                    'name' => (string)($pkg->name ?? ''),
                    'description' => (string)($pkg->description ?? ''),
                    'slug' => (string)($pkg->slug ?? ''),
                    'price' => isset($pkg->price) ? (0 + $pkg->price) : null,
                    'trial_period' => (int)($pkg->trial_period ?? 0),
                    'is_default' => (bool)($pkg->is_default ?? false),
                    'is_private' => (bool)($pkg->is_private ?? false),
                    'db_scheme' => (string)($pkg->db_scheme ?? ''),
                    'status' => (string)($pkg->status ?? ''),
                    'modules' => $module_slugs,
                    'module_names' => $module_names,
                    'metadata' => [
                        'invoice' => $metadata->invoice ?? '',
                        'max_instance_limit' => (int)($metadata->max_instance_limit ?? 0),
                        'limitations' => $metadata->limitations ?? (object)[],
                        'enable_subdomain' => (bool)($metadata->enable_subdomain ?? false),
                        'enable_custom_domain' => (bool)($metadata->enable_custom_domain ?? false),
                        'shared_settings' => $metadata->shared_settings ?? []
                    ]
                ];
            }

            header('Content-Type: application/json');
            set_status_header(200);
            echo json_encode($package_list);
                
        } catch (Throwable $th) {
            return $this->respond_json(['error' => $th->getMessage()], 500);
        }
    }

    private function respond_json($data, $status = 200)
    {
        header('Content-Type: application/json');
        set_status_header($status);
        echo json_encode($data);
        exit;
    }
}


