<template>
  <div v-if="isOpen && activeTab === 'business'" class="popup-overlay" @click.self="closeModal">
    <div class="popup">
      <h2>비밀번호 찾기</h2>
      <form v-if="!isResetting" @submit.prevent="findPassword">
        <div>
          <label for="businessId">아이디</label>
          <input type="text" v-model="businessId" required />
        </div>
        <div>
          <label for="email">이메일 주소</label>
          <input type="email" v-model="email" required />
        </div>
        <button type="submit">비밀번호 찾기</button>
        <button type="button" @click="closeModal">닫기</button>
      </form>

      <form v-else @submit.prevent="resetPassword">
        <div>
          <label for="newPassword">새 비밀번호</label>
          <input type="password" v-model="newPassword" required />
        </div>
        <button type="submit">비밀번호 재설정</button>
        <button type="button" @click="closeModal">닫기</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    activeTab: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      businessId: '',
      email: '',
      newPassword: '',
      isResetting: false
    };
  },
  methods: {
    async findPassword() {
      try {
        const response = await axios.post('http://localhost:8080/query/bizmembers/findPassword', {
          username: this.businessId,
          email: this.email
        });
        alert(response.data); // 확인 메시지 출력
        this.isResetting = true; // 비밀번호 재설정 폼 표시
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert('일치하는 계정을 찾을 수 없습니다.');
        } else {
          console.error('비밀번호 찾기 오류:', error);
          alert('비밀번호 찾기 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
      }
    },
    async resetPassword() {
      try {
        const response = await axios.post('http://localhost:8080/query/bizmembers/resetPassword', {
          username: this.businessId,
          email: this.email,
          newPassword: this.newPassword
        });
        alert(response.data); // 성공 메시지 출력
        this.closeModal(); // 모달 닫기
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert('일치하는 계정을 찾을 수 없습니다.');
        } else {
          console.error('비밀번호 재설정 오류:', error);
          alert('비밀번호 재설정 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
      }
    },
    closeModal() {
      this.$emit('close');
      this.isResetting = false; // 초기화
      this.businessId = '';
      this.email = '';
      this.newPassword = '';
    }
  }
};
</script>
  
  <style scoped>
  /* 모달 스타일 */
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
    background-color: #ffcd00;
    border: none;
    border-radius: 4px;
  }
  </style>
  