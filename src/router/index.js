import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/login/RegisterView.vue')
    },
    {
      path: '/index',
      component: () => import('../views/LayoutView.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/Home/HomeView.vue')
        },
        {
          path: '/goods',
          name: 'goods',
          component: () => import('../views/Goods/GoodsView.vue')
        },
        {
          path: '/original',
          name: 'original',
          component: () => import('../views/Original/OriginalView.vue')
        },
        {
          path: '/brand',
          name: 'brand',
          component: () => import('../views/Brands/BrandView.vue')
        }
      ]
    }
  ]
})

export default router
