<?php
defined('BASEPATH') or exit('No direct script access allowed');
/*
Module Name: Landing Pages
Description: Create beautiful landing pages with terms, privacy policy, about us, and contact pages
Version: 1.0.0
Author: Softa Software House
*/

define('LANDING_PAGES_MODULE_NAME', 'landing_pages');
$CI = &get_instance();


// Register module activation hook
register_activation_hook('landing_pages', 'landing_pages_activate');
register_deactivation_hook('landing_pages', 'landing_pages_deactivate');

function landing_pages_activate()
{
    // Simple activation - no options needed
    add_option('landing_pages_enabled', '1');
}

function landing_pages_deactivate()
{
    // Clean up options if needed (optional)
    // delete_option('landing_pages_enabled');
}

// No admin menu needed for simple static pages

// Handle custom routes for landing pages using app_init hook
hooks()->add_action('app_init', 'landing_pages_handle_routes');

function landing_pages_handle_routes()
{
    $CI = &get_instance();
    
    // Get the current URI
    $uri = $CI->uri->uri_string();
    
    // Check if landing pages are enabled
    if (!get_option('landing_pages_enabled')) {
        return;
    }
    
    // Skip routing for static assets (CSS, JS, images, etc.)
    if (preg_match('/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i', $uri)) {
        return;
    }
    
    // Skip routing for module assets
    if (strpos($uri, 'modules/landing_pages/assets/') !== false) {
        return;
    }
    
    // Handle specific routes
    switch ($uri) {
        case '':
        case '/':
        case 'home':
            redirect(site_url('landing_pages/home'));
            break;
            
        case 'terms':
            redirect(site_url('landing_pages/terms'));
            break;
            
        case 'privacy':
            redirect(site_url('landing_pages/privacy'));
            break;
            
        case 'about':
            redirect(site_url('landing_pages/about'));
            break;
            
        case 'contact':
            redirect(site_url('landing_pages/contact'));
            break;
            
        case 'refund':
            redirect(site_url('landing_pages/refund'));
            break;
    }
}

// Simple module - no merge fields needed
