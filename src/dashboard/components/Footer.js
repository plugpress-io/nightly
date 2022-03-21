/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const Footer = () => {
    return (
        <footer className='wpn-footer'>
            <div className='wpn-container'>
                <div className='wpn-footer-inner'>
                    <div class='wpn-signature'>WP Nightly</div>
                    <div class='wpn-signature wpn-signature-wppaw'>
                        A WPPAW PROJECT
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
