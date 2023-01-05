import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Report from '@/views/reportHome/Index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/reportHome',
  },
  {
    path: '/reportHome',
    name: 'ReportHome',
    component: Report,
  },
  {
    path: '/reportDesign',
    name: 'reportDesign',
    component: () =>
      import(
        /* webpackChunkName: "reportDesign" */ '@/views/reportDesign/Index.vue'
      ),
  },
  {
    path: '/reportPreview',
    name: 'reportPreview',
    component: () =>
      import(
        /* webpackChunkName: "reportPreview" */ '@/views/reportPreview/Index.vue'
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
