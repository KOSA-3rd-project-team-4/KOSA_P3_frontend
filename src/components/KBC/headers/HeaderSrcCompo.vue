<template>
    <div id="header" class="header">
        <div class="logo"><img src="/src/assets/vue.svg" /></div>
        <div class="search">
            <div class="sr-icon"><img src="/src/assets/KBC/search.png" /></div>
            <input type="text" />
        </div>
        <div class="account">
            <div class="sign">
                <router-link to="/login">로그인</router-link>
                <hr />
                <router-link to="/signup">회원가입</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('/src/assets/KBC/header.css');
</style>
