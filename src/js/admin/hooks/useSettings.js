/**
 * useSettings Hook - API Communication
 *
 * @package Nightly
 */

import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const useSettings = () => {
	const [settings, setSettings] = useState(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(null);

	// Default settings fallback
	const defaultSettings = {
		auto_inject: false,
		floating_position: 'bottom-right',
		respect_system_preference: true,
		theme: 'light',
		mode: 'manual',
		transition_duration: 200,
		ignore_selectors: '',

		// Floating button design settings
		floating_button_style: 'rounded',
		floating_button_size: 'medium',
		floating_bg_color: '#333333',
		floating_bg_color_hover: '#555555',
		floating_bg_color_active: '#79c0ff',
		floating_icon_color: '#ffffff',
		floating_icon_color_hover: '#ffffff',
		floating_border_color: 'transparent',
		floating_border_width: 0,
		floating_border_radius: 50,
		floating_icon_size: 24,
		floating_icon_type: 'sun-moon',
		floating_custom_icon: '🌙',
		floating_padding_top: 12,
		floating_padding_bottom: 12,
		floating_padding_left: 16,
		floating_padding_right: 16,
		floating_box_shadow: '0 2px 4px rgba(0,0,0,0.1)',
		floating_box_shadow_hover: '0 4px 8px rgba(0,0,0,0.15)',
		floating_width: '3.5rem',
		floating_height: '3.5rem',

		// Reader mode settings
		reader_intensity: 0.05,
		reader_contrast: 1.15,
		reader_brightness: 0.98,
		reader_sepia: 0.15,

		// Legacy filter settings (no longer used for dark mode)
		intensity: 0.88,
		contrast: 1.05,
		brightness: 0.85,
		sepia: 0.05,
	};

	// Load settings from API
	const loadSettings = async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await apiFetch({
				path: '/nightly/v1/settings',
				method: 'GET',
			});

			setSettings(response.settings || defaultSettings);
		} catch (err) {
			console.error('Failed to load settings:', err);
			setError(__('Failed to load settings. Using defaults.', 'nightly'));
			setSettings(defaultSettings);
		} finally {
			setLoading(false);
		}
	};

	// Save settings to API
	const saveSettings = async (newSettings) => {
		try {
			setSaving(true);
			setError(null);

			const response = await apiFetch({
				path: '/nightly/v1/settings',
				method: 'POST',
				data: newSettings,
			});

			setSettings(response.settings);
			return response.settings;
		} catch (err) {
			console.error('Failed to save settings:', err);
			setError(
				__('Failed to save settings. Please try again.', 'nightly')
			);
			throw err;
		} finally {
			setSaving(false);
		}
	};

	// Clear error state
	const clearError = () => {
		setError(null);
	};

	// Retry mechanism for failed operations
	const retryLoadSettings = async () => {
		clearError();
		await loadSettings();
	};

	// Load settings on mount
	useEffect(() => {
		loadSettings();
	}, []);

	return {
		settings,
		loading,
		saving,
		error,
		saveSettings,
		loadSettings,
		retryLoadSettings,
		clearError,
	};
};

export default useSettings;
