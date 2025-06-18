import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import { useThemeStore } from './stores/themeStore'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#root')

// Initialize theme and auth after app is mounted
const themeStore = useThemeStore()
const authStore = useAuthStore()

themeStore.initTheme()
authStore.initAuth()
