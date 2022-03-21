/**
 * External dependencies.
 */
import classnames from 'classnames';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import { Link } from 'react-router-dom';

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
            <div className={classnames('wpn-header-wrap', '', 'wpn-step-one')}>
                <div className='wpn-logo'>
                    <Link to='/settings'>
                        <SVG
                            src={`${wpNightlyParams.assetsPath}/images/logo.svg`}
                        />
                    </Link>
                </div>
                <div class='wpn-header-actions'>
                    <span class='round'>{Icons['notification']}</span>
                    <span class='round'>{Icons['question']}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
