// import { addDynamicIconSelectors } from '@iconify/tailwind'
// import tailwindcssAnimate from 'tailwindcss-animate'
import type { Config } from 'tailwindcss'

function generateSpacing(min: number, max: number): Record<string, string> {
  const spacing: Record<string, string> = {}
  for (let i = min; i <= max; i++) {
    spacing[i] = `${i * 0.25}rem`
    spacing[`${i}.5`] = `${i * 0.25 + 0.125}rem`
  }
  return spacing
}

const config: Config = {
  content: [
    './src/components/**/*.{vue,js,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/app.config.ts',
    './src/composables/**/*.{js,ts}',
    './src/plugins/**/*.{js,ts}',
    './src/App.{js,ts,vue}',
    './src/app.{js,ts,vue}',
    './src/Error.{js,ts,vue}',
    './src/error.{js,ts,vue}',
    './src/content/**/*.md',
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
        main: {
          50: '#f0f3fe',
          100: '#dce2fd',
          200: '#c1cdfc',
          300: '#97adf9',
          400: '#6684f4',
          500: '#425aef',
          600: '#2c3ae4',
          700: '#2427d1',
          800: '#2423aa',
          900: '#222486',
          950: '#1a1952',
        },
        wechat: '#83da58',
        qq: '#5ccdff',
        weibo: '#f85f61',
        alipay: '#1684ff',
      },
    },
  },
  extend: {},
  plugins: [
    // tailwindcssAnimate,
    // addDynamicIconSelectors(),
  ],

}

export default config
