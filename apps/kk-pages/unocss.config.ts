import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

import KColorPreset from './src/preset/unocss/color'

export default defineConfig({

  theme: {},
  shortcuts: [],
  presets: [

    presetUno({}),
    presetAttributify(),
    presetIcons({ scale: 1.2 }),
    presetTypography(),
    (KColorPreset as any)({}),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
