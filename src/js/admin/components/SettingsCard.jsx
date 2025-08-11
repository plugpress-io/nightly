/**
 * Settings Card Component - Polaris Inspired
 *
 * @package Nightly
 */

import { __ } from '@wordpress/i18n';
import Toggle from './Toggle';
import SaveButton from './SaveButton';

const SettingsCard = ({
    settings,
    onSettingChange,
    onSave,
    hasChanges,
    saving
}) => {
    const {
        auto_inject = false,
        floating_position = 'bottom-right',
        respect_system_preference = true,
        transition_duration = 200
    } = settings;

    // Position options for floating toggle
    const positionOptions = [
        { value: 'bottom-right', label: __('Bottom Right', 'nightly') },
        { value: 'bottom-left', label: __('Bottom Left', 'nightly') },
        { value: 'top-right', label: __('Top Right', 'nightly') },
        { value: 'top-left', label: __('Top Left', 'nightly') }
    ];

    // Duration options for transitions
    const durationOptions = [
        { value: 150, label: __('Fast (150ms)', 'nightly') },
        { value: 200, label: __('Normal (200ms)', 'nightly') },
        { value: 300, label: __('Slow (300ms)', 'nightly') },
        { value: 0, label: __('No Animation', 'nightly') }
    ];

    return (
        <div className="nightly-settings-card">
            <div className="nightly-card-header">
                <h2 className="nightly-card-title">
                    {__('Dark Mode Settings', 'nightly')}
                </h2>
                <p className="nightly-card-description">
                    {__('Configure how the dark mode toggle appears and behaves on your website.', 'nightly')}
                </p>
            </div>

            <div className="nightly-card-content">
                {/* Auto-injection setting */}
                <div className="nightly-setting-group">
                    <div className="nightly-setting-header">
                        <label className="nightly-setting-label">
                            {__('Auto-inject floating toggle', 'nightly')}
                        </label>
                        <Toggle
                            checked={auto_inject}
                            onChange={(checked) => onSettingChange('auto_inject', checked)}
                            disabled={saving}
                            ariaLabel={__('Enable auto-injection of floating toggle', 'nightly')}
                        />
                    </div>
                    <p className="nightly-setting-description">
                        {__('Automatically display a floating dark mode toggle for classic themes. Block themes should use the Nightly block instead.', 'nightly')}
                    </p>
                </div>

                {/* Floating position setting - only show if auto_inject is enabled */}
                {auto_inject && (
                    <div className="nightly-setting-group">
                        <label className="nightly-setting-label" htmlFor="floating-position">
                            {__('Floating toggle position', 'nightly')}
                        </label>
                        <select
                            id="floating-position"
                            className="nightly-select"
                            value={floating_position}
                            onChange={(e) => onSettingChange('floating_position', e.target.value)}
                            disabled={saving}
                        >
                            {positionOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <p className="nightly-setting-description">
                            {__('Choose where the floating toggle appears on your website.', 'nightly')}
                        </p>
                    </div>
                )}

                {/* System preference setting */}
                <div className="nightly-setting-group">
                    <div className="nightly-setting-header">
                        <label className="nightly-setting-label">
                            {__('Respect system preference', 'nightly')}
                        </label>
                        <Toggle
                            checked={respect_system_preference}
                            onChange={(checked) => onSettingChange('respect_system_preference', checked)}
                            disabled={saving}
                            ariaLabel={__('Respect user system dark mode preference', 'nightly')}
                        />
                    </div>
                    <p className="nightly-setting-description">
                        {__('Automatically detect and use the user\'s system dark mode preference on first visit.', 'nightly')}
                    </p>
                </div>

                {/* Transition duration setting */}
                <div className="nightly-setting-group">
                    <label className="nightly-setting-label" htmlFor="transition-duration">
                        {__('Animation speed', 'nightly')}
                    </label>
                    <select
                        id="transition-duration"
                        className="nightly-select"
                        value={transition_duration}
                        onChange={(e) => onSettingChange('transition_duration', parseInt(e.target.value, 10))}
                        disabled={saving}
                    >
                        {durationOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <p className="nightly-setting-description">
                        {__('Control how fast the theme transition animation plays.', 'nightly')}
                    </p>
                </div>
            </div>

            <div className="nightly-card-footer">
                <SaveButton
                    onClick={onSave}
                    disabled={!hasChanges}
                    loading={saving}
                />
                {hasChanges && (
                    <p className="nightly-unsaved-changes">
                        {__('You have unsaved changes.', 'nightly')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SettingsCard;