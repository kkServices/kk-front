<script setup lang="ts">
const { data, error, status } = await useRequest(
  '/member/detail',
  {

    method: 'post',
    meta: {
      ignoreLogin: true,
      // isTransformResponse:true
    },
  },
)
</script>

<template>
  <suspense>
    <template #default>
      <div>
        <div v-if="status === 'pending'">
          loading
        </div>
        <div v-else-if="error">
          page:
          {{ error.statusCode }} - {{ error.message }} - {{ error.data }}
        </div>
        <p v-if="data" text-red>
          服务端请求 {{ data }}
        </p>
      </div>
    </template>

    <template #fallback>
      <p>loading </p>
    </template>
  </suspense>
</template>

<style scoped>

</style>
