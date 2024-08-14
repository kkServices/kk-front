<script setup lang="ts">
const online = useOnline()
</script>

<template>
  <div class="mt-40 text-center">
    <Logos class="mb-6" />
    <Suspense>
      <ClientOnly>
        <PageView v-if="online" />
        <div v-else class="text-gray-500/80">
          You're offline
        </div>
      </ClientOnly>
      <template #fallback>
        <div class="block italic">
          <span class="animate-pulse">Loading...</span>
        </div>
      </template>
    </Suspense>
    <InputEntry />
  </div>
</template>
