<script setup lang="ts">
const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

const isDark = computed(() => color.value === 'dark')

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <ClientOnly>
      <UIcon :name="!isDark ? 'i-carbon-sun' : 'i-carbon-moon'" />
      <template #fallback>
        <UIcon name="i-eos-icons-three-dots-loading" />
      </template>
    </ClientOnly>
  </button>
</template>
