/**
 * Extranal dependencies
 */
import Toast from './Toast';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { PanelBody, ToggleControl } = wp.components;
const { render, Component, Fragment } = wp.element;

class Additional extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            isAPILoaded: false,
            isAPISaving: false,
            wp_nightly_settings_keyboard_shortcut: false,
            wp_nightly_settings_url_params: false,
        };
    }

    componentDidMount() {
        wp.api.loadPromise.then(() => {
            this.settings = new wp.api.models.Settings();

            if (false === this.state.isAPILoaded) {
                this.settings.fetch().then((response) => {
                    this.setState({
                        wp_nightly_settings_keyboard_shortcut: Boolean(
                            response.wp_nightly_settings_keyboard_shortcut
                        ),
                        wp_nightly_settings_keyboard_shortcut: Boolean(
                            response.wp_nightly_settings_keyboard_shortcut
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
        return (
            <Fragment>
                <PanelBody style='background-color: transparent;'>
                    <div className='wpn-boxes'>
                        <PanelBody>
                            <ToggleControl
                                className='wpn-toggle-control'
                                label={__('Enable Keyboard Shortcut')}
                                help={__('')}
                                checked={
                                    this.state
                                        .wp_nightly_settings_keyboard_shortcut
                                }
                                onChange={() =>
                                    this.changeOptions(
                                        'wp_nightly_settings_keyboard_shortcut',
                                        !this.state
                                            .wp_nightly_settings_keyboard_shortcut
                                    )
                                }
                            />
                        </PanelBody>
                        <PanelBody>
                            <ToggleControl
                                className='wpn-toggle-control'
                                label={__('Enable URL Parameter')}
                                help={__('')}
                                checked={
                                    this.state.wp_nightly_settings_url_params
                                }
                                onChange={() =>
                                    this.changeOptions(
                                        'wp_nightly_settings_url_params',
                                        !this.state
                                            .wp_nightly_settings_url_params
                                    )
                                }
                            />
                        </PanelBody>
                    </div>
                </PanelBody>
            </Fragment>
        );
    }
}

export default Additional;
