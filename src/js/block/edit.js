import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Block Edit Component
 */
export default function Edit({ attributes, setAttributes }) {
	const [previewTheme, setPreviewTheme] = useState('light');

	const {
		buttonText,
		buttonStyle,
		buttonSize,
		backgroundColor,
		backgroundColorHover,
		backgroundColorActive,
		textColor,
		textColorHover,
		borderColor,
		borderWidth,
		borderRadius,
		fontSize,
		fontWeight,
		paddingTop,
		paddingBottom,
		paddingLeft,
		paddingRight,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		boxShadow,
		boxShadowHover,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'nightly-toggle-block',
	});

	// Handle preview toggle
	const handlePreviewToggle = () => {
		setPreviewTheme(previewTheme === 'light' ? 'dark' : 'light');
	};

	// Generate inline styles for the button
	const buttonStyles = {
		backgroundColor: backgroundColor,
		color: textColor,
		borderColor: borderColor,
		borderWidth: `${borderWidth}px`,
		borderRadius: `${borderRadius}%`,
		fontSize: `${fontSize}px`,
		fontWeight: fontWeight,
		padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
		margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
		boxShadow: boxShadow,
	};

	// Generate hover styles
	const hoverStyles = `
		.nightly-toggle-button:hover {
			background-color: ${backgroundColorHover} !important;
			color: ${textColorHover} !important;
			box-shadow: ${boxShadowHover} !important;
		}
	`;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Button Settings', 'nightly')}
					initialOpen={true}
				>
					<TextControl
						label={__('Button Text', 'nightly')}
						value={buttonText}
						onChange={(value) =>
							setAttributes({ buttonText: value })
						}
					/>

					<SelectControl
						label={__('Button Style', 'nightly')}
						value={buttonStyle}
						options={[
							{
								label: __('Rounded', 'nightly'),
								value: 'rounded',
							},
							{ label: __('Square', 'nightly'), value: 'square' },
							{ label: __('Pill', 'nightly'), value: 'pill' },
							{ label: __('Circle', 'nightly'), value: 'circle' },
						]}
						onChange={(value) =>
							setAttributes({ buttonStyle: value })
						}
					/>

					<SelectControl
						label={__('Button Size', 'nightly')}
						value={buttonSize}
						options={[
							{ label: __('Small', 'nightly'), value: 'small' },
							{ label: __('Medium', 'nightly'), value: 'medium' },
							{ label: __('Large', 'nightly'), value: 'large' },
							{
								label: __('Extra Large', 'nightly'),
								value: 'xlarge',
							},
						]}
						onChange={(value) =>
							setAttributes({ buttonSize: value })
						}
					/>
				</PanelBody>

				<PanelBody title={__('Colors', 'nightly')} initialOpen={false}>
					<div className="components-base-control">
						<label className="components-base-control__label">
							{__('Background Color', 'nightly')}
						</label>
						<ColorPalette
							value={backgroundColor}
							onChange={(color) =>
								setAttributes({ backgroundColor: color })
							}
						/>
					</div>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{__('Hover Background Color', 'nightly')}
						</label>
						<ColorPalette
							value={backgroundColorHover}
							onChange={(color) =>
								setAttributes({ backgroundColorHover: color })
							}
						/>
					</div>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{__('Active Background Color', 'nightly')}
						</label>
						<ColorPalette
							value={backgroundColorActive}
							onChange={(color) =>
								setAttributes({ backgroundColorActive: color })
							}
						/>
					</div>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{__('Text Color', 'nightly')}
						</label>
						<ColorPalette
							value={textColor}
							onChange={(color) =>
								setAttributes({ textColor: color })
							}
						/>
					</div>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{__('Hover Text Color', 'nightly')}
						</label>
						<ColorPalette
							value={textColorHover}
							onChange={(color) =>
								setAttributes({ textColorHover: color })
							}
						/>
					</div>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{__('Border Color', 'nightly')}
						</label>
						<ColorPalette
							value={borderColor}
							onChange={(color) =>
								setAttributes({ borderColor: color })
							}
						/>
					</div>
				</PanelBody>

				<PanelBody
					title={__('Typography', 'nightly')}
					initialOpen={false}
				>
					<RangeControl
						label={__('Font Size (px)', 'nightly')}
						value={fontSize}
						onChange={(value) => setAttributes({ fontSize: value })}
						min={12}
						max={48}
						step={1}
					/>

					<SelectControl
						label={__('Font Weight', 'nightly')}
						value={fontWeight}
						options={[
							{ label: __('Normal', 'nightly'), value: '400' },
							{ label: __('Medium', 'nightly'), value: '500' },
							{ label: __('Semi Bold', 'nightly'), value: '600' },
							{ label: __('Bold', 'nightly'), value: '700' },
						]}
						onChange={(value) =>
							setAttributes({ fontWeight: value })
						}
					/>
				</PanelBody>

				<PanelBody title={__('Spacing', 'nightly')} initialOpen={false}>
					<RangeControl
						label={__('Padding Top (px)', 'nightly')}
						value={paddingTop}
						onChange={(value) =>
							setAttributes({ paddingTop: value })
						}
						min={0}
						max={50}
						step={1}
					/>
					<RangeControl
						label={__('Padding Bottom (px)', 'nightly')}
						value={paddingBottom}
						onChange={(value) =>
							setAttributes({ paddingBottom: value })
						}
						min={0}
						max={50}
						step={1}
					/>
					<RangeControl
						label={__('Padding Left (px)', 'nightly')}
						value={paddingLeft}
						onChange={(value) =>
							setAttributes({ paddingLeft: value })
						}
						min={0}
						max={50}
						step={1}
					/>
					<RangeControl
						label={__('Padding Right (px)', 'nightly')}
						value={paddingRight}
						onChange={(value) =>
							setAttributes({ paddingRight: value })
						}
						min={0}
						max={50}
						step={1}
					/>
				</PanelBody>

				<PanelBody
					title={__('Border & Shadow', 'nightly')}
					initialOpen={false}
				>
					<RangeControl
						label={__('Border Width (px)', 'nightly')}
						value={borderWidth}
						onChange={(value) =>
							setAttributes({ borderWidth: value })
						}
						min={0}
						max={10}
						step={1}
					/>

					<RangeControl
						label={__('Border Radius (%)', 'nightly')}
						value={borderRadius}
						onChange={(value) =>
							setAttributes({ borderRadius: value })
						}
						min={0}
						max={50}
						step={1}
					/>

					<TextControl
						label={__('Box Shadow', 'nightly')}
						value={boxShadow}
						onChange={(value) =>
							setAttributes({ boxShadow: value })
						}
						help={__(
							'CSS box-shadow value (e.g., 0 2px 4px rgba(0,0,0,0.1))',
							'nightly'
						)}
					/>

					<TextControl
						label={__('Hover Box Shadow', 'nightly')}
						value={boxShadowHover}
						onChange={(value) =>
							setAttributes({ boxShadowHover: value })
						}
						help={__(
							'CSS box-shadow value for hover state',
							'nightly'
						)}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<style>{hoverStyles}</style>
				<button
					type="button"
					className={`nightly-toggle-button nightly-button-${buttonStyle} nightly-button-${buttonSize}`}
					onClick={handlePreviewToggle}
					aria-pressed={previewTheme === 'dark' ? 'true' : 'false'}
					aria-label={__('Toggle dark mode', 'nightly')}
					style={buttonStyles}
				>
					{buttonStyle === 'circle' ? '🌙' : buttonText}
				</button>
			</div>
		</>
	);
}
