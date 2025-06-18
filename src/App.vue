<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { useAuthStore } from './stores/authStore'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const handleLogout = () => {
      authStore.logout()
      router.push('/auth')
    }

    return {
      authStore,
      handleLogout
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  width: 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f5f5f5;
}

.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.nav-left {
  display: flex;
  align-items: center;
}

.app-title {
  color: #333;
  font-size: 20px;
  font-weight: 700;
}

.nav-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  color: #666;
  font-weight: 500;
}

.logout-button {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  color: #495057;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.logout-button:hover {
  background: #e9ecef;
  color: #333;
}

.main-content {
  min-height: 100vh;
}

.main-content.with-navbar {
  min-height: calc(100vh - 64px);
}
</style>
