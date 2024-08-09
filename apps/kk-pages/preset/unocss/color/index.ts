import { definePreset } from 'unocss'
import { generateColors } from '@kk-project/utils/index'

interface MyPresetOptions {

}

const colors = {
  primary: generateColors('primary'),
}
Object.values(colors).forEach((color) => {
  if (color !== undefined) {
    color.DEFAULT = color.DEFAULT || color[500] as string
    Object.keys(color).forEach((key) => {
      const short = +key / 100
      if (short === Math.round(short))
        color[short] = color[key] as string
    })
  }
})

const presetKColor = definePreset((_options?: MyPresetOptions) => {
  return {
    name: 'preset-k-color',
    theme: { colors },
    rules: [],
    variants: [],
    shortcuts: [
      ['bg-card', 'bg-[var(--k-card-bg-color)]'],
    ],
  }
})

export default presetKColor
export { presetKColor }
