import { definePreset } from 'unocss'

interface MyPresetOptions {

}

const presetKUtils = definePreset((_options?: MyPresetOptions) => {
  return {
    name: 'preset-k-utils',
    shortcuts: [
      ['flex-center', 'flex items-center justify-center'],
      ['flex-center-x', 'flex items-center'],
      ['flex-center-y', 'flex justify-center'],
    ],
    variants: [],
  }
})

export default presetKUtils
export { presetKUtils }
