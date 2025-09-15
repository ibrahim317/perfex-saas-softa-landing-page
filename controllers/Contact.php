<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Contact extends ClientsController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        // Set page data
        $data['title'] = 'Contact Us - ProEase Hub';
        $data['meta_description'] = 'Get in touch with ProEase Hub support team. We provide 24/7 assistance to help you with your business management needs.';
        $data['meta_keywords'] = 'Contact ProEase Hub, support, help, business management, ERP support';

        // Start output buffering to capture content
        ob_start();
        $this->load->view('landing_pages/contact');
        $data['content'] = ob_get_clean();

        // Load our custom layout instead of the default client layout
        $this->load->view('landing_pages/layouts/main', $data);
    }
}
