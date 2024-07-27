<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

const toast = useToast()
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
const currentHour = new Date().getHours()
const route = useRoute<'third-doorlock'>()
const id = route.query.id

const { status, data, refresh } = await useFetch<{ data: string }>(
  'https://api.antmoe.com/api/open/company/soho',
  {
    params: { userLinglingid: id },
  },
)
const isLoading = computed(() => status.value === 'pending' || status.value === 'idle')

onMounted(() => {
  if (!data.value?.data) {
    refresh()
  }
  if (currentHour <= 10) {
    toast.add({ severity: 'warn', summary: '勇敢滴少年呦，牛马的一天要开始了呦', life: 5000 })
  }
})
</script>

<template>
  <div>
    <div class="flex-center h-screen flex-col gap-4 overflow-hidden">
      <div class="flex-center h-60 w-60">
        <ClientOnly>
          <QRCode class="h-60 w-60" :text="data?.data" />
          <template #fallback>
            <Skeleton class="h-60 w-60" />
          </template>
        </ClientOnly>
      </div>

      <Button type="button" label="刷新" :loading="isLoading" @click="refresh" />

      <DarkToggle />
    </div>
    <Toast position="top-center" />
  </div>
</template>

<style scoped>

</style>
