/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#f8fafc',
          surface: '#ffffff',
          text: '#1e293b',
          muted: '#64748b',
        },
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          text: '#f1f5f9',
          muted: '#94a3b8',
        }
      }
    },
  },
  plugins: [],
};