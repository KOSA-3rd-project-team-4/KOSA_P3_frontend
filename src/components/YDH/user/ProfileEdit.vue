<template>
  <div class="profile-edit">
    <div class="header">
      <h2>회원정보</h2>
    </div>

    <!-- 보기 모드 -->
    <div v-if="!editMode">
      <p><strong>이름:</strong> {{ name }}</p>
      <p><strong>닉네임:</strong> {{ userId }}</p>
      <p><strong>이메일:</strong> {{ email }}</p>
      <p class="last-modified">최근 수정일: {{ lastModified }}</p>
      <button @click="editMode = true">수정</button>
    </div>

    <!-- 수정 모드 -->
    <form v-else @submit.prevent="saveProfile">
      <div class="form-group">
        <label for="name">이름:</label>
        <input type="text" v-model="name" id="name" />
      </div>

      <div class="form-group">
        <label for="userId">아이디:</label>
        <input type="text" v-model="userId" id="userId" disabled />
      </div>

      <div class="form-group">
        <label for="email">이메일:</label>
        <input type="email" v-model="email" id="email" />
      </div>

      <div class="form-group button-group">
        <button type="submit">저장</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ProfileEdit",
  data() {
    return {
      editMode: false,
      name: '',
      userId: '',
      email: '',
      lastModified: '',
    };
  },
  created() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await axios.get(`localhost:8080/query/members/select/${this.resume.id}`); // 실제 백엔드 API 엔드포인트에 맞게 수정
        const { name, userId, email, lastModified } = response.data;
        this.name = name;
        this.userId = userId;
        this.email = email;
        this.lastModified = lastModified;
      } catch (error) {
        console.error('프로필을 불러오는 중 오류가 발생했습니다:', error);
      }
    },
    async saveProfile() {
      try {
        await axios.put(`localhost:8080/query/members/update/${this.resume.id}`, {
          name: this.name,
          email: this.email,
        }); // 실제 백엔드 API 엔드포인트에 맞게 수정

        const now = new Date();
        this.lastModified = now.toLocaleString(); // 현재 날짜와 시간으로 업데이트
        this.editMode = false;
        alert('프로필이 저장되었습니다.');
      } catch (error) {
        console.error('프로필 저장 중 오류가 발생했습니다:', error);
        alert('프로필 저장에 실패했습니다.');
      }
    }
  }
};
</script>

<style scoped>
.profile-edit {
  max-width: 1000px;
  min-width: 600px;
  margin: 20px auto;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  padding: 8px;
  font-size: 14px;
}

.last-modified {
  font-size: 12px;
  color: gray;
  margin-top: 10px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 10px 20px;
  font-size: 14px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
