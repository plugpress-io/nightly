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
			'/settings',
			array(
				array(
					'methods' => 'GET',
					'callback' => array( $this, 'get_settings' ),
					'permission_callback' => array( Permissions::class, 'can_manage' ),
				),
				array(
					'methods' => 'POST',
					'callback' => array( $this, 'update_settings' ),
					'permission_callback' => array( Permissions::class, 'can_manage' ),
					'args' => array(
						'example_text' => array(
							'type' => 'string',
						),
						'enable_feature' => array(
							'type' => 'boolean',
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
		);

		$sanitized = Sanitize::options( $data );
		if ( is_wp_error( $sanitized ) ) {
			return $sanitized;
		}

		Options::update( $sanitized );

		return new WP_REST_Response( Options::get(), 200 );
	}
}
