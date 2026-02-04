import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Slider } from '../components/ui/slider';
import { Textarea } from '../components/ui/textarea';
import { cn } from '../lib/utils';

const FormField = ({ label, children, helper }) => (
	<div className="space-y-2">
		{label && <label className="block text-sm font-medium text-gray-900">{label}</label>}
		{children}
		{helper && <p className="text-xs text-gray-600">{helper}</p>}
	</div>
);

const ThemeCard = ({ theme, isSelected, onClick, disabled }) => {
	const themes = {
		classic: {
			label: 'Classic',
			description: 'Standard dark mode - Balanced neutral tones',
			preview: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
		},
		cool: {
			label: 'Cool',
			description: 'Blue-tinted - Easy on the eyes, reduced eye strain',
			preview: 'linear-gradient(135deg, #1a2332 0%, #0d1117 100%)',
		},
		warm: {
			label: 'Warm',
			description: 'Sepia tones - Reduced blue light for night reading',
			preview: 'linear-gradient(135deg, #2d2318 0%, #1a1410 100%)',
		},
		'high-contrast': {
			label: 'High Contrast',
			description: 'Maximum readability - WCAG AAA accessibility',
			preview: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
		},
		'pure-black': {
			label: 'Pure Black',
			description: 'True black background - Battery saving for OLED',
			preview: 'linear-gradient(135deg, #000000 0%, #000000 100%)',
		},
		custom: {
			label: 'Custom',
			description: 'Define your own color palette',
			preview: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
		},
	};

	const config = themes[theme];

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			title={`${config.label} - ${config.description}`}
			className={cn(
				'group relative rounded-lg overflow-hidden transition-all aspect-square',
				'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2',
				isSelected
					? 'ring-3 ring-gray-900 ring-offset-2 shadow-lg scale-105'
					: 'ring-1 ring-gray-200 hover:ring-gray-300 shadow-sm',
				disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
			)}
		>
			<div
				className="w-full h-full"
				style={{ background: config.preview }}
			/>
			{isSelected && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/20">
					<svg className="w-8 h-8 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
					</svg>
				</div>
			)}
			<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
				<p className="text-xs font-medium text-white text-center">{config.label}</p>
			</div>
		</button>
	);
};

