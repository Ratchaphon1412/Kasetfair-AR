import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('../views/Welcome.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/trois',
      name: 'trois',
      component: () => import('../views/Trois.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/Form.vue')
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('../views/FeedBack.vue')
    }
  ]
})

export default router
