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
      {
        property: 'og:description',
        content: '데이터가 필요할 땐, 헤매지말고 Data-On'
      },
      // { name: 'keyword', content: '데이터, 공공, 공공데이터, 좌표, 검색'},
      {
        property: 'og:title',
        content: '[빅데이터 플랫폼] 데이터온'
      },
      {
        property: 'og:image',
        content: 'https://data-on.co.kr/images/thumbnail_kakaotalk.png'
      },
      {
        name: 'naver-site-verification',
        content: '1ceeb49efb8d9bfc30456ed9d858fb3ee23807ac'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [{
      src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit',
      defer: true
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
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/google-gtag',
    '@nuxtjs/robots'
  ],
  /**
   * robot: google, msn, naver, daum
   */
  robots: [{
      UserAgent: '*',
      Disallow: '/'
    }, {
      UserAgent: 'Googlebot',
      Allow: '/'
    },
    {
      UserAgent: 'googlebot-image',
      Allow: '/'
    },
    {
      UserAgent: 'MSNBot',
      Allow: '/'
    },
    {
      UserAgent: 'Yeti',
      Allow: '/'
    },
    {
      UserAgent: 'Daumoa',
      Allow: '/'
    }
  ],
  axios: {
    proxy: true,
    // baseURL: 'http://dev.openmate-on.co.kr:8000/api/', // Used as fallback if no runtime config is provided
  },
  'google-gtag': {
    // id: '255538273', // required
    id: process.env.NODE_ENV !== 'production' ? '255538273' : '255653647', // required
    config: {
      // this are the config options for `gtag
      // check out official docs: https://developers.google.com/analytics/devguides/collection/gtagjs/
      anonymize_ip: true, // anonymize IP 
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
      linker: {
        domains: ['data-on.co.kr']
      }
    },
    debug: true, // enable to track in dev mode
    disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...)
    // optional you can add more configuration like [AdWords](https://developers.google.com/adwords-remarketing-tag/#configuring_the_global_site_tag_for_multiple_accounts)
    additionalAccounts: [{
      // id: 'G-YQX8MQCG3Z', // required if you are adding additional IDs
      id: process.env.NODE_ENV !== 'production' ? 'G-YQX8MQCG3Z' : 'G-DZD1V31WDH', // required if you are adding additional IDs
      config: {
        send_page_view: false // optional configurations
      }
    }]
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
