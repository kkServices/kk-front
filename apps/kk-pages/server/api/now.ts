export default defineEventHandler(() => {
  const now = Date.now();
  return {
    code: 200,
    data: {
      now,
    },
  };
});
