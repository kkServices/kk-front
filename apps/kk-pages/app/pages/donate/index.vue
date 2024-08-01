<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const [visible, setVisible] = useToggle(false)

const moneySelect = ref<number | string>()
const moneyList = ref([
  { name: '1.00', value: 1 },
  { name: '2.00', value: 2 },
  { name: '爷自己写', value: 'custom' },
])
const isShowCustomInputNumber = computed(() => moneySelect.value === 'custom')

const { errors, defineField, handleSubmit, setFieldValue, resetField } = useForm({

  validationSchema: toTypedSchema(
    z.object({
      money: z.number({ message: '请输入金额' }).min(0.01).max(1000, { message: '最大金额1000' }),
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

const onSubmit = handleSubmit((_values) => {
  setVisible(true)
})

function randomMessage() {
  const messages = [
    '111',
    '2222',
    '3333',
    '4444',
  ]
  const randomIndex = Math.floor(Math.random() * messages.length)
  setFieldValue('message', messages[randomIndex])
}
</script>

<template>
  <div>
    <div class="grid grid-cols-12 mx-auto box-border max-w-[1440px]">
      <div
        class="col-span-10 col-start-2 mt-6 box-border rounded-2 bg-[var(--k-card-bg-color)] px-6 py-10 shadow-xl md:(col-span-8 col-start-3) sm:(col-span-10 col-start-2)"
      >
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
              <Button label="整两句" class="leading-none" outlined @click="randomMessage" />
            </label>
            <Textarea v-model="message" :class="{ 'p-invalid': errors.message }" name="message" rows="2" />
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

          <Button class="mt-4" type="submit" label="submit" />
        </VeeForm>
      </div>
    </div>

    <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
      <span class="text-surface-500 dark:text-surface-400 mb-8 block">Update your information.</span>
      <div class="mb-4 flex items-center gap-4">
        <label for="username" class="w-24 font-semibold">Username</label>
        <InputText id="username" class="flex-auto" autocomplete="off" />
      </div>
      <div class="mb-8 flex items-center gap-4">
        <label for="email" class="w-24 font-semibold">Email</label>
        <InputText id="email" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false" />
        <Button type="button" label="Save" @click="visible = false" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped>

</style>
