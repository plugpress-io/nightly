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
        transition_duration: 200
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

            // Extract settings from response
            const settingsData = response.settings || defaultSettings;
            setSettings(settingsData);

        } catch (err) {
            console.error('Failed to load settings:', err);
            
            // Set error message based on error type
            let errorMessage = __('Failed to load settings. Please try again.', 'nightly');
            
            if (err.code === 'rest_forbidden') {
                errorMessage = __('You do not have permission to manage plugin settings.', 'nightly');
            } else if (err.message && typeof err.message === 'string') {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
            
            // Use default settings as fallback
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

            // Validate settings before sending
            const validatedSettings = validateSettings(newSettings);

            const response = await apiFetch({
                path: '/nightly/v1/settings',
                method: 'POST',
                data: validatedSettings
            });

            // Update local settings with response
            const updatedSettings = response.settings || validatedSettings;
            setSettings(updatedSettings);

            return updatedSettings;

        } catch (err) {
            console.error('Failed to save settings:', err);
            
            // Set error message based on error type
            let errorMessage = __('Failed to save settings. Please try again.', 'nightly');
            
            if (err.code === 'rest_forbidden') {
                errorMessage = __('You do not have permission to save plugin settings.', 'nightly');
            } else if (err.code === 'validation_failed') {
                // Handle validation errors
                if (err.data && err.data.errors && Array.isArray(err.data.errors)) {
                    errorMessage = err.data.errors.join(' ');
                } else {
                    errorMessage = __('Settings validation failed. Please check your input.', 'nightly');
                }
            } else if (err.message && typeof err.message === 'string') {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
            throw err;
        } finally {
            setSaving(false);
        }
    };

    // Validate settings before saving
    const validateSettings = (settings) => {
        const validated = { ...settings };

        // Validate auto_inject
        if (typeof validated.auto_inject !== 'boolean') {
            validated.auto_inject = Boolean(validated.auto_inject);
        }

        // Validate floating_position
        const validPositions = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];
        if (!validPositions.includes(validated.floating_position)) {
            validated.floating_position = 'bottom-right';
        }

        // Validate respect_system_preference
        if (typeof validated.respect_system_preference !== 'boolean') {
            validated.respect_system_preference = Boolean(validated.respect_system_preference);
        }

        // Validate transition_duration
        const duration = parseInt(validated.transition_duration, 10);
        if (isNaN(duration) || duration < 0 || duration > 1000) {
            validated.transition_duration = 200;
        } else {
            validated.transition_duration = duration;
        }

        return validated;
    };

    // Clear error state
    const clearError = () => {
        setError(null);
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
        clearError
    };
};

export default useSettings;