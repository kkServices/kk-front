<script setup lang="ts">
import type { DonatePayModalProps } from './props'
import { defaultProps } from './props'
import { $fetchClient } from '~/service/kk-api/request/request.client'

const props = withDefaults(defineProps<DonatePayModalProps>(), defaultProps)
const emits = defineEmits(['paySuccess'])
const toastify = useToastify()
const visible = defineModel<boolean>('visible', { required: true })

const { data, refresh, status } = await useAsyncData('/donate/order/status', () => {
  return $fetchClient('/donate/order/status', {
    params: {
      outTradeNo: props.outTradeNo,
    },
  })
}, {
  immediate: false,
})

async function paySuccessHandler() {
  await refresh()
  if (data.value) {
    visible.value = false
    emits('paySuccess')
  }
  else {
    toastify.error('该订单暂未支付，请稍后重试')
  }
}

function payCancelHandler() {
  visible.value = false
}
</script>

<template>
  <Dialog
    v-model:visible="visible" modal header="支付" class="box-border w-100 max-w-[85vw] overflow-hidden" :closable="false" :pt="{
      header: {
        // class: 'p-4',
      },
    }"
  >
    <template #header>
      <div />
    </template>
    <Message :severity="props.isApi ? 'info' : 'warn'" class="my-2">
      {{ props.isApi ? '请使用支付宝扫码' : '由于收款限额，此码为静态码，请等待站长手动更改订单状态后，才可显示' }}
    </Message>
    <div class="flex-center">
      <QRCode :text="props.qrCode" :loading="false" class="size-40" />
    </div>

    <div class="my-2 flex justify-center gap-2">
      <Button class="flex-1" type="button" label="取消" severity="secondary" @click="payCancelHandler" />
      <Button v-if="props.outTradeNo" :loading="status === 'pending'" class="flex-1" type="button" label="赞助成功" @click="paySuccessHandler" />
    </div>
  </Dialog>
</template>
