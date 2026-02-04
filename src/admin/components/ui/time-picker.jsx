import { cn } from '../../lib/utils';

export const TimePicker = ({ label, value, onChange, disabled, className }) => {
	return (
		<div className={cn('flex flex-col gap-2', className)}>
			{label && (
				<label className="text-sm font-medium text-gray-900">{label}</label>
			)}
			<input
				type="time"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				disabled={disabled}
				className={cn(
					'px-3 py-2 border border-gray-300 rounded-lg text-sm',
					'focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent',
					'disabled:opacity-50 disabled:cursor-not-allowed',
					'w-full max-w-xs'
				)}
			/>
		</div>
	);
};
