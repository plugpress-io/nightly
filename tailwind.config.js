/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/js/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wp-blue': '#007cba',
        'wp-blue-hover': '#005a87',
        'wp-gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        'wp': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}