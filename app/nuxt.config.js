require('dotenv').config({})
const redirectSSL = require('redirect-ssl')
const isProd = process.env.NODE_ENV === 'production'
const redirectMiddleware = (req, res, next) => {
  const isAddressLocal = req.connection.remoteAddress !== '127.0.0.1' || ''
  const enabled = isProd && isAddressLocal
  return enabled ? redirectSSL(req, res, next) : next()
}

const metaTitle = "TITLE";
const metaDescription = "DESCRIPTION";

export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: metaTitle,    
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: metaDescription },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1'
      },
      {
        hid: 'facebook-domain-verification',
        name: 'facebook-domain-verification',
        content: 'ssavonjxv8xvj10ipq69dnj5kfamqf'
      },
      {
        hid: 'thumbnail',
        name: 'thumbnail',
        content: process.env.BASE_URL + '/thumbnail.png'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: metaTitle
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@dannypostmaa'
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: process.env.BASE_URL
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: metaDescription
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:image:src',
        name: 'twitter:image:src',
        content: process.env.BASE_URL + '/og-main.png'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: process.env.BASE_URL + '/og-main.png'
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: metaTitle
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: metaTitle
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: metaDescription
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: process.env.BASE_URL + '/og-main.png'
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: process.env.BASE_URL + '/og-main.png'
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: metaTitle
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `/favicon.ico` }
    ]
  },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/vue-toast.js'},
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
    // Doc: https://github.com/nuxt-community/eslint-module
    [
      '@nuxtjs/eslint-module',
      {
        fix: true,
        overrideConfig: {
          parserOptions: {
            ecmaVersion: 2020
          }
        }
      }
    ],
    '@nuxtjs/tailwindcss',
  ],

  serverMiddleware: [
    redirectMiddleware,
  ],

  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
  
  publicRuntimeConfig: {
    SERVER_URL: process.env.SERVER_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  
  router: {
    middleware: 'redirect'
  },

  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // proxy: true,
    baseUrl: process.env.SERVER_URL,
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://http.nuxtjs.org
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/proxy',
  ],

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
}
