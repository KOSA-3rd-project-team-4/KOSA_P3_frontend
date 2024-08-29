<<template>
  <div class="resume-detail" v-if="resume">
    <div class="header">
      <h2>{{ resume.title }}</h2>
      <div class="button-group">
        <button @click="editResume" class="edit-button">수정</button>
        <button @click="deleteResume" class="delete-button">삭제</button>
      </div>
    </div>
    <div class="details">
      <p><strong>이름:</strong> {{ resume.name }}</p>
      <p><strong>성별:</strong> {{ resume.gender }}</p>
      <p><strong>생년월일:</strong> {{ formatDate(resume.birthDay) }}</p>
      <p><strong>연락처:</strong> {{ resume.contact }}</p>
      <p><strong>주소:</strong> {{ resume.address }}</p>
    </div>

    <!-- 학력 사항 -->
    <div v-if="resume.education && resume.education.length" class="section">
      <h3>학력 사항</h3>
      <ul>
        <li v-for="(edu, index) in resume.education" :key="index">
          <div class="education-item">
            <span class="school">{{ edu.school }}</span>
            <span class="period">({{ edu.period }})</span>
            <span class="major"> - {{ edu.major }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 경력 사항 -->
    <div v-if="resume.experience && resume.experience.length" class="section">
      <h3>경력 사항</h3>
      <ul>
        <li v-for="(exp, index) in resume.experience" :key="index">
          <div class="experience-item">
            <span class="company">{{ exp.company }}</span>
            <span class="period">({{ exp.period }})</span>
            <span class="role"> - {{ exp.role }}</span>
            <p class="description"><strong>세부사항: </strong>{{ exp.description }}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 지원 동기 -->
    <div v-if="resume.contents" class="section">
      <h3>지원 동기</h3>
      <p>{{ resume.contents }}</p>
    </div>

    <!-- 알바 가능 시간 -->
    <div v-if="resume.availableDays && resume.availableDays.length" class="section">
      <h3>알바 가능 시간</h3>
      <p>가능한 요일: {{ resume.availableDays.join(', ') }}</p>
      <p>시간: {{ formatTime(resume.startTime) }} ~ {{ formatTime(resume.endTime) }}</p>
    </div>

    <!-- 태그 -->
    <div v-if="resume.tags && resume.tags.length" class="section">
      <h3>태그</h3>
      <p>{{ resume.tags.join(', ') }}</p>
    </div>
  </div>
  <div v-else>
    <p>이력서를 불러오는 중입니다...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ResumeDetail',
  data() {
    return {
      resume: null, // 이력서 데이터를 저장할 객체
    };
  },
  created() {
    const resumeId = this.$route.params.id;
    this.getResumeById(resumeId); // 이력서 ID로 데이터를 가져오는 메서드 호출
  },
  methods: {
    getResumeById(id) {
      axios.get(`http://localhost:8080/query/memberspr/select/${id}`)  // 실제 백엔드 API 엔드포인트에 맞게 수정
          .then(response => {
            this.resume = response.data; // 백엔드에서 받은 이력서 데이터를 resume에 저장
          })
          .catch(error => {
            console.error('이력서 데이터를 불러오는 중 오류가 발생했습니다:', error);
          });
    },
    editResume() {
      this.$router.push({ name: 'ResumeEdit', params: { id: this.resume.id } }); // 수정 페이지로 이동
    },
    async deleteResume() {
      if (confirm('정말로 이 이력서를 삭제하시겠습니까?')) {
        try {
          await axios.delete(`http://localhost:8080/query/memberspr/delete/${this.resume.id}`);
          alert('이력서가 삭제되었습니다.');
          this.$router.push({ name: 'ResumeList' }); // 삭제 후 이력서 목록 페이지로 이동
        } catch (error) {
          console.error('이력서 삭제 중 오류가 발생했습니다:', error);
          alert('이력서 삭제에 실패했습니다.');
        }
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('ko-KR'); // 한국 날짜 형식으로 변환
    },
    formatTime(time) {
      return new Date(`1970-01-01T${time}Z`).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }); // HH:MM 형식으로 변환
    }
  },
};
</script>

<style scoped>
.resume-detail {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-group {
  display: flex;
  gap: 10px;
}

.edit-button,
.delete-button {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

.edit-button {
  background-color: #007bff;
  color: white;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

.delete-button:hover {
  background-color: #c82333;
}

.details {
  margin-bottom: 20px;
}

.section {
  margin-bottom: 20px;
}

.education-item, .experience-item {
  display: flex;
  align-items: center;
}

.school, .company, .period, .major, .role {
  margin-right: 10px;
}

.description {
  margin-top: 10px;
}

h3 {
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
</style>
