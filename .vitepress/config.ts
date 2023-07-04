import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Acamera",
  description: "A tool that allows you to control action cameras through WiFi.",
  base:"/acamera/",
  outDir:'./docs',
  vite:{
    plugins:[
      UnoCSS()
    ]
  }
})
