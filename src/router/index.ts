import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'home',
      component: () => import('@/App.vue'),
      children: [
        {
          path: '',
          name: 'home',
          redirect: 'welcome',
          component: () => import('@/layout/HomePage.vue'),
          children: [
            {
              path: 'welcome',
              name: 'welcome',
              meta: {
                title: '欢迎页'
              },
              component: () => import('@/views/WelcomePage.vue')
            },
            {
              path: 'uploadFile',
              name: 'uploadFile',
              meta: {
                title: '自定义上传组件'
              },
              component: () => import('@/views/UploadFile.vue')
            },
            {
              path: 'map-3d',
              name: 'map-3d',
              meta: {
                title: '三维地图'
              },
              component: () => import('@/views/map-3d/index.vue')
            }
          ]
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/LoginPage.vue')
        },
        {
          path: '404',
          name: 'error',
          component: () => import('@/views/ErrorPage.vue')
        }
      ]
    }
  ]
})

export default router
