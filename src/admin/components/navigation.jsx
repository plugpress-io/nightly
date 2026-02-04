import { cn } from '../lib/utils';

const Navigation = ({ activeTab, onTabChange }) => {
	const tabs = [
		{ id: 'general', label: 'General' },
		{ id: 'toggle', label: 'Toggle' },
		{ id: 'appearance', label: 'Appearance' },
		{ id: 'advanced', label: 'Advanced' },
	];

	return (
		<nav className="flex gap-2 mb-4">
			{tabs.map((tab) => (
				<button
					key={tab.id}
					onClick={() => onTabChange(tab.id)}
					className={cn(
						'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
						activeTab === tab.id
							? 'bg-gray-200 text-gray-900'
							: 'bg-transparent text-gray-600 hover:text-gray-900'
					)}
				>
					{tab.label}
				</button>
			))}
		</nav>
	);
};

export default Navigation;
