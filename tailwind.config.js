/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans KR', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#1E90FF',
          600: '#1976d2',
          700: '#1565c0',
        },
        secondary: {
          500: '#4169E1',
          600: '#3751cd',
          700: '#2e3cb8',
        },
        accent: {
          500: '#FF6B6B',
          600: '#ff5252',
          700: '#e53935',
        },
        surface: {
          50: '#ffffff',
          100: '#f8fafc',
          200: '#f1f5f9',
        },
        background: '#F5F7FA',
        success: '#28A745',
        warning: '#FFC107',
        error: '#DC3545',
        info: '#17A2B8',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}