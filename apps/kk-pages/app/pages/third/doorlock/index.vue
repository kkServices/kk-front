<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const route = useRoute<'third-doorlock'>();
const id = route.query.id;
definePageMeta({ layout: 'empty' });
useHead({
  link: [
    { rel: 'manifest', href: `/api/manifest/doorlock?id=${id}` },
    { rel: 'apple-touch-icon-precomposed', href: 'https://bu.dusays.com/2022/03/01/d71f96540e09e.jpg' },
  ],
  meta: [
    { name: 'description', content: '我爱上班' },
  ],
});
const currentHour = new Date().getHours();

const { data, refresh, error, status } = useRequest('/company/jxk/doorlock', {
  params: { userLinglingid: id },
});
const isLoading = computed(() => status.value === 'pending' || status.value === 'idle');

onMounted(() => {
  if (currentHour <= 10) {
    toast.add({ severity: 'warn', summary: '勇敢滴少年呦，牛马的一天要开始了呦', life: 5000 });
  }
});

watchEffect(() => {
  if (error.value) {
    if (import.meta.client) {
      setTimeout(() => {
        toast.add({ styleClass: 'error-toast', severity: 'error', summary: `发生了一小点子错误`, life: 2000, closable: false });
      }, 0);
    }
  }
});
</script>

<template>
  <div>
    <div class="h-screen flex-col gap-4 overflow-hidden flex-center">
      <template v-if="error">
        <k-skeleton class="size-60" />
      </template>

      <div v-else class="size-60 flex-center">
        <ClientOnly>
          <k-qrcode class="size-60 cursor-pointer" :loading="isLoading" :text="data?.result" @click="() => refresh()" />
          <template #fallback>
            <k-skeleton class="size-60" />
          </template>
        </ClientOnly>
      </div>

      <Button class="cursor-pointer" type="button" label="刷新" :loading="isLoading" @click="() => refresh()" />
      <DarkToggle />
    </div>

    <Toast position="top-center" />
  </div>
</template>
