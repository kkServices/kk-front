<script setup lang="ts">
const route = useRoute<'donate-type'>();
const type = route.params.type || 'default';
useHead({
  title: '要饭网',
  titleTemplate: (title) => `${title}`,
  script: [
    { src: 'https://www.recaptcha.net/recaptcha/api.js?render=6LcYZCQqAAAAAO9bjJLxXZciH5Uu_Hm6DfFZpZgt' },
  ],
  link: [
    { rel: 'preconnect', href: 'https://www.recaptcha.net' },
    { rel: 'preconnect', href: 'https://www.gstatic.com' },
  ],
});

const typeUpper = type.charAt(0).toUpperCase() + type.slice(1);

const AsyncComponent = defineAsyncComponent(() => {
  return import((`~/components/Donate/${typeUpper}Form/index.vue`))
    .catch(() => import('~/components/Donate/DefaultForm/index.vue'));
});
</script>

<template>
  <div class="mx-auto box-border grid max-w-[1440px] grid-cols-12 px-6 md:px-0">
    <div
      class=" col-span-12 mt-6 box-border rounded-lg px-6 py-10 shadow-xl bg-card sm:col-span-12 md:col-span-6 md:col-start-4"
    >
      <suspense>
        <component :is="AsyncComponent" />
      </suspense>

      <DonatePayList class="mt-5" />
    </div>
  </div>
</template>

<style scoped></style>
