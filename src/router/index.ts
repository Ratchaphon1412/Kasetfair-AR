import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('@/views/Welcome.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('@/views/TimelineTable.vue')
    },{

      path: '/form',
      name: 'form',
      component: () => import('@/views/Form.vue')
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('@/views/FeedBack.vue')
    },
    {
      path: '/notification',
      name: 'notification',
      component: () => import('@/views/Notification.vue')
    },
    {  
      path: '/ar0',
      name: 'ar0',
      component: () => import('@/views/MarkerNak.vue')
    },
    {  
      path: '/ar1',
      name: 'ar1',
      component: () => import('@/views/ImageTrackChess.vue')
    },
    {  
      path: '/ar2',
      name: 'ar2',
      component: () => import('@/views/MarkerMedical.vue')
    },
    {
      path: '/ar3',
      name: 'ar3',
      component: () => import('@/views/ImageTrackCow.vue')
    },
    {
      path: '/ar4',
      name: 'ar4',
      component: () => import('@/views/MarkerPriemuim.vue')
    },
    {
      path: '/share',
      name: 'share',
      props: ['preview'],
      component: () => import('@/views/Share.vue')
    },
    {
      path: '/arx',
      name: 'arx',
      component: () => import('@/views/Markersculpture.vue')
    },
    {
      path: '/ar8',
      name: 'ar8',
      component: () => window.location.href = 'https://kanompangg.github.io/Kaset-Fair-Location-Based-AR/'
    },
    {
      path: '/time-capsule',
      name: 'time-capsule',
      component: () => import('@/views/TimeCapsule.vue')
    }
  ]
})

export default router
