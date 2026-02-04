import { createContext, useContext, useState } from 'react';
import { cn } from '../../lib/utils';

const TabsContext = createContext(null);

export const Tabs = ({ defaultValue, children, className }) => {
	const [activeTab, setActiveTab] = useState(defaultValue);

	return (
		<TabsContext.Provider value={{ activeTab, setActiveTab }}>
			<div className={className}>{children}</div>
		</TabsContext.Provider>
	);
};

export const TabsList = ({ children, className }) => {
	return (
		<div
			className={cn(
				'inline-flex h-10 items-center justify-start rounded-md bg-gray-100 p-1 gap-1 w-full',
				className
			)}
			role="tablist"
		>
			{children}
		</div>
	);
};

export const TabsTrigger = ({ value, children, className }) => {
	const { activeTab, setActiveTab } = useContext(TabsContext);
	const isActive = activeTab === value;

	return (
		<button
			type="button"
			role="tab"
			aria-selected={isActive}
			onClick={() => setActiveTab(value)}
			className={cn(
				'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 flex-1',
				'text-sm font-medium transition-all',
				'focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2',
				isActive
					? 'bg-white text-gray-900 shadow-sm'
					: 'text-gray-600 hover:text-gray-900',
				className
			)}
		>
			{children}
		</button>
	);
};

export const TabsContent = ({ value, children, className }) => {
	const { activeTab } = useContext(TabsContext);

	if (activeTab !== value) return null;

	return (
		<div className={cn('mt-6', className)} role="tabpanel">
			{children}
		</div>
	);
};
