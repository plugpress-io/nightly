<?php

namespace Nightly;

use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Rest_Routes {
	public function register() : void {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes() : void {
		register_rest_route(
			REST_NAMESPACE,
			'/options',
			array(
				array(
					'methods' => 'GET',
					'callback' => array( $this, 'get_settings' ),
					'permission_callback' => array( Permissions::class, 'can_manage' ),
				),
				array(
					'methods' => array( 'POST', 'PUT' ),
					'callback' => array( $this, 'update_settings' ),
					'permission_callback' => array( Permissions::class, 'can_manage' ),
					'args' => array(
						'example_text' => array(
							'type' => 'string',
						),
						'enable_feature' => array(
							'type' => 'boolean',
						),
						'enabled' => array(
							'type' => 'boolean',
						),
						'default_mode' => array(
							'type' => 'string',
							'enum' => array( 'system', 'dark', 'light' ),
						),
						'show_toggle' => array(
							'type' => 'boolean',
						),
						'toggle_position' => array(
							'type' => 'string',
							'enum' => array( 'bottom-right', 'bottom-left' ),
						),
						'toggle_style' => array(
							'type' => 'string',
							'enum' => array( 'classic', 'pill', 'minimal' ),
						),
						'toggle_size' => array(
							'type' => 'string',
							'enum' => array( 'xs', 's', 'm', 'l', 'xl' ),
						),						'exclude_selectors' => array(
							'type' => 'string',
						),
						'brightness' => array(
							'type' => 'integer',
						),
						'contrast' => array(
							'type' => 'integer',
						),
						'sepia' => array(
							'type' => 'integer',
						),
						'transition_enabled' => array(
							'type' => 'boolean',
						),
						'transition_duration' => array(
							'type' => 'integer',
						),
						'schedule_enabled' => array(
							'type' => 'boolean',
						),
						'schedule_start' => array(
							'type' => 'string',
						),
						'schedule_end' => array(
							'type' => 'string',
						),
						'keyboard_enabled' => array(
							'type' => 'boolean',
						),
						'keyboard_shortcut' => array(
							'type' => 'string',
						),
						'image_brightness' => array(
							'type' => 'integer',
						),
						'video_brightness' => array(
							'type' => 'integer',
						),
						'background_brightness' => array(
							'type' => 'integer',
						),
						'theme' => array(
							'type' => 'string',
							'enum' => array( 'classic', 'cool', 'warm', 'high-contrast', 'pure-black', 'custom' ),
						),
						'custom_colors' => array(
							'type' => 'object',
						),
					),
				),
			)
		);
	}

	public function get_settings() : WP_REST_Response {
		return new WP_REST_Response( Options::get(), 200 );
	}

	public function update_settings( WP_REST_Request $request ) {
		$data = array(
			'example_text' => $request->get_param( 'example_text' ),
			'enable_feature' => $request->get_param( 'enable_feature' ),
			'enabled' => $request->get_param( 'enabled' ),
			'default_mode' => $request->get_param( 'default_mode' ),
			'show_toggle' => $request->get_param( 'show_toggle' ),
			'toggle_position' => $request->get_param( 'toggle_position' ),
			'toggle_style' => $request->get_param( 'toggle_style' ),
			'toggle_size' => $request->get_param( 'toggle_size' ),
			'exclude_selectors' => $request->get_param( 'exclude_selectors' ),
			'brightness' => $request->get_param( 'brightness' ),
			'contrast' => $request->get_param( 'contrast' ),
			'sepia' => $request->get_param( 'sepia' ),
			'transition_enabled' => $request->get_param( 'transition_enabled' ),
			'transition_duration' => $request->get_param( 'transition_duration' ),
			'schedule_enabled' => $request->get_param( 'schedule_enabled' ),
			'schedule_start' => $request->get_param( 'schedule_start' ),
			'schedule_end' => $request->get_param( 'schedule_end' ),
			'keyboard_enabled' => $request->get_param( 'keyboard_enabled' ),
			'keyboard_shortcut' => $request->get_param( 'keyboard_shortcut' ),
			'image_brightness' => $request->get_param( 'image_brightness' ),
			'video_brightness' => $request->get_param( 'video_brightness' ),
			'background_brightness' => $request->get_param( 'background_brightness' ),
			'theme' => $request->get_param( 'theme' ),
			'custom_colors' => $request->get_param( 'custom_colors' ),
		);

		$sanitized = Sanitize::options( $data );
		if ( is_wp_error( $sanitized ) ) {
			return $sanitized;
		}

		Options::update( $sanitized );

		return new WP_REST_Response( Options::get(), 200 );
	}
}
