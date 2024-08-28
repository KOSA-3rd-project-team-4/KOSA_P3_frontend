<template>
    <div class="login-container">
        <div class="tabs">
            <button :class="{ active: activeTab === 'personal' }" @click="activeTab = 'personal'">
                개인회원(일자리 구하기)
            </button>
            <button :class="{ active: activeTab === 'business' }" @click="activeTab = 'business'">
                기업회원(알바생 찾기)
            </button>
        </div>

        <div v-if="activeTab === 'personal'" class="personal-login">
            <h2>개인회원 로그인</h2>
            <div class="oauth-buttons">
                <button @click="loginWithNaver" class="oauth-button naver">네이버</button>
            </div>
        </div>

        <div v-if="activeTab === 'business'" class="business-login">
            <h2>사업자 로그인</h2>
            <form @submit.prevent="login">
                <div>
                    <label for="businessId">아이디</label>
                    <input type="text" v-model="username" required />
                </div>
                <div>
                    <label for="password">비밀번호</label>
                    <input type="password" v-model="password" required />
                </div>
                <button type="submit" class="login-button">로그인</button>
                <button type="button" class="signup-button" @click="signup">회원가입</button>
            </form>
            <div class="links">
                <a href="#" @click.prevent="showFindIdPopup = true">아이디 찾기</a>
                <a href="#" @click.prevent="showFindPasswordPopup = true">비밀번호 찾기</a>
            </div>
        </div>

        <!-- 아이디 찾기 팝업 -->
        <find-id-popup :isOpen="showFindIdPopup" :activeTab="activeTab" @close="showFindIdPopup = false" />

        <!-- 비밀번호 찾기 팝업 -->
        <find-password-popup
            :isOpen="showFindPasswordPopup"
            :activeTab="activeTab"
            @close="showFindPasswordPopup = false"
        />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import qs from 'qs';
import FindIdPopup from './FindIdPopup.vue';
import FindPasswordPopup from './FindPasswordPopup.vue';

export default {
    data() {
        return {
            activeTab: 'personal',
            username: '',
            password: '',
            showFindIdPopup: false,
            showFindPasswordPopup: false,
            emailForId: '',
            businessIdForPassword: '',
            emailForPassword: '',
        };
    },
    components: {
        FindIdPopup,
        FindPasswordPopup,
    },
    methods: {
        ...mapActions(['fetchlogin']),
        async login() {
            // 사업자 로그인 처리
            console.log('Logging in with', this.username, this.password);
            // 로그인 성공 시 리디렉션 등
            try {
                const response = await axios.post(
                    'http://localhost:8080/login',
                    qs.stringify({
                        username: this.username,
                        password: this.password,
                    }),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        withCredentials: true,
                    },
                ); // withCredentials: true로 세션 쿠키 포함

                if (response.status === 200) {
                    this.fetchlogin();
                    // 로그인 성공 시, 원하는 페이지로 이동
                    this.$router.push('/');
                }
            } catch (error) {
                // HTTP 상태 코드와 메시지를 확인하여 에러를 처리합니다.
                if (error.response && error.response.status === 401) {
                    this.errorMessage = error.response.data;
                } else {
                    this.errorMessage = 'Login failed. Please check your credentials.';
                }
            }
        },
        signup() {
            // 회원가입 페이지로 이동
            console.log('Navigating to signup page');
            this.$router.push('/signup'); // 라우터가 설정된 경우
        },
        loginWithNaver() {
            const naverAuthUrl = 'http://localhost:8080/oauth2/authorization/naver';
            window.location.href = naverAuthUrl;  // 네이버 로그인 페이지로 리디렉션
          },
    },
};
</script>

<style scoped>
@import url('/src/assets/loginpage.css');
</style>
