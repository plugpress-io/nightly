import PropTypes from 'prop-types';

const { __ } = wp.i18n;

const { Component, Fragment } = wp.element;
class SettingsName extends Component {
    constructor() {
        super(...arguments);
    }
    render() {
        return (
            <div class='wpn-settings-name'>
                <span class='name'>{this.props.name}</span>
                <span class='desc'>{this.props.desc}</span>
            </div>
        );
    }
}

export default SettingsName;
