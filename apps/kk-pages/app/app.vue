<script setup lang="ts">
import { appName } from '~~/constants'

useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,maximum-scale=1.0,user-scalable=no',
    },
  ],
  titleTemplate: (productCategory) => {
    return productCategory
      ? `${productCategory} - ${appName}`
      : appName
  },
  script: [
    {
      innerHTML: `let _lastTouchEnd = 0
document.addEventListener('touchend', (event) => {
  const now = (new Date()).getTime()
  if ((now - _lastTouchEnd) <= 300) {
    event.preventDefault()
  }
  _lastTouchEnd = now
}, false)`,
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
