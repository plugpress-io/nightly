<?php

namespace Nightly;

use WP_Error;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Sanitize {

	public static function options( array $values ) {
		$defaults = Options::defaults();
		$sanitized = array();

		// Booleans
		foreach ( array( 'enabled', 'show_toggle', 'transition_enabled', 'schedule_enabled', 'keyboard_enabled' ) as $key ) {
			$sanitized[ $key ] = isset( $values[ $key ] ) ? (bool) $values[ $key ] : $defaults[ $key ];
		}

		// Enums
		$enums = array(
			'default_mode'    => array( 'system', 'dark', 'light' ),
			'toggle_position' => array( 'bottom-right', 'bottom-left' ),
			'toggle_style'    => array( 'classic', 'pill', 'minimal' ),
			'toggle_size'     => array( 'xs', 's', 'm', 'l', 'xl' ),
			'theme'           => array( 'classic', 'cool', 'warm', 'high-contrast', 'pure-black', 'custom' ),
		);

		foreach ( $enums as $key => $allowed ) {
			$sanitized[ $key ] = isset( $values[ $key ] ) && in_array( $values[ $key ], $allowed, true )
				? $values[ $key ]
				: $defaults[ $key ];
		}

		// Clamped integers
		$ranges = array(
			'brightness'            => array( -50, 50 ),
			'contrast'              => array( -50, 50 ),
			'sepia'                 => array( 0, 100 ),
			'grayscale'             => array( 0, 100 ),
			'transition_duration'   => array( 0, 1000 ),
			'image_brightness'      => array( 50, 150 ),
			'video_brightness'      => array( 50, 150 ),
			'background_brightness' => array( 50, 150 ),
		);

		foreach ( $ranges as $key => $range ) {
			$sanitized[ $key ] = isset( $values[ $key ] )
				? max( $range[0], min( $range[1], (int) $values[ $key ] ) )
				: $defaults[ $key ];
		}

		// Exclude selectors (CSS whitelist pattern)
		$exclude = isset( $values['exclude_selectors'] ) ? trim( $values['exclude_selectors'] ) : '';
		if ( ! empty( $exclude ) ) {
			if ( ! preg_match( '/^[a-zA-Z0-9#.\-_\s,:>\[\]\(\)="\'~+*\\/]*$/', $exclude ) ) {
				return new WP_Error(
					'nightly_invalid_selectors',
					__( 'Invalid CSS selectors provided.', 'nightly' ),
					array( 'status' => 400 )
				);
			}
			$sanitized['exclude_selectors'] = $exclude;
		} else {
			$sanitized['exclude_selectors'] = '';
		}

		// Time fields (HH:MM format)
		$time_fields = array( 'schedule_start', 'schedule_end' );
		foreach ( $time_fields as $key ) {
			$time = isset( $values[ $key ] ) ? trim( $values[ $key ] ) : $defaults[ $key ];
			$sanitized[ $key ] = preg_match( '/^([01][0-9]|2[0-3]):[0-5][0-9]$/', $time )
				? $time
				: $defaults[ $key ];
		}

		// Keyboard shortcut (e.g., "Ctrl+Shift+D")
		$shortcut = isset( $values['keyboard_shortcut'] ) ? trim( $values['keyboard_shortcut'] ) : $defaults['keyboard_shortcut'];
		$sanitized['keyboard_shortcut'] = preg_match( '/^(Ctrl|Meta|Cmd|Alt|Shift)(\+(Ctrl|Meta|Cmd|Alt|Shift))*\+[A-Za-z0-9]$/', $shortcut )
			? $shortcut
			: $defaults['keyboard_shortcut'];

		// Custom colors (hex values with fallback)
		$color_defaults = $defaults['custom_colors'];
		$custom_colors = isset( $values['custom_colors'] ) && is_array( $values['custom_colors'] )
			? $values['custom_colors']
			: array();

		$sanitized['custom_colors'] = array();
		foreach ( $color_defaults as $key => $default ) {
			$color = isset( $custom_colors[ $key ] ) ? sanitize_hex_color( $custom_colors[ $key ] ) : null;
			$sanitized['custom_colors'][ $key ] = $color ?? $default;
		}

		return $sanitized;
	}
}
