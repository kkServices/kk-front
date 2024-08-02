<script setup lang="ts">
const route = useRoute<'donate-type'>()
const type = route.params.type || 'default'

const typeUpper = type.charAt(0).toUpperCase() + type.slice(1)

const AsyncComponent = defineAsyncComponent(() => {
  return import((`~/components/Donate/${typeUpper}Form/index.vue`))
    .catch(() => import('~/components/Donate/DefaultForm/index.vue'))
})
</script>

<template>
  <div class="grid grid-cols-12 mx-auto box-border max-w-[1440px]">
    <div
      class="col-span-10 col-start-2 mt-6 box-border rounded-2 bg-card px-6 py-10 shadow-xl md:(col-span-8 col-start-3) sm:(col-span-10 col-start-2)"
    >
      <suspense>
        <component :is="AsyncComponent" />
      </suspense>
    </div>
  </div>
</template>

<style scoped></style>
