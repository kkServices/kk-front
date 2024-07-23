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
  QRCode.toDataURL(props.text || '')
    .then((r) => {
      url.value = r
    })
    .catch((err) => {
      console.error(err)
    })
})
</script>

<template>
  <div flex-center>
    <img v-if="url" h-full w-full :src="url" alt="">
  </div>
</template>

<style scoped>

</style>
