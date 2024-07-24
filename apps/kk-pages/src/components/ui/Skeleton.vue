<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@kk-project/utils/index'

interface SkeletonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<SkeletonProps>()
</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-[rgba(0,0,0,0.06)]', props.class)" />
</template>
