<?php
defined('BASEPATH') or exit('No direct script access allowed');

class About extends ClientsController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        // Set page data
        $data['title'] = 'About Us - ProEase Hub';
        $data['meta_description'] = 'Learn about ProEase Hub - the comprehensive ERP system designed to streamline business operations.';
        $data['meta_keywords'] = 'About ProEase Hub, ERP system, business management, company information';

        // Start output buffering to capture content
        ob_start();
        $this->load->view('landing_pages/about');
        $data['content'] = ob_get_clean();

        // Load our custom layout instead of the default client layout
        $this->load->view('landing_pages/layouts/main', $data);
    }
}
