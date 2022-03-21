/**
 * Extranal dependencies
 */
import Toast from './Toast';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { PanelBody, PanelRow, ToggleControl } = wp.components;
const { render, Component, Fragment } = wp.element;

/**
 * Internals Dependencies
 */

import PanelTitle from './common/panel-title';

class General extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            isAPILoaded: false,
            isAPISaving: false,
            wp_nightly_settings_enabled: false,
            wp_nightly_settings_schedule: false,
            wp_nightly_settings_os_aware: false,
        };
    }

    componentDidMount() {
        wp.api.loadPromise.then(() => {
            this.settings = new wp.api.models.Settings();

            if (false === this.state.isAPILoaded) {
                this.settings.fetch().then((response) => {
                    this.setState({
                        wp_nightly_settings_enabled: Boolean(
                            response.wp_nightly_settings_enabled
                        ),
                        wp_nightly_settings_schedule: Boolean(
                            response.wp_nightly_settings_schedule
                        ),
                        wp_nightly_settings_os_aware: Boolean(
                            response.wp_nightly_settings_os_aware
                        ),
                        isAPILoaded: true,
                    });
                });
            }
        });
    }

    changeOptions(option, value) {
        this.setState({ isAPISaving: true });
        Toast(__('Updating Settings...', 'wp-nightly'), 'info');

        const model = new wp.api.models.Settings({
            [option]: value,
        });

        const save = model.save();

        save.success((response, status) => {
            if ('success' === status) {
                this.setState({
                    [option]: response[option],
                    isAPISaving: false,
                });

                Toast(__('Updated Settings.', 'wp-nightly'), 'success');
            }

            if ('error' === status) {
                Toast(__('An error occurred.', 'wp-nightly'), 'error');
            }
        });

        save.error((response) => {
            Toast(__('An error occurred.', 'wp-nightly'), 'eroor');
        });
    }

    render() {
        const _title = __('General Settings', 'wp-nightly');
        const _sub_title = __('', 'wp-nightly');

        return (
            <Fragment>
                <PanelBody className='wpn-panel-title-only'>
                    <PanelTitle title={_title} subtitle={_sub_title} />
                </PanelBody>
                <PanelBody>
                    <PanelRow>
                        <ToggleControl
                            className='wpn-toggle-control'
                            label={__('Enable Dark Mode')}
                            help={__(' Activate dark mode your website.')}
                            checked={this.state.wp_nightly_settings_enabled}
                            onChange={() =>
                                this.changeOptions(
                                    'wp_nightly_settings_enabled',
                                    !this.state.wp_nightly_settings_enabled
                                )
                            }
                        />
                    </PanelRow>
                    <PanelRow className='wpn-pro-feature'>
                        <ToggleControl
                            className='wpn-toggle-control'
                            label={__('Schedule Dark Mode')}
                            help={__(
                                'Setting use to disable or enable OS aware dark mode across the site.'
                            )}
                            checked={this.state.wp_nightly_settings_schedule}
                            onChange={() =>
                                this.changeOptions(
                                    'wp_nightly_settings_schedule',
                                    !this.state.wp_nightly_settings_schedule
                                )
                            }
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            className='wpn-toggle-control'
                            label={__('OS Aware')}
                            help={__(
                                'Setting use to disable or enable OS aware dark mode across the site.'
                            )}
                            checked={this.state.wp_nightly_settings_os_aware}
                            onChange={() =>
                                this.changeOptions(
                                    'wp_nightly_settings_os_aware',
                                    !this.state.wp_nightly_settings_os_aware
                                )
                            }
                        />
                    </PanelRow>
                </PanelBody>
            </Fragment>
        );
    }
}

export default General;
