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
      path: routePath('/form'),
      name: 'form',
      component: () => import('../views/Form.vue')
    },
    {
      path: routePath('/feedback'),
      name: 'feedback',
      component: () => import('../views/FeedBack.vue')
    },
    {
      path: routePath('/notification'),
      name: 'notification',
      component: () => import('../views/Notification.vue')
    },
    {  
      path: routePath('/ar'),
      name: 'ar',
      component: () => import('../views/ImageTrackCow.vue')
    },
    {  
      path: routePath('/ar1'),
      name: 'ar1',
      component: () => import('../views/ImageTrackChess.vue')
    },
    {  
      path: routePath('/ar2'),
      name: 'ar2',
      component: () => import('../views/ImageTrackCow.vue')
    },
    {
      path: routePath('/ar3'),
      name: 'ar3',
      component: () => import('../views/Share.vue')
    },
    {
      path: routePath('/share'),
      name: 'share',
      props: ['preview'],
      component: () => import('../views/Share.vue')
    },
  ]
})

export default router
