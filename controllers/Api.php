<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Api extends App_Controller
{
    private $rate_limit_requests = 100; // requests per hour
    private $rate_limit_window = 3600; // 1 hour in seconds
    
    public function __construct()
    {
        parent::__construct();
        $this->set_cors_headers();
        $this->check_rate_limit();
    }
    
    /**
     * Set CORS headers to allow all origins
     */
    private function set_cors_headers()
    {
        // Allow all origins
        header('Access-Control-Allow-Origin: *');
        
        // Allow common HTTP methods
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        
        // Allow common headers
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin');
        
        // Allow credentials (if needed)
        header('Access-Control-Allow-Credentials: true');
        
        // Cache preflight requests for 1 hour
        header('Access-Control-Max-Age: 3600');
        
        // Handle preflight OPTIONS requests
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    }
    
    /**
     * Check rate limiting based on IP address
     */
    private function check_rate_limit()
    {
        $client_ip = $this->get_client_ip();
        $cache_key = 'rate_limit_' . md5($client_ip);
        
        // Get current request count
        $current_requests = $this->get_rate_limit_count($cache_key);
        
        if ($current_requests >= $this->rate_limit_requests) {
            $this->respond_json([
                'error' => 'Rate limit exceeded',
                'message' => 'Too many requests. Please try again later.',
                'retry_after' => $this->rate_limit_window
            ], 429);
        }
        
        // Increment request count
        $this->increment_rate_limit_count($cache_key);
    }
    
    /**
     * Get client IP address
     */
    private function get_client_ip()
    {
        $ip_keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR'];
        
        foreach ($ip_keys as $key) {
            if (array_key_exists($key, $_SERVER) === true) {
                foreach (explode(',', $_SERVER[$key]) as $ip) {
                    $ip = trim($ip);
                    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                        return $ip;
                    }
                }
            }
        }
        
        return $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    }
    
    /**
     * Get current rate limit count from cache/database
     */
    private function get_rate_limit_count($cache_key)
    {
        // Try to get from cache first
        $cached = $this->cache->get($cache_key);
        if ($cached !== false) {
            return (int)$cached;
        }
        
        // If not in cache, check database
        $this->db->where('cache_key', $cache_key);
        $this->db->where('expires_at >', date('Y-m-d H:i:s'));
        $result = $this->db->get('tblcache')->row();
        
        return $result ? (int)$result->cache_value : 0;
    }
    
    /**
     * Increment rate limit count
     */
    private function increment_rate_limit_count($cache_key)
    {
        $expires_at = date('Y-m-d H:i:s', time() + $this->rate_limit_window);
        
        // Try to update existing record
        $this->db->where('cache_key', $cache_key);
        $this->db->set('cache_value', 'cache_value + 1', false);
        $this->db->set('expires_at', $expires_at);
        $this->db->update('tblcache');
        
        // If no rows affected, insert new record
        if ($this->db->affected_rows() === 0) {
            $this->db->insert('tblcache', [
                'cache_key' => $cache_key,
                'cache_value' => '1',
                'expires_at' => $expires_at
            ]);
        }
        
        // Also store in cache for faster access
        $this->cache->save($cache_key, '1', $this->rate_limit_window);
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
                $this->respond_json(['error' => 'No API users found'], 404);
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
                $this->respond_json(['error' => 'Landing API key not found'], 404);
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

            $this->respond_json($package_list, 200);
                
        } catch (Throwable $th) {
            $this->respond_json(['error' => $th->getMessage()], 500);
        }
    }

    private function respond_json($data, $status = 200)
    {
        // Set CORS headers for response
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin');
        header('Access-Control-Allow-Credentials: true');
        
        // Set content type and status
        header('Content-Type: application/json');
        set_status_header($status);
        
        // Add rate limit headers
        if ($status === 429) {
            header('Retry-After: ' . $this->rate_limit_window);
        }
        
        echo json_encode($data);
        exit;
    }
}


