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
        transition_duration: 200,
        // DarkReader-inspired settings
        intensity: 0.8,
        contrast: 1.0,
        brightness: 0.9,
        sepia: 0.1
    };

    // Load settings from API
    const loadSettings = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await apiFetch({
                path: '/nightly/v1/settings',
                method: 'GET'
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
                data: newSettings
            });

            setSettings(response.settings);
            return response.settings;

        } catch (err) {
            console.error('Failed to save settings:', err);
            setError(__('Failed to save settings. Please try again.', 'nightly'));
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
        clearError
    };
};

export default useSettings;