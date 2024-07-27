<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'
import type { QRCodeProps } from './props'
import { defaultProps } from './props'

const props = withDefaults(defineProps<QRCodeProps>(), defaultProps)

const text = toRef(props, 'text')

const url = useQRCode(text, { margin: 0 })
</script>

<template>
  <img v-if="url" class="h-full w-full" :src="url" alt="">
</template>

<style scoped>

</style>
