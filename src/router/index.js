import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CharacterView from '@/views/CharacterView.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/character/:realmSlug/:characterName',
      name: 'Character',
      component: CharacterView,
      props: true,
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true,
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkError,
    },
  ],
})

export default router
