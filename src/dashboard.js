import { __ } from '@wordpress/i18n';
import { createRoot } from '@wordpress/element';
import { ToggleControl, Panel, PanelBody } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './scss/dashboard.scss';

const Header = () => {
	return (
		<div className="nightly-header">
			<div className="nightly-header__branding">
				<h1>{__('Nightly', 'nightly')}</h1>
				<p className="nightly-header__description">
					{__(
						'Enable dark mode for your WordPress admin dashboard.',
						'nightly'
					)}
				</p>
			</div>
		</div>
	);
};

const Dashboard = () => {
	const [isEnabled, setIsEnabled] = useState(false);

	return (
		<div className="nightly-dashboard">
			<Header />

			<div className="nightly-dashboard__content">
				<Panel>
					<PanelBody
						title={__('General Settings', 'nightly')}
						initialOpen={true}
					>
						<ToggleControl
							label={__('Enable Dark Mode', 'nightly')}
							checked={isEnabled}
							onChange={setIsEnabled}
							help={
								isEnabled
									? __('Dark mode is enabled.', 'nightly')
									: __('Dark mode is disabled.', 'nightly')
							}
						/>
					</PanelBody>
				</Panel>
			</div>
		</div>
	);
};

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('nightly');
	if (root) {
		createRoot(root).render(<Dashboard />);
	}
});
