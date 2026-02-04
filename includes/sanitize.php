<?php

namespace Nightly;

use WP_Error;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Sanitize {
	public static function options( array $values ) {
		$sanitized = array();

		// Existing fields
		$sanitized['example_text'] = isset( $values['example_text'] ) ? sanitize_text_field( $values['example_text'] ) : '';
		$sanitized['enable_feature'] = isset( $values['enable_feature'] ) ? (bool) $values['enable_feature'] : false;

		// Dark mode fields
		$sanitized['enabled'] = isset( $values['enabled'] ) ? (bool) $values['enabled'] : false;

		$sanitized['default_mode'] = isset( $values['default_mode'] )
			&& in_array( $values['default_mode'], array( 'system', 'dark', 'light' ), true )
			? $values['default_mode']
			: 'system';

		$sanitized['show_toggle'] = isset( $values['show_toggle'] ) ? (bool) $values['show_toggle'] : true;

		$sanitized['toggle_position'] = isset( $values['toggle_position'] )
			&& in_array( $values['toggle_position'], array( 'bottom-right', 'bottom-left' ), true )
			? $values['toggle_position']
			: 'bottom-right';


		$sanitized['toggle_style'] = isset( $values['toggle_style'] )
			&& in_array( $values['toggle_style'], array( 'classic', 'pill', 'minimal' ), true )
			? $values['toggle_style']
			: 'classic';

		$sanitized['toggle_size'] = isset( $values['toggle_size'] )
			&& in_array( $values['toggle_size'], array( 'xs', 's', 'm', 'l', 'xl' ), true )
			? $values['toggle_size']
			: 'm';
		// Filter settings (relative values: -50 to +50 for brightness/contrast, 0-100 for sepia/grayscale)
		$sanitized['brightness'] = isset( $values['brightness'] )
			? max( -50, min( 50, (int) $values['brightness'] ) )
			: 0;

		$sanitized['contrast'] = isset( $values['contrast'] )
			? max( -50, min( 50, (int) $values['contrast'] ) )
			: 0;

		$sanitized['sepia'] = isset( $values['sepia'] )
			? max( 0, min( 100, (int) $values['sepia'] ) )
			: 0;

		$sanitized['grayscale'] = isset( $values['grayscale'] )
			? max( 0, min( 100, (int) $values['grayscale'] ) )
			: 0;

		// Sanitize exclude_selectors with strict pattern
		$exclude = isset( $values['exclude_selectors'] ) ? trim( $values['exclude_selectors'] ) : '';
		if ( ! empty( $exclude ) ) {
			// Match frontend pattern: /^[a-zA-Z0-9#.\-_\s,:>\[\]\(\)="'~+*\\/]*$/
			if ( preg_match( '/^[a-zA-Z0-9#.\-_\s,:>\[\]\(\)="\'~+*\\/]*$/', $exclude ) ) {
				$sanitized['exclude_selectors'] = $exclude;
			} else {
				return new WP_Error(
					'nightly_invalid_selectors',
					__( 'Invalid CSS selectors provided.', TEXT_DOMAIN ),
					array( 'status' => 400 )
				);
			}
		} else {
			$sanitized['exclude_selectors'] = '';
		}

		// Transition settings
		$sanitized['transition_enabled'] = isset( $values['transition_enabled'] ) ? (bool) $values['transition_enabled'] : true;

		$sanitized['transition_duration'] = isset( $values['transition_duration'] )
			? max( 0, min( 1000, (int) $values['transition_duration'] ) )
			: 300;

		// Schedule settings
		$sanitized['schedule_enabled'] = isset( $values['schedule_enabled'] ) ? (bool) $values['schedule_enabled'] : false;

		// Validate time format HH:MM
		$schedule_start = isset( $values['schedule_start'] ) ? trim( $values['schedule_start'] ) : '20:00';
		if ( preg_match( '/^([01][0-9]|2[0-3]):([0-5][0-9])$/', $schedule_start ) ) {
			$sanitized['schedule_start'] = $schedule_start;
		} else {
			$sanitized['schedule_start'] = '20:00';
		}

		$schedule_end = isset( $values['schedule_end'] ) ? trim( $values['schedule_end'] ) : '06:00';
		if ( preg_match( '/^([01][0-9]|2[0-3]):([0-5][0-9])$/', $schedule_end ) ) {
			$sanitized['schedule_end'] = $schedule_end;
		} else {
			$sanitized['schedule_end'] = '06:00';
		}

		// Keyboard shortcut settings
		$sanitized['keyboard_enabled'] = isset( $values['keyboard_enabled'] ) ? (bool) $values['keyboard_enabled'] : true;

		// Validate keyboard shortcut format (e.g., "Ctrl+Shift+D", "Meta+K", "Alt+D")
		$keyboard_shortcut = isset( $values['keyboard_shortcut'] ) ? trim( $values['keyboard_shortcut'] ) : 'Ctrl+Shift+D';
		if ( preg_match( '/^(Ctrl|Meta|Cmd|Alt|Shift)(\+(Ctrl|Meta|Cmd|Alt|Shift))*\+[A-Za-z0-9]$/', $keyboard_shortcut ) ) {
			$sanitized['keyboard_shortcut'] = $keyboard_shortcut;
		} else {
			$sanitized['keyboard_shortcut'] = 'Ctrl+Shift+D';
		}

		// Media brightness settings
		$sanitized['image_brightness'] = isset( $values['image_brightness'] )
			? max( 50, min( 150, (int) $values['image_brightness'] ) )
			: 100;

		$sanitized['video_brightness'] = isset( $values['video_brightness'] )
			? max( 50, min( 150, (int) $values['video_brightness'] ) )
			: 100;

		$sanitized['background_brightness'] = isset( $values['background_brightness'] )
			? max( 50, min( 150, (int) $values['background_brightness'] ) )
			: 100;

		// Theme settings
		$sanitized['theme'] = isset( $values['theme'] )
			&& in_array( $values['theme'], array( 'classic', 'cool', 'warm', 'high-contrast', 'pure-black', 'custom' ), true )
			? $values['theme']
			: 'classic';

		// Custom colors (only for custom theme)
		$custom_colors = isset( $values['custom_colors'] ) && is_array( $values['custom_colors'] )
			? $values['custom_colors']
			: array();

		$sanitized['custom_colors'] = array(
			'bg_primary'      => isset( $custom_colors['bg_primary'] ) ? sanitize_hex_color( $custom_colors['bg_primary'] ) : '#000000',
			'bg_secondary'    => isset( $custom_colors['bg_secondary'] ) ? sanitize_hex_color( $custom_colors['bg_secondary'] ) : '#0a0a0a',
			'text_primary'    => isset( $custom_colors['text_primary'] ) ? sanitize_hex_color( $custom_colors['text_primary'] ) : '#ffffff',
			'text_secondary'  => isset( $custom_colors['text_secondary'] ) ? sanitize_hex_color( $custom_colors['text_secondary'] ) : '#a0a0a0',
			'border'          => isset( $custom_colors['border'] ) ? sanitize_hex_color( $custom_colors['border'] ) : '#1a1a1a',
			'accent'          => isset( $custom_colors['accent'] ) ? sanitize_hex_color( $custom_colors['accent'] ) : '#4a9eff',
		);

		// Fallback to defaults if sanitize_hex_color returns null
		foreach ( $sanitized['custom_colors'] as $key => $color ) {
			if ( $color === null ) {
				$defaults = array(
					'bg_primary'     => '#000000',
					'bg_secondary'   => '#0a0a0a',
					'text_primary'   => '#ffffff',
					'text_secondary' => '#a0a0a0',
					'border'         => '#1a1a1a',
					'accent'         => '#4a9eff',
				);
				$sanitized['custom_colors'][ $key ] = $defaults[ $key ];
			}
		}

		// Existing validation
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
