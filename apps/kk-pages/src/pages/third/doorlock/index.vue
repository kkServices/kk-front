<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'manifest',
      href: '/manifest/doorlock.json',
    },
  ],
})

const route = useRoute<'third-doorlock'>()
const id = route.query.id

const { status, data, refresh } = await useFetch<{ data: string }>('https://api.antmoe.com/api/open/company/soho', {
  params: { userLinglingid: id },
})
const isLoading = computed(() => status.value === 'pending' || status.value === 'idle')
</script>

<template>
  <div flex-center h-screen flex-col>
    <ClientOnly>
      <QRCode h-60 w-60 :text="data?.data" />
    </ClientOnly>
    <button class="btn" :disabled="isLoading" @click="() => refresh()">
      <i v-if="isLoading" class="i-eos-icons-bubble-loading inline-block" />
      刷新
    </button>
  </div>
</template>

<style scoped>

</style>
