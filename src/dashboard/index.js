import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter } from 'react-router-dom';

/**
 * Dashboard components
 */
import './style.scss';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
/**
 * WordPress dependencies.
 */
const { render, Component, Fragment } = wp.element;

const App = () => {
    return (
        <HashRouter>
            <Header />
            <Main />
            <Footer />
            <ToastContainer />
        </HashRouter>
    );
};

render(<App />, document.getElementById('wp-nightly'));
