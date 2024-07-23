<script setup lang="ts">
definePageMeta({ layout: 'empty' })
useHead({
  link: [
    { rel: 'manifest', href: '/manifest/doorlock.json' },
    { rel: 'apple-touch-startup-image', href: 'https://bu.dusays.com/2022/03/01/d71f96540e09e.jpg' },
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
  if (!data) {
    refresh()
  }
})
</script>

<template>
  <div h-screen flex-center flex-col>
    <div h-65 w-65 flex-center>
      <ClientOnly>
        <QRCode h-full w-full :text="data?.data" />
        <template #fallback>
          <UiSkeleton class="h-full w-full" />
        </template>
      </ClientOnly>
    </div>
    <button flex-center btn :disabled="isLoading" @click="() => refresh()">
      <i v-if="isLoading" class="i-eos-icons-bubble-loading inline-block" />
      刷新
    </button>
  </div>
</template>

<style scoped>

</style>
