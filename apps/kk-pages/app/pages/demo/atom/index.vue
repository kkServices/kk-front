<script setup lang="ts">
</script>

<template>
  <div>
    <p class="text-primary">
      一段文字 text-primary
    </p>
    <p class="text-red-500">
      一段文字 text-red
    </p>
    <div>
      图标：<div class="icon-[heroicons--light-bulb]" />
    </div>
    <div class="flex gap-4">
      <div class="chroma-linear-rgb-#a18cd1-#fbc2eb size-60 rounded-full" />
      <div class="chroma-stops-rgb-#a18cd1-#fbc2eb-#f1f1f1 size-60 rounded-full" />
      <div class="chroma-shape-contour chroma-linear-rgb-#a18cd1-#fbc2eb size-60 rounded-full" />
      <div class="linear size-60 rounded-full" />
      <!--      <div class="bg-hero-floating-cogs-#ebebeb h-60 w-60" /> -->
    </div>
  </div>
</template>

<style scoped>
.linear {
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
}
</style>
