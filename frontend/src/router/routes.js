import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('layouts/FrontLayout.vue'),
    children: [
      {
        path: 'template',
        component: () => import('components/MainLayout.vue'),
      },
      {
        path: 'template/:id',
        name: 'specific-template',
        component: () => import('components/SpecificLayout.vue'),
        props: true,
      },
      {
        path: 'template/edit/:id',
        name: 'update-template',
        component: () => import('components/EditLayout.vue'),
        props: true,
      },
      {
        path: 'template/delete/:id',
        name: 'delete-template',
        component: () => import('components/DeleteLayout.vue'),
        props: true,
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
