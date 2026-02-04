import { Switch } from '../components/ui/switch';
import { Select } from '../components/ui/select';
import { cn } from '../lib/utils';
import { SunIcon, SunIconOutline } from '../components/icons';

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
					<SunIcon width={16} height={16} fill="white" />
				</div>
			</div>
		),
		pill: (
			<div className="w-full h-16 bg-gray-100 rounded-lg flex items-center justify-center px-4">
				<div className="w-16 h-9 bg-gray-300 rounded-full relative p-0.5">
					<div className="absolute left-0.5 top-0.5 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center">
						<SunIcon width={16} height={16} fill="gray" />
					</div>
				</div>
			</div>
		),
		minimal: (
			<div className="w-full h-16 bg-gray-100 rounded-lg flex items-center justify-center">
				<div className="w-10 h-10 rounded-lg border border-gray-300 bg-transparent flex items-center justify-center">
					<SunIconOutline width={16} height={16} />
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
