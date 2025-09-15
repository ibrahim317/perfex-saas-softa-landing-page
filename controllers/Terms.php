<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Terms extends ClientsController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        // Set page data
        $data['title'] = 'Terms & Conditions - ProEase Hub';
        $data['meta_description'] = 'Read the terms and conditions for using ProEase Hub services. Understand your rights and responsibilities.';
        $data['meta_keywords'] = 'Terms and conditions, ProEase Hub, service agreement, legal terms';

        // Start output buffering to capture content
        ob_start();
        $this->load->view('landing_pages/terms');
        $data['content'] = ob_get_clean();

        // Load our custom layout instead of the default client layout
        $this->load->view('landing_pages/layouts/main', $data);
    }
}
