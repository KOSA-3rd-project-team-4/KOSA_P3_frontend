<template>
    <div v-if="isOpen && activeTab === 'business'" class="popup-overlay" @click.self="closeModal">
      <div class="popup">
        <h2>비밀번호 찾기</h2>
        <form @submit.prevent="findPassword">
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
      </div>
    </div>
  </template>
  
  <script>
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
        email: ''
      };
    },
    methods: {
      findPassword() {
        console.log('Finding Password with ID:', this.businessId, 'and email:', this.email);
        // 비밀번호 찾기 로직 추가
      },
      closeModal() {
        this.$emit('close');
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
  