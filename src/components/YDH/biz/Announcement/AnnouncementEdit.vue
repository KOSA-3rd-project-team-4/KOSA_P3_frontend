<template>
  <div class="announcement-edit">
    <h2>공고 수정</h2>

    <form @submit.prevent="updateAnnouncement">
      <div class="form-group">
        <label for="title">제목:</label>
        <input type="text" v-model="announcement.title" id="title" required />
      </div>

      <div class="form-group">
        <label for="contents">내용:</label>
        <textarea v-model="announcement.contents" id="contents" required></textarea>
      </div>

      <div class="form-group">
        <label for="salary">급여:</label>
        <input type="number" v-model="announcement.salary" id="salary" required />
      </div>

      <div class="form-group">
        <label for="day_of_work">근무일:</label>
        <input type="date" v-model="announcement.day_of_work" id="day_of_work" required />
      </div>

      <div class="form-group">
        <label for="start_work_time">근무 시작 시간:</label>
        <input type="time" v-model="announcement.start_work_time" id="start_work_time" required />
      </div>

      <div class="form-group">
        <label for="end_work_time">근무 종료 시간:</label>
        <input type="time" v-model="announcement.end_work_time" id="end_work_time" required />
      </div>

      <div class="form-group">
        <label for="recruit_condition">모집조건:</label>
        <input type="text" v-model="announcement.recruit_condition" id="recruit_condition" required />
      </div>

      <div class="form-group">
        <label for="location_description">위치 설명:</label>
        <textarea v-model="announcement.location_description" id="location_description" required></textarea>
      </div>

      <div class="button-group">
        <button type="submit">저장</button>
        <button @click="cancelEdit">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AnnouncementEdit',
  data() {
    return {
      announcement: {
        title: '',
        contents: '',
        salary: 0,
        day_of_work: '',
        start_work_time: '',
        end_work_time: '',
        recruit_condition: '',
        location_description: '',
      },
    };
  },
  methods: {
    fetchAnnouncement() {
      const id = this.$route.params.id;
      axios.get(`http://localhost:8080/query/bizannouncement/select/${id}`)
          .then(response => {
            this.announcement = response.data;
          })
          .catch(error => {
            console.error('공고 정보를 가져오는 중 오류가 발생했습니다:', error);
          });
    },
    updateAnnouncement() {
      axios.put(`http://localhost:8080/query/bizannouncement/update/${this.$route.params.id}`, this.announcement)
          .then(() => {
            alert('공고가 수정되었습니다.');
            this.$router.push(`/bizmypage/announcement/detail/${this.$route.params.id}`);
          })
          .catch(error => {
            console.error('공고를 수정하는 중 오류가 발생했습니다:', error);
          });
    },
    cancelEdit() {
      this.$router.push(`/bizmypage/announcement/detail/${this.$route.params.id}`);
    },
  },
  created() {
    this.fetchAnnouncement();
  },
};
</script>

<style scoped>
.announcement-edit {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: space-between;
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

button:last-child {
  background-color: #dc3545;
}

button:last-child:hover {
  background-color: #c82333;
}
</style>
