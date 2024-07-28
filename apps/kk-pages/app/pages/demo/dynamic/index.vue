<script setup lang="ts">
const { data } = useAsyncData(() => {
  return $fetch('/api/home')
})
const AsyncComponent = defineAsyncComponent(() => {
  return import((`~/components/CustomConfigComp/${data.value?.datas.random}.vue`))
})
</script>

<template>
  <suspense>
    <component :is="AsyncComponent" />
  </suspense>
</template>

<style scoped>

</style>
