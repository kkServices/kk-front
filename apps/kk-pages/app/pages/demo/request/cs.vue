<script setup lang="ts">
import { useRequest } from '~/composables/useRequest'

const { data, refresh, error } = useRequest<{ ip: string }>('/open/ip', {
  method: 'get',
})
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
          {{ error.code }} - {{ error.message }} - {{ error.data }}
        </div>
        <Button label="refresh" @click="() => refresh()" />
      </div>
    </template>
  </suspense>
</template>

<style scoped>

</style>
