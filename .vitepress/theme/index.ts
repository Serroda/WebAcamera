// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import "uno.css"
import './style.css'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}

