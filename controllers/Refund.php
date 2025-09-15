<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Refund extends App_Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        // Set page data
        $data['title'] = 'Refund Policy - ProEase Hub';
        $data['meta_description'] = 'Read our refund policy to understand the terms and conditions for refunds and cancellations.';
        $data['meta_keywords'] = 'Refund policy, cancellation, ProEase Hub, money back guarantee';

        // Start output buffering to capture content
        ob_start();
        $this->load->view('landing_pages/refund');
        $data['content'] = ob_get_clean();

        // Load our custom layout instead of the default client layout
        $this->load->view('landing_pages/layouts/main', $data);
    }
}