const ColorInput = ({ label, value, onChange, disabled }) => {
	// Ensure value is a valid hex color for the color picker
	const normalizedValue = value?.startsWith('#') ? value : `#${value || '000000'}`;

	return (
		<div className="flex items-center gap-3">
			<div className="flex-1">
				<label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
				<div className="flex gap-2">
					<Input
						type="text"
						value={value || ''}
						onChange={(e) => onChange(e.target.value)}
						disabled={disabled}
						placeholder="#000000"
						className="flex-1 font-mono text-sm"
					/>
					<div className="relative">
						<input
							type="color"
							value={normalizedValue}
							onChange={(e) => onChange(e.target.value)}
							disabled={disabled}
							className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							title={`Pick ${label.toLowerCase()}`}
						/>
						<div
							className={cn(
								"w-12 h-full rounded border-2 flex-shrink-0 cursor-pointer transition-all",
								disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'
							)}
							style={{
								backgroundColor: value || '#000000',
								borderColor: value ? '#d1d5db' : '#e5e7eb'
							}}
							title="Click to pick color"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const Appearance = ({ formState, setFormState }) => {
	const isDisabled = !formState.enabled;
	const [touchedExclude, setTouchedExclude] = useState(false);
	const selectorPattern = /^[^<>]*$/;

	const excludeSelectorsError =
		formState.exclude_selectors.trim().length > 0 &&
		!selectorPattern.test(formState.exclude_selectors.trim());

	return (
		<div className={cn('space-y-8', isDisabled && 'opacity-50 pointer-events-none')}>
			{/* Color Scheme Selection */}
			<div>
				<FormField
					label="Color Scheme"
					helper="Hover over each theme to see its name"
				>
					<div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
						<ThemeCard
							theme="classic"
							isSelected={formState.theme === 'classic'}
							onClick={() => setFormState((prev) => ({ ...prev, theme: 'classic' }))}
							disabled={isDisabled}
						/>
						<ThemeCard
							theme="cool"
							isSelected={formState.theme === 'cool'}
							onClick={() => setFormState((prev) => ({ ...prev, theme: 'cool' }))}
							disabled={isDisabled}
						/>
						<ThemeCard
							theme="warm"
							isSelected={formState.theme === 'warm'}
							onClick={() => setFormState((prev) => ({ ...prev, theme: 'warm' }))}
							disabled={isDisabled}
						/>
						<ThemeCard
							theme="high-contrast"
							isSelected={formState.theme === 'high-contrast'}
							onClick={() => setFormState((prev) => ({ ...prev, theme: 'high-contrast' }))}
							disabled={isDisabled}
						/>
						<ThemeCard
							theme="pure-black"
							isSelected={formState.theme === 'pure-black'}
							onClick={() => setFormState((prev) => ({ ...prev, theme: 'pure-black' }))}
							disabled={isDisabled}
						/>
						<ThemeCard
							theme="custom"
							isSelected={formState.theme === 'custom'}
							onClick={() => setFormState((prev) => ({ ...prev, theme: 'custom' }))}
							disabled={isDisabled}
						/>
					</div>
				</FormField>
			</div>

			{/* Custom Theme Colors */}
			{formState.theme === 'custom' && (
				<div className="border-t border-gray-200 pt-6">
					<h3 className="text-sm font-semibold text-gray-900 mb-4">Custom Color Palette</h3>
					<p className="text-xs text-gray-600 mb-4">
						Define your own colors for the custom dark mode theme. Use hex color codes.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<ColorInput
							label="Primary Background"
							value={formState.custom_colors?.bg_primary}
							onChange={(value) =>
								setFormState((prev) => ({
									...prev,
									custom_colors: { ...prev.custom_colors, bg_primary: value },
								}))
							}
							disabled={isDisabled}
						/>
						<ColorInput
							label="Secondary Background"
							value={formState.custom_colors?.bg_secondary}
							onChange={(value) =>
								setFormState((prev) => ({
									...prev,
									custom_colors: { ...prev.custom_colors, bg_secondary: value },
								}))
							}
							disabled={isDisabled}
						/>
						<ColorInput
							label="Primary Text"
							value={formState.custom_colors?.text_primary}
							onChange={(value) =>
								setFormState((prev) => ({
									...prev,
									custom_colors: { ...prev.custom_colors, text_primary: value },
								}))
							}
							disabled={isDisabled}
						/>
						<ColorInput
							label="Secondary Text"
							value={formState.custom_colors?.text_secondary}
							onChange={(value) =>
								setFormState((prev) => ({
									...prev,
									custom_colors: { ...prev.custom_colors, text_secondary: value },
								}))
							}
							disabled={isDisabled}
						/>
						<ColorInput
							label="Border"
							value={formState.custom_colors?.border}
							onChange={(value) =>
								setFormState((prev) => ({
									...prev,
									custom_colors: { ...prev.custom_colors, border: value },
								}))
							}
							disabled={isDisabled}
						/>
						<ColorInput
							label="Accent"
							value={formState.custom_colors?.accent}
							onChange={(value) =>
								setFormState((prev) => ({
									...prev,
									custom_colors: { ...prev.custom_colors, accent: value },
								}))
							}
							disabled={isDisabled}
						/>
					</div>
				</div>
			)}

			{/* Universal Filter Settings */}
			<div className="border-t border-gray-200 pt-6">
				<h3 className="text-sm font-semibold text-gray-900 mb-4">Universal Filter Settings</h3>
				<p className="text-xs text-gray-600 mb-4">
					These filters apply globally to all content in dark mode. Adjust to fine-tune the appearance.
				</p>

				<div className="space-y-4">
					<FormField
						label="Brightness"
						helper="Adjust the overall brightness of dark mode (50-150%)"
					>
						<div className="flex items-center gap-4">
							<Slider
								min={50}
								max={150}
								step={5}
								value={formState.brightness}
								disabled={isDisabled}
								onValueChange={(value) => setFormState((prev) => ({ ...prev, brightness: value }))}
								className="flex-1"
							/>
							<span className="text-sm font-medium text-gray-900 w-14 text-right tabular-nums">
								{formState.brightness}%
							</span>
						</div>
					</FormField>

					<FormField
						label="Contrast"
						helper="Adjust the contrast levels (50-150%)"
					>
						<div className="flex items-center gap-4">
							<Slider
								min={50}
								max={150}
								step={5}
								value={formState.contrast}
								disabled={isDisabled}
								onValueChange={(value) => setFormState((prev) => ({ ...prev, contrast: value }))}
								className="flex-1"
							/>
							<span className="text-sm font-medium text-gray-900 w-14 text-right tabular-nums">
								{formState.contrast}%
							</span>
						</div>
					</FormField>

					<FormField
						label="Sepia"
						helper="Add a warm sepia tone to reduce blue light (0-100%)"
					>
						<div className="flex items-center gap-4">
							<Slider
								min={0}
								max={100}
								step={5}
								value={formState.sepia}
								disabled={isDisabled}
								onValueChange={(value) => setFormState((prev) => ({ ...prev, sepia: value }))}
								className="flex-1"
							/>
							<span className="text-sm font-medium text-gray-900 w-14 text-right tabular-nums">
								{formState.sepia}%
							</span>
						</div>
					</FormField>

					<FormField
						label="Exclude Selectors"
						helper="CSS selectors to exclude from dark mode inversion (e.g., .site-logo, .hero img)"
					>
						<Textarea
							id="nightly-exclude-selectors"
							placeholder=".site-logo, .hero img, #banner"
							value={formState.exclude_selectors}
							disabled={isDisabled}
							onBlur={() => setTouchedExclude(true)}
							onChange={(event) =>
								setFormState((prev) => ({ ...prev, exclude_selectors: event.target.value }))
							}
							rows={3}
							className="w-full font-mono text-xs"
						/>
						{touchedExclude && excludeSelectorsError && (
							<p className="text-xs text-red-600 mt-1">
								Invalid selector syntax
							</p>
						)}
					</FormField>
				</div>
			</div>
		</div>
	);
};

export default Appearance;
