<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
    },
  ],
  titleTemplate: (productCategory) => {
    return productCategory
      ? `${productCategory} - ${appName}`
      : appName
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  max-width: 750px;
  margin: 0 auto;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
