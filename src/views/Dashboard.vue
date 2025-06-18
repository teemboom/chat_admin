<template>
  <main id="main">
    <!-- Mobile Menu Button -->
    <button v-if="isMobile" @click="toggleMobileSidebar" class="mobile-menu-btn">
      <span class="menu-icon"></span>
      <span class="menu-icon"></span>
      <span class="menu-icon"></span>
    </button>
    
    <SideBar ref="sidebar" @sidebar-toggle="handleSidebarToggle" @nav-change="handleNavChange" />
    <div id="shell" :class="shellClass">
      <!-- Overview View -->
      <div v-if="currentView === 'overview'" class="view-container">
        <div class="view-header">
          <div class="header-content">
            <div class="title-section">
              <h1 class="page-title">Chat Applications</h1>
              <p class="page-subtitle">Manage and monitor your chat applications</p>
            </div>
            <button class="primary-btn" @click="createNewApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New Application
            </button>
          </div>
          
          <!-- Stats Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon active">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ stats.activeApps }}</div>
                <div class="stat-label">Active Apps</div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon users">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ stats.totalUsers.toLocaleString() }}</div>
                <div class="stat-label">Total Users</div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon revenue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ stats.uptime }}%</div>
                <div class="stat-label">Uptime</div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon messages">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ stats.messages }}</div>
                <div class="stat-label">Messages</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="view-content">
          <Overview />
        </div>
      </div>

      <!-- Analytics View -->
      <div v-else-if="currentView === 'analytics'" class="view-container">
        <div class="view-header">
          <div class="header-content">
            <div class="title-section">
              <h1 class="page-title">Analytics</h1>
              <p class="page-subtitle">Monitor performance and user engagement</p>
            </div>
          </div>
        </div>
        
        <div class="view-content">
          <div class="content-placeholder">
            <div class="placeholder-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
              </svg>
            </div>
            <h3>Analytics Dashboard</h3>
            <p>Comprehensive analytics and reporting coming soon</p>
          </div>
        </div>
      </div>

      <!-- Messages View -->
      <div v-else-if="currentView === 'messages'" class="view-container">
        <div class="view-header">
          <div class="header-content">
            <div class="title-section">
              <h1 class="page-title">Messages</h1>
              <p class="page-subtitle">Manage chat messages and conversations</p>
            </div>
          </div>
        </div>
        
        <div class="view-content">
          <div class="content-placeholder">
            <div class="placeholder-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3>Message Management</h3>
            <p>Chat moderation and message management tools</p>
          </div>
        </div>
      </div>

      <!-- Users View -->
      <div v-else-if="currentView === 'users'" class="view-container">
        <div class="view-header">
          <div class="header-content">
            <div class="title-section">
              <h1 class="page-title">Users</h1>
              <p class="page-subtitle">Manage users and permissions</p>
            </div>
          </div>
        </div>
        
        <div class="view-content">
          <div class="content-placeholder">
            <div class="placeholder-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>User Management</h3>
            <p>User administration and access control</p>
          </div>
        </div>
      </div>

      <!-- Settings View -->
      <div v-else-if="currentView === 'settings'" class="view-container">
        <div class="view-header">
          <div class="header-content">
            <div class="title-section">
              <h1 class="page-title">Settings</h1>
              <p class="page-subtitle">Configure your chat platform</p>
            </div>
          </div>
        </div>
        
        <div class="view-content">
          <div class="content-placeholder">
            <div class="placeholder-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
            <h3>Platform Settings</h3>
            <p>System configuration and preferences</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SideBar from '../components/nav/SideBar.vue';
import Overview from './Overview.vue';

export default {
  name: 'Dashboard',
  components: {
    SideBar,
    Overview
  },
  data() {
    return {
      sidebarExpanded: true,
      isMobile: false,
      currentView: 'overview',
      stats: {
        activeApps: 4,
        totalUsers: 7200,
        uptime: 99.9,
        messages: '2.4M'
      }
    }
  },
  computed: {
    shellClass() {
      return {
        'shell-desktop-expanded': !this.isMobile && this.sidebarExpanded,
        'shell-desktop-collapsed': !this.isMobile && !this.sidebarExpanded,
        'shell-mobile': this.isMobile
      }
    }
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    handleSidebarToggle(expanded) {
      this.sidebarExpanded = expanded;
    },
    toggleMobileSidebar() {
      this.$refs.sidebar.toggleSidebar();
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 650;
    },
    handleNavChange(view) {
      this.currentView = view;
    },
    createNewApp() {
      // TODO: Implement create new app functionality
      alert('Create New App functionality will be implemented here');
    }
  }
}
</script>

