// noinspection ES6PreferShortImport

import { appDescription } from './src/constants'
import primevuePreset from './src/preset/primevue'

export default defineNuxtConfig({
  srcDir: 'src',
  imports: {
    dirs: ['composables/**'],
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@primevue/nuxt-module',
  ],

  runtimeConfig: {
    baseApiHost: '',
    public: {
      baseApiHost: '',
    },
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/style/index.scss',
  ],

  colorMode: {
    // preference: 'system', // default value of $colorMode.preference
    fallback: 'system', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
    dataValue: 'theme',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
    },
  },

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#f7f9fe' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#18171d' },
      ],
    },
  },

  devtools: {
    enabled: true,
  },

  features: {
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  postcss: {
    plugins: {
      '@unocss/postcss': {},
      'autoprefixer': {},
    },
  },
  primevue: {
    components: {
      // prefix: 'Pv',
    },
    options: {
      theme: {
        preset: primevuePreset,
        options: {
          darkModeSelector: '[date-theme="dark"]',
        },
      },
      ripple: true,
    },
  },
  compatibilityDate: '2024-07-20',
})
