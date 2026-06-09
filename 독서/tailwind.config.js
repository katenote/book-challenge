/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          50: '#f0f4ff',
          100: '#e1e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#0f172a',
        },
        galaxy: {
          purple: '#d8b4fe',
          pink: '#fbcfe8',
          yellow: '#fef08a',
          blue: '#93c5fd',
          mint: '#a7f3d0',
          coral: '#fca5a5',
        }
      },
      fontFamily: {
        sans: ['"Comic Sans MS"', '"KoPubWorldBatang"', 'Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'cute': '0 8px 0px rgba(0, 0, 0, 0.05)',
        'cute-hover': '0 12px 0px rgba(0, 0, 0, 0.05)',
        'cute-active': '0 4px 0px rgba(0, 0, 0, 0.05)',
        'bubble': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
