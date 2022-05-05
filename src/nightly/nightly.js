import './nightly.scss';

export default class Nightly {
    constructor(options = {}) {
        this.options = options;
        this.ls = window.localStorage;

        // Generate Floating Button
        if (options.enabled_switch) {
            const button = document.createElement('div');
            this.createButton(button);
            this.button = button;
        }

        this.linkTags = document.getElementsByTagName('a');
        this.inputTags = document.getElementsByTagName('input');
        this.buttons = document.getElementsByTagName('button');
    }

    init = () => {
        const options = this.options;
        // Cache Saved
        const wpNighlyActivated = this.ls.getItem('wpnightly') === 'true';
        const wpNighlyNeverActivatedByAction =
            this.ls.getItem('wpnightly') === null;

        // osAware Darkmode
        const osAware = '1' === options.os_aware ? this.osAware() : '';
        if (
            false !== wpNighlyActivated ||
            ('dark' === osAware && wpNighlyNeverActivatedByAction)
        ) {
            this.toggle();
        }

        // Switch Darkmode
        if (options.enabled_switch) {
            const checkBox = document.getElementById('wpnightly');
            this.button.addEventListener('click', (event) => {
                event.preventDefault();
                const target = document.querySelector('.wpn-switch-label');

                if (target.classList.contains('active')) {
                    target.classList.remove('active');
                    checkBox.removeAttribute('checked');
                } else {
                    target.classList.add('active');
                    checkBox.setAttribute('checked', true);
                }
                this.toggle();
            });
        }

        // Dark Mode CSS
        this.frontend_css();
    };

    osAware = () => {
        if (window.matchMedia) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light';
    };

    addStyle = (css, id, place) => {
        const linkElement = document.createElement('link');

        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('type', 'text/css');
        linkElement.setAttribute('id', id);
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

    toggle = () => {
        const isWPNightly = this.isActivated();
        document.documentElement.classList.toggle('wp-nightly-activated');
        this.ls.setItem('wpnightly', !isWPNightly);
    };

    createButton = (button) => {
        const options = this.options;
        console.log(options);
        const css = `
            .wp-nightly-switch {
                --wp-nightly-primary-switch-color: #000000;
                --wp-nightly-secondary-switch-color: #ffffff;
            }
        `;

        this.addStyle(css, 'wp-nighly-toggle', 'head');

        // Add Class name
        button.classList.add('wp-nightly-switch');
        button.classList.add('wpn-ignore-css');

        // Label Wrap
        const labelWrap = document.createElement('label');
        labelWrap.classList.add('wpn-switch-label');
        labelWrap.classList.add('wpn-ignore-css');
        labelWrap.classList.add(options.switch_style);

        if ('true' === this.ls.getItem('wpnightly')) {
            labelWrap.classList.add('active');
        }

        // Input checkbox
        const checkBox = document.createElement('input');
        if ('true' === this.ls.getItem('wpnightly')) {
            checkBox.setAttribute('checked', true);
        } else {
            checkBox.removeAttribute('checked');
        }

        checkBox.type = 'checkbox';
        checkBox.className = 'wpn-switch-checkbox';
        checkBox.id = 'wpnightly';

        //Label

        // Span Handle
        const handle = document.createElement('span');
        handle.className = 'wpn-switch-handle wpn-ignore-css';

        // Append
        labelWrap.appendChild(checkBox);
        labelWrap.appendChild(handle);
        button.appendChild(labelWrap);

        document.body.insertBefore(button, document.body.firstChild);
    };

    isActivated = () => {
        return document.documentElement.classList.contains(
            'wp-nightly-activated'
        );
    };

    frontend_css = () => {
        const color_scheme = this.options.color_scheme;
        const colors = this.options.colors;
        const _color = colors[color_scheme];

        const frontend_css = `

            html.wp-nightly-activated :not(a):not(img):not(.wpn-ignore-css) {
                background-color:  ${_color.body} !important;
                color: ${_color.texts} !important;
                border-color: ${_color.border} !important;
            }

            html.wp-nightly-activated a:not(.wpn-ignore-css), 
            html.wp-nightly-activated a *:not(.wpn-ignore-css){
                color: ${_color.links} !important;
            }
        `;

        this.addStyle(frontend_css, color_scheme, 'head');
    };
}
