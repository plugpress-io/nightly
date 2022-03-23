import {
    enable as enableDarkMode,
    disable as disableDarkMode,
} from 'darkreader';

export default class Nightly {
    constructor(options) {
        this.options = options;
        this.ls = window.localStorage;

        // Generate Floating Button
        if ('1' === options.enabled && '1' === options.enabled_switch) {
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

            // osAware Darkmode
            const osAware = '1' === this.options.os_aware ? this.osAware() : '';
            if (
                false !== wpNighlyActivated ||
                ('dark' === osAware && wpNighlyNeverActivatedByAction)
            ) {
                this.fireToggle();
            }

            // Switch Darkmode
            if (this.options.enabled_switch) {
                this.button.addEventListener('click', (e) => {
                    e.preventDefault();
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
                position: fixed;
                cursor: pointer;
                right: 32px;
                bottom: 32px;
                left: unset;
            }

            .wpn-switch-control input {
                display: none;
            }
            
            .wpn-switch-control.style1 {
                user-select: none;
                height: 30px;
                width: 54px;
            }

            .wpn-switch-control.style1 input:checked ~ .wpn-switch-handle {
                background-color: purple;
            }

            .wpn-switch-control.style1 input:checked ~ .wpn-switch-handle::before {
                background: purple;
                left: 19px;
                transform: scale(1);
            }

            ..wpn-switch-control.style1 input:checked ~ .wpn-switch-handle::after {
                background: #ffffff;
                left: 28px;
            }

            .wpn-switch-control.style1 .wpn-switch-handle {
                position: absolute;
                top: 0;
                left: 0;
                height: 30px;
                width: 100%;
                border-radius: 25px;
                background-color: gray;
            }

            .wpn-switch-control.style1 .wpn-switch-handle::before {
                content: "";
                position: absolute;
                width: 20px;
                height: 20px;
                left: 0px;
                top: 4px;
                border-radius: 50%;
                transform: scale(0);
                background: gray;
                z-index: 5;
                transition: all 0.125s ease-in;
            }

            .wpn-switch-control.style1 .wpn-switch-handle::after {
                content: "";
                position: absolute;
                left: 5px;
                top: 5px;
                width: 20px;
                height: 20px;
                border-radius: 25px;
                background: #ffffff;
            }

        `;

        this.addStyle(css, 'head');

        // Add Class name
        button.classList.add('wpnightly-switch');

        // Label Wrap
        const labelWrap = document.createElement('label');
        labelWrap.classList.add('wpn-switch-control');
        labelWrap.classList.add(options.switch_style);

        // Input checkbox
        const _input = document.createElement('input');

        if (this.ls.getItem('wpnightly')) {
            _input.checked = true;
        }
        _input.type = 'checkbox';
        _input.className = 'wpn-switch';
        _input.id = 'wpn-switch';

        // Span Handle
        const _span = document.createElement('span');
        _span.className = 'wpn-switch-handle';

        // Append
        labelWrap.appendChild(_input);
        labelWrap.appendChild(_span);
        button.appendChild(labelWrap);

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
