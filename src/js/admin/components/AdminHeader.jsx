import { __ } from '@wordpress/i18n';

const AdminHeader = () => {
    return (
        <div className="w-full bg-white border-b border-gray-200">
            <div className="mx-auto flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-gray-900">Nightly</span>
                </div>
                <div className="flex items-center gap-6">
                    {/* <a
                        href="https://plugpress.io/docs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        {__('Docs', 'nightly')}
                    </a>
                    <a
                        href="https://plugpress.io/support/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        {__('Support', 'nightly')}
                    </a> */}
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;