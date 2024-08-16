<script setup lang="ts">
const formData = reactive({
  a: 1,
  b: 2,
});

const { data, execute } = useFetch('/api/now', {
  method: 'post',
  body: formData,
});

function onClick(value: any) {
  formData.a = value.a;
  formData.b = value.b;
  execute();
}
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
          <Button label="request" @click="() => onClick({ a: 1 })" />
        </div>
      </div>
    </template>
  </suspense>
</template>

<style scoped>

</style>
