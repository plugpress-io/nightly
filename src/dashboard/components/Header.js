/**
 * External dependencies.
 */
import classnames from 'classnames';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import { Link } from 'react-router-dom';
import { assetsPath } from 'wpnightly';

/**
 * WPNightly Component
 */
import Icons from './common/icons';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const Header = () => {
    return (
        <header className='wpn-header'>
            <div className='wpn-container wpn-header-content'>
                <div className='wpn-logo'>
                    <Link to='/general'>
                        <SVG src={`${assetsPath}/images/logo.svg`} />
                    </Link>
                </div>
                {/* <div class='wpn-links'>
                    <a href='' class='wpn-help' title='Need Help?'>
                        {Icons['question']} {__('Need Help?', 'wp-nightly')}
                    </a>
                    <a href='' class='wpn-docs' title='Read Docs'>
                        {Icons['notification']} {__('Read Docs', 'wp-nightly')}
                    </a>
                </div> */}
            </div>
        </header>
    );
};

export default Header;
