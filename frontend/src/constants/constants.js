const API_URL = import.meta.env.VITE_API_URL;

export const COLORS = {
  DAY: {
    TEXT: 'hsl(0, 0%, 0%)',
    BACKGROUND: 'hsl(0, 0%, 100%)',
    PRIMARY: 'hsl(0, 72%, 50%)',
    PRIMARY_DARK: 'hsl(0, 72%, 45%)',
    PRIMARY_LIGHT: 'hsl(0, 72%, 56%)',
    SECONDARY: 'hsl(44, 70%, 71%)',
    SECONDARY_DARK: 'hsl(44, 70%, 40%)',
    SECONDARY_LIGHT: 'hsl(44, 70%, 80%)',
    ACCENT: 'hsl(23, 99%, 65%)',
    ACCENT_LIGHT: 'hsl(23, 99%, 90%)',
  },
  NIGHT: {
    TEXT: 'hsl(0, 0%, 100%)',
    BACKGROUND: 'hsl(0, 0%, 0%)',
    SECONDARY: 'hsl(44, 70%, 29%)',
    SECONDARY_DARK: 'hsl(44, 70%, 24%)',
    SECONDARY_LIGHT: 'hsl(44, 70%, 34%)',
    ACCENT: 'hsl(23, 99%, 35%)',
  },
};

export default API_URL;
