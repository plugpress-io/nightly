import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

/**
 * Block Edit Component
 */
export default function Edit({ attributes, setAttributes }) {
	const [previewTheme, setPreviewTheme] = useState('light');
	const [previewMode, setPreviewMode] = useState(attributes.mode || 'dark');

	const blockProps = useBlockProps({
		className: 'nightly-toggle-block',
		'data-nightly-theme': previewTheme,
		'data-nightly-mode': previewMode,
	});

	// Handle preview toggle
	const handlePreviewToggle = () => {
		setPreviewTheme(previewTheme === 'light' ? 'dark' : 'light');
	};

	// Handle mode change
	const handleModeChange = (newMode) => {
		setPreviewMode(newMode);
		setAttributes({ mode: newMode });
	};

	// Handle toggle type change
	const handleToggleTypeChange = (newType) => {
		setAttributes({ toggleType: newType });
	};

	// Handle show text change
	const handleShowTextChange = (showText) => {
		setAttributes({ showText });
	};

	// Create preview button
	const createPreviewButton = () => {
		const buttonClass = `nightly-toggle-button ${
			attributes.showText ? 'with-text' : 'switch-only'
		}`;

		return (
			<button
				type="button"
				className={buttonClass}
				onClick={handlePreviewToggle}
				aria-pressed={previewTheme === 'dark' ? 'true' : 'false'}
				aria-label={
					attributes.toggleType === 'theme'
						? __('Toggle between light and dark theme', 'nightly')
						: __('Toggle between reader and dark mode', 'nightly')
				}
			>
				<span
					className={`nightly-toggle-switch ${
						previewTheme === 'dark' ? 'is-checked' : ''
					}`}
					aria-hidden="true"
				>
					<span className="nightly-toggle-track">
						<span className="nightly-toggle-thumb">
							{attributes.toggleType === 'theme' ? (
								<>
									<svg
										className="nightly-icon nightly-icon-sun"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
									>
										<circle
											cx="12"
											cy="12"
											r="4"
											stroke="currentColor"
											strokeWidth="2"
										/>
										<path
											d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41"
											stroke="currentColor"
											strokeWidth="2"
										/>
									</svg>
									<svg
										className="nightly-icon nightly-icon-moon"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
											stroke="currentColor"
											strokeWidth="2"
											fill="currentColor"
										/>
									</svg>
								</>
							) : (
								<>
									<svg
										className="nightly-icon nightly-icon-reader"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
											stroke="currentColor"
											strokeWidth="2"
										/>
										<path
											d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
											stroke="currentColor"
											strokeWidth="2"
										/>
									</svg>
									<svg
										className="nightly-icon nightly-icon-dark"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
									>
										<circle
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="2"
											fill="currentColor"
										/>
									</svg>
								</>
							)}
						</span>
					</span>
				</span>

				{attributes.showText && (
					<span className="nightly-toggle-text">
						{attributes.toggleType === 'theme'
							? __('Dark Mode', 'nightly')
							: previewMode === 'reader'
							? __('Reader Mode', 'nightly')
							: __('Dark Mode', 'nightly')}
					</span>
				)}

				{attributes.toggleType === 'mode' && (
					<span
						className={`nightly-mode-indicator mode-${previewMode}`}
					>
						{previewMode === 'reader'
							? __('Reader', 'nightly')
							: __('Dark', 'nightly')}
					</span>
				)}

				<span className="screen-reader-text">
					{__('Preview only - toggle to see appearance', 'nightly')}
				</span>
			</button>
		);
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Toggle Settings', 'nightly')}
					initialOpen={true}
				>
					<SelectControl
						label={__('Toggle Type', 'nightly')}
						value={attributes.toggleType || 'theme'}
						options={[
							{
								label: __(
									'Theme Toggle (Light/Dark)',
									'nightly'
								),
								value: 'theme',
							},
							{
								label: __(
									'Mode Toggle (Reader/Dark)',
									'nightly'
								),
								value: 'mode',
							},
						]}
						onChange={handleToggleTypeChange}
						help={__('Choose what the toggle controls', 'nightly')}
					/>

					{attributes.toggleType === 'mode' && (
						<SelectControl
							label={__('Default Mode', 'nightly')}
							value={attributes.mode || 'dark'}
							options={[
								{
									label: __(
										'Reader Mode (Gentle)',
										'nightly'
									),
									value: 'reader',
								},
								{
									label: __('Dark Mode (Full)', 'nightly'),
									value: 'dark',
								},
							]}
							onChange={handleModeChange}
							help={__(
								'Reader mode provides gentle adjustments for comfortable reading, while dark mode provides full color conversion',
								'nightly'
							)}
						/>
					)}

					<ToggleControl
						label={__('Show Text Label', 'nightly')}
						checked={attributes.showText !== false}
						onChange={handleShowTextChange}
						help={__(
							'Display text alongside the toggle switch',
							'nightly'
						)}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="nightly-block-preview">
					<p className="nightly-block-description">
						{__('Preview your toggle button:', 'nightly')}
					</p>
					{createPreviewButton()}
					<p className="nightly-block-help">
						{attributes.toggleType === 'theme'
							? __(
									'This button will toggle between light and dark themes on your website.',
									'nightly'
							  )
							: __(
									'This button will toggle between reader mode (gentle) and dark mode (full conversion).',
									'nightly'
							  )}
					</p>
				</div>
			</div>
		</>
	);
}
