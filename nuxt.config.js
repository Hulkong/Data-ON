const webpack = require('webpack')

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    // title: process.env.npm_package_name || '',
    title: 'Data-ON',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '검색에 새로운 역사를 쓰다! 데이터온에서 정형화된 데이터들을 활용해보세요.'
      },
      // { hid: 'description', name: 'description', content: '검색에 새로운 역사를 쓰다! 데이터온에서 정형화된 데이터들을 활용해보세요.' }
      // { hid: 'keyword', name: 'keyword', content: '데이터, 공공, 공공데이터, 좌표, 검색'},
      // { name: 'image', content: 'https://data-on.co.kr/images/meta_img.png' },
      {
        property: 'og:title',
        content: '데이터온'
      },
      {
        property: 'og:image',
        content: 'https://data-on.co.kr/images/meta_img.png'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  loading: '~/components/loading.vue',

  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/common.css',
    '~/assets/css/styleDefault.css',
    '~/assets/css/layout.css',
    '~/assets/css/js/animate.css',
    '~/assets/css/js/owl.carousel.min.css',
    '~/assets/css/js/slick.css',
    '~/assets/css/js/slick-theme.css',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [{
      src: '~/plugins/js/jquery.nicescroll.min.js',
      ssr: false,
      mode: 'client'
    },
    {
      src: '~/plugins/js/jquery.easing.1.3.js',
      ssr: false,
      mode: 'client'
    },
    {
      src: '~/plugins/js/owl.carousel.js',
      ssr: false,
      mode: 'client'
    },
    {
      src: '~/plugins/js/popup.js',
      ssr: false,
      mode: 'client'
    },
    {
      src: '~/plugins/js/slick.js',
      ssr: false,
      mode: 'client'
    },
    {
      src: '~/plugins/js/sly.js',
      ssr: false,
      mode: 'client'
    },
    {
      src: '~/plugins/js/common.js',
      ssr: false
    },
    {
      src: '~/plugins/js/ga.js',
      mode: 'client'
    },
    '~/plugins/js/datacheck.js'
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    id: 'G-ENX4P0R616', // Use as fallback if no runtime config is provided
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: 'G-ENX4P0R616' // local
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true,
    // baseURL: 'http://dev.openmate-on.co.kr:8000/api/', // Used as fallback if no runtime config is provided
  },
  proxy: {
    '/api/': {
      target: 'http://dev.openmate-on.co.kr:8782/api/',
      pathRewrite: {
        '^/api/': ''
      }
    },
    '/upload/': {
      target: 'https://kr.object.iwinv.kr/data-on/upload/',
      pathRewrite: {
        '^/upload/': ''
      }
    }
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },
  router: {
    // 모든 페이지에서 middleware/user-agent.js를 실행하세요
    middleware: 'auth',
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'pageNotFound',
        path: '*',
        component: resolve(__dirname, 'pages/error/404.vue')
      })
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extractCSS: true,
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        d3: 'd3',
        axios: 'axios',
        marked: 'marked',
        _: 'lodash'
      })
    ]
  }
}
