export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    typeCheck: false,
  },
  app: {
    baseURL: '/kanagawa/',
    head: {
      htmlAttrs: {
        lang: 'ja',
      },
      title: 'JLS合同会社 | 宅配ドライバー採用サイト',
      meta: [
        {
          name: 'description',
          content:
            '横浜・川崎エリアを中心に、未経験から始めやすい宅配ドライバー募集サイトです。',
        },
        {
          name: 'theme-color',
          content: '#0a0a0a',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'favicon.svg',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;600;700&display=swap',
        },
      ],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
});
