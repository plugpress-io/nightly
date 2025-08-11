<?php
/**
 * Admin Interface Class
 *
 * @package Nightly
 */

namespace Nightly;

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handles admin interface and settings
 */
class Admin {
    
    /**
     * Initialize admin functionality
     */
    public function init() {
        add_action('admin_menu', array($this, 'add_admin_page'));
    }
    
    /**
     * Add admin page under Appearance menu
     */
    public function add_admin_page() {
        add_theme_page(
            __('Nightly Settings', 'nightly'),
            __('Nightly', 'nightly'),
            'manage_options',
            'nightly',
            array($this, 'admin_page_callback')
        );
    }
    
    /**
     * Admin page callback
     */
    public function admin_page_callback() {
        echo '<div id="nightly-admin-root"></div>';
        // React app will be mounted here in task 7
    }
}