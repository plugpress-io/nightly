import { __ } from '@wordpress/i18n';

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

const DesignTab = ({ localSettings, handleSettingChange, saving }) => {
    return (
        <div className="space-y-8">
            {/* Floating Button Design */}
            {localSettings.auto_inject ? (
                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-gray-900">
                        {__('Floating Button', 'nightly')}
                    </h2>
                    
                    <ColorPicker
                        label={__('Background Color', 'nightly')}
                        value={localSettings.floating_bg_color || '#333333'}
                        onChange={(value) => handleSettingChange('floating_bg_color', value)}
                        help={__('Choose the background color for the floating toggle button', 'nightly')}
                        disabled={saving}
                    />
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
