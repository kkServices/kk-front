import postcssConfig from '@kk-project/tailwind-config/postcss';
import { appDescription } from './constants';

export default defineNuxtConfig({
  extends: ['@kk-project/nuxt-layer'],

  appId: 'kk-donate',

  imports: {
    dirs: ['composables/**'],
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    [
      '@vee-validate/nuxt',
      {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
          Form: 'VeeForm',
          Field: 'VeeField',
          FieldArray: 'VeeFieldArray',
          ErrorMessage: 'VeeErrorMessage',
        },
      },
    ],
  ],

  runtimeConfig: {
    baseApiHost: '',
    baseAlipayAppId: '',
    baseAlipayPrivateKey: '',
    baseAlipayPublicKey: '',
    baseAlipayGateway: '',
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
    componentIslands: true,
  },

  css: [
    '~/style/index.scss',
  ],

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
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
      viewport: 'width=device-width,initial-scale=1,maximum-scale=1.0,user-scalable=no',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1.0,user-scalable=no' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#f7f9fe' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#18171d' },
      ],
      script: [
        {
          innerHTML: `let _lastTouchEnd=0;document.addEventListener('touchend',(event)=>{const now=(new Date()).getTime();if((now-_lastTouchEnd)<=300){event.preventDefault()};_lastTouchEnd=now},false)`,
        },
      ],
    },
  },

  devtools: {
    enabled: true,
  },

  future: {
    compatibilityVersion: 4,
  },

  features: {
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  postcss: postcssConfig,
  routeRules: {},
  primevue: {
    components: {},
    options: {
      unstyled: true,
      ripple: false,
    },
    importPT: { as: 'Aura', from: '@kk-project/ui-primevue/preset/aura' },
  },
  typescript: {
    typeCheck: false,
    strict: false,
  },
  compatibilityDate: '2024-07-20',
});
