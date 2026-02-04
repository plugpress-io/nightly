import { Switch } from '../components/ui/switch';
import { Select } from '../components/ui/select';
import { TimePicker } from '../components/ui/time-picker';
import { cn } from '../lib/utils';

const FormField = ({ label, children, helper }) => (
	<div className="space-y-2">
		{label && <label className="block text-sm font-medium text-gray-900">{label}</label>}
		{children}
		{helper && <p className="text-xs text-gray-600">{helper}</p>}
	</div>
);

const General = ({ formState, setFormState }) => {
	const isDisabled = !formState.enabled;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between py-3 border-b border-gray-200">
				<div className="flex-1">
					<label className="text-sm font-medium text-gray-900">Enable Dark Mode</label>
					<p className="text-xs text-gray-600 mt-1">Activate universal dark mode for your site</p>
				</div>
				<Switch
					checked={formState.enabled}
					onCheckedChange={(checked) => setFormState((prev) => ({ ...prev, enabled: checked }))}
				/>
			</div>

			<FormField
				label="Default Mode"
				helper="The initial dark mode state when a user visits your site"
			>
				<Select
					value={formState.default_mode}
					onValueChange={(value) => setFormState((prev) => ({ ...prev, default_mode: value }))}
					disabled={isDisabled}
					options={[
						{ value: 'system', label: 'System Preference' },
						{ value: 'dark', label: 'Always Dark' },
						{ value: 'light', label: 'Always Light' },
					]}
					className="w-full max-w-xs"
				/>
			</FormField>

			<div className={cn('border-t border-gray-200 pt-6', isDisabled && 'opacity-50 pointer-events-none')}>
				<h3 className="text-sm font-semibold text-gray-900 mb-4">Automatic Scheduling</h3>

				<div className="flex items-center justify-between py-3 mb-4">
					<div className="flex-1">
						<label className="text-sm font-medium text-gray-900">Enable Schedule</label>
						<p className="text-xs text-gray-600 mt-1">Automatically enable dark mode during specific hours</p>
					</div>
					<Switch
						checked={formState.schedule_enabled}
						disabled={isDisabled}
						onCheckedChange={(checked) => setFormState((prev) => ({ ...prev, schedule_enabled: checked }))}
					/>
				</div>

				{formState.schedule_enabled && (
					<div className="space-y-4 pl-4 border-l-2 border-gray-200">
						<TimePicker
							label="Start Time"
							value={formState.schedule_start}
							onChange={(value) => setFormState((prev) => ({ ...prev, schedule_start: value }))}
							disabled={isDisabled}
						/>
						<TimePicker
							label="End Time"
							value={formState.schedule_end}
							onChange={(value) => setFormState((prev) => ({ ...prev, schedule_end: value }))}
							disabled={isDisabled}
						/>
						<p className="text-xs text-gray-500">
							Dark mode will automatically enable from {formState.schedule_start} to {formState.schedule_end}.
							User manual toggles will override the schedule.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default General;
