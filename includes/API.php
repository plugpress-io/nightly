<?php

namespace PlugPress\Nightly;

use PlugPress\Nightly\Plugin;

/**
 * API Class
 */
class API
{
    public function __construct()
    {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes()
    {
        register_rest_route(
            'nightly/v1',
            '/settings',
            array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_settings'),
                    'permission_callback' => array($this, 'permission_callback'),
                ),
                array(
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => array($this, 'update_settings'),
                    'permission_callback' => array($this, 'permission_callback'),
                    'args' => array(
                        'enabled' => array(
                            'type' => 'boolean',
                            'required' => false,
                        ),
                        'type' => array(
                            'type' => 'string',
                            'required' => false,
                            'enum' => array('light', 'dark'),
                        ),
                        'floating_switch' => array(
                            'type' => 'boolean',
                            'required' => false,
                        ),
                        'os_aware' => array(
                            'type' => 'boolean',
                            'required' => false,
                        ),
                    ),
                ),
            )
        );
    }

    public function permission_callback()
    {
        return current_user_can('manage_options');
    }

    public function get_settings()
    {
        return rest_ensure_response(Plugin::get_settings());
    }

    public function update_settings(\WP_REST_Request $request)
    {
        $settings = Plugin::get_settings();
        $new_settings = array_merge($settings, $request->get_params());

        update_option('nightly_settings', $new_settings);

        return rest_ensure_response($new_settings);
    }
}
