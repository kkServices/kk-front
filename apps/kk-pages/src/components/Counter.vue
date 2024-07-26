<script setup lang='ts'>
const { count, inc, dec } = useCount()
</script>

<template>
  <div class="inline-flex my-3">
    <button class="rounded-full p-2 btn" @click="dec()">
      <i class="i-carbon-subtract " />
    </button>
    <div class="m-auto inline-block w-15 font-mono">
      {{ count }}
    </div>
    <button class="rounded-full p-2 btn" @click="inc()">
      <i class="i-carbon-add" />
    </button>
  </div>
</template>
