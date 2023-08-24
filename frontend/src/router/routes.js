
const routes = [
  {
    path: '/template',
    component: () => import('layouts/MainLayout.vue'),
  },

  {
    path: '/',
    component: () => import('layouts/FrontLayout.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
