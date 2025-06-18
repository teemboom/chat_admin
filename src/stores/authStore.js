import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const currentUser = computed(() => user.value)

  // Actions
  const login = async (credentials) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call - replace with actual authentication API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      if (credentials.email && credentials.password) {
        const mockUser = {
          id: 1,
          name: credentials.email.split('@')[0],
          email: credentials.email,
          avatar: null
        }
        
        const mockToken = 'mock-jwt-token-' + Date.now()
        
        user.value = mockUser
        token.value = mockToken
        localStorage.setItem('token', mockToken)
        localStorage.setItem('user', JSON.stringify(mockUser))
        
        return { success: true }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (err) {
      error.value = err.message || 'Login failed'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call - replace with actual registration API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful registration
      if (userData.name && userData.email && userData.password) {
        const mockUser = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          avatar: null
        }
        
        const mockToken = 'mock-jwt-token-' + Date.now()
        
        user.value = mockUser
        token.value = mockToken
        localStorage.setItem('token', mockToken)
        localStorage.setItem('user', JSON.stringify(mockUser))
        
        return { success: true }
      } else {
        throw new Error('All fields are required')
      }
    } catch (err) {
      error.value = err.message || 'Registration failed'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const initAuth = () => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      try {
        user.value = JSON.parse(savedUser)
      } catch (err) {
        console.error('Error parsing saved user data:', err)
        logout()
      }
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,
    
    // Getters
    isAuthenticated,
    currentUser,
    
    // Actions
    login,
    register,
    logout,
    initAuth,
    clearError
  }
}) 