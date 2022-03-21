import { NavLink } from 'react-router-dom';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const Navigation = () => {
    return (
        <div className='wpn-navigation'>
            <div className='wpn-section-nav'>
                <ul>
                    <li>
                        <NavLink
                            to='/general'
                            className={(nav) =>
                                nav.isActive ? 'is-active' : ''
                            }
                        >
                            {__('General', 'wp-nightly')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/switch'
                            className={(nav) =>
                                nav.isActive ? 'is-active' : ''
                            }
                        >
                            {__('Floating Switch', 'wp-nightly')}
                        </NavLink>
                    </li>
                    <li className='wpn-section-nav--item'>
                        <NavLink
                            to='/Frontend'
                            className={(nav) =>
                                nav.isActive ? 'is-active' : ''
                            }
                        >
                            {__('Frontend', 'wp-nightly')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/Admin'
                            className={(nav) =>
                                nav.isActive ? 'is-active' : ''
                            }
                        >
                            {__('WP Dashboard', 'wp-nightly')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/Additional'
                            className={(nav) =>
                                nav.isActive ? 'is-active' : ''
                            }
                        >
                            {__('Additional', 'wp-nightly')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/Tools'
                            className={(nav) =>
                                nav.isActive ? 'is-active' : ''
                            }
                        >
                            {__('Tools', 'wp-nightly')}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;
