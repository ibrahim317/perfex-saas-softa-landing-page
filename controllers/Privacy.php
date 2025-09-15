<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Privacy extends ClientsController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        // Set page data
        $data['title'] = 'Privacy Policy - ProEase Hub';
        $data['meta_description'] = 'Read our privacy policy to understand how ProEase Hub collects, uses, and protects your personal information.';
        $data['meta_keywords'] = 'Privacy policy, data protection, ProEase Hub, personal information, GDPR';

        // Start output buffering to capture content
        ob_start();
        $this->load->view('landing_pages/privacy');
        $data['content'] = ob_get_clean();

        // Load our custom layout instead of the default client layout
        $this->load->view('landing_pages/layouts/main', $data);
    }
}
