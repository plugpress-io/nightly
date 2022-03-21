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

class Theme extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            isAPILoaded: false,
            isAPISaving: false,
        };
    }

    componentDidMount() {
        wp.api.loadPromise.then(() => {
            this.settings = new wp.api.models.Settings();

            if (false === this.state.isAPILoaded) {
                this.settings.fetch().then((response) => {
                    this.setState({
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
                <PanelBody title={__('Theme', 'wp-nightly')}></PanelBody>
            </Fragment>
        );
    }
}

export default Theme;
