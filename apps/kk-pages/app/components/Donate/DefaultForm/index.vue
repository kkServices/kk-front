<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { $fetchClient } from '~/service/kk-api/request/request.client'
import type { APIResponse } from '~/service/kk-api/type'

const [visible, setVisible] = useToggle(false)
const [paySuccessVisible] = useToggle(false)
const moneySelect = ref<number | string | null>()
const moneyList = ref([
  // { name: '0.01 测试一下', value: 0.01 },
  { name: '¥1.00  一次公交车', value: 1 },
  { name: '¥2.00  一颗茶叶蛋', value: 2 },
  { name: '¥4.50  一顿早餐', value: 4.5 },
  { name: '¥5.00  一次地铁', value: 5 },
  { name: '¥9.90  一杯瑞幸咖啡', value: 9.9 },
  { name: '¥20.00 一顿午餐', value: 20 },
  { name: '爷自己写', value: 'custom' },
])
const isShowCustomInputNumber = computed(() => moneySelect.value === 'custom')

const { errors, defineField, handleSubmit, setFieldValue, resetField, resetForm } = useForm({

  validationSchema: toTypedSchema(
    z.object({
      money: z.number({ message: '请输入金额' }).min(1).max(100000, { message: '最大金额1000' }),
      message: z.string({ message: '请输入留言' }).max(20, { message: '最长可输入20个字符哦！' }),
      email: z.union([z.string().email({ message: '请输入正确的邮箱' }), z.literal(''), z.undefined()]).optional(),
    }),
  ),
})

const [money] = defineField('money')
const [message] = defineField('message')
const [email] = defineField('email')

watch(moneySelect, () => {
  if (typeof moneySelect.value === 'number') {
    setFieldValue('money', moneySelect.value)
  }
  else {
    if (moneySelect.value === 'custom') {
      resetField('money')
    }
  }
})

const { data, execute, status, error } = await useAsyncData<APIResponse<'/donate/order/create'>>('/donate/order/create', () => {
  return $fetchClient('/donate/order/create', {
    body: {
      totalAmount: money.value,
      message: message.value,
      email: email.value || null,
    },
    method: 'POST',

  })
}, { immediate: false })

const onSubmit = handleSubmit(async (_values) => {
  await execute()
  if (!error.value) {
    setVisible(true)
  }
})
function paySuccessHandler() {
  setVisible(false)
  paySuccessVisible.value = true
  resetForm()
  moneySelect.value = null
  refreshNuxtData('/donate/order/status')
}

function randomMessage() {
  const messages = ['心中有梦，脚下就有路。', '风雨过后一定有彩虹。', '携手迎接每一个更好的明天。', '坚强是我们的必须。', '携手前行，共创未来。', '种下希望的种子，期待收获。', '每一步前进都是希望。']
  const randomIndex = Math.floor(Math.random() * messages.length)
  setFieldValue('message', messages[randomIndex])
}
</script>

<template>
  <div>
    <h1 class="text-center text-2xl font-bold">
      要饭网
    </h1>
    <div class="my-6 indent-8">
      <p>当想象力、创造力和巧克力都渐渐变得遥不可及，我只能向您寻求一点点温暖。您的善意不止是对我的帮助，更是一份珍贵的鼓励。</p>
      <p>
        同时也希望您通过
        <a class="text-primary" href="https://gongyi.qq.com/">腾讯公益</a>、
        <a class="text-primary" href="https://love.alipay.com/">支付宝公益</a>、
        <a class="text-primary" href="https://gongyi.sina.com.cn/">新浪公益</a>
        等平台，为更多无助的人点燃希望的火苗。您每一份微小的心意，都是通向未来的桥梁。
      </p>
    </div>
    <VeeForm class="flex flex-col gap-2" @submit="(onSubmit as any)">
      <div class="flex flex-col gap-2">
        <label class="block text-lg font-bold" for="money">金额</label>
        <Select v-model="moneySelect" :options="moneyList" option-label="name" option-value="value" placeholder="选择...." class="w-full" />
        <InputNumber v-show="isShowCustomInputNumber" v-model="money" name="money" :min-fraction-digits="0" :max-fraction-digits="2" />

        <p class="text-red-500">
          {{ errors.money }}
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <label class="block text-lg font-bold" for="name">
          留言
          <Button label="整两句" size="small" class="leading-none" outlined @click="randomMessage" />
        </label>
        <Textarea v-model="message" :class="{ 'p-invalid': errors.message }" name="message" maxlength="20" />
        <p class="text-red-500">
          {{ errors.message }}
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <label class="block text-lg font-bold" for="name">邮箱</label>
        <InputText v-model="email" :class="{ 'p-invalid': errors.email }" placeholder="用于头像显示" class="w-full" />
        <p class="text-red-500">
          {{ errors.email }}
        </p>
      </div>

      <Button :loading="status === 'pending'" class="mt-4" type="submit" label="提交" />
    </VeeForm>
    <DonatePayModal v-model:visible="visible" :qr-code="data?.qrCode" :is-api="data?.isApi" :out-trade-no="data?.outTradeNo" @pay-success="paySuccessHandler" />
    <DonatePaySuccessModal v-model:visible="paySuccessVisible" />
  </div>
</template>
