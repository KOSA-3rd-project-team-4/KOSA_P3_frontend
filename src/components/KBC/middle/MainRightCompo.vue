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
    </div>
</template>

<script>
import UserProfile from '../../PJH/UserProfile.vue';
import FindIdPopup from '../../PJH/FindIdPopup.vue';
import FindPasswordPopup from '../../PJH/FindPasswordPopup.vue';

export default {
    data() {
        return {
            isLoggedIn: false, // 여기에 로그인 여부를 임의로 설정합니다.
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
    mounted() {
        // 여기서는 로그인 상태를 체크하는 로직을 추가할 수 있습니다.
        this.isLoggedIn = true; // 백엔드가 없다면 true로 설정하여 테스트 가능합니다.
    },
};
</script>

<style>
@import url('/src/assets/KBC/middletop.css');
</style>
