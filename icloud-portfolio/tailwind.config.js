/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'icloud-blue': {
          100: '#E3F2FD',
          200: '#BBDEFB',
          300: '#90CAF9',
          400: '#64B5F6',
          500: '#42A5F5',
          600: '#2196F3',
          700: '#1E88E5',
          800: '#1976D2',
          900: '#1565C0',
        }
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '10px',
        'lg': '15px',
        'xl': '20px',
      },
      fontFamily: {
        'sf-pro': ['"SF Pro Display"', '"SF Pro Text"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'icloud': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'icloud-hover': '0 8px 30px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
} 