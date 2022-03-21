import WPNightly from './nightly';

const wpnightly = {
    config() {
        const options = JSON.parse(
            JSON.stringify(window.wpNightlyParams.options)
        );

        window.WPNightly = new WPNightly(options);
        window.WPNightly.init();
    },
};

document.addEventListener('DOMContentLoaded', wpnightly.config);
