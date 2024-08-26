import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/PJH/LoginPage.vue';
import SignUpPage from '../components/PJH/SignUpPage.vue';
import MainPage from '../components/KBC/MainPage.vue';
import CardView from '../components/KBC/middle/CardView.vue';
import MapView from '../components/KBC/middle/MapView.vue';
import JobList from '../components/KBC/middle/JobList.vue';
import ResumeList from '../components/KBC/resume/ResumeList.vue';
import NotFound from '../components/PJH/404ErrorPage.vue'
import ServerError from '../components/PJH/500ErrorPage.vue'

const routes = [
    {
        path: '/',
        name: 'Main',
        component: MainPage,
        children: [
            {
                path: '/',
                name: 'CardView',
                component: CardView,
            },
            {
                path: 'map',
                name: 'MapView',
                component: MapView,
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignUpPage,
    },
    {
        path: '/joblist/:category',
        name: 'JobList',
        component: JobList,
    },
    {
        path: '/resume',
        name: 'ResumeList',
        component: ResumeList,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
      },
    {
        path: '/500',
        name: 'ServerError',
        component: ServerError,

    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
