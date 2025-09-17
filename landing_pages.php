<?php
defined('BASEPATH') or exit('No direct script access allowed');
/*
Module Name: Landing Pages API
Description: API endpoints for landing page functionality - provides SaaS packages data
Version: 1.0.0
Author: Softa Software House
*/

define('LANDING_PAGES_API_MODULE_NAME', 'landing_pages_api');
$CI = &get_instance();

// Register module activation hook
register_activation_hook('landing_pages_api', 'landing_pages_api_activate');
register_deactivation_hook('landing_pages_api', 'landing_pages_api_deactivate');

function landing_pages_api_activate()
{
    // Simple activation - no options needed
    update_option('landing_pages_api_enabled', '1');
}

function landing_pages_api_deactivate()
{
    update_option('landing_pages_api_enabled', '0');
}

// No admin menu needed for API-only module
// No custom routes needed - API endpoints are handled directly by the controller
