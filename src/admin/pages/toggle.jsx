import { Switch } from '../components/ui/switch';
import { Select } from '../components/ui/select';
import { cn } from '../lib/utils';

const FormField = ({ label, children, helper }) => (
	<div className="space-y-2">
		{label && <label className="block text-sm font-medium text-gray-900">{label}</label>}
		{children}
		{helper && <p className="text-xs text-gray-600">{helper}</p>}
	</div>
);

const ToggleDesignOption = ({ design, label, isSelected, onClick, disabled }) => {
	const designs = {
		classic: (
			<div className="w-full h-16 bg-gray-100 rounded-lg flex items-center justify-center">
				<div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shadow-sm">
					<svg width="16" height="16" viewBox="0 0 20 20" fill="white">
						<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
					</svg>
				</div>
			</div>
		),
		pill: (
			<div className="w-full h-16 bg-gray-100 rounded-lg flex items-center justify-center px-4">
				<div className="w-16 h-9 bg-gray-300 rounded-full relative p-0.5">
					<div className="absolute left-0.5 top-0.5 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center">
						<svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
							<circle cx="10" cy="10" r="4" />
						</svg>
					</div>
				</div>
			</div>
		),
		minimal: (
			<div className="w-full h-16 bg-gray-100 rounded-lg flex items-center justify-center">
				<div className="w-10 h-10 rounded-lg border border-gray-300 bg-transparent flex items-center justify-center">
					<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
						<circle cx="10" cy="10" r="3" />
						<path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.5 3.5l1.5 1.5M15 15l1.5 1.5M3.5 16.5l1.5-1.5M15 5l1.5-1.5" strokeLinecap="round" />
					</svg>
				</div>
			</div>
		),
	};

	return (
		<div className="flex flex-col gap-2.5">
			<button
				type="button"
				onClick={onClick}
				disabled={disabled}
				className={cn(
					'relative rounded-xl transition-all overflow-hidden transform hover:scale-[1.02]',
					isSelected
						? 'ring-2 ring-gray-900 ring-offset-2 shadow-lg'
						: 'ring-1 ring-gray-200 hover:ring-gray-300 shadow-sm',
					disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
				)}
			>
				{designs[design]}
			</button>
			<span className="text-xs text-gray-700 text-center font-medium">{label}</span>
		</div>
	);
};

const Toggle = ({ formState, setFormState }) => {
	const isDisabled = !formState.enabled;

	return (
		<div className={cn('space-y-6', isDisabled && 'opacity-50 pointer-events-none')}>
			<div className="flex items-center justify-between py-3 border-b border-gray-200">
				<div className="flex-1">
					<label className="text-sm font-medium text-gray-900">Show Toggle</label>
					<p className="text-xs text-gray-600 mt-1">Display a button for users to switch modes</p>
				</div>
				<Switch
					checked={formState.show_toggle}
					disabled={isDisabled}
					onCheckedChange={(checked) => setFormState((prev) => ({ ...prev, show_toggle: checked }))}
				/>
			</div>

			<FormField label="Toggle Design" helper="Choose a design style for the toggle button">
				<div className="grid grid-cols-3 gap-4">
					<ToggleDesignOption
						design="classic"
						label="Classic"
						isSelected={formState.toggle_style === 'classic'}
						onClick={() => setFormState((prev) => ({ ...prev, toggle_style: 'classic' }))}
						disabled={isDisabled}
					/>
					<ToggleDesignOption
						design="pill"
						label="Pill"
						isSelected={formState.toggle_style === 'pill'}
						onClick={() => setFormState((prev) => ({ ...prev, toggle_style: 'pill' }))}
						disabled={isDisabled}
					/>
					<ToggleDesignOption
						design="minimal"
						label="Minimal"
						isSelected={formState.toggle_style === 'minimal'}
						onClick={() => setFormState((prev) => ({ ...prev, toggle_style: 'minimal' }))}
						disabled={isDisabled}
					/>
				</div>
			</FormField>

			<FormField label="Position" helper="Where the toggle button appears on the page">
				<Select
					value={formState.toggle_position}
					onValueChange={(value) => setFormState((prev) => ({ ...prev, toggle_position: value }))}
					disabled={isDisabled}
					options={[
						{ value: 'bottom-right', label: 'Bottom Right' },
						{ value: 'bottom-left', label: 'Bottom Left' },
					]}
					className="w-full max-w-xs"
				/>
			</FormField>

			<FormField label="Size" helper="Size of the toggle button">
				<Select
					value={formState.toggle_size}
					onValueChange={(value) => setFormState((prev) => ({ ...prev, toggle_size: value }))}
					disabled={isDisabled}
					options={[
						{ value: 'xs', label: 'Extra Small' },
						{ value: 's', label: 'Small' },
						{ value: 'm', label: 'Medium' },
						{ value: 'l', label: 'Large' },
						{ value: 'xl', label: 'Extra Large' },
					]}
					className="w-full max-w-xs"
				/>
			</FormField>
		</div>
	);
};

export default Toggle;
