<template>
    <div class="mainTopRight">
        <div id="Toggle" class="toggle">
            <p class="main-primary-title">로그인</p>
            <ul class="togglemode">
                <li class="mode-left">
                    <a>개인회원</a>
                </li>
                <hr class="large-divider">
                <li class="mode-right">
                    <a>기업회원</a>
                </li>
            </ul>
            <div class="main-right-sign">
                <router-link to="/signup">회원가입</router-link>
                <hr>
                <a href="#" @click.prevent="showFindIdPopup = true">아이디 찾기</a>
                <hr>
                <a href="#" @click.prevent="showFindPasswordPopup= true">비밀번호 찾기</a>
            </div>
        </div>
    </div>
        <!-- 아이디 찾기 모달 -->
    <find-id-popup
        :isOpen="showFindIdPopup" 
        :activeTab="activeTab" 
        @close="showFindIdPopup = false" 
    />

    <!-- 비밀번호 찾기 모달 -->
    <find-password-popup 
        :isOpen="showFindPasswordPopup" 
        :activeTab="activeTab" 
        @close="showFindPasswordPopup = false" 
    />
</template>

<script>
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
    FindIdPopup,
    FindPasswordPopup
  },
}
</script>

<style>
  @import url('/src/assets/middletop.css');

</style>