/**
 * Block Save Component - Clean and Functional
 *
 * @package Nightly
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Block Save Component
 */
export default function Save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: 'nightly-toggle-block',
	});

	// Determine toggle type and properties
	const toggleType = attributes.toggleType || 'theme';
	const showText = attributes.showText !== false;
	const mode = attributes.mode || 'dark';

	// Create the actual toggle button that will work on frontend
	const createToggleButton = () => {
		const buttonClass = `nightly-toggle-button ${
			showText ? 'with-text' : 'switch-only'
		}`;

		return (
			<button
				type="button"
				className={buttonClass}
				data-nightly-toggle={toggleType}
				aria-pressed="false"
				aria-label={
					toggleType === 'theme'
						? 'Toggle between light and dark theme'
						: 'Toggle between reader and dark mode'
				}
				title={
					toggleType === 'theme' ? 'Toggle dark theme' : 'Toggle mode'
				}
			>
				<span className="nightly-toggle-switch" aria-hidden="true">
					<span className="nightly-toggle-track">
						<span className="nightly-toggle-thumb">
							{toggleType === 'theme' ? (
								<>
									<svg
										className="nightly-icon nightly-icon-sun"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
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
										xmlns="http://www.w3.org/2000/svg"
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
										xmlns="http://www.w3.org/2000/svg"
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
										xmlns="http://www.w3.org/2000/svg"
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

				{showText && (
					<span className="nightly-toggle-text">
						{toggleType === 'theme' ? 'Dark Mode' : 'Toggle Mode'}
					</span>
				)}

				{toggleType === 'mode' && (
					<span className={`nightly-mode-indicator mode-${mode}`}>
						{mode === 'reader' ? 'Reader' : 'Dark'}
					</span>
				)}

				<span className="screen-reader-text nightly-sr-state">
					Current: light theme, {mode} mode
				</span>
			</button>
		);
	};

	return <div {...blockProps}>{createToggleButton()}</div>;
}
