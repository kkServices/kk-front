<script setup lang="ts">
// const { data: defaultData } = await useRequest('/member/detail', {
//   method: 'post',
//   meta: {
//     ignoreLogin: true,
//     // isTransformResponse:true
//   },
// })

const { data, error, status, execute } = await useRequest(
  '/member/detail',
  {

    method: 'post',
    // immediate: false,
    // default: () => {
    // return defaultData.value
    // },
    meta: {
      ignoreLogin: true,
      // isTransformResponse:true
    },
  },
)
</script>

<template>
  <suspense>
    <template #fallback>
      <p>loading </p>
    </template>
    <template #default>
      <div>
        <div v-if="data">
          服务端初始化数据，客户端可请求
          <div>
            data: {{ data }}
          </div>
        </div>
        <div v-else-if="error">
          error
          <br>
          {{ error.statusCode }} - {{ error.message }} - {{ error.data }}
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
