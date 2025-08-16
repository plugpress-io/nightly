<?php

namespace Nightly;

// Prevent direct access
if (! defined('ABSPATH')) {
    exit;
}

class Nightly
{

    /**
     * Plugin version.
     *
     * @var string
     */
    private $version;

    /**
     * Block instance.
     *
     * @var Block
     */
    private $block;

    /**
     * Admin instance.
     *
     * @var Admin
     */
    private $admin;

    /**
     * API instance.
     *
     * @var API
     */
    private $api;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->version = NIGHTLY_VERSION;
    }

    /**
     * Initialize the plugin.
     */
    public function init()
    {
        $this->init_components();
        $this->setup_hooks();
    }

    /**
     * Initialize plugin components.
     */
    private function init_components()
    {
        $this->block = new Block();
        $this->block->init();

        if (is_admin()) {
            $this->admin = new Admin();
            $this->admin->init();
        }

        $this->api = new API();
        $this->api->init();
    }

    /**
     * Setup WordPress hooks.
     */
    private function setup_hooks()
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
        add_filter('body_class', [$this, 'add_body_class']);

        // Add floating toggle placeholder if auto-inject is enabled
        if ($this->get_setting('auto_inject', false)) {
            add_action('wp_footer', [$this, 'add_floating_toggle_placeholder']);
        }
    }

    /**
     * Enqueue frontend assets.
     */
    public function enqueue_frontend_assets()
    {
        $js_file  = NIGHTLY_PLUGIN_DIR . 'build/frontend/index.js';
        $css_file = NIGHTLY_PLUGIN_DIR . 'build/frontend/index.css';

        if (! file_exists($js_file) || ! file_exists($css_file)) {
            return;
        }

        wp_enqueue_script(
            'nightly-frontend',
            NIGHTLY_PLUGIN_URL . 'build/frontend/index.js',
            [],
            filemtime($js_file),
            true
        );

        wp_enqueue_style(
            'nightly-frontend',
            NIGHTLY_PLUGIN_URL . 'build/frontend/index.css',
            [],
            filemtime($css_file)
        );

        $settings = [
            'respectSystemPreference' => $this->get_setting('respect_system_preference', true),
            'autoInject'              => (bool) $this->get_setting('auto_inject', false),
            'floatingPosition'        => $this->get_setting('floating_position', 'bottom-right'),
            'floatingBgColor'         => $this->get_setting('floating_bg_color', '#333333'),
            'floatingWidth'           => $this->get_setting('floating_width', '3.5rem'),
            'floatingHeight'          => $this->get_setting('floating_height', '3.5rem'),
            'mode'                    => $this->get_setting('mode', 'manual'),
            'autoIntensity'           => (float) $this->get_setting('auto_intensity', 0.05),
            'autoContrast'            => (float) $this->get_setting('auto_contrast', 1.15),
            'autoBrightness'          => (float) $this->get_setting('auto_brightness', 0.98),
            'autoSepia'               => (float) $this->get_setting('auto_sepia', 0.15),

            // New design settings
            'floatingButtonStyle'     => $this->get_setting('floating_button_style', 'rounded'),
            'floatingButtonSize'      => $this->get_setting('floating_button_size', 'medium'),
            'floatingBgColorHover'    => $this->get_setting('floating_bg_color_hover', '#555555'),
            'floatingBgColorActive'   => $this->get_setting('floating_bg_color_active', '#79c0ff'),
            'floatingIconColor'       => $this->get_setting('floating_icon_color', '#ffffff'),
            'floatingIconColorHover'  => $this->get_setting('floating_icon_color_hover', '#ffffff'),
            'floatingBorderColor'     => $this->get_setting('floating_border_color', 'transparent'),
            'floatingBorderWidth'     => (int) $this->get_setting('floating_border_width', 0),
            'floatingBorderRadius'    => (int) $this->get_setting('floating_border_radius', 50),
            'floatingIconSize'        => (int) $this->get_setting('floating_icon_size', 24),
            'floatingIconType'        => $this->get_setting('floating_icon_type', 'moon'),
            'floatingCustomIcon'      => $this->get_setting('floating_custom_icon', '🌙'),
            'floatingPaddingTop'      => (int) $this->get_setting('floating_padding_top', 12),
            'floatingPaddingBottom'   => (int) $this->get_setting('floating_padding_bottom', 12),
            'floatingPaddingLeft'     => (int) $this->get_setting('floating_padding_left', 16),
            'floatingPaddingRight'    => (int) $this->get_setting('floating_padding_right', 16),
            'floatingBoxShadow'       => $this->get_setting('floating_box_shadow', '0 2px 4px rgba(0,0,0,0.1)'),
            'floatingBoxShadowHover'  => $this->get_setting('floating_box_shadow_hover', '0 4px 8px rgba(0,0,0,0.15)'),
        ];

        wp_localize_script('nightly-frontend', 'nightlySettings', $settings);
    }

    /**
     * Get a plugin setting from the database, or return a default value.
     */
    private function get_setting($key, $default = null)
    {
        $options = get_option('nightly_settings', []);
        return isset($options[$key]) ? $options[$key] : $default;
    }

    /**
     * Enqueue admin assets.
     */
    public function enqueue_admin_assets($hook)
    {
        if ($hook !== 'appearance_page_nightly') {
            return;
        }

        $js_file    = NIGHTLY_PLUGIN_DIR . 'build/admin/index.js';
        $css_file   = NIGHTLY_PLUGIN_DIR . 'build/admin/index.css';
        $asset_file = NIGHTLY_PLUGIN_DIR . 'build/admin/index.asset.php';

        $asset = file_exists($asset_file)
            ? include $asset_file
            : [
                'dependencies' => ['wp-element', 'wp-api-fetch', 'wp-i18n', 'wp-components'],
                'version'      => $this->version,
            ];

        wp_enqueue_script(
            'nightly-admin',
            NIGHTLY_PLUGIN_URL . 'build/admin/index.js',
            $asset['dependencies'],
            $asset['version'],
            true
        );

        wp_enqueue_style(
            'nightly-admin',
            NIGHTLY_PLUGIN_URL . 'build/admin/index.css',
            [],
            filemtime($css_file)
        );

        wp_localize_script(
            'nightly-admin',
            'nightlyAdmin',
            [
                'apiUrl'      => rest_url('nightly/v1/'),
                'nonce'       => wp_create_nonce('wp_rest'),
                'isBlockTheme' => wp_is_block_theme(),
            ]
        );
    }

    /**
     * Add body class for theme detection.
     *
     * @param array $classes
     * @return array
     */
    public function add_body_class($classes)
    {
        $classes[] = wp_is_block_theme() ? 'nightly-block-theme' : 'nightly-classic-theme';
        return $classes;
    }

    /**
     * Add floating toggle placeholder to footer.
     * This is only called when auto-inject is enabled.
     */
    public function add_floating_toggle_placeholder()
    {
        $settings = [
            'floating_position' => $this->get_setting('floating_position', 'bottom-right'),
            'floating_bg_color' => $this->get_setting('floating_bg_color', '#333333'),
            'floating_width' => $this->get_setting('floating_width', '3.5rem'),
            'floating_height' => $this->get_setting('floating_height', '3.5rem'),
        ];

        // Create the placeholder element
        echo '<div id="nightly-floating-toggle-placeholder" data-auto-inject="true" data-settings=\'' . wp_json_encode($settings) . '\'></div>';
    }
}
