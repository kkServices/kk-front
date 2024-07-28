<script setup lang="ts">
const route = useRoute<'hi-id'>()
const user = useUserStore()
const name = route.params.id

watchEffect(() => {
  user.setNewName(route.params.id as string)
})

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div>
    <div class="i-twemoji-waving-hand inline-block animate-shake-x animate-duration-5000 text-4xl" />
    <h3 class="text-5xl font-500">
      Hi,
    </h3>
    <div class="text-3xl">
      {{ name }}!
    </div>

    <template v-if="user.otherNames.length">
      <p class="my-4 text-sm">
        <span class="opacity-50">Also as known as:</span>
        <ul>
          <li v-for="otherName in user.otherNames" :key="otherName">
            <router-link :to="`/hi/${otherName}`" replace>
              {{ otherName }}
            </router-link>
          </li>
        </ul>
      </p>
    </template>

    <Counter />

    <div>
      <NuxtLink
        class="btn m-3"
        to="/"
      >
        <Button>Back</Button>
      </NuxtLink>
    </div>
  </div>
</template>
