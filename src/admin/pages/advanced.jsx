import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { Input } from '../components/ui/input';
import { cn } from '../lib/utils';

const FormField = ({ label, children, helper }) => (
	<div className="space-y-2">
		{label && <label className="block text-sm font-medium text-gray-900">{label}</label>}
		{children}
		{helper && <p className="text-xs text-gray-600">{helper}</p>}
	</div>
);

const Advanced = ({ formState, setFormState }) => {
	const isDisabled = !formState.enabled;

	return (
		<div className={cn('space-y-6', isDisabled && 'opacity-50 pointer-events-none')}>
			{/* Smooth Transitions */}
			<div className="border-b border-gray-200 pb-6">
				<h3 className="text-sm font-semibold text-gray-900 mb-4">Smooth Transitions</h3>

				<div className="flex items-center justify-between py-3">
					<div className="flex-1">
						<label className="text-sm font-medium text-gray-900">Enable Transitions</label>
						<p className="text-xs text-gray-600 mt-1">Animated fade when switching modes</p>
					</div>
					<Switch
						checked={formState.transition_enabled}
						disabled={isDisabled}
						onCheckedChange={(checked) => setFormState((prev) => ({ ...prev, transition_enabled: checked }))}
					/>
				</div>

				{formState.transition_enabled && (
					<FormField
						label="Transition Duration"
						helper="Duration of the fade animation (0-1000ms)"
					>
						<div className="flex items-center gap-4">
							<Slider
								min={0}
								max={1000}
								step={50}
								value={formState.transition_duration}
								disabled={isDisabled}
								onValueChange={(value) => setFormState((prev) => ({ ...prev, transition_duration: value }))}
								className="flex-1"
							/>
							<span className="text-sm font-medium text-gray-900 w-14 text-right tabular-nums">
								{formState.transition_duration}ms
							</span>
						</div>
					</FormField>
				)}
			</div>

			{/* Media Brightness */}
			<div className="border-b border-gray-200 pb-6">
				<h3 className="text-sm font-semibold text-gray-900 mb-4">Media Brightness</h3>
				<p className="text-xs text-gray-600 mb-4">Adjust brightness for different media types independently</p>

				<div className="space-y-4">
					<FormField
						label="Images"
						helper="Brightness of images in dark mode (50-150%)"
					>
						<div className="flex items-center gap-4">
							<Slider
								min={50}
								max={150}
								step={5}
								value={formState.image_brightness}
								disabled={isDisabled}
								onValueChange={(value) => setFormState((prev) => ({ ...prev, image_brightness: value }))}
								className="flex-1"
							/>
							<span className="text-sm font-medium text-gray-900 w-14 text-right tabular-nums">
								{formState.image_brightness}%
							</span>
						</div>
					</FormField>

					<FormField
						label="Videos"
						helper="Brightness of videos in dark mode (50-150%)"
					>
						<div className="flex items-center gap-4">
							<Slider
								min={50}
								max={150}
								step={5}
								value={formState.video_brightness}
								disabled={isDisabled}
								onValueChange={(value) => setFormState((prev) => ({ ...prev, video_brightness: value }))}
								className="flex-1"
							/>
							<span className="text-sm font-medium text-gray-900 w-14 text-right tabular-nums">
								{formState.video_brightness}%
							</span>
						</div>
					</FormField>

					<FormField
						label="Background Images"
						helper="Brightness of background images in dark mode (50-150%)"
					>
						<div className="flex items-center gap-4">
							<Slider
								min={50}
								max={150}
								step={5}
								value={formState.background_brightness}
								disabled={isDisabled}
								onValueChange={(value) => setFormState((prev) => ({ ...prev, background_brightness: value }))}
								className="flex-1"
							/>
							<span className="text-sm font-medium text-gray-900 w-14 text-right tabular-nums">
								{formState.background_brightness}%
							</span>
						</div>
					</FormField>
				</div>
			</div>

			{/* Keyboard Shortcuts */}
			<div className="border-b border-gray-200 pb-6">
				<h3 className="text-sm font-semibold text-gray-900 mb-4">Keyboard Shortcut</h3>

				<div className="flex items-center justify-between py-3 mb-4">
					<div className="flex-1">
						<label className="text-sm font-medium text-gray-900">Enable Keyboard Shortcut</label>
						<p className="text-xs text-gray-600 mt-1">Toggle dark mode with keyboard</p>
					</div>
					<Switch
						checked={formState.keyboard_enabled}
						disabled={isDisabled}
						onCheckedChange={(checked) => setFormState((prev) => ({ ...prev, keyboard_enabled: checked }))}
					/>
				</div>

				{formState.keyboard_enabled && (
					<FormField
						label="Shortcut Key"
						helper="Format: Ctrl+Shift+D, Meta+K, Alt+D, etc."
					>
						<Input
							type="text"
							value={formState.keyboard_shortcut}
							disabled={isDisabled}
							onChange={(e) => setFormState((prev) => ({ ...prev, keyboard_shortcut: e.target.value }))}
							placeholder="Ctrl+Shift+D"
							className="w-full max-w-xs font-mono"
						/>
					</FormField>
				)}
			</div>
		</div>
	);
};

export default Advanced;
