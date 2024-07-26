import type { HTMLAttributes } from 'vue'

export interface SkeletonProps {
  class?: HTMLAttributes['class']
}

export const defaultProps: SkeletonProps = {
  class: 'animate-pulse rounded-md bg-[rgba(0,0,0,0.06)]',
}
