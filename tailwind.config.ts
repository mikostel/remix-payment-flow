import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
        serif: ['Georgia', 'serif']
      },
      screens: {
        xs: '376px'
      },
      backgroundImage: {
        success: "url('/icon-success.svg')",
        error: "url('/icon-error.svg')"
      },
      colors: {
        'abc-green': '#1AD3B2',
        'abc-primary': '#13126C',
        'abc-active': '#3667E9',
        'abc-soft': '#F2F8FF',
        'abc-error': '#C34648',
        'abc-grey': {
          30: '#E7E9EF',
          70: '#6D7088',
          80: '#65657B',
          100: '#171731'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
