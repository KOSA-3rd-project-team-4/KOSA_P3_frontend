import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/PJH/LoginPage.vue';
import SignUpPage from '../components/PJH/SignUpPage.vue';
import MainPage from '../components/KBC/MainPage.vue';
import CardView from '../components/KBC/middle/CardView.vue';
import MapView from '../components/KBC/middle/MapView.vue';
import JobList from '../components/KBC/middle/JobList.vue';
import ResumeList from '../components/KBC/resume/ResumeList.vue';

import PartTimeJobList from '../components/HJH/middle/PartTimeJobList.vue';
import PartTimeJobPost from '../components/HJH/middle/PartTimeJobPost.vue';
import ApplicantsList from '../components/HJH/middle/ApplicantsList.vue';
import ChatApply from '../components/HJH/middle/ChatApply.vue';

import NotFound from '../components/PJH/404ErrorPage.vue';
import ServerError from '../components/PJH/500ErrorPage.vue';
import ResumeDetail from '../components/KBC/resume/ResumeDetail.vue';
import Chat from '../components/HJH/middle/Chat.vue';
import Editor from '../components/HJH/middle/Editor.vue';

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
        component: PartTimeJobList,
    },
    {
        path: '/resume',
        name: 'ResumeList',
        component: ResumeList,
    },
    {
        path: '/job/post/:announcement_id', // 새 라우트 추가
        name: 'PartTimeJobPost',
        component: PartTimeJobPost,
    },
    {
        path: '/job/post/edit',
        name: 'EditPost',
        component: Editor,
    },
    {
        path: '/job/applicant/:applicant_id',
        name: 'ApplicantList',
        component: ApplicantsList,
    },
    {
        path: '/chat/apply/:chat_id',
        name: 'ChatApply',
        component: ChatApply,
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat,
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
    },
    {
        path: '/resume-detail',
        name: 'ResumeDetail',
        component: ResumeDetail,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
