import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [
      // {
      //   path: "/moments",
      //   name: "Moments",
      //   component: () => import(/* webpackChunkName: "test" */ "../views/moments/index.vue"),
      // },
    ]
  },
  {
    path: '/moments',
    name: 'Moments',
    component: () => import(/* webpackChunkName: "test" */ '../views/moments/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
