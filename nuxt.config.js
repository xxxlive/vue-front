module.exports = {
  /*
  ** Headers of the page
  */
 plugins: [
      { src: '~/plugins/nuxt-swiper-plugin.js', ssr: false }
    ],
 head: {
      title: '鸿濛5G教育学院',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'keywords', name: 'keywords', content: '鸿濛5G教育学院' },
        { hid: 'description', name: 'description', content: '鸿濛5G教育学院' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/hm.jpg' }
      ],
      script: [
        { src: '/js/aliplayercomponents-1.0.5.min.js'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

