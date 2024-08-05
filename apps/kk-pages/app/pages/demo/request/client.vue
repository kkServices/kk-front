<script setup lang="ts">
const { data, execute } = await useRequest(
  '/user/query',
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
          <Button label="request" @click="() => execute()" />
        </div>
      </div>
    </template>
  </suspense>
</template>

<style scoped>

</style>
