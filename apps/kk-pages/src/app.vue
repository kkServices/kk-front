<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  // title: appName,
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
