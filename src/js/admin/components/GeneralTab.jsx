import { __ } from '@wordpress/i18n';
import { ToggleControl, SelectControl } from '@wordpress/components';

// Clean Range Control Component
const RangeControl = ({ label, value, onChange, min, max, step, help, disabled = false }) => (
    <div className="space-y-2">
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                {value}
            </span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {help && (
            <p className="text-xs text-gray-500">
                {help}
            </p>
        )}
    </div>
);

// Position Selector Component
const PositionSelector = ({ value, onChange, disabled }) => {
    const positions = [
        { value: 'bottom-right', label: __('Bottom Right', 'nightly') },
        { value: 'bottom-left', label: __('Bottom Left', 'nightly') },
        { value: 'top-right', label: __('Top Right', 'nightly') },
        { value: 'top-left', label: __('Top Left', 'nightly') }
    ];

    return (
        <SelectControl
            label={__('Position', 'nightly')}
            value={value}
            options={positions}
            onChange={onChange}
            disabled={disabled}
            className="w-full"
        />
    );
};

const GeneralTab = ({ localSettings, handleSettingChange, saving }) => {
    return (
        <div className="space-y-8">
            {/* Floating Toggle Settings */}
            <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">
                    {__('Floating Toggle', 'nightly')}
                </h2>
                
                <ToggleControl
                    label={__('Enable floating toggle', 'nightly')}
                    help={__('Show a floating toggle button on all pages', 'nightly')}
                    checked={localSettings.auto_inject || false}
                    onChange={(value) => handleSettingChange('auto_inject', value)}
                    disabled={saving}
                />

                {localSettings.auto_inject && (
                    <PositionSelector
                        value={localSettings.floating_position || 'bottom-right'}
                        onChange={(value) => handleSettingChange('floating_position', value)}
                        disabled={saving}
                    />
                )}

                {/* Icon Settings */}
                {localSettings.auto_inject && (
                    <div className="space-y-4">
                        <h3 className="text-md font-medium text-gray-800 border-b pb-2">
                            {__('Icon Settings', 'nightly')}
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <RangeControl
                                label={__('Icon Size (px)', 'nightly')}
                                value={localSettings.floating_icon_size || 24}
                                onChange={(value) => handleSettingChange('floating_icon_size', value)}
                                min={12}
                                max={48}
                                step={1}
                                help={__('Icon size in pixels', 'nightly')}
                                disabled={saving}
                            />
                            
                            <SelectControl
                                label={__('Icon Type', 'nightly')}
                                value={localSettings.floating_icon_type || 'moon'}
                                options={[
                                    { label: __('Moon', 'nightly'), value: 'moon' },
                                    { label: __('Sun', 'nightly'), value: 'sun' },
                                    { label: __('Sun/Moon', 'nightly'), value: 'sun-moon' },
                                    { label: __('Custom', 'nightly'), value: 'custom' }
                                ]}
                                onChange={(value) => handleSettingChange('floating_icon_type', value)}
                                disabled={saving}
                            />
                        </div>
                        
                        {localSettings.floating_icon_type === 'custom' && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    {__('Custom Icon (Emoji or Unicode)', 'nightly')}
                                </label>
                                <input
                                    type="text"
                                    value={localSettings.floating_custom_icon || '🌙'}
                                    onChange={(e) => handleSettingChange('floating_custom_icon', e.target.value)}
                                    placeholder="🌙"
                                    disabled={saving}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-500">
                                    {__('Enter an emoji or unicode character', 'nightly')}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* System Settings */}
            <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">
                    {__('System Settings', 'nightly')}
                </h2>

                <ToggleControl
                    label={__('Respect system preference', 'nightly')}
                    help={__('Use the user\'s system dark mode setting', 'nightly')}
                    checked={localSettings.respect_system_preference !== false}
                    onChange={(value) => handleSettingChange('respect_system_preference', value)}
                    disabled={saving}
                />

                <RangeControl
                    label={__('Transition Duration', 'nightly')}
                    value={localSettings.transition_duration || 200}
                    onChange={(value) => handleSettingChange('transition_duration', value)}
                    min={0}
                    max={1000}
                    step={50}
                    help={__('Animation speed in milliseconds', 'nightly')}
                    disabled={saving}
                />
            </div>

            {/* Mode Selection */}
            <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">
                    {__('Dark Mode Type', 'nightly')}
                </h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
                    <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                        <input
                            type="radio"
                            name="mode"
                            value="auto"
                            checked={localSettings.mode === 'auto'}
                            onChange={(e) => handleSettingChange('mode', e.target.value)}
                            disabled={saving}
                            className="sr-only"
                        />
                        <span className="flex flex-1">
                            <span className="flex flex-col">
                                <span className="block text-sm font-medium text-gray-900">
                                    {__('Auto Mode', 'nightly')}
                                </span>
                                <span className="mt-1 flex items-center text-sm text-gray-500">
                                    {__('Automatic filter-based dark mode', 'nightly')}
                                </span>
                            </span>
                        </span>
                        <span className={`h-5 w-5 rounded-full border flex items-center justify-center ${localSettings.mode === 'auto' ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                            {localSettings.mode === 'auto' && (
                                <span className="h-2 w-2 rounded-full bg-white" />
                            )}
                        </span>
                    </label>

                    <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                        <input
                            type="radio"
                            name="mode"
                            value="manual"
                            checked={localSettings.mode === 'manual'}
                            onChange={(e) => handleSettingChange('mode', e.target.value)}
                            disabled={saving}
                            className="sr-only"
                        />
                        <span className="flex flex-1">
                            <span className="flex flex-col">
                                <span className="block text-sm font-medium text-gray-900">
                                    {__('Custom Mode', 'nightly')}
                                </span>
                                <span className="mt-1 flex items-center text-sm text-gray-500">
                                    {__('Customizable color theme', 'nightly')}
                                </span>
                            </span>
                        </span>
                        <span className={`h-5 w-5 rounded-full border flex items-center justify-center ${localSettings.mode === 'manual' ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                            {localSettings.mode === 'manual' && (
                                <span className="h-2 w-2 rounded-full bg-white" />
                            )}
                        </span>
                    </label>
                </div>
            </div>

            {/* Theme Selection */}
            <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">
                    {__('Default Theme', 'nightly')}
                </h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
                    <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                        <input
                            type="radio"
                            name="theme"
                            value="light"
                            checked={localSettings.theme === 'light'}
                            onChange={(e) => handleSettingChange('theme', e.target.value)}
                            disabled={saving}
                            className="sr-only"
                        />
                        <span className="flex flex-1">
                            <span className="flex flex-col">
                                <span className="block text-sm font-medium text-gray-900">
                                    {__('Light Theme', 'nightly')}
                                </span>
                                <span className="mt-1 flex items-center text-sm text-gray-500">
                                    {__('Default light appearance', 'nightly')}
                                </span>
                            </span>
                        </span>
                        <span className={`h-5 w-5 rounded-full border flex items-center justify-center ${localSettings.theme === 'light' ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                            {localSettings.theme === 'light' && (
                                <span className="h-2 w-2 rounded-full bg-white" />
                            )}
                        </span>
                    </label>

                    <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                        <input
                            type="radio"
                            name="theme"
                            value="dark"
                            checked={localSettings.theme === 'dark'}
                            onChange={(e) => handleSettingChange('theme', e.target.value)}
                            disabled={saving}
                            className="sr-only"
                        />
                        <span className="flex flex-1">
                            <span className="flex flex-col">
                                <span className="block text-sm font-medium text-gray-900">
                                    {__('Dark Theme', 'nightly')}
                                </span>
                                <span className="mt-1 flex items-center text-sm text-gray-500">
                                    {__('Default dark appearance', 'nightly')}
                                </span>
                            </span>
                        </span>
                        <span className={`h-5 w-5 rounded-full border flex items-center justify-center ${localSettings.theme === 'dark' ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                            {localSettings.theme === 'dark' && (
                                <span className="h-2 w-2 rounded-full bg-white" />
                            )}
                        </span>
                    </label>
                </div>
            </div>

            {/* Auto Mode Settings */}
            {localSettings.mode === 'auto' && (
                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-gray-900">
                        {__('Auto Mode Settings', 'nightly')}
                    </h2>
                    
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
                        <RangeControl
                            label={__('Intensity', 'nightly')}
                            value={localSettings.auto_intensity || 0.05}
                            onChange={(value) => handleSettingChange('auto_intensity', value)}
                            min={0}
                            max={0.3}
                            step={0.01}
                            help={__('Filter strength', 'nightly')}
                            disabled={saving}
                        />

                        <RangeControl
                            label={__('Contrast', 'nightly')}
                            value={localSettings.auto_contrast || 1.15}
                            onChange={(value) => handleSettingChange('auto_contrast', value)}
                            min={1.0}
                            max={1.5}
                            step={0.05}
                            help={__('Text readability', 'nightly')}
                            disabled={saving}
                        />

                        <RangeControl
                            label={__('Brightness', 'nightly')}
                            value={localSettings.auto_brightness || 0.98}
                            onChange={(value) => handleSettingChange('auto_brightness', value)}
                            min={0.9}
                            max={1.1}
                            step={0.02}
                            help={__('Overall brightness', 'nightly')}
                            disabled={saving}
                        />

                        <RangeControl
                            label={__('Warm Tone', 'nightly')}
                            value={localSettings.auto_sepia || 0.15}
                            onChange={(value) => handleSettingChange('auto_sepia', value)}
                            min={0}
                            max={0.4}
                            step={0.05}
                            help={__('Eye comfort', 'nightly')}
                            disabled={saving}
                        />
                    </div>
                </div>
            )}

            {/* Custom Mode Info */}
            {localSettings.mode === 'manual' && (
                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-gray-900">
                        {__('Custom Mode', 'nightly')}
                    </h2>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                            {__('Custom mode uses semantic color tokens for professional styling. Colors are optimized for readability and can be customized in future updates.', 'nightly')}
                        </p>
                    </div>
                </div>
            )}

            {/* Advanced Settings */}
            <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">
                    {__('Advanced', 'nightly')}
                </h2>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        {__('Ignore Selectors', 'nightly')}
                    </label>
                    <textarea
                        value={localSettings.ignore_selectors || ''}
                        onChange={(e) => handleSettingChange('ignore_selectors', e.target.value)}
                        disabled={saving}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder=".my-component, #special-widget, .chart-container"
                    />
                    <p className="text-xs text-gray-500">
                        {__('CSS selectors to exempt from dark mode. Tip: Add class "nightly-ignore" to any HTML element.', 'nightly')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GeneralTab;
