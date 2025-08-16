import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

// Clean Color Picker Component
const ColorPicker = ({ label, value, onChange, help, disabled = false }) => (
    <div className="space-y-2">
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="flex items-center space-x-2">
                <div 
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: value }}
                />
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded font-mono">
                    {value}
                </span>
            </div>
        </div>
        <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="w-full h-10 rounded border border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {help && (
            <p className="text-xs text-gray-500">
                {help}
            </p>
        )}
    </div>
);

// Size Input Component
const SizeInput = ({ label, value, onChange, help, disabled = false }) => (
    <div className="space-y-2">
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded font-mono">
                {value}
            </span>
        </div>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="3.5rem"
        />
        {help && (
            <p className="text-xs text-gray-500">
                {help}
            </p>
        )}
    </div>
);

// Range Control Component
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

// Text Input Component
const TextInput = ({ label, value, onChange, help, placeholder, disabled = false }) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        {help && (
            <p className="text-xs text-gray-500">
                {help}
            </p>
        )}
    </div>
);

const DesignTab = ({ localSettings, handleSettingChange, saving }) => {
    return (
        <div className="space-y-8">
            {/* Floating Button Design */}
            {localSettings.auto_inject ? (
                <div className="space-y-8">
                    {/* Button Settings */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
                            {__('Button Settings', 'nightly')}
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <SelectControl
                                label={__('Button Style', 'nightly')}
                                value={localSettings.floating_button_style || 'rounded'}
                                options={[
                                    { label: __('Rounded', 'nightly'), value: 'rounded' },
                                    { label: __('Square', 'nightly'), value: 'square' },
                                    { label: __('Pill', 'nightly'), value: 'pill' },
                                    { label: __('Circle', 'nightly'), value: 'circle' }
                                ]}
                                onChange={(value) => handleSettingChange('floating_button_style', value)}
                                disabled={saving}
                            />

                            <SelectControl
                                label={__('Button Size', 'nightly')}
                                value={localSettings.floating_button_size || 'medium'}
                                options={[
                                    { label: __('Small', 'nightly'), value: 'small' },
                                    { label: __('Medium', 'nightly'), value: 'medium' },
                                    { label: __('Large', 'nightly'), value: 'large' },
                                    { label: __('Extra Large', 'nightly'), value: 'xlarge' }
                                ]}
                                onChange={(value) => handleSettingChange('floating_button_size', value)}
                                disabled={saving}
                            />
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
                            {__('Colors', 'nightly')}
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <ColorPicker
                                label={__('Background Color', 'nightly')}
                                value={localSettings.floating_bg_color || '#333333'}
                                onChange={(value) => handleSettingChange('floating_bg_color', value)}
                                help={__('Main button background color', 'nightly')}
                                disabled={saving}
                            />
                            
                            <ColorPicker
                                label={__('Hover Background Color', 'nightly')}
                                value={localSettings.floating_bg_color_hover || '#555555'}
                                onChange={(value) => handleSettingChange('floating_bg_color_hover', value)}
                                help={__('Background color on hover', 'nightly')}
                                disabled={saving}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <ColorPicker
                                label={__('Active Background Color', 'nightly')}
                                value={localSettings.floating_bg_color_active || '#79c0ff'}
                                onChange={(value) => handleSettingChange('floating_bg_color_active', value)}
                                help={__('Background color when dark mode is active', 'nightly')}
                                disabled={saving}
                            />
                            
                            <ColorPicker
                                label={__('Icon Color', 'nightly')}
                                value={localSettings.floating_icon_color || '#ffffff'}
                                onChange={(value) => handleSettingChange('floating_icon_color', value)}
                                help={__('Icon color', 'nightly')}
                                disabled={saving}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <ColorPicker
                                label={__('Hover Icon Color', 'nightly')}
                                value={localSettings.floating_icon_color_hover || '#ffffff'}
                                onChange={(value) => handleSettingChange('floating_icon_color_hover', value)}
                                help={__('Icon color on hover', 'nightly')}
                                disabled={saving}
                            />
                            
                            <ColorPicker
                                label={__('Border Color', 'nightly')}
                                value={localSettings.floating_border_color || 'transparent'}
                                onChange={(value) => handleSettingChange('floating_border_color', value)}
                                help={__('Button border color', 'nightly')}
                                disabled={saving}
                            />
                        </div>
                    </div>

                    {/* Spacing */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
                            {__('Spacing', 'nightly')}
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <RangeControl
                                label={__('Padding Top (px)', 'nightly')}
                                value={localSettings.floating_padding_top || 12}
                                onChange={(value) => handleSettingChange('floating_padding_top', value)}
                                min={0}
                                max={50}
                                step={1}
                                help={__('Top padding', 'nightly')}
                                disabled={saving}
                            />
                            
                            <RangeControl
                                label={__('Padding Bottom (px)', 'nightly')}
                                value={localSettings.floating_padding_bottom || 12}
                                onChange={(value) => handleSettingChange('floating_padding_bottom', value)}
                                min={0}
                                max={50}
                                step={1}
                                help={__('Bottom padding', 'nightly')}
                                disabled={saving}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <RangeControl
                                label={__('Padding Left (px)', 'nightly')}
                                value={localSettings.floating_padding_left || 16}
                                onChange={(value) => handleSettingChange('floating_padding_left', value)}
                                min={0}
                                max={50}
                                step={1}
                                help={__('Left padding', 'nightly')}
                                disabled={saving}
                            />
                            
                            <RangeControl
                                label={__('Padding Right (px)', 'nightly')}
                                value={localSettings.floating_padding_right || 16}
                                onChange={(value) => handleSettingChange('floating_padding_right', value)}
                                min={0}
                                max={50}
                                step={1}
                                help={__('Right padding', 'nightly')}
                                disabled={saving}
                            />
                        </div>
                    </div>

                    {/* Border & Shadow */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
                            {__('Border & Shadow', 'nightly')}
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <RangeControl
                                label={__('Border Width (px)', 'nightly')}
                                value={localSettings.floating_border_width || 0}
                                onChange={(value) => handleSettingChange('floating_border_width', value)}
                                min={0}
                                max={10}
                                step={1}
                                help={__('Border thickness', 'nightly')}
                                disabled={saving}
                            />

                            <RangeControl
                                label={__('Border Radius (%)', 'nightly')}
                                value={localSettings.floating_border_radius || 50}
                                onChange={(value) => handleSettingChange('floating_border_radius', value)}
                                min={0}
                                max={50}
                                step={1}
                                help={__('Corner roundness', 'nightly')}
                                disabled={saving}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <TextInput
                                label={__('Box Shadow', 'nightly')}
                                value={localSettings.floating_box_shadow || '0 2px 4px rgba(0,0,0,0.1)'}
                                onChange={(value) => handleSettingChange('floating_box_shadow', value)}
                                placeholder="0 2px 4px rgba(0,0,0,0.1)"
                                help={__('CSS box-shadow value (e.g., 0 2px 4px rgba(0,0,0,0.1))', 'nightly')}
                                disabled={saving}
                            />

                            <TextInput
                                label={__('Hover Box Shadow', 'nightly')}
                                value={localSettings.floating_box_shadow_hover || '0 4px 8px rgba(0,0,0,0.15)'}
                                onChange={(value) => handleSettingChange('floating_box_shadow_hover', value)}
                                placeholder="0 4px 8px rgba(0,0,0,0.15)"
                                help={__('CSS box-shadow value for hover state', 'nightly')}
                                disabled={saving}
                            />
                        </div>
                    </div>

                    {/* Legacy Size Settings (for backward compatibility) */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-medium text-gray-900 border-b pb-2">
                            {__('Size Settings', 'nightly')}
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <SizeInput
                                label={__('Width', 'nightly')}
                                value={localSettings.floating_width || '3.5rem'}
                                onChange={(value) => handleSettingChange('floating_width', value)}
                                help={__('Button width (e.g., 3.5rem, 56px)', 'nightly')}
                                disabled={saving}
                            />
                            
                            <SizeInput
                                label={__('Height', 'nightly')}
                                value={localSettings.floating_height || '3.5rem'}
                                onChange={(value) => handleSettingChange('floating_height', value)}
                                help={__('Button height (e.g., 3.5rem, 56px)', 'nightly')}
                                disabled={saving}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {__('No Design Options Available', 'nightly')}
                    </h3>
                    <p className="text-gray-500 mb-4">
                        {__('Enable the floating toggle in the General tab to access design options.', 'nightly')}
                    </p>
                    <div className="inline-flex rounded-md shadow">
                        <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50">
                            {__('Go to General Tab', 'nightly')}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DesignTab;
