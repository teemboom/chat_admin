<template>
    <!-- Mobile Overlay Backdrop -->
    <div v-if="isMobile && expandSideBar" class="mobile-backdrop" @click="closeMobileSidebar"></div>
    
    <div
        id="sidebar"
        :class="['sidebar', expandSideBar ? 'sidebar-expanded' : 'sidebar-collapsed', isMobile ? 'sidebar-mobile' : 'sidebar-desktop']"
    >
        <!-- Brand Section -->
        <div class="sidebar-brand">
            <div class="brand-content">
                <div class="brand-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <div v-if="expandSideBar" class="brand-text">
                    <h3>ChatAdmin</h3>
                    <span>Pro Dashboard</span>
                </div>
            </div>
        </div>

        <!-- Toggle Button -->
        <div class="sidebar-toggle">
            <button @click="toggleSidebar" class="toggle-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path :d="expandSideBar ? 'M11 19l-7-7 7-7M21 19l-7-7 7-7' : 'M13 5l7 7-7 7M5 5l7 7-7 7'"></path>
                </svg>
            </button>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav">
            <div class="nav-section">
                <div class="section-title" v-if="expandSideBar">Overview</div>
                <div 
                    class="nav-item" 
                    :class="{ active: currentView === 'overview' }"
                    @click="navigateTo('overview')"
                >
                    <div class="nav-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Dashboard</span>
                </div>
                
                <div 
                    class="nav-item" 
                    :class="{ active: currentView === 'analytics' }"
                    @click="navigateTo('analytics')"
                >
                    <div class="nav-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3v18h18"></path>
                            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                        </svg>
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Analytics</span>
                </div>
            </div>

            <div class="nav-section">
                <div class="section-title" v-if="expandSideBar">Management</div>
                <div 
                    class="nav-item" 
                    :class="{ active: currentView === 'messages' }"
                    @click="navigateTo('messages')"
                >
                    <div class="nav-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Messages</span>
                </div>
                
                <div 
                    class="nav-item" 
                    :class="{ active: currentView === 'users' }"
                    @click="navigateTo('users')"
                >
                    <div class="nav-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Users</span>
                </div>
                
                <div 
                    class="nav-item" 
                    :class="{ active: currentView === 'moderation' }"
                    @click="navigateTo('moderation')"
                >
                    <div class="nav-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                            <path d="M9 12l2 2 4-4"></path>
                        </svg>
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Moderation</span>
                </div>
            </div>

            <div class="nav-section">
                <div class="section-title" v-if="expandSideBar">Configuration</div>
                <div 
                    class="nav-item" 
                    :class="{ active: currentView === 'settings' }"
                    @click="navigateTo('settings')"
                >
                    <div class="nav-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                    </div>
                    <span v-if="expandSideBar" class="nav-label">Settings</span>
                </div>
            </div>
        </nav>

        <!-- User Profile Section -->
        <div class="sidebar-footer">
            <div class="user-profile">
                <div class="user-avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div v-if="expandSideBar" class="user-info">
                    <div class="user-name">Admin User</div>
                    <div class="user-role">Super Admin</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentView: 'overview',
            expandSideBar: true,
            isMobile: false
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
        toggleSidebar() {
            this.expandSideBar = !this.expandSideBar;
            this.$emit('sidebar-toggle', this.expandSideBar);
        },
        closeMobileSidebar() {
            if (this.isMobile) {
                this.expandSideBar = false;
                this.$emit('sidebar-toggle', this.expandSideBar);
            }
        },
        checkMobile() {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth < 650;
            
            // Close sidebar when switching to mobile
            if (!wasMobile && this.isMobile) {
                this.expandSideBar = false;
                this.$emit('sidebar-toggle', this.expandSideBar);
            }
            // Open sidebar when switching to desktop
            else if (wasMobile && !this.isMobile) {
                this.expandSideBar = true;
                this.$emit('sidebar-toggle', this.expandSideBar);
            }
        },
        navigateTo(view) {
            this.currentView = view;
            this.$emit('nav-change', view);
            
            // Close mobile sidebar when clicking nav items
            if (this.isMobile && this.expandSideBar) {
                this.closeMobileSidebar();
            }
        }
    },
    emits: ['sidebar-toggle', 'nav-change']
}
</script>

<style scoped>
/* CSS Variables */
:root {
    --sidebar-bg: #ffffff;
    --sidebar-text: #374151;
    --sidebar-text-light: #6b7280;
    --sidebar-hover: #f3f4f6;
    --sidebar-active: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --sidebar-active-text: #ffffff;
    --sidebar-border: #e5e7eb;
    --sidebar-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-fast: all 0.2s ease;
    --z-fixed: 1000;
    --radius: 8px;
}

/* Mobile Backdrop */
.mobile-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: calc(var(--z-fixed) - 1);
    opacity: 1;
    transition: opacity var(--transition);
}

