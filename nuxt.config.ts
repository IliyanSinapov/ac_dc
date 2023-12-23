// https://nuxt.com/docs/api/configuration/nuxt-config

import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: "https://kit.fontawesome.com/09640ec319.js",
          crossorigin: "anonymous",
          defer: true
        }
      ]
    }
  },
  css: ['@/assets/css/main.css'],
  devtools: { enabled: true },
  plugins: ["plugins/fontawesome.js"],
  modules: ["@nuxtjs/supabase"],
  supabase: {
    redirect: false
  }

})
