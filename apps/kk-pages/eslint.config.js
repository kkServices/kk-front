import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'
import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt(
  antfu(
    {
      unocss: false,
      formatters: true,
      ignores: [
        '**/primevue/preset/**',
      ],
    },
    [

      ...tailwind.configs['flat/recommended'],
    ],
  ),
)
