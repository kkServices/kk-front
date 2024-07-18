export default defineEventHandler(() => {
  const random = Math.random()
  return {
    code: 200,
    datas: {
      random: random > 0.5 ? 'Home1' : 'Ad',
    },
  }
})
