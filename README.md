# Nightly — Dark Mode Toggle

A lightweight WordPress plugin that provides a minimal dark mode toggle functionality for websites. Includes a custom Gutenberg block and React-based admin interface.

## Features

- **Gutenberg Block**: Insert dark mode toggles anywhere in your content
- **Floating Toggle**: Automatic floating toggle for classic themes
- **System Preference Detection**: Respects user's `prefers-color-scheme` setting
- **Smooth Transitions**: CSS-based theme switching with customizable duration
- **Full Accessibility**: WCAG compliant with proper ARIA attributes and keyboard navigation
- **Performance Optimized**: Conditional asset loading and minimal footprint
- **Clean Code**: Follows WordPress coding standards and "code is poetry" principles

## Installation

1. Upload the plugin files to `/wp-content/plugins/nightly/`
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Configure settings under Appearance → Nightly

## Usage

The plugin automatically detects your theme type and provides the appropriate interface:

### For FSE (Full Site Editing) Themes

FSE themes have two options for adding dark mode toggles:

1. **Global Floating Toggle** (Recommended for site-wide coverage):
   - Go to Appearance → Nightly in your WordPress admin
   - Enable "Enable floating toggle" for a toggle that appears on all pages
   - Choose the position (bottom-right, bottom-left, etc.)
   - Configure system preference detection and transition speed

2. **Gutenberg Block** (For specific pages/posts):
   - In the block editor, search for "Nightly" block
   - Insert the block where you want the toggle to appear
   - Customize the button text and appearance in block settings

### For Classic Themes

Classic themes get both the block and an admin dashboard for easy configuration:

1. **Admin Dashboard**: Go to Appearance → Nightly to configure settings
   - Enable "Auto-inject floating toggle" for automatic placement
   - Choose the position for the floating toggle
   - Configure system preference detection and transition speed

2. **Gutenberg Block**: Also available in the block editor
   - Search for "Nightly" block and insert where needed
   - Customize appearance in block settings

3. **Manual Implementation**: Add to theme templates if needed

### Manual Implementation

You can also add toggles manually in your theme templates:

```html
<button class="nightly-toggle-button" data-nightly-toggle="true" type="button" aria-pressed="false">
    <span class="nightly-toggle-text">Toggle Dark Mode</span>
</button>
```

## Configuration

### Admin Settings

- **Auto-inject floating toggle**: Automatically adds a floating toggle for classic themes
- **Floating position**: Choose corner position for the floating toggle
- **Respect system preference**: Honor user's system dark mode setting
- **Transition duration**: Customize the theme switching animation speed

## Development

### Requirements

- WordPress 5.0+
- PHP 7.4+
- Node.js 16+ (for development)

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run start

# Build for production
npm run build:production

# Lint code
npm run lint:js
npm run lint:css

# Format code
npm run format
```

### File Structure

```
nightly/
├── includes/           # PHP classes
│   ├── class-nightly.php    # Main plugin class
│   ├── class-block.php      # Gutenberg block
│   ├── class-admin.php      # Admin interface
│   └── class-api.php        # REST API endpoints
├── src/               # Source files
│   ├── js/           # JavaScript source
│   └── scss/         # SCSS source
├── build/            # Compiled assets
├── languages/        # Translation files
└── nightly.php       # Main plugin file
```

### Architecture

The plugin follows a modular architecture:

- **Main Class**: Orchestrates all components and handles WordPress integration
- **Block Class**: Manages Gutenberg block registration and rendering
- **Admin Class**: Handles the React-based admin interface
- **API Class**: Provides REST endpoints for settings management

## Accessibility

Nightly is built with accessibility in mind:

- Proper ARIA attributes (`aria-pressed`, `aria-label`)
- Keyboard navigation support
- Screen reader announcements
- High contrast mode compatibility
- Focus indicators
- Minimum touch targets (44px)

## Performance

- **Conditional Loading**: Assets only load when needed
- **Optimized Bundles**: Separate chunks for different contexts
- **Cache-Friendly**: Proper versioning and cache headers
- **Minimal Footprint**: Small bundle sizes and efficient code

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

GPL v2 or later. See [LICENSE](LICENSE) for details.

## Support

For support, please visit [plugpress.io](https://plugpress.io/) or create an issue on GitHub.

## Changelog

### 1.0.0
- Initial release
- Gutenberg block implementation
- React admin interface
- Floating toggle for classic themes
- Full accessibility support
- Performance optimizations