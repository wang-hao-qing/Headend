/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import 'element3/lib/theme-chalk/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Element3 from 'element3'
// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
const pinia = createPinia()
registerPlugins(app)
app.use(pinia)
app.use(Element3)
app.mount('#app')
