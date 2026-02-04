import * as React from 'react';
import { cn } from '../../lib/utils';

const Select = React.forwardRef(({ className, value, onValueChange, options, children, ...props }, ref) => {
	// Support both options prop and children
	const content = options ? (
		options.map((option) => (
			<option key={option.value} value={option.value}>
				{option.label}
			</option>
		))
	) : children;

	return (
		<select
			ref={ref}
			value={value}
			onChange={(e) => onValueChange?.(e.target.value)}
			className={cn(
				'flex h-10 w-auto rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900',
				'focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2',
				'disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		>
			{content}
		</select>
	);
});

Select.displayName = 'Select';

export { Select };
