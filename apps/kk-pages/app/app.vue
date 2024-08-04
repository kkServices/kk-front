<script setup lang="ts">
import { appName } from '~~/constants'

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
