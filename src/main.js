import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { useKakao } from 'vue3-kakao-maps';

useKakao(import.meta.env.VITE_KAKAO_MAP_KEY);

const app = createApp(App);

// axios 인터셉터 설정
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 500) {
            router.push({ name: 'ServerError' }); // 500 에러 발생 시 500 에러 페이지로 리디렉션
        }
        return Promise.reject(error);
    },
);

// axios를 전역 프로퍼티로 등록
app.config.globalProperties.$axios = axios;
app.use(router);
app.use(store); // Vuex 스토어 사용

// 애플리케이션을 특정 DOM 요소에 마운트
app.mount('#app');
