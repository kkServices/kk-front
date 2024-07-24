<script setup lang="ts">
definePageMeta({ layout: 'empty' })
useHead({
  link: [
    { rel: 'manifest', href: '/manifest/doorlock.json' },
    { rel: 'apple-touch-icon-precomposed', href: 'https://bu.dusays.com/2022/03/01/d71f96540e09e.jpg' },
  ],
  meta: [
    { name: 'description', content: '我爱上班' },
  ],
})

const route = useRoute<'third-doorlock'>()
const id = route.query.id

const { status, data, refresh } = await useFetch<{ data: string }>('https://api.antmoe.com/api/open/company/soho', {
  params: { userLinglingid: id },
})
const isLoading = computed(() => status.value === 'pending' || status.value === 'idle')

onMounted(() => {
  if (!data.value?.data) {
    refresh()
  }
})
</script>

<template>
  <div class="h-screen overflow-hidden flex-center flex-col gap-4">
    <div class="h-60 w-60 flex-center">
      <ClientOnly>
        <QRCode class="h-full w-full" :text="data?.data" />
        <template #fallback>
          <UiSkeleton class="h-full w-full" />
        </template>
      </ClientOnly>
    </div>
    <UButton class="justify-center w-32 " size="md" :loading="isLoading" :disabled="isLoading" @click="() => refresh()">
      刷新
    </UButton>
  </div>
</template>

<style scoped>

</style>
