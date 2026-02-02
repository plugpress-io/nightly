<?php

namespace Nightly;

use WP_Error;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Sanitize {
	public static function options( array $values ) {
		$sanitized = array();
		$sanitized['example_text'] = isset( $values['example_text'] ) ? sanitize_text_field( $values['example_text'] ) : '';
		$sanitized['enable_feature'] = isset( $values['enable_feature'] ) ? (bool) $values['enable_feature'] : false;

		if ( strlen( $sanitized['example_text'] ) > 200 ) {
			return new WP_Error(
				'nightly_invalid_text',
				__( 'Example text is too long.', TEXT_DOMAIN ),
				array( 'status' => 400 )
			);
		}

		return $sanitized;
	}
}
