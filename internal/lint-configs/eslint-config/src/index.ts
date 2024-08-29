import antfu from '@antfu/eslint-config';
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import tailwind from 'eslint-plugin-tailwindcss';

export default antfu(
  {
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
      '**/packages/ui-kit/primevue/preset/**',
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
      files: ['**/apps/**'],
      rules: {
        'tailwindcss/no-custom-classname': ['warn', {
          whitelist: [
            '^(?!.*\\-)(bg|text)-(primary|secondary)(?:-\\d+)?$',
            'text-primary',
            'icon-[-\\w]+',
            'p-invalid',
            'flex-center',
            'text-primary-700',
            'icon-*',
          ],
        }],
      },
    },
  ],
);
