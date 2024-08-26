<template>
    <div v-if="isOpen && activeTab === 'business'" class="popup-overlay" @click.self="closeModal">
      <div class="popup">
        <h2>아이디 찾기</h2>
        <form @submit.prevent="findId">
          <div>
            <label for="email">이메일 주소</label>
            <input type="email" v-model="email" required />
          </div>
          <button type="submit">아이디 찾기</button>
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
        email: ''
      };
    },
    methods: {
      findId() {
        console.log('Finding ID with email:', this.email);
        // 아이디 찾기 로직 추가
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
  