import { __ } from '@wordpress/i18n';

const PreviewPanel = ({ localSettings }) => {
    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-sm shadow-sm border border-gray-200 sticky top-6">
                <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                        {__('Preview', 'nightly')}
                    </h3>
                </div>
                <div className="p-4">
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
                                className="absolute w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs"
                                style={{
                                    backgroundColor: localSettings.floating_bg_color || '#333333',
                                    bottom: '8px',
                                    right: localSettings.floating_position?.includes('left') ? 'auto' : '8px',
                                    left: localSettings.floating_position?.includes('left') ? '8px' : 'auto',
                                    top: localSettings.floating_position?.includes('top') ? '8px' : 'auto',
                                }}
                            >
                                🌙
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
                                    <strong>{__('Color:', 'nightly')}</strong> 
                                    <span className="ml-2 inline-flex items-center space-x-1">
                                        <div 
                                            className="w-3 h-3 rounded border"
                                            style={{ backgroundColor: localSettings.floating_bg_color || '#333333' }}
                                        ></div>
                                        <code className="text-xs">{localSettings.floating_bg_color || '#333333'}</code>
                                    </span>
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
