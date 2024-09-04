<script setup lang="ts">
definePageMeta({
  layout: 'home',
});

const socialIcon = [
  {
    icon: 'icon-[tabler--brand-github-filled] text-black dark:text-white',
    link: 'https://github.com/kkfive',
    title: 'Github',
  },
  {
    icon: 'icon-[ri--yuque-fill] text-[#00b96b]',
    link: 'https://www.yuque.com/kkblog',
    title: '知识库',
  },
  {
    icon: 'icon-[mdi--donate] text-yellow-300',
    link: 'https://kkfive.top',
    title: '要饭网',
  },
];
</script>

<template>
  <div class=" mx-10 w-[700px] md:mx-0">
    <div class="flex w-full flex-col overflow-hidden rounded-2xl bg-card md:flex-row">
      <div class="bg-blur box-border flex-col gap-2 px-14 py-4 flex-center md:gap-6 md:py-12">
        <div class="size-20 overflow-hidden rounded-full">
          <img src="https://api.antmoe.com/api/p/avatar" alt="">
        </div>
        <div class="text-center">
          <h1 class="text-xl font-bold leading-8">
            DreamyTZK
          </h1>
          <p>懒人</p>
        </div>
      </div>
      <div class="mt-10 flex-1 flex-col gap-8 px-4 py-6 flex-center md:mt-0 md:gap-16 md:px-12 md:py-0">
        <div>
          A front-end developer / <a href="https://www.16personalities.com/ch/istj-%E4%BA%BA%E6%A0%BC" target="_blank">ISTJ</a>
        </div>
        <div class="flex gap-10 text-xl">
          <a v-for="item in socialIcon" :key="item.title" :href="item.link" class="a-tooltip relative cursor-pointer" :title="item.title">
            <i :class="item.icon" />
          </a>
        </div>
      </div>
    </div>
    <div class="mt-6 flex flex-col text-center text-gray-400 flex-center md:flex-row dark:text-gray-500">
      <div>
        Made by <span class="mx-2 rounded-md bg-gray-200 px-1 text-sm dark:bg-gray-700">DreamyTZK</span>
      </div>
      <span class="mx-4 hidden md:block">|</span>
      <a target="_blank" rel="noopener external nofollow noreferrer noopener" href="https://beian.miit.gov.cn/#/Integrated/index">ICP冀ICP备19016383号-2</a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a-tooltip {
  &::after {
    background: rgba(48, 55, 66, 0.6);
    border-radius: 4px;
    color: #fafafa;
    content: attr(title);
    display: block;
    margin-top: 4px;
    font-size: 14px;
    max-width: 300px;
    opacity: 0;
    overflow: hidden;
    padding: 3px 6px;
    pointer-events: none;
    position: absolute;
    text-overflow: ellipsis;
    transform: translate(-50%, 0.4rem);
    transition:
      opacity 0.2s,
      transform 0.2s;
    white-space: pre;
    z-index: 300;
    left: 50%;
    bottom: auto;
    top: 100%;
  }
  &:hover::after {
    opacity: 1;
    transform: translate(-50%, -0.2rem);
  }
}

.bg-blur {
  //background-image: url('https://cdn1.tianli0.top/npm/kang-static@latest/avatar.jpg');
  position: relative;
  background-size: cover;
  z-index: 1;
  &::before {
    background: url('https://api.antmoe.com/api/p/avatar');
    content: '';
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    filter: blur(12px);
  }
}
</style>
