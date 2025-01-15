/** @type {import('tailwindcss').Config} */

import { COLORS } from './src/constants/constants';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      width: {
        1200: '1200px',
      },
      height: {
        600: '600px',
      },
      brightness: {
        65: 0.65,
      },
      colors: {
        // DAY mode
        'c-text': COLORS.DAY.TEXT,
        'c-background': COLORS.DAY.BACKGROUND,
        'c-primary': COLORS.DAY.PRIMARY,
        'c-primary-dark': COLORS.DAY.PRIMARY_DARK,
        'c-primary-light': COLORS.DAY.PRIMARY_LIGHT,
        'c-secondary': COLORS.DAY.SECONDARY,
        'c-secondary-dark': COLORS.DAY.SECONDARY_DARK,
        'c-secondary-light': COLORS.DAY.SECONDARY_LIGHT,
        'c-accent': COLORS.DAY.ACCENT,
        'c-accent-light': COLORS.DAY.ACCENT_LIGHT,
        // NIGHT mode
        'text-night': COLORS.NIGHT.TEXT,
        'background-night': COLORS.NIGHT.BACKGROUND,
        // PRIMARY is the same as in DAY mode
        'secondary-night': COLORS.NIGHT.SECONDARY,
        'secondary-night-dark': COLORS.NIGHT.SECONDARY_DARK,
        'secondary-night-light': COLORS.NIGHT.SECONDARY_LIGHT,
        'accent-night': COLORS.NIGHT.ACCENT,
      },
      backgroundImage: {
        'theatron01-pattern': "url('Public/theatron01.jpg')",
        'theatron02-pattern': "url('Public/theatron02.jpg')",
      },
    },
    screens: {
      tablet: '640px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  safelist: [
    {
      pattern: /^(bg|text)-c-(primary|secondary|accent)(|-light|-dark)$/,
      variants: ['hover', 'active'],
    },
    {
      pattern: /(blue|red)-(100|200|300|400|500|600|700|800|900)$/,
    },
    { pattern: /^(w|h)-\d+/ },
  ],
  plugins: [],
};
