<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends ClientsController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        // Check if user is logged in and redirect accordingly
        if (is_staff_logged_in()) {
            redirect(admin_url());
        }
        
        if (is_client_logged_in()) {
            redirect(site_url('clients'));
        }

        // Check if landing pages are enabled
        if (!get_option('landing_pages_enabled')) {
            redirect(site_url('clients'));
        }

        // Set page data
        $data['title'] = 'ProEase Hub - نظام إدارة الشركات ERP | حلول شاملة لإدارة الأعمال والموارد';
        $data['meta_description'] = 'ProEase Hub - نظام إدارة الشركات ERP متكامل يقدم حلول شاملة لإدارة الأعمال والموارد. يتضمن إدارة المبيعات، المشتريات، المخزون، الموارد البشرية، المحاسبة والمزيد.';
        $data['meta_keywords'] = 'نظام ERP, إدارة الشركات, إدارة الأعمال, إدارة المبيعات, إدارة المشتريات, إدارة المخزون, إدارة الموارد البشرية, المحاسبة, تخطيط موارد المؤسسة, ProEase Hub, برنامج إدارة شامل';
        $data['og_title'] = 'ProEase Hub - نظام إدارة الشركات ERP';
        $data['og_description'] = 'نظام إدارة الشركات ERP متكامل يقدم حلول شاملة لإدارة الأعمال والموارد';
        $data['twitter_title'] = 'ProEase Hub - نظام إدارة الشركات ERP';
        $data['twitter_description'] = 'نظام إدارة الشركات ERP متكامل يقدم حلول شاملة لإدارة الأعمال والموارد';

        // Start output buffering to capture content
        ob_start();
        $this->load->view('landing_pages/home');
        $data['content'] = ob_get_clean();

        // Load our custom layout instead of the default client layout
        $this->load->view('landing_pages/layouts/main', $data);
    }
}
