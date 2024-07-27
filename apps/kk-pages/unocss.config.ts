import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

import { presetExtra } from 'unocss-preset-extra'
import { presetHeroPatterns } from '@julr/unocss-preset-heropatterns'

import { presetChroma, presetKColor, presetKUtils } from './src/preset/unocss'

export default defineConfig({

  theme: {},
  rules: [],
  shortcuts: [],
  presets: [
    presetUno({}),
    (presetKColor as any)({}),
    presetAttributify(),
    presetIcons({ scale: 1.2 }),
    presetTypography(),
    presetChroma({ steps: 10 }),
    presetHeroPatterns(),
    presetExtra(),
    presetKUtils({}),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
