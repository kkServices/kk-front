<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'
import type { QRCodeProps } from './props'
import { defaultProps } from './props'

const props = withDefaults(defineProps<QRCodeProps>(), defaultProps)
const url = useQRCode(toRef(props.text), { margin: 0 })
</script>

<template>
  <div v-if="url" class="flex-center flex-col">
    <img class="h-full w-full" :src="url" alt="">
  </div>
</template>

<style scoped>

</style>
