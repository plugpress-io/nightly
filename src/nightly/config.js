import Nightly from './nightly';
import { options } from 'wpnightly';

const wpnightly = {
    config() {
        window.WPNightly = new Nightly(options);
        window.WPNightly.init();
    },
};

document.addEventListener('DOMContentLoaded', wpnightly.config);
