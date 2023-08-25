import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/template',
    component: () => import('layouts/MainLayout.vue'),
  },

  {
    path: '/',
    component: () => import('layouts/FrontLayout.vue'),
  },
  {
    path: '/template/:id',
    name: 'specific-template',
    component: () => import('layouts/SpecificLayout.vue'),
    props: true,
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
