<template>
  <div class="auth-container">
    <!-- Left Side - Form -->
    <div class="auth-left">
      <div class="auth-form-container">
        <div class="auth-header">
          <h1 class="auth-title">{{ isSignUp ? 'Create Account' : 'Get Started Now' }}</h1>
          <p class="auth-subtitle">{{ isSignUp ? 'Sign up to get started with your chat plugin' : 'Enter your credentials to access your account' }}</p>
        </div>

        <!-- Social Login Buttons -->
        <div class="social-buttons">
          <button type="button" class="social-btn google-btn">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Log in with Google
          </button>
        </div>

        <div class="divider">
          <span>or</span>
        </div>

        <form @submit.prevent="handleSubmit" class="auth-form">
          <div v-if="error" class="error-message">
            {{ error }}
          </div>


          <div class="form-group">
            <label for="email" class="form-label">Email address</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="password-container">
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                required
              />
              <button 
                type="button" 
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <svg v-if="showPassword" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <svg v-else width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                </svg>
              </button>
            </div>
            <div class="forgot-password">
              <a href="#" class="forgot-link">Forgot password?</a>
            </div>
          </div>

          <div v-if="isSignUp" class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              class="form-input"
              required
            />
          </div>

          <button 
            type="submit" 
            class="submit-button"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="loading-spinner"></span>
            {{ isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Login') }}
          </button>
        </form>

        <div class="auth-footer">
          <p class="auth-switch">
            {{ isSignUp ? 'Already have an account?' : "Don't have an account?" }}
            <button 
              type="button" 
              @click="toggleMode" 
              class="switch-button"
            >
              {{ isSignUp ? 'Sign In' : 'Sign Up' }}
            </button>
          </p>
        </div>

      </div>
    </div>

    <!-- Right Side - Promotional Content -->
    <div class="auth-right">
      <div class="promo-content">
        <h2 class="promo-title">Transform Your Website with Smart Chat</h2>
        <p class="promo-subtitle">Add intelligent chat functionality to engage visitors and convert them into customers</p>
        
        <div class="dashboard-preview">
          <div class="dashboard-card">
            <div class="dashboard-header">
              <span class="dashboard-title">Chat Analytics</span>
              <div class="dashboard-filters">
                <span>Last 30 days</span>
                <button class="filter-btn">⌄</button>
              </div>
            </div>
            
            <div class="dashboard-stats">
              <div class="stat-item">
                <span class="stat-label">Total Conversations</span>
                <span class="stat-value">2,847</span>
                <span class="stat-change positive">+12.5% from last month</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Response Rate</span>
                <span class="stat-value">98.4%</span>
                <span class="stat-change positive">+2.1% from last month</span>
              </div>
            </div>

            <div class="team-section">
              <h4>Recent Chat Activity</h4>
              <div class="team-list">
                <div class="team-member">
                  <div class="member-avatar chat-avatar">💬</div>
                  <div class="member-info">
                    <span class="member-name">Customer Support</span>
                    <span class="member-role">5 active chats</span>
                  </div>
                  <div class="member-stats">
                    <span class="hours">2m ago</span>
                    <span class="status">Online</span>
                  </div>
                </div>
                <div class="team-member">
                  <div class="member-avatar chat-avatar">🤖</div>
                  <div class="member-info">
                    <span class="member-name">AI Assistant</span>
                    <span class="member-role">24/7 automated</span>
                  </div>
                  <div class="member-stats">
                    <span class="hours">Active</span>
                    <span class="status">Online</span>
                  </div>
                </div>
                <div class="team-member">
                  <div class="member-avatar chat-avatar">📊</div>
                  <div class="member-info">
                    <span class="member-name">Analytics Bot</span>
                    <span class="member-role">Tracking visitor data</span>
                  </div>
                  <div class="member-stats">
                    <span class="hours">Real-time</span>
                    <span class="status">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="company-logos">
          <div class="logo-item">Website</div>
          <div class="logo-item">E-commerce</div>
          <div class="logo-item">SaaS</div>
          <div class="logo-item">Landing Page</div>
          <div class="logo-item">Blog</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

export default {
  name: 'AuthView',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    
    const isSignUp = ref(false)
    const showPassword = ref(false)
    
    const formData = reactive({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    const toggleMode = () => {
      isSignUp.value = !isSignUp.value
      // Clear form data when switching modes
      Object.keys(formData).forEach(key => {
        formData[key] = ''
      })
      authStore.clearError()
    }

    const handleSubmit = async () => {
      authStore.clearError()
      
      if (isSignUp.value) {
        // Validate confirm password
        if (formData.password !== formData.confirmPassword) {
          authStore.error = 'Passwords do not match'
          return
        }
        
        const result = await authStore.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
        
        if (result.success) {
          router.push('/')
        }
      } else {
        const result = await authStore.login({
          email: formData.email,
          password: formData.password
        })
        
        if (result.success) {
          router.push('/')
        }
      }
    }

    return {
      isSignUp,
      showPassword,
      formData,
      isLoading: authStore.isLoading,
      error: authStore.error,
      toggleMode,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  width: 100%;
}

/* Left Side - Form */
.auth-left {
  flex: 1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.auth-form-container {
  width: 100%;
  max-width: 400px;
}

.auth-header {
  margin-bottom: 40px;
}

.logo {
  margin-bottom: 30px;
}

.auth-title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.2;
}

.auth-subtitle {
  color: #6b7280;
  font-size: 16px;
  line-height: 1.5;
}

/* Social Buttons */
.social-buttons {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.social-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

/* Divider */
.divider {
  position: relative;
  text-align: center;
  margin: 24px 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e5e7eb;
}

.divider span {
  background: white;
  padding: 0 16px;
  color: #6b7280;
  font-size: 14px;
}

/* Form Styles */
.auth-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #374151;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  background: white;
  color: #111827;
}

.form-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

/* Password Field */
.password-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
}

.forgot-password {
  text-align: right;
  margin-top: 8px;
}

.forgot-link {
  color: #6366f1;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.forgot-link:hover {
  text-decoration: underline;
}

/* Chat Avatar Styling */
.chat-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

/* Submit Button */
.submit-button {
  width: 100%;
  padding: 14px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.submit-button:hover:not(:disabled) {
  background: #5855eb;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error Message */
.error-message {
  background: #fef2f2;
  color: #dc2626;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #fecaca;
  font-size: 14px;
}

/* Footer */
.auth-footer {
  text-align: center;
  margin-bottom: 24px;
}

.auth-switch {
  color: #6b7280;
  font-size: 14px;
}

.switch-button {
  background: none;
  border: none;
  color: #6366f1;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  margin-left: 4px;
}

.switch-button:hover {
  color: #5855eb;
}

.copyright {
  text-align: center;
  color: #9ca3af;
  font-size: 12px;
}

/* Right Side - Promotional Content */
.auth-right {
  flex: 1;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: white;
}

.promo-content {
  width: 100%;
  max-width: 500px;
}

.promo-title {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
}

.promo-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 40px;
  line-height: 1.5;
}

/* Dashboard Preview */
.dashboard-preview {
  margin-bottom: 40px;
}

.dashboard-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.dashboard-title {
  font-weight: 600;
  font-size: 18px;
}

.dashboard-filters {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  opacity: 0.8;
}

.filter-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
}

.stat-change {
  font-size: 12px;
}

.stat-change.positive {
  color: #34d399;
}

.stat-change.negative {
  color: #f87171;
}

.team-section h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.team-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.team-member {
  display: flex;
  align-items: center;
  gap: 12px;
}

.member-avatar {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.member-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.member-name {
  font-size: 14px;
  font-weight: 500;
}

.member-role {
  font-size: 12px;
  opacity: 0.7;
}

.member-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.hours {
  font-size: 12px;
  opacity: 0.8;
}

.status {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #34d399;
  padding: 2px 6px;
  border-radius: 4px;
}

/* Company Logos */
.company-logos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.6;
}

.logo-item {
  font-size: 14px;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 1024px) {
  .auth-container {
    flex-direction: column;
  }
  
  .auth-right {
    display: none;
  }
  
  .auth-left {
    min-height: 100vh;
  }
}

@media (max-width: 640px) {
  .auth-left {
    padding: 20px;
  }
  
  .auth-title {
    font-size: 28px;
  }
  
  .social-buttons {
    flex-direction: column;
  }
}
</style> 