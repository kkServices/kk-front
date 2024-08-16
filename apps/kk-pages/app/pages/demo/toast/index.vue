<script setup lang="ts">
function onClick() {
  const { $toast } = useNuxtApp();

  const text = `寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。`;

  $toast.info(
    text,
    { autoClose: false, theme: 'colored', position: 'top-center' },
  );
  $toast.error('ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', { autoClose: false, theme: 'colored', position: 'top-center' });
  $toast.success('sss', { autoClose: false, theme: 'colored', position: 'top-center' });
  $toast.warning('sss', { autoClose: false, theme: 'colored', position: 'top-center' });
  $toast.loading('sss', { autoClose: false, theme: 'colored', position: 'top-center' });

  // $toast.info('sss', { autoClose: false })
  // $toast.error('sss', { autoClose: false })
  // $toast.success('sss', { autoClose: false })
  // $toast.warning('sss', { autoClose: false })
  // $toast.loading('sss', { autoClose: false })
  // $toast('x', { autoClose: false })

  // $toast.info('sss', { autoClose: false, theme: 'light' })
  // $toast.error('sss', { autoClose: false, theme: 'light' })
  // $toast.success('sss', { autoClose: false, theme: 'light' })
  // $toast.warning('sss', { autoClose: false, theme: 'light' })
  // $toast.loading('sss', { autoClose: false, theme: 'light' })
  // $toast('x', { autoClose: false, theme: 'light' })
  //
  // $toast.info('sss', { autoClose: false, theme: 'dark' })
  // $toast.error('sss', { autoClose: false, theme: 'dark' })
  // $toast.success('sss', { autoClose: false, theme: 'dark' })
  // $toast.warning('sss', { autoClose: false, theme: 'dark' })
  // $toast.loading('sss', { autoClose: false, theme: 'dark' })
  // $toast('x', { autoClose: false, theme: 'dark' })

  // $toast.info('sss', { autoClose: false, theme: 'colored' })
  // $toast.error('sss', { autoClose: false, theme: 'colored' })
  // $toast.success('sss', { autoClose: false, theme: 'colored' })
  // $toast.warning('sss', { autoClose: false, theme: 'colored' })
  // $toast.loading('sss', { autoClose: false, theme: 'colored' })
  // $toast('x', { autoClose: false, theme: 'colored' })

  $toast('彩虹进度条', { autoClose: 3000000000, closeButton: true });
}
</script>

<template>
  <div>
    <Button @click="onClick">
      toast info
    </Button>
  </div>
</template>

<style scoped>

</style>
