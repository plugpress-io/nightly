/**
 * Extranal dependencies
 */
import Toast from './Toast';
import SVG, { Props as SVGProps } from 'react-inlinesvg';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { PanelBody, PanelRow, ToggleControl } = wp.components;
const { render, Component, Fragment } = wp.element;

/**
 * WPNightly Component
 */
import WPNightlyRadioIcon from './common/wpnightly-radio-buttons';

class Switch extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            isAPILoaded: false,
            isAPISaving: false,
            wp_nightly_settings_switch: false,
            wp_nightly_settings_switch_style: '',
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
                // name: __('Style 1', 'wp-nightly'),
                icon: 'style1',
            },
            style2: {
                // name: __('Style 2', 'wp-nightly'),
                icon: 'style2',
            },
            // style3: {
            //     name: __('Style 3', 'wp-nightly'),
            //     icon: 'style3',
            // },
            // style4: {
            //     name: __('Style 4', 'wp-nightly'),
            //     icon: 'style4',
            // },
            // style5: {
            //     name: __('Style 5', 'wp-nightly'),
            //     icon: 'style5',
            // },
            // style6: {
            //     name: __('Style 6', 'wp-nightly'),
            //     icon: 'style6',
            // },
        };
        return (
            <Fragment>
                <PanelBody title={__('Switch Settings', 'wp-nightly')}>
                    <PanelRow>
                        <ToggleControl
                            className='wpn-toggle-control'
                            label={__('Enable Floating Switch')}
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
                        <WPNightlyRadioIcon
                            label={__('Select Floating Switch', 'wp-nightly')}
                            customClass='wpn-floating-switch'
                            value={
                                undefined !==
                                    this.state
                                        .wp_nightly_settings_switch_style &&
                                '' !==
                                    this.state.wp_nightly_settings_switch_style
                                    ? this.state
                                          .wp_nightly_settings_switch_style
                                    : wpNightlyParams.options['switch_style']
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
            </Fragment>
        );
    }
}

export default Switch;
