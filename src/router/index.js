import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/PJH/LoginPage.vue';
import SignUpPage from '../components/PJH/SignUpPage.vue';
import MainPage from '../components/KBC/MainPage.vue';
import CardView from '../components/KBC/middle/CardView.vue';
import MapView from '../components/KBC/middle/MapView.vue';
import JobList from '../components/KBC/middle/JobList.vue';
import ResumeList from '../components/KBC/resume/ResumeList.vue';
import MyPage from '../components/YDH/user/views/MyPage.vue';
import BizPage from '../components/YDH/biz/views/BizMyPage.vue';

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
        path: '/mypage',
        name: 'MyPage',
        component: MyPage,
        children: [
            {
                path: 'profile',
                name: 'ProfileEdit',
                component: () => import('../components/YDH/user/ProfileEdit.vue'),
            },
            {
                path: 'resume',
                name: 'ResumeList',
                component: () => import('../components/YDH/user/resume/ResumeList.vue'),
            },
            {
                path: 'resume/edit/:id',
                name: 'ResumeEdit',
                component: () => import('../components/YDH/user/resume/ResumeEdit.vue'),
            },
            {
                path: 'resume/create',
                name: 'ResumeCreate',
                component: () => import('../components/YDH/user/resume/ResumeCreate.vue'),
            },
            {
                path: 'resume/detail/:id',
                name: 'ResumeDetail',
                component: () => import('../components/YDH/user/resume/ResumeDetail.vue'),
            },
            {
                path: 'applied-jobs',
                name: 'AppliedJobs',
                component: () => import('../components/YDH/user/AppliedJobs.vue'),
            },
        ],
    },
    {
        path: '/bizmypage',
        name: 'BizMyPage',
        component: BizPage,
        children: [
            {
                path: 'profile',
                name: 'BizProfileEdit',
                component: () => import('../components/YDH/biz/BizProfileEdit.vue'),
            },
            {
                path: 'announcement',
                name: 'BizAnnouncements',
                component: () => import('../components/YDH/biz/Announcement/AnnouncementList.vue'),
            },
            {
                path: 'announcement/detail/:id',
                name: 'BizAnnouncementDetail',
                component: () => import('../components/YDH/biz/Announcement/AnnouncementDetail.vue'),
            },
            {
                path: 'announcement/edit/:id',
                name: 'AnnouncementEdit',
                component: () => import('../components/YDH/biz/Announcement/AnnouncementEdit.vue'),
            },
            {
                path: 'announcement/create',
                name: 'AnnouncementCreate',
                component: () => import('../components/YDH/biz/Announcement/AnnouncementCreate.vue'),
            },
            // 추가적인 비즈니스 유저 경로...
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
