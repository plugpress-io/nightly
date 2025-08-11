/**
 * Main Admin App Component
 *
 * @package Nightly
 */

import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { 
    Card, 
    CardBody, 
    CardHeader,
    ToggleControl,
    SelectControl,
    RangeControl,
    Button,
    Notice,
    Spinner,
    Flex,
    FlexItem
} from '@wordpress/components';
import useSettings from '../hooks/useSettings';

const App = () => {
    const {
        settings,
        loading,
        error,
        saving,
        saveSettings,
        clearError
    } = useSettings();

    const [localSettings, setLocalSettings] = useState({});
    const [hasChanges, setHasChanges] = useState(false);

    // Update local settings when API settings change
    useEffect(() => {
        if (settings) {
            setLocalSettings(settings);
            setHasChanges(false);
        }
    }, [settings]);

    // Handle setting changes
    const handleSettingChange = (key, value) => {
        const newSettings = {
            ...localSettings,
            [key]: value
        };
        setLocalSettings(newSettings);
        
        // Check if there are changes from original settings
        const hasChanges = Object.keys(newSettings).some(
            key => newSettings[key] !== settings[key]
        );
        setHasChanges(hasChanges);
    };

    // Handle save
    const handleSave = async () => {
        try {
            await saveSettings(localSettings);
            setHasChanges(false);
        } catch (err) {
            console.error('Failed to save settings:', err);
        }
    };

    if (loading) {
        return (
            <div className="nightly-admin-loading">
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <Spinner />
                    <p style={{ marginTop: '1rem', color: '#666' }}>
                        {__('Loading settings...', 'nightly')}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="nightly-admin-app">
            {/* Header */}
            <div className="nightly-admin-header">
                <h1>{__('Nightly — Dark Mode Toggle', 'nightly')}</h1>
                <p>{__('Configure dark mode toggle settings for your website.', 'nightly')}</p>
            </div>

            {/* Error Notice */}
            {error && (
                <Notice 
                    status="error" 
                    onRemove={clearError}
                    isDismissible
                >
                    {error}
                </Notice>
            )}

            {/* Settings Card */}
            <Card size="large">
                <CardHeader>
                    <h2>{__('Toggle Settings', 'nightly')}</h2>
                </CardHeader>
                <CardBody>
                    <div className="nightly-settings-grid">
                        
                        {/* Auto Inject Setting */}
                        <div className="nightly-setting-item">
                            <ToggleControl
                                label={__('Auto-inject floating toggle', 'nightly')}
                                help={__('Automatically add a floating toggle button for classic themes', 'nightly')}
                                checked={localSettings.auto_inject || false}
                                onChange={(value) => handleSettingChange('auto_inject', value)}
                            />
                        </div>

                        {/* Floating Position Setting */}
                        {localSettings.auto_inject && (
                            <div className="nightly-setting-item">
                                <SelectControl
                                    label={__('Floating toggle position', 'nightly')}
                                    help={__('Choose where the floating toggle appears on the page', 'nightly')}
                                    value={localSettings.floating_position || 'bottom-right'}
                                    options={[
                                        { label: __('Bottom Right', 'nightly'), value: 'bottom-right' },
                                        { label: __('Bottom Left', 'nightly'), value: 'bottom-left' },
                                        { label: __('Top Right', 'nightly'), value: 'top-right' },
                                        { label: __('Top Left', 'nightly'), value: 'top-left' }
                                    ]}
                                    onChange={(value) => handleSettingChange('floating_position', value)}
                                />
                            </div>
                        )}

                        {/* System Preference Setting */}
                        <div className="nightly-setting-item">
                            <ToggleControl
                                label={__('Respect system preference', 'nightly')}
                                help={__('Automatically detect and use the user\'s system dark mode preference', 'nightly')}
                                checked={localSettings.respect_system_preference !== false}
                                onChange={(value) => handleSettingChange('respect_system_preference', value)}
                            />
                        </div>

                        {/* Transition Duration Setting */}
                        <div className="nightly-setting-item">
                            <RangeControl
                                label={__('Transition duration', 'nightly')}
                                help={__('How fast the theme switches (in milliseconds)', 'nightly')}
                                value={localSettings.transition_duration || 200}
                                onChange={(value) => handleSettingChange('transition_duration', value)}
                                min={0}
                                max={1000}
                                step={50}
                            />
                            <div className="nightly-range-labels">
                                <span>Instant</span>
                                <span>Fast</span>
                                <span>Medium</span>
                                <span>Slow</span>
                            </div>
                        </div>

                    </div>
                </CardBody>
            </Card>

            {/* Save Button */}
            <Card style={{ marginTop: '1.5rem' }}>
                <CardBody>
                    <Flex justify="space-between" align="center">
                        <FlexItem>
                            {hasChanges && (
                                <span style={{ color: '#666', fontSize: '0.875rem' }}>
                                    {__('You have unsaved changes', 'nightly')}
                                </span>
                            )}
                        </FlexItem>
                        <FlexItem>
                            <Button
                                variant="primary"
                                onClick={handleSave}
                                isBusy={saving}
                                disabled={!hasChanges || saving}
                            >
                                {saving ? __('Saving...', 'nightly') : __('Save Settings', 'nightly')}
                            </Button>
                        </FlexItem>
                    </Flex>
                </CardBody>
            </Card>

            {/* Usage Instructions */}
            <Card style={{ marginTop: '1.5rem' }}>
                <CardHeader>
                    <h3>{__('How to Use', 'nightly')}</h3>
                </CardHeader>
                <CardBody>
                    <div className="nightly-usage-instructions">
                        <p>{__('Add the dark mode toggle to your site in several ways:', 'nightly')}</p>
                        <ul>
                            <li>
                                <strong>{__('Block Editor:', 'nightly')}</strong> {__('Search for "Nightly" in the block inserter', 'nightly')}
                            </li>
                            <li>
                                <strong>{__('Auto-inject:', 'nightly')}</strong> {__('Enable the floating toggle above for classic themes', 'nightly')}
                            </li>
                            <li>
                                <strong>{__('Manual:', 'nightly')}</strong> {__('Add data-nightly-toggle="true" to any button element', 'nightly')}
                            </li>
                        </ul>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default App;