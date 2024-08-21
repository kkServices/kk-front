<script setup lang='ts'>
const { count, inc, dec } = useCount();
</script>

<template>
  <div class="my-3 inline-flex">
    <Button icon="icon-[carbon--subtract]" rounded aria-label="add" @click="dec()" />
    <div class="m-auto inline-block w-15 font-mono">
      {{ count }}
    </div>

    <Button icon="icon-[carbon--add]" rounded aria-label="add" @click="inc()" />
  </div>
</template>