.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: var(--sidebar-bg);
    color: var(--sidebar-text);
    z-index: var(--z-fixed);
    display: flex;
    flex-direction: column;
    transition: width var(--transition), transform var(--transition);
    overflow: hidden;
    box-shadow: var(--sidebar-shadow);
    border-right: 1px solid var(--sidebar-border);
}

/* Desktop Sidebar */
.sidebar-desktop.sidebar-expanded {
    width: 220px;
    transform: translateX(0);
}
.sidebar-desktop.sidebar-collapsed {
    width: 60px;
    transform: translateX(0);
}

/* Mobile Sidebar */
.sidebar-mobile {
    width: 280px;
    z-index: var(--z-fixed);
}
.sidebar-mobile.sidebar-expanded {
    transform: translateX(0);
}
.sidebar-mobile.sidebar-collapsed {
    transform: translateX(-100%);
}

/* Brand Section */
.sidebar-brand {
    padding: 1rem;
    border-bottom: 1px solid var(--sidebar-border);
}

.brand-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.brand-icon {
    width: 2.5rem;
    height: 2.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: white;
}

.brand-text h3 {
    font-size: 1.125rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
    color: var(--sidebar-text);
}

.brand-text span {
    font-size: 0.75rem;
    opacity: 0.6;
    font-weight: 500;
    color: var(--sidebar-text-light);
}

/* Toggle Button */
.sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-bottom: 1px solid var(--sidebar-border);
}

.toggle-btn {
    background: var(--sidebar-hover);
    border: 1px solid var(--sidebar-border);
    color: var(--sidebar-text);
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-fast);
    border-radius: var(--radius);
}

.toggle-btn:hover {
    background: #e5e7eb;
    transform: scale(1.05);
}

/* Navigation */
.sidebar-nav {
    flex: 1 1 auto;
    overflow-y: auto;
    padding: 1rem 0;
    scrollbar-width: thin;
    scrollbar-color: var(--sidebar-border) transparent;
}

.sidebar-nav::-webkit-scrollbar {
    width: 6px;
}
.sidebar-nav::-webkit-scrollbar-track {
    background: transparent;
}
.sidebar-nav::-webkit-scrollbar-thumb {
    background: var(--sidebar-border);
    border-radius: 3px;
}

.nav-section {
    margin-bottom: 1.5rem;
}

.section-title {
    padding: 0 1rem;
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--sidebar-text-light);
    margin-bottom: 0.5rem;
}

.nav-item {
    display: flex;
    align-items: center;
    height: 2.75rem;
    margin: 0.25rem 0.75rem;
    padding: 0 0.75rem;
    border-radius: var(--radius);
    cursor: pointer;
    transition: var(--transition-fast);
    position: relative;
    color: var(--sidebar-text);
}

.nav-item:hover {
    background: var(--sidebar-hover);
    transform: translateX(4px);
}

.nav-item.active {
    background: var(--sidebar-active);
    color: var(--sidebar-active-text);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
}

.nav-item.active::before {
    content: '';
    position: absolute;
    left: -0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 0 3px 3px 0;
}

/* Perfect centering for collapsed sidebar */
.sidebar-collapsed .nav-item {
    margin: 0.25rem 0.5rem;
    padding: 0;
    justify-content: center;
}

.sidebar-collapsed .nav-item.active::before {
    display: none;
}

.nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 1.25rem;
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
}

.nav-label {
    margin-left: 0.75rem;
    white-space: nowrap;
    font-size: 0.875rem;
    font-weight: 500;
    transition: opacity var(--transition-fast);
}

/* Footer */
.sidebar-footer {
    border-top: 1px solid var(--sidebar-border);
    padding: 1rem;
}

.user-profile {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: var(--sidebar-hover);
    border-radius: var(--radius);
    transition: var(--transition-fast);
}

.user-profile:hover {
    background: #e5e7eb;
}

.user-avatar {
    width: 2.25rem;
    height: 2.25rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: white;
}

.user-info {
    flex: 1;
    min-width: 0;
}

.user-name {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--sidebar-text);
}

.user-role {
    font-size: 0.75rem;
    opacity: 0.7;
    font-weight: 400;
    color: var(--sidebar-text-light);
}

/* Responsive Design */
@media (max-width: 650px) {
    .sidebar-desktop {
        display: none;
    }
    
    .sidebar-mobile {
        display: flex;
    }
}

@media (min-width: 651px) {
    .sidebar-mobile {
        display: none;
    }
    
    .sidebar-desktop {
        display: flex;
    }
    
    .mobile-backdrop {
        display: none;
    }
}

/* Collapsed State Adjustments */
.sidebar-collapsed .brand-text,
.sidebar-collapsed .nav-label,
.sidebar-collapsed .section-title,
.sidebar-collapsed .user-info {
    opacity: 0;
    pointer-events: none;
}

.sidebar-collapsed .brand-content,
.sidebar-collapsed .user-profile {
    justify-content: center;
}

.sidebar-collapsed .nav-section {
    margin-bottom: 0.5rem;
}
</style>