<style>
@font-face {
    font-family: 'Cabin';
    src: url('@/assets/fonts/Cabin-VariableFont_wdth,wght.ttf') format('truetype');
    font-weight: 100 900;
    font-style: normal;
}

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root{
  --cool-white: #fafafc;
  --white: #ffffff;
  --deep-blue: #202531;
  --soft-gray: #e3e8e9;
  --charcoal: #282828;
  --success-green: #27AE60;
  --error-red: #E74C3C;
  --text-normal: #34495E;
  --text-deep: #000;
  --text-light: #666;
  --yellow: #ffc403;
  --bright-red: #cc2131;
  --oynx: #121212;
  --shadow: 0px 2px 2px 2px var(--soft-gray);
}

input:focus, textarea:focus{
    outline: none;
}
input, textarea, button{
	border: none;
	color: inherit;
}
button, a{
    cursor: pointer;
}
button{
  background: inherit
}
a{
    text-decoration: none;
    color: inherit;
}
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
body{
  width: 100vw;
  height: fit-content;
  font-size: 5px;
  font-family: 'Cabin';
  color: var(--text-normal);
  overflow-x: hidden;
}
#main{
  width: 100%;
  display: flex;
}
#app{
  width: 100vw;
  height: fit-content;
  display: flex;
}

#shell{
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #edf2f7 100%);
  padding: 0;
  transition: margin-left 0.3s ease, width 0.3s ease;
}

/* Desktop - Expanded Sidebar */
.shell-desktop-expanded {
  margin-left: 220px;
  width: calc(100vw - 220px);
}

/* Desktop - Collapsed Sidebar */
.shell-desktop-collapsed {
  margin-left: 60px;
  width: calc(100vw - 60px);
}

/* Mobile - Full width with sidebar overlay */
.shell-mobile {
  margin-left: 0;
  width: 100vw;
}

/* View Container */
.view-container {
  width: 100%;
  min-height: 100vh;
}

/* View Header */
.view-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1.5rem 2rem 1rem;
  color: white;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.title-section h1 {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.025em;
}

.page-subtitle {
  font-size: 0.875rem;
  opacity: 0.85;
  margin: 0.25rem 0 0 0;
  font-weight: 400;
}

.primary-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon.active {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-icon.users {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-icon.revenue {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.stat-icon.messages {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  opacity: 0.85;
  margin-top: 0.125rem;
}

/* View Content */
.view-content {
  padding: 1.5rem 2rem 2rem;
}

/* Content Placeholder */
.content-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
}

.placeholder-icon {
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
  color: #9ca3af;
}

.content-placeholder h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.content-placeholder p {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Mobile Responsive */
@media (max-width: 650px) {
  #shell {
    padding: 0;
  }
  
  .shell-mobile {
    width: 100%;
  }
  
  .view-header {
    padding: 1.25rem 1rem 0.75rem;
  }
  
  .view-content {
    padding: 1.25rem 1rem 1.5rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }
  
  .title-section h1 {
    font-size: 1.5rem;
  }
  
  .page-subtitle {
    font-size: 0.8125rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
  
  .stat-card {
    padding: 0.75rem;
  }
  
  .stat-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .stat-value {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

/* Mobile Menu Button */
.mobile-menu-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: calc(var(--z-fixed) + 1);
  background: var(--deep-blue);
  border: none;
  border-radius: 6px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: var(--shadow);
}

.mobile-menu-btn:hover {
  background: var(--charcoal);
}

.menu-icon {
  display: block;
  width: 20px;
  height: 2px;
  background: white;
  border-radius: 1px;
  transition: transform 0.3s ease;
}
</style>