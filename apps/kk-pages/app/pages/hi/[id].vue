<script setup lang="ts">
const route = useRoute<'hi-id'>();
const user = useUserStore();
const name = route.params.id;

watchEffect(() => {
  user.setNewName(route.params.id as string);
});

definePageMeta({
  layout: 'home',
});
</script>

<template>
  <div>
    <div class="icon-[twemoji--waving-hand] inline-block animate-shake-x text-4xl duration-5000" />
    <h3 class="text-5xl font-500">
      Hi,
    </h3>
    <div class="text-3xl">
      {{ name }}!
    </div>

    <template v-if="user.otherNames.length">
      <div class="my-4 text-sm">
        <span class="opacity-50">Also as known as:</span>
        <ul>
          <li v-for="otherName in user.otherNames" :key="otherName">
            <router-link :to="`/hi/${otherName}`" replace>
              {{ otherName }}
            </router-link>
          </li>
        </ul>
      </div>
    </template>

    <Counter />

    <div>
      <NuxtLink
        class="m-3"
        to="/"
      >
        <Button>Back</Button>
      </NuxtLink>
    </div>
  </div>
</template>
