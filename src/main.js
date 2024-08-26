import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

const app = createApp(App);

// axios를 전역 프로퍼티로 등록
app.config.globalProperties.$axios = axios;

app.use(router);
app.use(store);
app.mount('#app');
