/* eslint-disable ts/no-require-imports */
import type { Config } from 'tailwindcss'

const config: Config = {

  content: [],
  theme: {
    extend: {
      colors: {
        'pattern-light': '#ebebeb',
        'pattern-dark': '#2a2a2a',
      },
    },
  },
  plugins: [
    require('@lorenzopalaia/tailwind-hero-patterns'),
  ],
}

export default config
