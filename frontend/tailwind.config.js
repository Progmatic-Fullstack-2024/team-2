/** @type {import('tailwindcss').Config} */

const COLORS = {
  DAY: {
    TEXT: 'hsl(88, 46%, 92%)',
    BACKGROUND: 'hsl(88, 55%, 6%)',

    PRIMARY: 'hsl(90, 78%, 35%)',
    PRIMARY_LIGHT: 'hsl(90, 78%, 40%)',
    PRIMARY_DARK: 'hsl(90, 78%, 30%)',

    SECONDARY: 'hsl(90, 65%, 72%)',
    SECONDARY_LIGHT: 'hsl(90, 65%, 77%)',
    SECONDARY_DARK: 'hsl(90, 65%, 67%)',

    ACCENT: 'hsl(89, 89%, 55%)',
  },
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      width: {
        88: '88px',
      },
      height: {
        600: '600px',
        100: '25rem',
      },
      brightness: {
        65: 0.65,
      },
      colors: {
        'c-text': COLORS.DAY.TEXT,
        'c-background': COLORS.DAY.BACKGROUND,
        'c-primary': COLORS.DAY.PRIMARY,
        'c-primary-dark': COLORS.DAY.PRIMARY_DARK,
        'c-primary-light': COLORS.DAY.PRIMARY_LIGHT,
        'c-secondary': COLORS.DAY.SECONDARY,
        'c-secondary-dark': COLORS.DAY.SECONDARY_DARK,
        'c-secondary-light': COLORS.DAY.SECONDARY_LIGHT,
        'c-accent': COLORS.DAY.ACCENT,

        'c-warning': 'hsl(0, 100%, 50%)',
        'c-warning-light': 'hsl(0, 100%, 60%)',
        'c-warning-dark': 'hsl(0, 100%, 40%)',
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
      pattern:
        /^(bg|text|border|stroke|fill)-c-(warning|primary|secondary|accent|text|background)(|-light|-dark)$/,
      variants: ['hover', 'active', 'group-hover'],
    },

    {
      pattern: /^(stroke|fill)-(none)$/,
      variants: ['hover', 'active'],
    },
    {
      pattern: /(gray)-(100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern: /( black|white)$/,
    },
    { pattern: /^(w|h)-\d+/ },
  ],
  plugins: [],
};
