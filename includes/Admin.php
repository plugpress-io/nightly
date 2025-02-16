<?php

namespace PlugPress\Nightly;

/**
 * Admin Class
 */
class Admin
{
    public function __construct()
    {
        add_action('admin_menu', array($this, 'register_menu_page'));
    }

    public function register_menu_page()
    {
        $page = add_submenu_page(
            'options-general.php',
            __('Nightly', 'nightly'),
            __('Nightly', 'nightly'),
            'manage_options',
            'nightly',
            array($this, 'render_settings_page'),
            100
        );

        add_action("admin_print_scripts-$page", array($this, 'enqueue_assets'));
    }

    public function render_settings_page()
    {
        echo '<div id="nightly"></div>';
    }

    public function enqueue_assets($hook)
    {

        $asset_file = include NIGHTLY_PATH . '/dist/dashboard.asset.php';

        wp_enqueue_style(
            'nightly-dashboard',
            NIGHTLY_URL . 'dist/dashboard.css',
            ['wp-components'],
            $asset_file['version']
        );

        wp_enqueue_script(
            'nightly-dashboard',
            NIGHTLY_URL . 'dist/dashboard.js',
            $asset_file['dependencies'],
            $asset_file['version'],
            true
        );

        wp_localize_script(
            'nightly-dashboard',
            'nightlySettings',
            array(
                'settings' => Plugin::get_settings(),
                'nonce' => wp_create_nonce('nightly_settings')
            )
        );
    }
}
