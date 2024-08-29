<template>
  <div class="announcement-detail">
    <h2>{{ announcement.title }}</h2>
    <p><strong>내용:</strong> {{ announcement.contents }}</p>
    <p><strong>급여:</strong> {{ announcement.salary }} 원</p>
    <p><strong>근무일:</strong> {{ formatTimestamp(announcement.day_of_work) }}</p>
    <p><strong>근무시간:</strong> {{ formatTime(announcement.start_work_time) }} ~ {{ formatTime(announcement.end_work_time) }}</p>
    <p><strong>모집조건:</strong> {{ announcement.recruit_condition }}</p>
    <p><strong>위치 설명:</strong> {{ announcement.location_description }}</p>

    <div class="button-group">
      <button @click="editAnnouncement">수정</button>
      <button @click="deleteAnnouncement">삭제</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AnnouncementDetail',
  data() {
    return {
      announcement: {}, // 공고 데이터를 저장할 객체
    };
  },
  created() {
    this.fetchAnnouncement();
  },
  methods: {
    fetchAnnouncement() {
      const id = this.$route.params.id;
      axios.get(`http://localhost:8080/query/bizannouncement/select/${id}`)
          .then(response => {
            this.announcement = response.data;
          })
          .catch(error => {
            console.error('공고 데이터를 불러오는 중 오류가 발생했습니다:', error);
          });
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString('ko-KR');
    },
    formatTime(localTime) {
      // localTime이 'HH:mm:ss' 형식으로 들어온다고 가정
      const [hours, minutes] = localTime.split(':');
      return `${hours}시 ${minutes}분`;
    },
    editAnnouncement() {
      this.$router.push(`/bizmypage/announcement/edit/${this.announcement.announcement_id}`);
    },
    deleteAnnouncement() {
      const id = this.announcement.announcement_id;
      axios.delete(`http://localhost:8080/query/bizannouncement/delete/${id}`)
          .then(() => {
            alert('공고가 삭제되었습니다.');
            this.$router.push('/bizmypage/announcement');
          })
          .catch(error => {
            console.error('공고를 삭제하는 중 오류가 발생했습니다:', error);
          });
    }
  }
};
</script>

<style scoped>
.announcement-detail {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
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
