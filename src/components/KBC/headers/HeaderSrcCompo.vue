<template>
  <div id="header" class="header">
    <div class="logo"><img src="/src/assets/vue.svg"/></div>
    <div class="search">
        <div class="sr-icon"><img src=""></div>
        <input type="text">
    </div>
    <div class="account">
        <div class="sign">
            <router-link to="/login">로그인</router-link>
            <hr>
            <router-link to="/signup">회원가입</router-link>
        </div>
        <div class="wrap-service">
            <button class="btn-service" type="button" >기업서비스
            </button>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  @import url('/src/assets/header.css');

 
</style>