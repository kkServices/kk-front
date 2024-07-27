<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const route = useRoute<'third-doorlock'>()
const id = route.query.id
definePageMeta({ layout: 'empty' })
useHead({
  link: [
    { rel: 'manifest', href: `/api/manifest/doorlock?id=${id}` },
    { rel: 'apple-touch-icon-precomposed', href: 'https://bu.dusays.com/2022/03/01/d71f96540e09e.jpg' },
  ],
  meta: [
    { name: 'description', content: '我爱上班' },
  ],
})
const currentHour = new Date().getHours()

const { status, data, refresh, error } = await useFetch<{ data: string }>(
  'https://api.antmoe.com/api/open/company/soho',
  {
    params: { userLinglingid: id },
    server: false,
  },
)
const isLoading = computed(() => status.value === 'pending' || status.value === 'idle')

onMounted(() => {
  if (currentHour <= 10) {
    toast.add({ severity: 'warn', summary: '勇敢滴少年呦，牛马的一天要开始了呦', life: 5000 })
  }
})

watchEffect(() => {
  if (error.value) {
    toast.add({ severity: 'error', summary: `发生了一小点子错误:${error.value.statusCode}`, life: 5000 })
  }
})
</script>

<template>
  <div>
    <div class="h-screen flex-center flex-col gap-4 overflow-hidden">
      <template v-if="error">
        <K-Skeleton class="h-60 w-60" />
      </template>

      <div v-else class="h-60 w-60 flex-center">
        <ClientOnly>
          <QRCode class="h-60 w-60 cursor-pointer" :loading="isLoading" :text="data?.data" @click="() => refresh()" />
          <template #fallback>
            <K-Skeleton class="h-60 w-60" />
          </template>
        </ClientOnly>
      </div>

      <Button class="cursor-pointer" type="button" label="刷新" :loading="isLoading" @click="() => refresh()" />
      <DarkToggle />
    </div>

    <Toast position="top-center" />
  </div>
</template>
