<template>
    <div class="overview">
        <!-- Header Section -->
        <div class="header-section">
            <div class="header-content">
                <div class="title-section">
                    <h1 class="page-title">Chat Applications</h1>
                    <p class="page-subtitle">Manage and monitor your chat applications</p>
                </div>
                <button class="create-app-btn" @click="createNewApp">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    New Application
                </button>
                <button class="create-app-btn" @click="handleLogout">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Logout
                </button>
            </div>

            <!-- Stats Cards -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon active">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">{{ activeAppsCount }}</div>
                        <div class="stat-label">Active Apps</div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon users">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">{{ totalUsersCount.toLocaleString() }}</div>
                        <div class="stat-label">Total Users</div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon revenue">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">99.9%</div>
                        <div class="stat-label">Uptime</div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon messages">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value">2.4M</div>
                        <div class="stat-label">Messages</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Applications Section -->
        <div class="applications-section">
            <div class="section-header">
                <h2 class="section-title">Applications</h2>
                <div class="section-actions">
                    <div class="search-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="M21 21l-4.35-4.35"></path>
                        </svg>
                        <input type="text" placeholder="Search applications..." v-model="searchQuery">
                    </div>
                    <select class="filter-select" v-model="statusFilter">
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <!-- Applications Table -->
            <div class="table-container">
                <div class="table-wrapper">
                    <table class="applications-table">
                        <thead>
                            <tr>
                                <th>Application</th>
                                <th>Status</th>
                                <th>Performance</th>
                                <th>Created</th>
                                <th>Active Users</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="app in filteredApplications" :key="app.id" @click="navigateToDashboard(app.id)"
                                class="app-row">
                                <td>
                                    <div class="app-info">
                                        <div class="app-avatar" :style="{ backgroundColor: app.avatarColor }">
                                            {{ app.name.charAt(0).toUpperCase() }}
                                        </div>
                                        <div class="app-details">
                                            <div class="app-name">{{ app.name }}</div>
                                            <div class="app-description">{{ app.description }}</div>
                                            <div class="app-id">ID: {{ app.appId }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="status-container">
                                        <span :class="['status-badge', app.status.toLowerCase()]">
                                            <span class="status-dot"></span>
                                            {{ app.status }}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div class="performance-metrics">
                                        <div class="metric">
                                            <span class="metric-label">Response Time</span>
                                            <span class="metric-value">{{ app.responseTime }}ms</span>
                                        </div>
                                        <div class="metric-bar">
                                            <div class="metric-fill" :style="{ width: app.performanceScore + '%' }">
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="date-info">
                                        <div class="date-primary">{{ formatDate(app.created) }}</div>
                                        <div class="date-secondary">{{ getRelativeTime(app.created) }}</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="users-info">
                                        <div class="users-count">{{ app.users.toLocaleString() }}</div>
                                        <div class="users-change" :class="app.userGrowth > 0 ? 'positive' : 'negative'">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2">
                                                <polyline
                                                    :points="app.userGrowth > 0 ? '7 13 12 8 17 13' : '7 11 12 16 17 11'">
                                                </polyline>
                                            </svg>
                                            {{ Math.abs(app.userGrowth) }}%
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

export default {
    name: 'Overview',
    setup() {
        const router = useRouter()
        const authStore = useAuthStore()
        const searchQuery = ref('')
        const statusFilter = ref('')

        // Enhanced dummy data for applications
        const applications = ref([
            {
                id: 1,
                name: 'Customer Support Chat',
                description: 'Real-time customer support and ticket management',
                appId: 'cs-chat-001',
                status: 'Active',
                created: new Date('2024-01-15'),
                lastUpdated: new Date('2024-01-20'),
                users: 1250,
                userGrowth: 12.5,
                responseTime: 45,
                performanceScore: 95,
                avatarColor: '#3b82f6'
            },
            {
                id: 2,
                name: 'Sales Team Chat',
                description: 'Internal sales team communication and lead tracking',
                appId: 'sales-chat-002',
                status: 'Active',
                created: new Date('2024-01-10'),
                lastUpdated: new Date('2024-01-19'),
                users: 850,
                userGrowth: 8.2,
                responseTime: 32,
                performanceScore: 98,
                avatarColor: '#10b981'
            },
            {
                id: 3,
                name: 'Community Forum Chat',
                description: 'Public community discussions and Q&A platform',
                appId: 'forum-chat-003',
                status: 'Maintenance',
                created: new Date('2024-01-05'),
                lastUpdated: new Date('2024-01-18'),
                users: 2100,
                userGrowth: -2.1,
                responseTime: 78,
                performanceScore: 85,
                avatarColor: '#f59e0b'
            },
            {
                id: 4,
                name: 'AI Assistant Chat',
                description: 'AI-powered chatbot for automated customer service',
                appId: 'ai-chat-004',
                status: 'Active',
                created: new Date('2023-12-20'),
                lastUpdated: new Date('2024-01-17'),
                users: 3200,
                userGrowth: 25.7,
                responseTime: 15,
                performanceScore: 99,
                avatarColor: '#8b5cf6'
            },
            {
                id: 5,
                name: 'E-commerce Chat',
                description: 'Shopping assistance and order support chat',
                appId: 'ecom-chat-005',
                status: 'Inactive',
                created: new Date('2023-12-15'),
                lastUpdated: new Date('2024-01-16'),
                users: 0,
                userGrowth: 0,
                responseTime: 0,
                performanceScore: 0,
                avatarColor: '#ef4444'
            }
        ])

        // Computed properties
        const activeAppsCount = computed(() => {
            return applications.value.filter(app => app.status === 'Active').length
        })

        const totalUsersCount = computed(() => {
            return applications.value.reduce((total, app) => total + app.users, 0)
        })

        const filteredApplications = computed(() => {
            let filtered = applications.value

            // Filter by search query
            if (searchQuery.value) {
                const query = searchQuery.value.toLowerCase()
                filtered = filtered.filter(app =>
                    app.name.toLowerCase().includes(query) ||
                    app.description.toLowerCase().includes(query) ||
                    app.appId.toLowerCase().includes(query)
                )
            }

            // Filter by status
            if (statusFilter.value) {
                filtered = filtered.filter(app =>
                    app.status.toLowerCase() === statusFilter.value
                )
            }

            return filtered
        })

        // Methods
        const createNewApp = () => {
            // TODO: Implement create new app functionality
            alert('Create New App functionality will be implemented here')
        }

        const navigateToDashboard = (appId) => {
            router.push(`/dashboard/${appId}`)
        }

        const openSettings = (appId) => {
            // TODO: Navigate to app settings
            router.push(`/app/${appId}/settings`)
        }

        const viewAnalytics = (appId) => {
            // TODO: Navigate to analytics
            router.push(`/app/${appId}/analytics`)
        }

        const formatDate = (date) => {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        }

        const getRelativeTime = (date) => {
            const now = new Date()
            const diffInMs = now - date
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

            if (diffInDays === 0) return 'Today'
            if (diffInDays === 1) return 'Yesterday'
            if (diffInDays < 7) return `${diffInDays} days ago`
            if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
            return `${Math.floor(diffInDays / 30)} months ago`
        }

        const handleLogout = () => {
            authStore.logout()
            router.push('/auth')
        }

        return {
            applications,
            searchQuery,
            statusFilter,
            activeAppsCount,
            totalUsersCount,
            filteredApplications,
            createNewApp,
            navigateToDashboard,
            openSettings,
            viewAnalytics,
            formatDate,
            getRelativeTime,
            handleLogout
        }
    }
}
</script>

<style scoped>
.overview {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #f6f9fc 0%, #edf2f7 100%);
    padding: 0;
}

/* Header Section */
.header-section {
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

.create-app-btn {
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

.create-app-btn:hover {
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

/* Applications Section */
.applications-section {
    padding: 1.5rem 2rem 2rem;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a202c;
    margin: 0;
}

.section-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
}

.search-box {
    position: relative;
    display: flex;
    align-items: center;
}

.search-box svg {
    position: absolute;
    left: 0.75rem;
    color: #9ca3af;
    width: 16px;
    height: 16px;
}

.search-box input {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 0.625rem 0.75rem 0.625rem 2.25rem;
    font-size: 0.8125rem;
    transition: all 0.3s ease;
    width: 240px;
}

.search-box input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filter-select {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 0.625rem 0.75rem;
    font-size: 0.8125rem;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 120px;
}

.filter-select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Table Styles */
.table-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    overflow: hidden;
    border: 1px solid #f3f4f6;
}

.table-wrapper {
    overflow-x: auto;
}

.applications-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8125rem;
}

.applications-table th {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    padding: 0.875rem 1rem;
    text-align: left;
    font-weight: 600;
    color: #475569;
    border-bottom: 1px solid #e2e8f0;
    white-space: nowrap;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.app-row {
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid #f1f5f9;
}

.app-row:hover {
    background: linear-gradient(135deg, #fafbff 0%, #f0f4ff 100%);
}

.applications-table td {
    padding: 1rem;
    vertical-align: middle;
}

/* App Info */
.app-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.app-avatar {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: white;
    font-size: 0.875rem;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-details {
    min-width: 0;
    flex: 1;
}

.app-name {
    font-weight: 600;
    color: #1a202c;
    font-size: 0.875rem;
    line-height: 1.3;
}

.app-description {
    color: #6b7280;
    font-size: 0.75rem;
    margin-top: 0.125rem;
    line-height: 1.3;
}

.app-id {
    color: #9ca3af;
    font-size: 0.6875rem;
    font-family: 'SF Mono', Monaco, monospace;
    margin-top: 0.125rem;
}

/* Status Badge */
.status-container {
    display: flex;
    align-items: center;
}

.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.status-dot {
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

.status-badge.active {
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
    color: #047857;
    border: 1px solid #a7f3d0;
}

.status-badge.active .status-dot {
    background: #10b981;
}

.status-badge.maintenance {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #d97706;
    border: 1px solid #fde68a;
}

.status-badge.maintenance .status-dot {
    background: #f59e0b;
}

.status-badge.inactive {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    color: #dc2626;
    border: 1px solid #fecaca;
}

.status-badge.inactive .status-dot {
    background: #ef4444;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

/* Performance Metrics */
.performance-metrics {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
}

.metric {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.6875rem;
}

.metric-label {
    color: #6b7280;
}

.metric-value {
    font-weight: 600;
    color: #1f2937;
}

.metric-bar {
    width: 100%;
    height: 0.1875rem;
    background: #e5e7eb;
    border-radius: 2px;
    overflow: hidden;
}

.metric-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #10b981);
    border-radius: 2px;
    transition: width 0.3s ease;
}

/* Date Info */
.date-info {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
}

.date-primary {
    font-weight: 600;
    color: #1f2937;
    font-size: 0.8125rem;
}

.date-secondary {
    color: #6b7280;
    font-size: 0.6875rem;
}

/* Users Info */
.users-info {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    align-items: flex-end;
}

.users-count {
    font-weight: 700;
    color: #1f2937;
    font-size: 0.9375rem;
}

.users-change {
    display: flex;
    align-items: center;
    gap: 0.1875rem;
    font-size: 0.6875rem;
    font-weight: 600;
}

.users-change.positive {
    color: #059669;
}

.users-change.negative {
    color: #dc2626;
}

/* Action Buttons */
.action-buttons {
    display: flex;
    gap: 0.375rem;
}

.action-btn {
    width: 2rem;
    height: 2rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.action-btn svg {
    width: 14px;
    height: 14px;
}

.action-btn.primary {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
}

.action-btn.primary:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

.action-btn.secondary {
    background: #f3f4f6;
    color: #6b7280;
}

.action-btn.secondary:hover {
    background: #e5e7eb;
    color: #374151;
    transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 1024px) {
    .overview {
        padding: 0;
    }

    .header-section {
        padding: 1.25rem 1.5rem 0.75rem;
    }

    .applications-section {
        padding: 1.25rem 1.5rem 1.5rem;
    }

    .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.75rem;
    }

    .section-header {
        flex-direction: column;
        gap: 0.75rem;
        align-items: stretch;
    }

    .section-actions {
        flex-direction: column;
        gap: 0.75rem;
    }

    .search-box input {
        width: 100%;
    }
}

@media (max-width: 768px) {
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

    .applications-table th,
    .applications-table td {
        padding: 0.75rem 0.5rem;
    }

    .app-info {
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }

    .app-avatar {
        width: 2rem;
        height: 2rem;
        font-size: 0.75rem;
    }

    .app-name {
        font-size: 0.8125rem;
    }

    .app-description {
        font-size: 0.6875rem;
    }
}

@media (max-width: 640px) {
    .header-section {
        padding: 1rem;
    }

    .applications-section {
        padding: 1rem;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .table-container {
        border-radius: 8px;
    }

    .applications-table {
        font-size: 0.75rem;
    }

    .applications-table th {
        padding: 0.625rem 0.375rem;
        font-size: 0.6875rem;
    }

    .applications-table td {
        padding: 0.625rem 0.375rem;
    }

    .section-actions {
        flex-direction: row;
        gap: 0.5rem;
    }

    .search-box input {
        width: auto;
        flex: 1;
    }
}
</style>