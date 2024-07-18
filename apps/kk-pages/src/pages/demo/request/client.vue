<script setup lang="ts">
const { data, execute, status } = await useRequest(
  '/member/detail',
  { immediate: false, meta: { ignoreLogin: true } },
)
</script>

<template>
  <suspense>
    <template #fallback>
      <p>loading </p>
    </template>
    <template #default>
      <div>
        客户端请求
        <div>
          {{ data }}
        </div>
        <div>
          <van-button type="primary" :loading="status === 'pending'" @click="execute">
            request
          </van-button>
        </div>
      </div>
    </template>
  </suspense>
</template>

<style scoped>

</style>
