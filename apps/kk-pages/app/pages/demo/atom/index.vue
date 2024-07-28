<script setup lang="ts">
</script>

<template>
  <div>
    <p class="text-primary">
      一段文字
    </p>
    <div>
      图标：<div class="i-heroicons-light-bulb" />
    </div>
    <div class="flex gap-4">
      <div class="h-60 w-60 rounded-full chroma-linear-rgb-#a18cd1-#fbc2eb" />
      <div class="h-60 w-60 rounded-full chroma-stops-rgb-#a18cd1-#fbc2eb-#f1f1f1" />
      <div class="chroma-shape-contour h-60 w-60 rounded-full chroma-linear-rgb-#a18cd1-#fbc2eb" />
      <div class="linear h-60 w-60 rounded-full" />
      <!--      <div class="bg-hero-floating-cogs-#ebebeb h-60 w-60" /> -->
    </div>
  </div>
</template>

<style scoped>
.linear {
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
}
</style>
