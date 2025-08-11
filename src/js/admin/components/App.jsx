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
    FlexItem,
    __experimentalHeading as Heading,
    __experimentalText as Text,
    __experimentalSpacer as Spacer
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
                <Flex justify="center" align="center" style={{ minHeight: '200px' }}>
                    <FlexItem>
                        <Spinner />
                        <Spacer marginTop={3} />
                        <Text>{__('Loading settings...', 'nightly')}</Text>
                    </FlexItem>
                </Flex>
            </div>
        );
    }

    return (
        <div className="nightly-admin-app">
            {/* Header */}
            <div className="nightly-admin-header">
                <Heading level={1} size="large">
                    {__('Nightly — Dark Mode Toggle', 'nightly')}
                </Heading>
                <Text variant="muted">
                    {__('Configure dark mode toggle settings for your website.', 'nightly')}
                </Text>
            </div>

            <Spacer marginY={6} />

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
                    <Heading level={2} size="medium">
                        {__('Toggle Settings', 'nightly')}
                    </Heading>
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

                        <Spacer marginY={4} />

                        {/* Floating Position Setting */}
                        {localSettings.auto_inject && (
                            <>
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
                                <Spacer marginY={4} />
                            </>
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

                        <Spacer marginY={4} />

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
                                marks={[
                                    { value: 0, label: __('Instant', 'nightly') },
                                    { value: 200, label: __('Fast', 'nightly') },
                                    { value: 500, label: __('Medium', 'nightly') },
                                    { value: 1000, label: __('Slow', 'nightly') }
                                ]}
                            />
                        </div>

                    </div>
                </CardBody>
            </Card>

            <Spacer marginY={6} />

            {/* Save Button */}
            <Card>
                <CardBody>
                    <Flex justify="space-between" align="center">
                        <FlexItem>
                            {hasChanges && (
                                <Text variant="muted">
                                    {__('You have unsaved changes', 'nightly')}
                                </Text>
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
            <Spacer marginY={6} />
            
            <Card>
                <CardHeader>
                    <Heading level={3} size="small">
                        {__('How to Use', 'nightly')}
                    </Heading>
                </CardHeader>
                <CardBody>
                    <div className="nightly-usage-instructions">
                        <Text>
                            {__('Add the dark mode toggle to your site in several ways:', 'nightly')}
                        </Text>
                        <Spacer marginY={3} />
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