/**
 * Admin Interface Entry Point
 *
 * @package Nightly
 */

import { createRoot } from '@wordpress/element';
import App from './components/App';

// Import admin styles
import '../../scss/admin.scss';

// Render the admin app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const adminRoot = document.getElementById('nightly-admin-root');
});