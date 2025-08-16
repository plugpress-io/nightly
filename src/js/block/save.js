/**
 * Block Save Component
 *
 * @package Nightly
 */

import { useBlockProps } from '@wordpress/block-editor';

/**
 * Block Save Component
 */
export default function Save({ attributes }) {
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

	const blockProps = useBlockProps.save({
		className: 'nightly-toggle-block',
	});

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
		<div {...blockProps}>
			<style>{hoverStyles}</style>
			<button
				type="button"
				className={`nightly-toggle-button nightly-button-${buttonStyle} nightly-button-${buttonSize}`}
				data-nightly-toggle={attributes.toggleType || 'theme'}
				data-nightly-mode={attributes.mode || 'custom'}
				aria-pressed="false"
				aria-label="Toggle dark mode"
				style={buttonStyles}
			>
				{buttonStyle === 'circle' ? '🌙' : buttonText}
			</button>
		</div>
	);
}
