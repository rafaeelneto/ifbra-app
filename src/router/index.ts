import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '@/components/Home.vue';
import Helper from '@/components/Helper.vue';
import Manual from '@/components/Manual.vue';
import CID10 from '@/components/CID10.vue';
import Info from '@/components/Info.vue';
import LGPD from '@/components/LGPD.vue';
import BackMeUp from '@/components/BackMeUp.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/legenda',
    name: 'helper',
    component: Helper,
  },
  {
    path: '/manual',
    name: 'manual',
    component: Manual,
  },
  {
    path: '/info',
    name: 'info',
    component: Info,
  },
  {
    path: '/cid10',
    name: 'cid10',
    component: CID10,
  },
  {
    path: '/lgpd',
    name: 'LGPD',
    component: LGPD,
  },
  {
    path: '/apoio',
    name: 'Contribua',
    component: BackMeUp,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
