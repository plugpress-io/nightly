import {
    enable as enableDarkMode,
    disable as disableDarkMode,
} from 'darkreader';

export default class WPNightly {
    constructor(options) {
        this.options = options;
        this.ls = window.localStorage;

        // Generate Floating Button
        if (this.options.enabled_switch) {
            const button = document.createElement('div');
            this.createButton(button);
            this.button = button;
        }
    }

    init = () => {
        if ('1' === this.options.enabled) {
            // Cache Saved
            const wpNighlyActivated = this.ls.getItem('wpnightly');
            const wpNighlyNeverActivatedByAction =
                this.ls.getItem('wpnightly') === null;

            console.log(this.options);

            // osAware Darkmode
            const osAware = '1' === this.options.os_aware ? this.osAware() : '';
            if (
                false != wpNighlyActivated ||
                ('dark' === osAware && wpNighlyNeverActivatedByAction)
            ) {
                this.fireToggle();
            }

            // Switch Darkmode
            if (this.options.enabled_switch) {
                const button = this.button;

                button
                    .getElementById('toggle-switch')
                    .addEventListener('click', () => {
                        this.fireToggle();
                    });
            }
        }
    };

    osAware = () => {
        if (window.matchMedia) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light';
    };

    addStyle = (css, place) => {
        const linkElement = document.createElement('link');

        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('type', 'text/css');
        linkElement.setAttribute(
            'href',
            'data:text/css;charset=UTF-8,' + encodeURIComponent(css)
        );
        if ('head' === place) {
            document.head.appendChild(linkElement);
        } else {
            document.body.appendChild(linkElement);
        }
    };

    createButton = (button) => {
        const options = this.options;
        const css = `
            .wpnightly-switch {
                width: 3rem;
                height: 3rem;
                position: fixed;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                right: 32px;
                bottom: 32px;
                left: unset;
            }
        `;

        this.addStyle(css, 'head');

        button.classList.add('wpnightly-switch');
        button.classList.add(options.switch_style);

        let buttonStyle = '';

        if ('style1' === options.switch_style) {
            buttonStyle = document.createElement('input');

            if (true === typeof this.ls.getItem('wpnightly')) {
                buttonStyle.checked = true;
            }

            buttonStyle.type = 'checkbox';
            buttonStyle.className = 'wpn-switch';
            buttonStyle.id = 'toggle-switch';
        }

        button.appendChild(buttonStyle);

        document.body.insertBefore(button, document.body.firstChild);
    };

    fireToggle = () => {
        const isWPNightly = this.isActivated();
        if (!isWPNightly) {
            enableDarkMode({
                brightness: 100,
                contrast: 90,
                sepia: 10,
            });
        } else {
            disableDarkMode();
        }

        document.body.classList.toggle('wpnightly-activated');
        this.ls.setItem('wpnightly', !isWPNightly);
    };

    isActivated = () => {
        return document.body.classList.contains('wpnightly-activated');
    };
}
