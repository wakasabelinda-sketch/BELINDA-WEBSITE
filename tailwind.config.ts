
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#2d3436',
          light: '#3d4447',
          dark: '#1a1d1e',
        },
        gold: {
          DEFAULT: '#c6a85b',
          light: '#d4ba7a',
          dark: '#a88d45',
        },
        charcoal: {
          DEFAULT: '#36454F',
          light: '#4a5568',
          dark: '#2d3748',
        },
        cream: '#faf8f5',
        pink: '#c6a85b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        article: ['"Book Antiqua"', 'Palatino Linotype', 'Libre Baskerville', 'Palatino', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
