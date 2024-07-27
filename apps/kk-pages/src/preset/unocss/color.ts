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
        color[short] = color[key]
    })
  }
})

const kColorPreset = definePreset((_options?: MyPresetOptions) => {
  return {
    name: 'k-color-preset',
    theme: { colors },
    rules: [
      // ['text-primary', 'text-primary-500 dark:text-primary-300'],
      // ['bg-primary', 'bg-primary-500 dark:text-primary-300'],
    ],
    variants: [
      // ...
    ],
    // it supports most of the configuration you could have in the root config
  }
})

export default kColorPreset
