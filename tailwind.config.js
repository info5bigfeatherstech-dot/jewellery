/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF6F0',
          200: '#F4EFEB',
          300: '#EBE3D7',
          400: '#DDD2C1',
        },
        espresso: {
          950: '#14110E',
          900: '#1E1A17',
          800: '#2E2722',
          700: '#494038',
          600: '#6A5E53',
          500: '#95887C',
          400: '#BCB1A6',
          300: '#DDD7D0',
        },
        champagne: {
          50: '#FAF7F0',
          100: '#F5EEDB',
          200: '#EBDFC4',
          300: '#DFC99F',
          400: '#CBB07B',
          500: '#B8975A',
          600: '#9C7D41',
          700: '#7E6331',
          800: '#614B25',
        },
        bottleGreen: {
          900: '#0F1C17',
          800: '#1A2E26',
          700: '#28463B',
          600: '#3A6354',
        },
        oxblood: {
          900: '#2B1217',
          800: '#3F1D24',
          700: '#582B33',
        },
        hairline: {
          light: 'rgba(30, 26, 23, 0.09)',
          medium: 'rgba(30, 26, 23, 0.16)',
          gold: 'rgba(184, 151, 90, 0.28)',
          'gold-subtle': 'rgba(184, 151, 90, 0.15)',
          white: 'rgba(255, 255, 255, 0.18)',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Didot', 'Bodoni MT', 'Cinzel', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Jost"', '"Manrope"', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      letterSpacing: {
        'widest-lux': '0.22em',
        'super-lux': '0.35em',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(30, 26, 23, 0.05)',
        'elevated': '0 12px 35px -8px rgba(30, 26, 23, 0.09)',
        'gold-glow': '0 0 35px -5px rgba(184, 151, 90, 0.2)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
