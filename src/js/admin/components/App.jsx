
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
        } catch (err) {
            console.error('Failed to save settings:', err);
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
        <div className="min-h-screen bg-gray-50">
            <AdminHeader
                hasChanges={hasChanges}
                saving={saving}
                onSave={handleSave}
                version="1.0.0"
            />
            
            <div className="w-full max-w-[908px] mx-auto p-6">
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
                        <div className="bg-white rounded-b-sm rounded-t-none shadow-sm border border-gray-200 border-t-0">
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