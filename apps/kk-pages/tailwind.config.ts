import { addDynamicIconSelectors } from '@iconify/tailwind';

import {
  tailwindPluginUtils,
  tailwindPresetAnimation,
  tailwindPresetHeroPatterns,
} from '@kk-project/tailwindcss/index';
/**
 * 生成从 min 到 max 的间距
 */
function generateSpacing(min: number, max: number) {
  /** @type {Record<string, string>} */
  const spacing: Record<string, string> = {};
  for (let i = min; i <= max; i++) {
    spacing[i] = `${i * 0.25}rem`;
    spacing[`${i}.5`] = `${i * 0.25 + 0.125}rem`;
  }
  return spacing;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindPresetAnimation, tailwindPresetHeroPatterns],
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.config.ts',
    './app/composables/**/*.{js,ts}',
    './app/plugins/**/*.{js,ts}',
    './app/App.{js,ts,vue}',
    './app/app.{js,ts,vue}',
    './app/Error.{js,ts,vue}',
    './app/error.{js,ts,vue}',
    './app/content/**/*.md',
    './preset/primevue/**/*.{js,vue,ts}',
  ],
  theme: {
    extend: {
      spacing: {
        0: '0',
        px: '1px',
        0.5: '0.125rem',
        ...generateSpacing(1, 256),
      },
      colors: {

        'primary': 'rgb(var(--p-primary-500) / <alpha-value>)',
        'primary-emphasis': 'rgb(var(--p-primary-600) / <alpha-value>)', // 600
        'primary-emphasis-alt': 'rgb(var(--p-primary-700) / <alpha-value>)', // 700
        'primary-contrast': '#f1f5f9',
        'primary-50': 'rgb(var(--p-primary-50) / <alpha-value>)',
        'primary-100': 'rgb(var(--p-primary-100) / <alpha-value>)',
        'primary-200': 'rgb(var(--p-primary-200) / <alpha-value>)',
        'primary-300': 'rgb(var(--p-primary-300) / <alpha-value>)',
        'primary-400': 'rgb(var(--p-primary-400) / <alpha-value>)',
        'primary-500': 'rgb(var(--p-primary-500) / <alpha-value>)',
        'primary-600': 'rgb(var(--p-primary-600) / <alpha-value>)',
        'primary-700': 'rgb(var(--p-primary-700) / <alpha-value>)',
        'primary-800': 'rgb(var(--p-primary-800) / <alpha-value>)',
        'primary-900': 'rgb(var(--p-primary-900) / <alpha-value>)',
        'primary-950': 'rgb(var(--p-primary-950) / <alpha-value>)',

        'surface': {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },

        'transparent': 'transparent',
        'wechat': '#83da58',
        'qq': '#5ccdff',
        'weibo': '#f85f61',
        'alipay': '#1684ff',
      },
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
      transitionDuration: {
        0: '0ms',
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
        700: '700ms',
        1000: '1000ms',
        2000: '2000ms',
        3000: '3000ms',
        4000: '4000ms',
        5000: '5000ms',
      },
    },
  },
  extend: {},
  plugins: [
    addDynamicIconSelectors({ scale: 1.2 }),
    // eslint-disable-next-line ts/no-require-imports
    require('tailwindcss-primeui'),
    tailwindPluginUtils,

  ],

};
