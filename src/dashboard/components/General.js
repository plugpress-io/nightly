/**
 * Extranal dependencies
 */
import Toast from './Toast';
import TimePicker from 'react-time-picker';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const {
    PanelBody,
    PanelRow,
    ToggleControl,
    RadioControl,
    DateTimePicker,
} = wp.components;
const { render, Component, Fragment } = wp.element;

/**
 * Internals Dependencies
 */
import SettingsName from './common/settings-name';

class General extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            isAPILoaded: false,
            isAPISaving: false,
            wp_nightly_settings_enabled: false,
            wp_nightly_settings_schedule: false,
            wp_nightly_settings_schedule_type: '',
            wp_nightly_settings_schedule_time: '',
            wp_nightly_settings_schedule_time_start: '22:30',
            wp_nightly_settings_schedule_time_end: '06:30',
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

                        wp_nightly_settings_schedule_type:
                            response.wp_nightly_settings_schedule_type,
                        wp_nightly_settings_schedule_time:
                            response.wp_nightly_settings_schedule_time,
                        wp_nightly_settings_schedule_time:
                            response.wp_nightly_settings_schedule_time_start,
                        wp_nightly_settings_schedule_time:
                            response.wp_nightly_settings_schedule_time_end,

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
                <PanelBody title={__('General Settings', 'wp-nightly')}>
                    <PanelRow>
                        <SettingsName
                            name={__('Dark Mode Settings', 'wp-nightly')}
                        />
                        <ToggleControl
                            className='wpn-control-field'
                            label={__('Enable', 'wp-nightly')}
                            help={__(
                                'Setting use to disable or enable dark mode across the website.',
                                'wp-nightly'
                            )}
                            checked={this.state.wp_nightly_settings_enabled}
                            onChange={() =>
                                this.changeOptions(
                                    'wp_nightly_settings_enabled',
                                    !this.state.wp_nightly_settings_enabled
                                )
                            }
                        />
                    </PanelRow>

                    {/* {this.state.wp_nightly_settings_enabled ? (
                        <PanelRow className='wpn-row-multi-control wpn-pro-feature'>
                            <SettingsName name={__('Schedule', 'wp-nightly')} />
                            <div className='wpn-control-field'>
                                <ToggleControl
                                    label={__('Enable', 'wp-nightly')}
                                    help={__(
                                        'Setting use to disable or enable dark mode across the site.',
                                        'wp-nightly'
                                    )}
                                    checked={
                                        this.state.wp_nightly_settings_schedule
                                    }
                                    onChange={() =>
                                        this.changeOptions(
                                            'wp_nightly_settings_schedule',
                                            !this.state
                                                .wp_nightly_settings_schedule
                                        )
                                    }
                                />
                                {this.state.wp_nightly_settings_schedule ? (
                                    <div className='components-fieldset wpn-fieldset'>
                                        <RadioControl
                                            options={[
                                                {
                                                    label: __(
                                                        'Sunset to Sunrise',
                                                        'wp-nightly'
                                                    ),
                                                    value: 'sun',
                                                },
                                                {
                                                    label: __(
                                                        'Custom Time',
                                                        'wp-nightly'
                                                    ),
                                                    value: 'custom',
                                                },
                                            ]}
                                            selected={
                                                this.state
                                                    .wp_nightly_settings_schedule_type
                                            }
                                            onChange={(value) =>
                                                this.changeOptions(
                                                    'wp_nightly_settings_schedule_type',
                                                    value
                                                )
                                            }
                                        />
                                        {'custom' ===
                                        this.state
                                            .wp_nightly_settings_schedule_type ? (
                                            <div className='components-base-control wpn-time-picker'>
                                                <label
                                                    className='wpn-time-picker-start-label'
                                                    for='time'
                                                >
                                                    {__('From:', 'wp-nightly')}
                                                </label>
                                                <TimePicker
                                                    amPmAriaLabel={
                                                        'Select AM/PM'
                                                    }
                                                    clockAriaLabel={
                                                        'Toggle clock'
                                                    }
                                                    format={'h:m a'}
                                                    onChange={(value) =>
                                                        this.changeOptions(
                                                            'wp_nightly_settings_schedule_time_start',
                                                            value
                                                        )
                                                    }
                                                    value={
                                                        this.state
                                                            .wp_nightly_settings_schedule_time_start
                                                    }
                                                    clockIcon={null}
                                                    clearIcon={null}
                                                />
                                                <label
                                                    className='wpn-time-picker-end-label'
                                                    for='time'
                                                >
                                                    {__('To:', 'wp-nightly')}
                                                </label>
                                                <TimePicker
                                                    format={'h:m a'}
                                                    onChange={(value) =>
                                                        this.changeOptions(
                                                            'wp_nightly_settings_schedule_time_end',
                                                            value
                                                        )
                                                    }
                                                    value={
                                                        this.state
                                                            .wp_nightly_settings_schedule_time_end
                                                    }
                                                    clockIcon={null}
                                                    clearIcon={null}
                                                />
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </PanelRow>
                    ) : (
                        ''
                    )} */}

                    {this.state.wp_nightly_settings_enabled ? (
                        <PanelRow>
                            <SettingsName name={__('OS Aware', 'wp-nightly')} />
                            <ToggleControl
                                className='wpn-control-field'
                                label={__('Enable', 'wp-nightly')}
                                help={__(
                                    'Setting use to disable or enable OS aware dark mode across the site.',
                                    'wp-nightly'
                                )}
                                checked={
                                    this.state.wp_nightly_settings_os_aware
                                }
                                onChange={() =>
                                    this.changeOptions(
                                        'wp_nightly_settings_os_aware',
                                        !this.state.wp_nightly_settings_os_aware
                                    )
                                }
                            />
                        </PanelRow>
                    ) : (
                        ''
                    )}
                </PanelBody>
            </Fragment>
        );
    }
}

export default General;
