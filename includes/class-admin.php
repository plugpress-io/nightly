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
 * 
 * Only shows admin interface for classic themes. FSE themes use the block editor
 * for customization, so they only need the Gutenberg block.
 */
class Admin {
    
    /**
     * Initialize admin functionality
     * 
     * Registers admin page for both classic and FSE themes.
     * FSE themes can use it to configure global floating toggle.
     */
    public function init() {
        // Add admin page for both theme types
        // FSE themes can use it for global floating toggle configuration
        add_action('admin_menu', array($this, 'add_admin_page'));
    }
    
    /**
     * Add admin page under Appearance menu
     * 
     * Available for both classic and FSE themes.
     * FSE themes can use it to configure global floating toggle.
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
     * 
     * Renders the admin page for both classic and FSE themes.
     * FSE themes can use it to configure global floating toggle.
     */
    public function admin_page_callback() {
        echo '<div id="nightly-admin-root"></div>';
    }
}