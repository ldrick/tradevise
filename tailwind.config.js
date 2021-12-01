/* eslint-disable import/no-extraneous-dependencies */
const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
/* eslint-enable import/no-extraneous-dependencies */

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: 'rgba(35,31,32,1)',
        secondary: '#c02425',
        tertiary: '#dbab32',
      },
      fontFamily: {
        sans: ['Open Sans', ...fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [
    plugin(({ addComponents, theme }) => {
      const progress = {
        '.progressbar': {
          position: 'relative',
          width: '100%',
          '& > div': {
            position: 'relative',
            top: '0',
            height: '.25rem',
            overflow: 'hidden',
            '&:after': {
              position: 'absolute',
              top: '0',
              right: '0',
              bottom: '0',
              left: '0',
              transform: 'translateX(-100%)',
              backgroundImage:
                'linear-gradient(90deg, rgba(233, 233, 233, 1) 0, rgba(233, 233, 233, 0.9) 50%, rgba(233, 233, 233, 0.8) 100%)',
              animation: theme('animation.shimmer'),
              content: '""',
            },
          },
        },
      };

      addComponents(progress);
    }),
  ],
};
