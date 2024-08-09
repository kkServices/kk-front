import plugin from 'tailwindcss/plugin'

export default plugin(({ addUtilities, matchUtilities, theme }) => {
  const transitionDuration: Record<string, string> = theme('transitionDuration') || {}
  // 支持静态值，如 transition-all-500
  addUtilities(
    Object.entries(transitionDuration).map(([key, value]) => ({
      [`.transition-all-${key}`]: {
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: value,
      },
    })),
  )

  // 支持动态值，如 transition-all-[120]
  matchUtilities(
    {
      'transition-all': value => ({
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: `${value}ms`,
      }),
    },
    {
      values: {}, // 允许任意值
      supportsNegativeValues: false, // 不支持负值
    },
  )

  addUtilities([
    {
      '.flex-center': { display: 'flex', alignItems: 'center', justifyContent: 'center' },
      '.flex-col-center': { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
      '.flex-row-center': { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
      '.flex-center-x': { display: 'flex', justifyContent: 'center' },
      '.flex-center-y': { display: 'flex', alignItems: 'center' },
    },
  ])
})
