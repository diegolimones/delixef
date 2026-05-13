import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Mar Mediterráneo turquesa — high contrast
        sea: {
          50: 'oklch(0.96 0.025 205)',
          100: 'oklch(0.92 0.04 205)',
          200: 'oklch(0.84 0.07 207)',
          300: 'oklch(0.72 0.10 210)',
          400: 'oklch(0.58 0.12 212)',
          500: 'oklch(0.46 0.13 215)',
          600: 'oklch(0.36 0.11 220)',
          800: 'oklch(0.22 0.08 228)',
          900: 'oklch(0.13 0.05 232)',
        },
        sand: {
          50: 'oklch(0.985 0.012 88)',
          100: 'oklch(0.965 0.020 85)',
          200: 'oklch(0.93 0.030 80)',
          300: 'oklch(0.88 0.040 75)',
          400: 'oklch(0.78 0.045 70)',
        },
        coral: {
          400: 'oklch(0.68 0.185 30)',
          500: 'oklch(0.58 0.200 26)',
          600: 'oklch(0.48 0.180 24)',
          700: 'oklch(0.38 0.140 22)',
        },
        foam: {
          200: 'oklch(0.92 0.06 195)',
          300: 'oklch(0.85 0.10 195)',
          400: 'oklch(0.75 0.13 195)',
          500: 'oklch(0.65 0.15 195)',
        },
        ink: {
          DEFAULT: 'oklch(0.11 0.02 232)',
          soft: 'oklch(0.26 0.03 228)',
          mute: 'oklch(0.46 0.025 225)',
        },
        // Backwards compat
        gold: {
          50: 'oklch(0.97 0.02 80)',
          100: 'oklch(0.93 0.05 80)',
          200: 'oklch(0.86 0.09 78)',
          300: 'oklch(0.77 0.13 76)',
          400: 'oklch(0.68 0.16 74)',
          500: 'oklch(0.60 0.17 72)',
          600: 'oklch(0.52 0.15 70)',
          700: 'oklch(0.44 0.12 68)',
          800: 'oklch(0.35 0.09 68)',
          900: 'oklch(0.26 0.06 64)',
        },
        amber: {
          50: 'oklch(0.97 0.02 55)',
          100: 'oklch(0.93 0.05 52)',
          200: 'oklch(0.86 0.10 50)',
          300: 'oklch(0.76 0.15 48)',
          400: 'oklch(0.66 0.18 46)',
          500: 'oklch(0.57 0.19 44)',
          600: 'oklch(0.49 0.17 42)',
          700: 'oklch(0.41 0.14 40)',
          800: 'oklch(0.33 0.10 38)',
          900: 'oklch(0.25 0.07 36)',
        },
        warm: {
          50: 'oklch(0.985 0.008 85)',
          100: 'oklch(0.96 0.015 83)',
          200: 'oklch(0.92 0.025 81)',
        },
        olive: {
          50: 'oklch(0.96 0.025 205)',
          100: 'oklch(0.92 0.04 205)',
          200: 'oklch(0.84 0.07 207)',
          400: 'oklch(0.58 0.12 212)',
          600: 'oklch(0.36 0.11 220)',
          800: 'oklch(0.22 0.08 228)',
          900: 'oklch(0.13 0.05 232)',
        },
        cream: {
          50: 'oklch(0.985 0.012 88)',
          100: 'oklch(0.965 0.020 85)',
          200: 'oklch(0.93 0.030 80)',
          300: 'oklch(0.88 0.040 75)',
        },
        terracotta: {
          400: 'oklch(0.68 0.185 30)',
          500: 'oklch(0.58 0.200 26)',
          600: 'oklch(0.48 0.180 24)',
          700: 'oklch(0.38 0.140 22)',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Fraunces', 'Georgia', 'serif'],
        body: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
        playfair: ['var(--font-fraunces)', 'Fraunces', 'serif'],
        inter: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 9vw, 8.5rem)', { lineHeight: '0.9', letterSpacing: '-0.045em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5.25rem)', { lineHeight: '0.96', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'eyebrow': ['0.72rem', { lineHeight: '1', letterSpacing: '0.24em' }],
      },
      letterSpacing: {
        'tightest': '-0.045em',
      },
      maxWidth: {
        'editorial': '78rem',
      },
      backgroundImage: {
        'horizon': 'linear-gradient(180deg, oklch(0.985 0.012 88) 0%, oklch(0.84 0.07 207) 100%)',
        'tide': 'linear-gradient(180deg, oklch(0.22 0.08 228) 0%, oklch(0.13 0.05 232) 100%)',
        'sunset': 'linear-gradient(135deg, oklch(0.68 0.185 30) 0%, oklch(0.58 0.200 26) 50%, oklch(0.36 0.11 220) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
