import { __ } from '@wordpress/i18n';

const PreviewPanel = ({ localSettings }) => {
    return (
        <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg sticky top-4">
                <div className="p-6">
                    <h3 className="text-sm font-medium text-gray-900">
                        {__('Preview', 'nightly')}
                    </h3>
                    {/* Mock Website Preview */}
                    <div className="relative bg-gray-100 rounded border overflow-hidden aspect-[16/10]">
                        {/* Mock Header */}
                        <div className="bg-white border-b p-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-blue-500 rounded"></div>
                                <div className="flex-1">
                                    <div className="h-2 bg-gray-300 rounded w-20"></div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Mock Content */}
                        <div className="p-3 space-y-2">
                            <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-200 rounded w-full"></div>
                            <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                        </div>

                        {/* Floating Button Preview */}
                        {localSettings.auto_inject && (
                            <div 
                                className={`absolute border-2 border-white shadow-lg flex items-center justify-center text-white text-xs nightly-button-${localSettings.floating_button_style || 'rounded'} nightly-button-${localSettings.floating_button_size || 'medium'}`}
                                style={{
                                    backgroundColor: localSettings.floating_bg_color || '#333333',
                                    color: localSettings.floating_icon_color || '#ffffff',
                                    borderColor: localSettings.floating_border_color || 'transparent',
                                    borderWidth: `${localSettings.floating_border_width || 0}px`,
                                    borderRadius: localSettings.floating_button_style === 'circle' ? '50%' : 
                                               localSettings.floating_button_style === 'pill' ? '50px' : 
                                               localSettings.floating_button_style === 'square' ? '0' : '8px',
                                    width: localSettings.floating_width || '3.5rem',
                                    height: localSettings.floating_height || '3.5rem',
                                    fontSize: `${localSettings.floating_icon_size || 24}px`,
                                    padding: `${localSettings.floating_padding_top || 12}px ${localSettings.floating_padding_right || 16}px ${localSettings.floating_padding_bottom || 12}px ${localSettings.floating_padding_left || 16}px`,
                                    boxShadow: localSettings.floating_box_shadow || '0 2px 4px rgba(0,0,0,0.1)',
                                    bottom: localSettings.floating_position?.includes('top') ? 'auto' : '8px',
                                    right: localSettings.floating_position?.includes('left') ? 'auto' : '8px',
                                    left: localSettings.floating_position?.includes('left') ? '8px' : 'auto',
                                    top: localSettings.floating_position?.includes('top') ? '8px' : 'auto',
                                }}
                            >
                                {localSettings.floating_icon_type === 'custom' 
                                    ? (localSettings.floating_custom_icon || '🌙')
                                    : localSettings.floating_icon_type === 'sun' 
                                        ? '☀️' 
                                        : localSettings.floating_icon_type === 'sun-moon'
                                            ? (localSettings.mode === 'auto' ? '☀️' : '🌙') // Show sun for auto mode, moon for manual
                                            : '🌙'
                                }
                            </div>
                        )}
                    </div>

                    {/* Preview Info */}
                    <div className="mt-4 space-y-2">
                        {localSettings.auto_inject ? (
                            <>
                                <div className="text-sm text-gray-600">
                                    <strong>{__('Position:', 'nightly')}</strong> {localSettings.floating_position || 'bottom-right'}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <strong>{__('Style:', 'nightly')}</strong> {localSettings.floating_button_style || 'rounded'}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <strong>{__('Size:', 'nightly')}</strong> {localSettings.floating_button_size || 'medium'}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <strong>{__('Icon:', 'nightly')}</strong> {localSettings.floating_icon_type || 'moon'}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <strong>{__('Background:', 'nightly')}</strong> 
                                    <span className="ml-2 inline-flex items-center space-x-1">
                                        <div 
                                            className="w-3 h-3 rounded border"
                                            style={{ backgroundColor: localSettings.floating_bg_color || '#333333' }}
                                        ></div>
                                        <code className="text-xs">{localSettings.floating_bg_color || '#333333'}</code>
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <strong>{__('Dimensions:', 'nightly')}</strong> {localSettings.floating_width || '3.5rem'} × {localSettings.floating_height || '3.5rem'}
                                </div>
                            </>
                        ) : (
                            <div className="text-sm text-gray-500 italic">
                                {__('Enable floating toggle to see preview', 'nightly')}
                            </div>
                        )}
                        <div className="text-sm text-gray-600">
                            <strong>{__('Mode:', 'nightly')}</strong> {localSettings.mode === 'auto' ? __('Auto Mode', 'nightly') : __('Custom Mode', 'nightly')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPanel;
