import { addDynamicIconSelectors } from '@iconify/tailwind'

import {
  tailwindPluginUtils,
  tailwindPresetAnimation,
  tailwindPresetHeroPatterns,
} from '@kk-project/tailwindcss/index'
/**
 * 生成从 min 到 max 的间距
 * @param {number} min
 * @param {number} max
 * @returns {Record<string, string>} 间距对象 { '1': '0.25rem', '1.5': '0.375rem', ... }
 */
function generateSpacing(min: number, max: number) {
  /** @type {Record<string, string>} */
  const spacing: Record<string, string> = {}
  for (let i = min; i <= max; i++) {
    spacing[i] = `${i * 0.25}rem`
    spacing[`${i}.5`] = `${i * 0.25 + 0.125}rem`
  }
  return spacing
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
        primary: {
          50: 'var(--k-primary-color-50)',
          100: 'var(--k-primary-color-100)',
          200: 'var(--k-primary-color-200)',
          300: 'var(--k-primary-color-300)',
          400: 'var(--k-primary-color-400)',
          500: 'var(--k-primary-color-500)',
          600: 'var(--k-primary-color-600)',
          700: 'var(--k-primary-color-700)',
          800: 'var(--k-primary-color-800)',
          900: 'var(--k-primary-color-900)',
          950: 'var(--k-primary-color-950)',
          DEFAULT: 'var(--k-primary-color)',
        },
        transparent: 'transparent',
        wechat: '#83da58',
        qq: '#5ccdff',
        weibo: '#f85f61',
        alipay: '#1684ff',
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
    // tailwindPluginAnimate,

  ],

}
