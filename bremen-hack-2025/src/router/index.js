import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UploadPage from '../views/UploadPage.vue'
import ColorPalettePage from '../views/ColorPalettePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadPage
    },
    {
      path: '/colors',
      name: 'colors',
      component: ColorPalettePage
    }
  ]
})

export default router 