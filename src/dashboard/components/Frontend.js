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
import SettingsName from './common/settings-name';
import WPNightlyRadioIcon from './common/wpnightly-radio-icons';
import { options } from 'wpnightly';

class Theme extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            isAPILoaded: false,
            isAPISaving: false,
            wp_nightly_settings_switch: false,
            wp_nightly_settings_switch_style: '',
            wp_nightly_settings_color_scheme: '',
        };
    }

    componentDidMount() {
        wp.api.loadPromise.then(() => {
            this.settings = new wp.api.models.Settings();

            if (false === this.state.isAPILoaded) {
                this.settings.fetch().then((response) => {
                    this.setState({
                        wp_nightly_settings_switch: Boolean(
                            response.wp_nightly_settings_switch
                        ),
                        wp_nightly_settings_switch_style:
                            response.wp_nightly_settings_switch_style,
                        wp_nightly_settings_color_scheme:
                            response.wp_nightly_settings_color_scheme,
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
        const switchOptions = {
            style1: {
                icon: 'style1',
            },
            style2: {
                icon: 'style2',
            },
        };

        const themeOptions = {
            black: {
                name: 'B&W',
                icon: 'black',
            },
            purple: {
                name: 'Purple',
                icon: 'purple',
            },
            blue: {
                name: 'Blue',
                icon: 'blue',
            },
        };

        const _options = JSON.parse(options);

        return (
            <Fragment>
                <PanelBody title={__('Switch Settings', 'wp-nightly')}>
                    <PanelRow>
                        <SettingsName
                            name={__('Enable Floating Switch', 'wp-nightly')}
                        />
                        <ToggleControl
                            className='wpn-control-field'
                            help={__('')}
                            checked={this.state.wp_nightly_settings_switch}
                            onChange={() =>
                                this.changeOptions(
                                    'wp_nightly_settings_switch',
                                    !this.state.wp_nightly_settings_switch
                                )
                            }
                        />
                    </PanelRow>

                    <PanelRow>
                        <SettingsName
                            name={__('Select a Switch Style', 'wp-nightly')}
                        />

                        <WPNightlyRadioIcon
                            customClass='wpn-floating-switch'
                            value={
                                undefined !==
                                    this.state
                                        .wp_nightly_settings_switch_style &&
                                '' !==
                                    this.state.wp_nightly_settings_switch_style
                                    ? this.state
                                          .wp_nightly_settings_switch_style
                                    : _options.switch_style
                            }
                            options={switchOptions}
                            onChange={(value) =>
                                this.changeOptions(
                                    'wp_nightly_settings_switch_style',
                                    value
                                )
                            }
                        />
                    </PanelRow>
                </PanelBody>

                <PanelBody title={__('Color Scheme Settings', 'wp-nightly')}>
                    <PanelRow>
                        <SettingsName name={__('Color Scheme', 'wp-nightly')} />

                        <WPNightlyRadioIcon
                            customClass='wpn-color-scheme'
                            value={
                                undefined !==
                                    this.state
                                        .wp_nightly_settings_color_scheme &&
                                '' !==
                                    this.state.wp_nightly_settings_color_scheme
                                    ? this.state
                                          .wp_nightly_settings_color_scheme
                                    : _options.color_scheme
                            }
                            options={themeOptions}
                            onChange={(value) =>
                                this.changeOptions(
                                    'wp_nightly_settings_color_scheme',
                                    value
                                )
                            }
                        />
                    </PanelRow>
                </PanelBody>
            </Fragment>
        );
    }
}

export default Theme;
