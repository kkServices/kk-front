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
      class="mt-5 w-[350px] rounded border border-gray-200 bg-transparent px-4 py-2 text-center outline-none focus:outline-none active:outline-none dark:border-gray-700"
      placeholder="What's your name?"
      type="text" autocomplete="off"
      @keydown.enter="go"
    >
    <div>
      <Button class="m-3" :disabled="!name" @click="go">
        GO
      </Button>
    </div>
  </div>
</template>
