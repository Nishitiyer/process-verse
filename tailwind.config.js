/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a12',
        foreground: '#e0e0e0',
        primary: {
          DEFAULT: '#00f3ff',
          foreground: '#000000',
        },
        secondary: {
          DEFAULT: '#9d00ff',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#ff004c',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#1a1a2e',
          foreground: '#a0a0b0',
        },
        sidebar: '#0c0c1e',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1, filter: 'brightness(100%) blur(0px)' },
          '50%': { opacity: 0.8, filter: 'brightness(150%) blur(4px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
    },
  },
  plugins: [],
}
