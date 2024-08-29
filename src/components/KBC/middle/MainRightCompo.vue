<template>
    <div class="mainTopRight">
        <div v-if="isLoggedIn">
            <user-profile />
        </div>
        <div v-else>
            <div id="Toggle" class="toggle">
                <p class="main-primary-title local-title">로그인</p>
                <ul class="togglemode">
                    <li class="mode-left">
                        <router-link to="/login">
                            <div><img src="/src/assets/KBC/person.png" /></div>
                            <div>개인회원</div>
                        </router-link>
                    </li>
                    <hr class="large-divider" />
                    <li class="mode-right">
                        <router-link to="/resume">
                            <div><img src="/src/assets/KBC/company.png" /></div>
                            <div>기업회원</div>
                        </router-link>
                    </li>
                </ul>
                <div class="main-right-sign">
                    <router-link to="/signup">회원가입</router-link>
                    <hr />
                    <a href="#" @click.prevent="showFindIdPopup = true">아이디 찾기</a>
                    <hr />
                    <a href="#" @click.prevent="showFindPasswordPopup = true">비밀번호 찾기</a>
                </div>
            </div>
        </div>
        <div>
            <button type="button" @click.prevent="checkLoginStatus">로그인 확인</button>
        </div>
    </div>
    <!-- 아이디 찾기 모달 -->
    <find-id-popup :isOpen="showFindIdPopup" :activeTab="activeTab" @close="showFindIdPopup = false" />

    <!-- 비밀번호 찾기 모달 -->
    <find-password-popup
        :isOpen="showFindPasswordPopup"
        :activeTab="activeTab"
        @close="showFindPasswordPopup = false"
    />
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import UserProfile from '../../PJH/UserProfile.vue';
import FindIdPopup from '../../PJH/FindIdPopup.vue';
import FindPasswordPopup from '../../PJH/FindPasswordPopup.vue';

export default {
    data() {
        return {
            showFindIdPopup: false,
            showFindPasswordPopup: false,
            activeTab: 'business',
        };
    },
    components: {
        UserProfile,
        FindIdPopup,
        FindPasswordPopup,
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'isAuthenticated',
        }),
    },
    methods: {
        async checkLoginStatus() {
            try {
                const response = await axios.get('http://localhost:8080/current-user', { withCredentials: true });
                if (response.data.includes('Logged in as')) {
                    console.log(response.data);
                } else {
                    console.log('User not logged in');
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        },
    },
};
</script>

<style>
@import url('/src/assets/KBC/middletop.css');
</style>
