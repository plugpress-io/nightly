import * as React from 'react';
import { cn } from '../../lib/utils';

const Switch = React.forwardRef(({ className, checked, onCheckedChange, disabled, ...props }, ref) => (
	<button
		ref={ref}
		type="button"
		role="switch"
		aria-checked={checked}
		disabled={disabled}
		onClick={() => onCheckedChange?.(!checked)}
		className={cn(
			'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
			'focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2',
			'disabled:opacity-50 disabled:cursor-not-allowed',
			checked ? 'bg-gray-900' : 'bg-gray-200',
			className
		)}
		{...props}
	>
		<span
			className={cn(
				'inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm',
				checked ? 'translate-x-6' : 'translate-x-1'
			)}
		/>
	</button>
));

Switch.displayName = 'Switch';

export { Switch };
