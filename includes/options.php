<?php

namespace Nightly;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Options {
	public static function defaults() : array {
		return array(
			'example_text' => '',
			'enable_feature' => false,
		);
	}

	public static function get() : array {
		$options = get_option( OPTION_KEY, array() );
		return wp_parse_args( $options, self::defaults() );
	}

	public static function update( array $values ) : void {
		update_option( OPTION_KEY, $values, false );
	}
}
