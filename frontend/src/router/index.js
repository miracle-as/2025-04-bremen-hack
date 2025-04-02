import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UploadPage from '../views/UploadPage.vue'
import ColorPalettePage from '../views/ColorPalettePage.vue'
import SearchPage from '../views/SearchPage.vue'

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
      name: 'CV',
      component: UploadPage
    },
    {
      path: '/colors',
      name: 'colors',
      component: ColorPalettePage
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage
    }
  ]
})

export default router 