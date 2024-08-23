// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import CardView from '../components/KBC/middle/CardView.vue';
import MapView from '../components/KBC/middle/MapView.vue';
import Joblist from '../components/KBC/middle/Joblist.vue';


const routes = [
  {
    path: '/card',
    name: 'CardView',
    component: CardView,
  },
  {
    path: '/map',
    name: 'MapView',
    component: MapView,
  },
  {
    path: '/',
    redirect: '/card', // 기본 경로를 카드로 리디렉션
  },
  {
    path: '/joblist/:category',
    name: 'JobList',
    component: {
        joblist:Joblist,
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
