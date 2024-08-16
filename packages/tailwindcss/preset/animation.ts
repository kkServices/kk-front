import type { Config } from 'tailwindcss';

const config: Config = {

  content: [],
  theme: {
    extend: {
      animation: {
        'shake-x': 'shake-x 1s linear 1',
      },
      keyframes: {
        'shake-x': {
          'from,to': { transform: 'translate3d(0, 0, 0)' },
          '10%,30%,50%,70%,90%': { transform: 'translate3d(-10px, 0, 0)' },
          '20%,40%,60%,80%': { transform: 'translate3d(10px, 0, 0)' },
        },
      },
    },
  },
};

export default config;
