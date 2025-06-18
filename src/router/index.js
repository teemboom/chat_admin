import { createRouter, createWebHistory } from 'vue-router';
import Overview from '../views/Overview.vue';
import Dashboard from '../views/Dashboard.vue';
import AuthView from '../components/AuthView.vue';
import { useAuthStore } from '../stores/authStore';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/auth',
            name: 'Auth',
            component: AuthView,
            meta: { requiresGuest: true }
        },
        {
            path: '/',
            component: Overview,
            meta: { requiresAuth: true }
        },
        {
            path: '/dashboard/:id',
            name: 'Dashboard',
            component: Dashboard,
            props: true,
            meta: { requiresAuth: true }
        }
    ]
})

// Navigation guard to handle authentication
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const isAuthenticated = authStore.isAuthenticated
    
    if (to.meta.requiresAuth && !isAuthenticated) {
        // Route requires authentication but user is not authenticated
        next('/auth')
    } else if (to.meta.requiresGuest && isAuthenticated) {
        // Route is for guests only but user is authenticated
        next('/')
    } else {
        // Proceed with navigation
        next()
    }
})

export default router