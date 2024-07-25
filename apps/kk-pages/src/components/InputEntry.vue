<script setup lang="ts">
const name = ref('')

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div>
    <input
      id="input"
      v-model="name"
      class="px-4 py-2 mt-5 w-[350px] text-center bg-transparent border rounded border-gray-200 dark:border-gray-700 outline-none focus:outline-none active:outline-none"
      placeholder="What's your name?"
      type="text" autocomplete="off"
      @keydown.enter="go"
    >
    <div>
      <UButton class="m-3" :disabled="!name" @click="go">
        GO
      </UButton>
    </div>
  </div>
</template>
