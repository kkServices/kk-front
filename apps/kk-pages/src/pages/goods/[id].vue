<script setup lang="ts">
const AsyncComponent = defineAsyncComponent(() => {
  return import('~/components/GoodsDetail.vue')
})
</script>

<template>
  <component :is="AsyncComponent" />
</template>

<style scoped>

</style>
