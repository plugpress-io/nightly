import * as React from 'react';
import { cn } from '../../lib/utils';

const Slider = React.forwardRef(({ className, min = 0, max = 100, value, onValueChange, ...props }, ref) => (
	<input
		ref={ref}
		type="range"
		min={min}
		max={max}
		value={value}
		onChange={(e) => onValueChange?.(parseInt(e.target.value))}
		className={cn(
			'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900',
			'focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2',
			'disabled:opacity-50 disabled:cursor-not-allowed',
			className
		)}
		{...props}
	/>
));

Slider.displayName = 'Slider';

export { Slider };
