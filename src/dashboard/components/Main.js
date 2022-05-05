/**
 * External dependencies
 */
import { Navigate, Routes, Route } from 'react-router-dom';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { render, Component, Fragment } = wp.element;

/**
 * Internal dependencies
 */
import Navigation from './Navigation';
import General from './General';
import Frontend from './Frontend';
import Admin from './Admin';
import Tools from './Tools';

class Main extends Component {
    render() {
        return (
            <div className='wpn-container'>
                <Navigation />
                <div className='wpn-settings-main'>
                    <Routes>
                        <Route
                            path='/'
                            element={<Navigate to='/general' />}
                        ></Route>
                        <Route path='/general' element={<General />}></Route>
                        <Route path='/frontend' element={<Frontend />}></Route>
                    </Routes>
                </div>
            </div>
        );
    }
}

export default Main;
