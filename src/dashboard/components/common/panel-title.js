import PropTypes from 'prop-types';

const { __ } = wp.i18n;

const { Component, Fragment } = wp.element;
class PanelTitle extends Component {
    constructor() {
        super(...arguments);
    }
    render() {
        return (
            <div className='wpn-panel-title'>
                <span className='wpn-title-main'>{this.props.title}</span>
                <span className='wpn-title-sub'>{this.props.subtitle}</span>
            </div>
        );
    }
}

export default PanelTitle;
