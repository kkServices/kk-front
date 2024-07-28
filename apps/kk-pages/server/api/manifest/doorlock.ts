export default defineEventHandler((request) => {
  const { id } = getQuery(request)

  return {
    name: '嘉盛中心门禁',
    short_name: '嘉盛中心门禁',
    description: '我爱上班，上班使我快乐',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: `/third/doorlock?id=${id}`,
    icons: [
      {
        src: 'https://bu.dusays.com/2022/03/01/d71f96540e09e.jpg',
        sizes: '36x36',
        type: 'image/png',
      },
      {
        src: 'https://bu.dusays.com/2022/03/01/d71f96540e09e.jpg',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: 'https://bu.dusays.com/2022/03/01/d71f96540e09e.jpg',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: 'https://bu.dusays.com/2022/03/01/d71f96540e09e.jpg',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'https://bu.dusays.com/2022/03/01/d71f96540e09e.jpg',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'https://bu.dusays.com/2022/03/01/d71f96540e09e.jpg',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://bu.dusays.com/2022/03/01/d71f96540e09e.jpg',
        sizes: '196x196',
        type: 'image/png',
      },
      {
        src: 'https://bu.dusays.com/2022/03/01/d71f96540e09e.jpg',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
})
