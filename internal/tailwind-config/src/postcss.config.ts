import config from '.';

export default {
  plugins: {
    // eslint-disable-next-line node/prefer-global/process
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    // Specifying the config is not necessary in most cases, but it is included
    'autoprefixer': {},
    'postcss-import': {},
    'postcss-preset-env': {},
    'tailwindcss': { config },
    '@csstools/postcss-color-mix-function': {},
  },
};
