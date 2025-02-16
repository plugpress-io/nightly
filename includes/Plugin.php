<?php

namespace PlugPress\Nightly;

/**
 * Main Plugin Class
 */
class Plugin
{
    /**
     * @var Admin
     */
    private $admin;

    /**
     * @var API
     */
    private $api;

    public function __construct()
    {
        $this->init();
    }

    private function init()
    {
        // Initialize admin
        $this->admin = new Admin();

        // Initialize API
        $this->api = new API();

        // Frontend assets
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
    }

    public function enqueue_frontend_assets()
    {
        $asset_file = include NIGHTLY_PATH . '/dist/darkmode.asset.php';
        $settings = self::get_settings();

        if (!$settings['enabled']) {
            return;
        }

        wp_enqueue_style(
            'nightly-darkmode-style',
            NIGHTLY_URL . 'dist/darkmode.css',
            [],
            $asset_file['version']
        );

        wp_enqueue_script(
            'nightly-darkmode-script',
            NIGHTLY_URL . 'dist/darkmode.js',
            $asset_file['dependencies'],
            $asset_file['version'],
            true
        );
    }

    public static function get_settings()
    {
        $settings = get_option('nightly_settings', array());
        return wp_parse_args($settings, self::get_default_settings());
    }

    public static function get_default_settings()
    {
        return apply_filters(
            'nightly_default_settings',
            array(
                'enabled' => true,
                'type' => 'light',
                'os_aware' => true,
            )
        );
    }
}
