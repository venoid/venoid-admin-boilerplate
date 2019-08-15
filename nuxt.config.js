export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['assets/theme.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['plugins/v.js'],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/style-resources',
    '@nuxtjs/apollo'
  ],
  router: {
    middleware: ['isAuth']
  },

  apollo: {
    tokenName: 'venoid-token',
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    clientConfigs: {
      default: {
        httpEndpoint: 'http://api.2f-library.localhost',
        httpLinkOptions: {
          credentials: 'same-origin'
        }
      }

      // server: {
      //   httpEndpoint: `http://api.2f-library.localhost`,
      //   httpLinkOptions: {
      //     credentials: 'same-origin'
      //   }
      // }
    }
  },

  styleResources: {
    scss: ['assets/variables.scss']
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
