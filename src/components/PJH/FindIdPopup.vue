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
      email: ''
    };
  },
  methods: {
    async findId() {
      try {
        const response = await axios.get(`http://localhost:8080/query/bizmembers/findByEmail`, {
          params: { email: this.email }
        });
        alert(`당신의 아이디는: ${response.data}`);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert('해당 이메일로 등록된 아이디를 찾을 수 없습니다.');
        } else {
          console.error('아이디 찾기 오류:', error);
          alert('아이디를 찾는 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
      }
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
  