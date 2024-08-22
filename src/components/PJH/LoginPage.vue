<template>
  <div class="login-container">
    <div class="tabs">
      <button
        :class="{ active: activeTab === 'personal' }"
        @click="activeTab = 'personal'"
      >
        개인회원(일자리 구하기)
      </button>
      <button
        :class="{ active: activeTab === 'business' }"
        @click="activeTab = 'business'"
      >
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
          <input type="text" v-model="businessId" required />
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
    <div v-if="showFindIdPopup && activeTab === 'business'" class="popup-overlay" @click.self="showFindIdPopup = false">
      <div class="popup">
        <h2>아이디 찾기</h2>
        <form @submit.prevent="findId">
          <div>
            <label for="email">이메일 주소</label>
            <input type="email" v-model="emailForId" required />
          </div>
          <button type="submit">아이디 찾기</button>
          <button type="button" @click="showFindIdPopup = false">닫기</button>
        </form>
      </div>
    </div>
    
    <!-- 비밀번호 찾기 팝업 -->
    <div v-if="showFindPasswordPopup && activeTab === 'business'" class="popup-overlay" @click.self="showFindPasswordPopup = false">
      <div class="popup">
        <h2>비밀번호 찾기</h2>
        <form @submit.prevent="findPassword">
          <div>
            <label for="businessId">아이디</label>
            <input type="text" v-model="businessIdForPassword" required />
          </div>
          <div>
            <label for="email">이메일 주소</label>
            <input type="email" v-model="emailForPassword" required />
          </div>
          <button type="submit">비밀번호 찾기</button>
          <button type="button" @click="showFindPasswordPopup = false">닫기</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'personal',
      businessId: '',
      password: '',
      showFindIdPopup: false,
      showFindPasswordPopup: false,
      emailForId: '',
      businessIdForPassword: '',
      emailForPassword: '',
    };
  },
  methods: {
    login() {
      // 사업자 로그인 처리
      console.log('Logging in with', this.businessId, this.password);
      // 로그인 성공 시 리디렉션 등
    },
    signup() {
      // 회원가입 페이지로 이동
      console.log('Navigating to signup page');
      this.$router.push('/signup'); // 라우터가 설정된 경우
    },
    loginWithNaver() {
      const clientId = 'Pd3ZheYPcGa654DU7dXy';
      const redirectUri = encodeURIComponent('http://localhost:8080/login/oauth2/code/naver');
      const state = 'RANDOM_STATE_STRING'; // 보안을 위해 고유한 상태 값을 사용합니다.
      const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
      window.location.href = naverAuthUrl;
    },
    findId() {
      // 아이디 찾기 로직
      console.log('Finding ID with email:', this.emailForId);
    },
    findPassword() {
      // 비밀번호 찾기 로직
      console.log('Finding Password with ID:', this.businessIdForPassword, 'and email:', this.emailForPassword);
    },
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  cursor: pointer;
  outline: none;
}

.tabs button.active {
  background-color: #fff;
  border-bottom: 2px solid #000;
  font-weight: bold;
}

.personal-login, .business-login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.inputs {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 10px;
}

.inputs div {
  margin-bottom: 10px;
}

/* 기존 스타일 유지 */
input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%; /* 기존 너비 설정 */
  max-width: 400px; /* 버튼과 동일한 너비로 제한 */
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* 패딩을 포함한 전체 너비 계산 */
}

.login-button, .signup-button {
  width: 100%;
  max-width: 400px; /* 입력 필드와 동일한 최대 너비 */
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


.login-button {
  background-color: #ffcd00;
  color: black;
}

.signup-button {
  background-color: #f1f1f1;
  color: black;
}

.oauth-buttons {
  display: flex;
}

.oauth-button {
  width: 80px;
  height: 40px;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.oauth-button.naver {
  background-color: #03c75a;
}

/* 링크 스타일 */
.links {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
}

.links a {
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9em;
}

.links a:hover {
  text-decoration: none;
}

/* 팝업 스타일 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

button {
  margin-top: 10px;
}
</style>
