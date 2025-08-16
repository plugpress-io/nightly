
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Notice, Spinner } from '@wordpress/components';
import useSettings from '../hooks/useSettings';
import AdminHeader from './AdminHeader';
import SaveButton from './SaveButton';
import TabNavigation from './TabNavigation';
import GeneralTab from './GeneralTab';
import DesignTab from './DesignTab';
import PreviewPanel from './PreviewPanel';

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
    const [activeTab, setActiveTab] = useState('general');

    // Update local settings when API settings change
    useEffect(() => {
        if (settings) {
            // Ensure mode has a default value
            const settingsWithDefaults = {
                ...settings,
                mode: settings.mode || 'manual'
            };
            setLocalSettings(settingsWithDefaults);
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
            settingKey => newSettings[settingKey] !== settings[settingKey]
        );
        setHasChanges(hasChanges);
    };

    // Handle save
    const handleSave = async () => {
        try {
            await saveSettings(localSettings);
            setHasChanges(false);
            
            // Also update localStorage to sync with frontend
            updateLocalStorageFromSettings(localSettings);
            
        } catch (err) {
            console.error('Failed to save settings:', err);
        }
    };

    // Update localStorage to sync with frontend
    const updateLocalStorageFromSettings = (newSettings) => {
        try {
            // Update theme and mode preferences in localStorage
            if (newSettings.mode) {
                localStorage.setItem('nightly-mode-preference', newSettings.mode);
            }
            
            // If there's a theme setting, update it too
            if (newSettings.theme) {
                localStorage.setItem('nightly-theme-preference', newSettings.theme);
            }
            
            // Dispatch a custom event to notify frontend of settings change
            window.dispatchEvent(new CustomEvent('nightlySettingsChanged', {
                detail: { settings: newSettings }
            }));
        } catch (error) {
            // Silently handle localStorage errors in production
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
                <Spinner />
                <p className="text-gray-600">{__('Loading settings...', 'nightly')}</p>
            </div>
        );
    }

    if (error && !settings) {
        return (
            <div className="p-6">
                <Notice status="error" isDismissible={false}>
                    <p>{error}</p>
                </Notice>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <AdminHeader
                hasChanges={hasChanges}
                saving={saving}
                onSave={handleSave}
                version="1.0.0"
            />
            
            <div className="w-full max-w-[908px] mx-auto pt-10">
                {error && (
                    <div className="mb-6">
                        <Notice status="error" onRemove={clearError}>
                            <p>{error}</p>
                        </Notice>
                    </div>
                )}

                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {__('Dark Mode Settings', 'nightly')}
                        </h1>
                        <SaveButton
                            onClick={handleSave}
                            disabled={!hasChanges || saving}
                            loading={saving}
                        />
                    </div>
                </div>

                {/* Tab Navigation */}
                <TabNavigation 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                    saving={saving}
                />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Settings Panel */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-200 rounded-lg">
                            <div className="p-6">
                                {activeTab === 'general' && (
                                    <GeneralTab 
                                        localSettings={localSettings}
                                        handleSettingChange={handleSettingChange}
                                        saving={saving}
                                    />
                                )}
                                
                                {activeTab === 'design' && (
                                    <DesignTab 
                                        localSettings={localSettings}
                                        handleSettingChange={handleSettingChange}
                                        saving={saving}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <PreviewPanel localSettings={localSettings} />
                </div>
            </div>
        </div>
    );
};

export default App;