import { useState } from 'react';
import { cn } from '../lib/utils';
import { SunIcon, SunIconOutline, MoonIcon } from './icons';

const Preview = ({ settings }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const togglePosition = settings?.toggle_position || 'bottom-right';
	const toggleStyle = settings?.toggle_style || 'classic';
	const toggleSize = settings?.toggle_size || 'm';
	const showToggle = settings?.show_toggle ?? true;
	const theme = settings?.theme || 'classic';
	const brightness = settings?.brightness ?? 0;
	const contrast = settings?.contrast ?? 0;
	const sepia = settings?.sepia ?? 0;
	const grayscale = settings?.grayscale ?? 0;
	const transitionEnabled = settings?.transition_enabled ?? true;
	const transitionDuration = settings?.transition_duration || 300;

	// Build filter string based on theme
	const getFilters = () => {
		if (!isDarkMode) return '';

		// Theme-specific filters
		const themeFilters = {
			classic: `invert(1) hue-rotate(180deg)`,
			cool: `invert(1) hue-rotate(200deg) saturate(0.7) brightness(92%)`,
			warm: `invert(1) hue-rotate(160deg) sepia(25%) saturate(1.1) brightness(98%)`,
			'high-contrast': `invert(1) hue-rotate(180deg) contrast(140%) saturate(1.4) brightness(105%)`,
			'pure-black': `invert(1) hue-rotate(180deg) brightness(75%) contrast(130%) saturate(0.9)`,
			custom: `invert(1) hue-rotate(180deg)`
		};

		let baseFilter = themeFilters[theme] || themeFilters.classic;

		// Add custom filters (only if non-zero)
		const customFilters = [];
		if (brightness !== 0) customFilters.push(`brightness(${100 + brightness}%)`);
		if (contrast !== 0) customFilters.push(`contrast(${100 + contrast}%)`);
		if (sepia !== 0) customFilters.push(`sepia(${sepia}%)`);
		if (grayscale !== 0) customFilters.push(`grayscale(${grayscale}%)`);

		if (customFilters.length > 0) {
			const filterParts = ['invert(1)', 'hue-rotate(180deg)', ...customFilters];
			baseFilter = filterParts.join(' ');
		}

		return baseFilter;
	};

	// Size mapping (matching CSS custom properties)
	const sizeMap = {
		xs: { size: 28, icon: 12, padding: 6, radius: 7 },
		s: { size: 34, icon: 15, padding: 8, radius: 8.5 },
		m: { size: 40, icon: 18, padding: 10, radius: 10 },
		l: { size: 48, icon: 22, padding: 12, radius: 12 },
		xl: { size: 56, icon: 26, padding: 14, radius: 14 },
	};

	const size = sizeMap[toggleSize];

	// Get theme-specific background color
	const getThemeBackground = () => {
		if (!isDarkMode) return '#ffffff';

		const themeBackgrounds = {
			classic: '#0a0a0a',
			cool: '#0d1117',
			warm: '#1a1410',
			'high-contrast': '#000000',
			'pure-black': '#000000',
			custom: settings?.custom_colors?.bg_primary || '#000000'
		};

		return themeBackgrounds[theme] || themeBackgrounds.classic;
	};

	// Render toggle based on style
	const renderToggle = () => {
		const baseClasses = cn(
			'absolute cursor-pointer hover:scale-105 active:scale-95',
			transitionEnabled && 'transition-all',
			togglePosition === 'bottom-right' && 'bottom-5 right-5',
			togglePosition === 'bottom-left' && 'bottom-5 left-5'
		);

		const handleClick = () => setIsDarkMode(!isDarkMode);

		if (toggleStyle === 'classic') {
			return (
				<button
					onClick={handleClick}
					className={cn(baseClasses, 'rounded-full flex items-center justify-center border-0')}
					style={{
						width: size.size,
						height: size.size,
						background: isDarkMode ? '#f9fafb' : '#1f2937',
						boxShadow: isDarkMode ? '0 1px 3px rgba(0, 0, 0, 0.08)' : '0 1px 3px rgba(0, 0, 0, 0.12)',
						transitionDuration: transitionEnabled ? `${transitionDuration}ms` : '0ms'
					}}
				>
					{isDarkMode ? (
						<MoonIcon
							width={size.icon}
							height={size.icon}
							fill="#6366f1"
						/>
					) : (
						<SunIcon
							width={size.icon}
							height={size.icon}
							fill="#fbbf24"
						/>
					)}
				</button>
			);
		}

		if (toggleStyle === 'pill') {
			const pillWidth = size.size * 1.75;
			const thumbSize = size.size - 6;
			return (
				<button
					onClick={handleClick}
					className={cn(baseClasses, 'rounded-full border-0')}
					style={{
						width: pillWidth,
						height: size.size,
						background: isDarkMode ? '#4f46e5' : '#e5e7eb',
						padding: 3,
						transitionDuration: transitionEnabled ? `${transitionDuration}ms` : '0ms'
					}}
				>
					<div
						className={cn(
							'absolute bg-white rounded-full flex items-center justify-center'
						)}
						style={{
							width: thumbSize,
							height: thumbSize,
							top: 3,
							left: isDarkMode ? `calc(100% - ${thumbSize + 3}px)` : 3,
							boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
							transition: transitionEnabled ? `all ${transitionDuration}ms ease` : 'none'
						}}
					>
						{isDarkMode ? (
							<MoonIcon
								width={size.icon}
								height={size.icon}
								fill="#6366f1"
							/>
						) : (
							<SunIcon
								width={size.icon}
								height={size.icon}
								fill="#111827"
							/>
						)}
					</div>
				</button>
			);
		}

		if (toggleStyle === 'minimal') {
			return (
				<button
					onClick={handleClick}
					className={cn(baseClasses, 'flex items-center justify-center bg-transparent')}
					style={{
						width: size.size,
						height: size.size,
						borderRadius: '50%',
						border: `2px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`,
						transitionDuration: transitionEnabled ? `${transitionDuration}ms` : '0ms'
					}}
				>
					{isDarkMode ? (
						<MoonIcon
							width={size.icon}
							height={size.icon}
							fill="#9ca3af"
						/>
					) : (
						<SunIconOutline
							width={size.icon}
							height={size.icon}
							stroke="#6b7280"
						/>
					)}
				</button>
			);
		}
	};

	return (
		<div className="sticky top-8">
			<div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
				{/* Simple header */}
				<div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center justify-between">
					<h3 className="text-xs font-medium text-gray-500">LIVE PREVIEW</h3>
					<button
						onClick={() => setIsDarkMode(!isDarkMode)}
						className="text-xs text-gray-600 hover:text-gray-900 font-medium px-2 py-1 rounded hover:bg-gray-100 transition-colors"
					>
						{isDarkMode ? 'Light Mode' : 'Dark Mode'}
					</button>
				</div>

				{/* Preview area with filters applied */}
				<div
					className={cn('relative h-[320px]')}
					style={{
						filter: getFilters(),
						backgroundColor: getThemeBackground(),
						transition: transitionEnabled ? `all ${transitionDuration}ms ease` : 'none'
					}}
				>
					{/* Content lines */}
					<div className="p-6 space-y-3">
						<div className={cn(
							'h-4 w-32 rounded',
							isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
						)} />
						<div className={cn(
							'h-3 w-full rounded',
							isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
						)} />
						<div className={cn(
							'h-3 w-5/6 rounded',
							isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
						)} />
						<div className={cn(
							'h-3 w-4/6 rounded',
							isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
						)} />
					</div>

					{/* Toggle button - re-inverted to show correctly */}
					{showToggle && (
						<div style={{ filter: isDarkMode ? 'invert(1) hue-rotate(180deg)' : 'none' }}>
							{renderToggle()}
						</div>
					)}
				</div>
			</div>

			{/* Info text */}
			<p className="text-xs text-gray-500 mt-3 leading-relaxed">
				{showToggle
					? `${toggleStyle.charAt(0).toUpperCase() + toggleStyle.slice(1)} toggle (${toggleSize.toUpperCase()}) appears ${togglePosition.replace('-', ' ')}. Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1).replace('-', ' ')}.`
					: 'Toggle button is hidden.'}
				{transitionEnabled && ` Transitions: ${transitionDuration}ms.`}
			</p>
		</div>
	);
};

export default Preview;
