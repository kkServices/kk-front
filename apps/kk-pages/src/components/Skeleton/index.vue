<script setup lang="ts">
import { cn } from '@kk-project/utils/index'
import type { SkeletonProps } from './props'
import { defaultProps } from './props'

const props = withDefaults(defineProps<SkeletonProps>(), defaultProps)
</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-[rgba(0,0,0,0.06)]', props.class)" />
</template>
