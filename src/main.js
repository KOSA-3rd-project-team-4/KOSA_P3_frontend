import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';  // Vuex 스토어를 사용하는 경우 필요
import axios from 'axios';  // axios를 가져옵니다
import './styles.css';

// 애플리케이션 인스턴스 생성
const app = createApp(App);

// axios를 전역 프로퍼티로 등록
app.config.globalProperties.$axios = axios;

// 플러그인 설치
app.use(router);
app.use(store);  // Vuex 스토어 사용

// 애플리케이션을 특정 DOM 요소에 마운트
app.mount('#app');