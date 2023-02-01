import { createRouter, createWebHistory } from 'vue-router'

const BASE_URL = '/timepod'

const routePath = (path: string) => {
  return BASE_URL + path
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routePath('/'),
      name: 'welcome',
      component: () => import('../views/Welcome.vue')
    },
    {
      path: routePath('/home'),
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: routePath('/trois'),
      name: 'trois',
      component: () => import('../views/Trois.vue')
    },
    {
      path: routePath('/notification'),
      name: 'notification',
      component: () => import('../views/Notification.vue')
    },
    {
      path: routePath('/ar'),
      name: 'ar',
      component: () => import('../views/AR.vue')
    },
    {
      path: routePath('/time-capsule'),
      name: 'time-capsule',
      component: () => import('../views/TimeCapsule.vue')
    }
  ]
})

export default router
