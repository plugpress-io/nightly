import PropTypes from 'prop-types';
import Icons from './icons';

const { __ } = wp.i18n;

const { ButtonGroup, Dashicon, Tooltip, Button } = wp.components;

const { Component, Fragment } = wp.element;
class WPNightlyRadioIcon extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            value: this.props.value,
        };
    }
    render() {
        return (
            <div
                className={`wpn-control-field wpn-radio-icon-control${
                    this.props.customClass ? ' ' + this.props.customClass : ''
                }`}
            >
                {this.props.label && (
                    <div className='wpn-title-control-bar'>
                        <span className='customize-control-title'>
                            {this.props.label}
                        </span>
                    </div>
                )}
                <ButtonGroup className='wpn-radio-container-control'>
                    {Object.keys(this.props.options).map((item) => {
                        return (
                            <Fragment>
                                {this.props.options[item].tooltip && (
                                    <Tooltip
                                        text={this.props.options[item].tooltip}
                                    >
                                        <Button
                                            isTertiary
                                            className={
                                                (item === this.state.value
                                                    ? 'active-radio '
                                                    : '') +
                                                'radio-item-' +
                                                item +
                                                (this.props.options[item]
                                                    .icon &&
                                                this.props.options[item].name
                                                    ? ' btn-flex-col'
                                                    : '')
                                            }
                                            onClick={() => {
                                                let value = this.state.value;
                                                value = item;
                                                this.setState({ value: item });
                                                this.props.onChange(value);
                                            }}
                                        >
                                            {this.props.options[item].icon && (
                                                <span className='wpn-radio-icon'>
                                                    {
                                                        Icons[
                                                            this.props.options[
                                                                item
                                                            ].icon
                                                        ]
                                                    }
                                                </span>
                                            )}
                                            {this.props.options[item].name &&
                                                this.props.options[item].name}
                                        </Button>
                                    </Tooltip>
                                )}
                                {!this.props.options[item].tooltip && (
                                    <Button
                                        isTertiary
                                        className={
                                            (item === this.state.value
                                                ? 'active-radio '
                                                : '') +
                                            'radio-item-' +
                                            item +
                                            (this.props.options[item].icon &&
                                            this.props.options[item].name
                                                ? ' btn-flex-col'
                                                : '')
                                        }
                                        onClick={() => {
                                            let value = this.state.value;
                                            value = item;
                                            this.setState({ value: item });
                                            this.props.onChange(value);
                                        }}
                                    >
                                        {this.props.options[item].name && (
                                            <span className='wpn-radio-name'>
                                                {this.props.options[item].name}
                                            </span>
                                        )}

                                        {this.props.options[item].icon && (
                                            <span className='wpn-radio-icon'>
                                                {
                                                    Icons[
                                                        this.props.options[item]
                                                            .icon
                                                    ]
                                                }
                                            </span>
                                        )}
                                    </Button>
                                )}
                            </Fragment>
                        );
                    })}
                </ButtonGroup>
            </div>
        );
    }
}

WPNightlyRadioIcon.propTypes = {
    control: PropTypes.object.isRequired,
};

export default WPNightlyRadioIcon;
