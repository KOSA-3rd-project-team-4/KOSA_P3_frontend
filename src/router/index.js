import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/PJH/LoginPage.vue';
import SignUpPage from '../components/PJH/SignUpPage.vue';
import MainPage from '../components/KBC/MainPage.vue';
import CardView from '../components/KBC/middle/CardView.vue';
import KakaoMap from '../components/SJA/KakaoMap.vue';
import MyPage from '../components/YDH/user/views/MyPage.vue';
import BizPage from '../components/YDH/biz/views/BizMyPage.vue';
import PartTimeJobList from '../components/HJH/middle/PartTimeJobList.vue';
import PartTimeJobPost from '../components/HJH/middle/PartTimeJobPost.vue';
import ApplicantsList from '../components/HJH/middle/ApplicantsList.vue';
import ChatApply from '../components/HJH/middle/ChatApply.vue';
import NotFound from '../components/PJH/404ErrorPage.vue';
import ServerError from '../components/PJH/500ErrorPage.vue';
import ResumeDetail from '../components/KBC/resume/ResumeDetail.vue';
import Chat from '../components/HJH/middle/Chat.vue';
import Editor from '../components/HJH/middle/Editor.vue';
import PostEditor from '../components/HJH/PostEditor.vue';
import ResumePool from '../components/KBC/resume/ResumePool.vue';

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
                component: KakaoMap,
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
        name: 'ResumePool',
        component: ResumePool,
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
    {
        path: '/job/post/:announcement_id', // 새 라우트 추가
        name: 'PartTimeJobPost',
        component: PartTimeJobPost,
    },
    {
        path: '/job/post/edit',
        name: 'EditPost',
        component: PostEditor,
    },
    {
        path: '/job/applicant/:bizmember_id',
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
