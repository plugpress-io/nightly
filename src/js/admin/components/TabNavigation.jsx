import { __ } from '@wordpress/i18n';

const TabNavigation = ({ activeTab, onTabChange, saving }) => {
    const tabs = [
        { id: 'general', label: __('General', 'nightly') },
        { id: 'design', label: __('Design', 'nightly') }
    ];

    return (
        <nav className="flex gap-2" aria-label="Tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    disabled={saving}
                    className={`${
                        activeTab === tab.id
                            ? 'bg-slate-200'
                            : ''
                    } px-3 py-1 font-medium text-base transition-colors duration-200 rounded-lg`}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
);
};

export default TabNavigation;
