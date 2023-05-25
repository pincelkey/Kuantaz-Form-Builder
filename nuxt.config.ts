// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      titleTemplate: '%s - Kuantaz',
      htmlAttrs: {
        lang: 'es',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Formulario generado por Kuantaz',
        },

        {
          hid: 'og:locale',
          property: 'og:locale',
          content: 'es_ES',
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Formulario generado por Kuantaz',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.PROJECT_SITE,
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'Formulario generado por Kuantaz',
        },
        {
          hid: 'article:publisher',
          property: 'article:publisher',
          content: 'https://www.facebook.com/kuantaz',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://kuantaz.com/images/banner.jpg',
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: '1480',
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: '840',
        },

        {
          hid: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:site',
          content: '@Kuantaz',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Formulario generado por Kuantaz',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://kuantaz.com/images/banner.jpg',
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: process.env.PROJECT_SITE,
        },

        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },

  css: [
    '~/assets/styles/app.scss',
  ],

  components: {
    dirs: [
      '~/components',
    ],
  },
  modules: [
    '@invictus.codes/nuxt-vuetify',
  ],

  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark',
      },
    },
    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true,
      useIconCDN: true,

      /* vite-plugin-vuetify options */
      styles: true,
      autoImport: true,
    },
  },
  runtimeConfig: {
    public: {
      kuantazApi: process.env.KUANTAZ_API,
    },
  },
});
