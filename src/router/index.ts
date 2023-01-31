import { createRouter, createWebHistory } from 'vue-router'

const BASE_URL = '/timepod'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: BASE_URL + '/',
      name: 'welcome',
      component: () => import('../views/Welcome.vue')
    },
    {
      path: BASE_URL + '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: BASE_URL + '/trois',
      name: 'trois',
      component: () => import('../views/Trois.vue')
    },
    {
      path: '/notification',
      name: 'notification',
      component: () => import('../views/Notification.vue')
    }
  ]
})

export default router
