import antfu from '@antfu/eslint-config';
import tailwind from 'eslint-plugin-tailwindcss';
import nuxt from './apps/kk-pages/.nuxt/eslint.config.mjs';

export default nuxt(antfu(
  {
    unocss: false,
    formatters: true,
    rules: {
      'curly': ['error', 'all'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'always'],
    },
  },
  {
    ignores: [
      '**/apps/kk-pages/preset/**',
    ],
  },
  [
    ...tailwind.configs['flat/recommended'],
    {
      settings: {
        tailwindcss: {
          config: './apps/kk-pages/tailwind.config.ts', // returned from `loadConfig()` utility if not provided
        },
      },
    },
    {
      files: ['**/apps/kk-pages/**'],
      rules: {
        'tailwindcss/no-custom-classname': ['warn', {
          whitelist: [
            // '(?!(bg|text|icon)\\-).*',
            'p-invalid',
            'flex-center',
            'text-primary-700',
            'icon-*',
          ],
        }],
      },
    },
  ],

),
);
