<template>
    <div id="header" class="header">
        <router-link to="/" class="logo">
            <img src="/src/assets/KBC/present-logo-nonbg.png" />
            <img src="/src/assets/KBC/title.png" />
        </router-link>

        <div class="search">
            <div class="sr-icon"><img src="/src/assets/KBC/search.png" /></div>
            <input type="text" />
        </div>
        <div class="account">
            <div v-if="isAuthenticated" class="user-info">
                <span>Welcome, {{ user.username || user.nick_name }}!</span>
                <button @click="logout">Logout</button>
            </div>
            <div v-else class="sign">
                <router-link to="/login">로그인</router-link>
                <hr />
                <router-link to="/signup">회원가입</router-link>
            </div>
            <div class="company-service">
                <router-link to="/resume">인재풀</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters(['isAuthenticated', 'getUser']),
        user() {
            return {
                username: this.getUser.bizname || this.getUser.nick_name,
            };
        },
    },
    methods: {
        async logout() {
            await this.logout();
            this.$router.push('/login'); // 로그아웃 후 로그인 페이지로 리디렉션
        },
        ...mapActions(['logout']),
    },
};
</script>

<style scoped>
@import url('/src/assets/KBC/header.css');
</style>
