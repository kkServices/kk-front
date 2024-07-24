<script setup lang="ts">
import QRCode from 'qrcode'

interface Props {
  text: string
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
})

const url = useState('qrcode-url', () => props.text)

watchEffect(() => {
  QRCode.toDataURL(props.text || '', { margin: 0 })
    .then((r) => {
      url.value = r
    })
    .catch((err) => {
      console.error(err)
    })
})
</script>

<template>
  <div class="flex-center">
    <img v-if="url" class="h-full w-full" :src="url" alt="">
  </div>
</template>

<style scoped>

</style>
