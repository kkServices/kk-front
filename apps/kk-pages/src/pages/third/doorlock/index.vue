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

const { status, data, refresh, error } = await useFetch<{ data: string }>('https://api.antmoe.com/api/open/company/soho', {
  params: { userLinglingid: id },
})
const isLoading = computed(() => status.value === 'pending' || status.value === 'idle')

onMounted(() => {
  if (error.value) {
    refresh()
  }
})
</script>

<template>
  <div h-screen flex-center flex-col>
    <div h-60 w-60 flex-center>
      <ClientOnly>
        <QRCode h-full w-full :text="data?.data" />
        <template #fallback>
          <i class="i-eos-icons-bubble-loading block" />
        </template>
      </ClientOnly>
    </div>
    <button class="btn" :disabled="isLoading" @click="() => refresh()">
      <i v-if="isLoading" class="i-eos-icons-bubble-loading inline-block" />
      刷新
    </button>
  </div>
</template>

<style scoped>

</style>
