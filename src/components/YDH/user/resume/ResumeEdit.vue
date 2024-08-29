<template>
  <div class="resume-edit">
    <h2>이력서 수정</h2>

    <form @submit.prevent="updateForm">
      <!-- 제목 작성 칸 -->
      <div class="form-group">
        <label for="title">이력서 제목</label>
        <input type="text" id="title" v-model="form.title" required />
      </div>

      <!-- 사진 업로드 -->
      <div class="form-group">
        <label for="photo">사진</label>
        <div v-if="form.photoPreview" class="photo-preview">
          <img :src="form.photoPreview" alt="Photo Preview" />
        </div>
        <input type="file" id="photo" @change="handlePhotoUpload" accept="image/*" />
      </div>

      <!-- 이름 작성 칸 -->
      <div class="form-group">
        <label for="name">이름</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>

      <!-- 성별 선택 칸 -->
      <div class="form-group">
        <label for="gender">성별</label>
        <select id="gender" v-model="form.gender" required>
          <option value="" disabled>선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
      </div>

      <!-- 생년월일 작성 칸 -->
      <div class="form-group">
        <label for="birthDate">생년월일</label>
        <input type="date" id="birthDate" v-model="form.birthDay" required />
      </div>

      <!-- 연락처 작성 칸 -->
      <div class="form-group">
        <label for="contact">연락처</label>
        <input type="tel" id="contact" v-model="form.contact" required />
      </div>

      <!-- 주소 작성 칸 -->
      <div class="form-group">
        <label for="address">주소</label>
        <input type="text" id="address" v-model="form.address" required />
      </div>

      <!-- 학력 사항 작성 칸 -->
      <div class="form-group">
        <div style="display: flex; justify-content: space-between; vertical-align: middle;">
          <label>학력 사항</label>
          <button type="button" @click="addEducation">학력 추가</button>
        </div>
        <div v-for="(education, index) in form.education" :key="index" class="education-entry">
          <div class="make-flex">
            <input type="text" v-model="education.school" placeholder="학교" required />
            <input type="text" v-model="education.major" placeholder="전공" required />
            <input type="text" v-model="education.period" placeholder="기간" required />
          </div>
          <button type="button" @click="removeEducation(index)">삭제</button>
        </div>
      </div>

      <!-- 경력 사항 작성 칸 -->
      <div class="form-group">
        <div style="display: flex; justify-content: space-between; vertical-align: middle;">
          <label>경력 사항</label>
          <button type="button" @click="addExperience">경력 추가</button>
        </div>
        <div v-for="(experience, index) in form.experience" :key="index" class="experience-entry">
          <div class="make-flex">
            <input type="text" v-model="experience.company" placeholder="회사명" required />
            <input type="text" v-model="experience.role" placeholder="직무" required />
            <input type="text" v-model="experience.period" placeholder="기간" required />
          </div>
          <textarea v-model="experience.description" placeholder="상세 내용" required></textarea>
          <button type="button" @click="removeExperience(index)">삭제</button>
        </div>
      </div>

      <!-- 지원 동기 작성 칸 -->
      <div class="form-group">
        <label for="motivation">지원 동기</label>
        <textarea id="motivation" v-model="form.contents" required></textarea>
      </div>

      <!-- 요일 선택 및 시간 선택 -->
      <div class="form-group">
        <label>근무 가능 요일 및 시간</label>
        <div class="days-select">
          <label v-for="(day, index) in daysOfWeek" :key="index">
            <input type="checkbox" :value="day" v-model="form.availableDays" /> {{ day }}
          </label>
        </div>
        <div class="make-flex">
          <input type="time" v-model="form.startTime" required />
          <span>~</span>
          <input type="time" v-model="form.endTime" required />
        </div>
      </div>

      <!-- 태그 추가 기능 -->
      <div class="form-group">
        <label for="tags">태그</label>
        <input type="text" id="tags" v-model="newTag" @input="filterTags" @keyup.enter="addTag" placeholder="엔터를 눌러 추가" />
        <ul v-if="filteredTags.length && newTag.trim()" class="tag-suggestions">
          <li v-for="(tag, index) in filteredTags" :key="index" @click="selectTag(tag)">
            {{ tag }}
          </li>
        </ul>
        <div class="tags-list">
          <span v-for="(tag, index) in form.tags" :key="index" class="tag">
            {{ tag }} <button type="button" @click="removeTag(index)">x</button>
          </span>
        </div>
      </div>

      <!-- 공개 여부 -->
      <div class="form-group">
        <label for="publicCheckbox">
          <input type="checkbox" id="publicCheckbox" name="public" v-model="form.display"/>
          공개 여부
        </label>
      </div>

      <!-- 제출 버튼 -->
      <button type="submit">수정 완료</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ResumeEdit",
  data() {
    return {
      form: {
        id: null,
        title: "",
        photo: null,
        photoPreview: null,
        name: "",
        gender: "",
        birthDay: "",
        contact: "",
        address: "",
        education: [
          { school: "", period: "", major: "" },
        ],
        experience: [
          { company: "", role: "", period: "", description: "" },
        ],
        contents: "",
        availableDays: [],
        startTime: "",
        endTime: "",
        tags: [],
        display: false,
      },
      newTag: "",
      daysOfWeek: ["월", "화", "수", "목", "금", "토", "일"],
      predefinedTags: ["학생", "성인", "노인", "서류 정리"], // 미리 정해진 태그 리스트
      filteredTags: [], // 필터링된 태그 리스트
    };
  },
  created() {
    const resumeId = this.$route.params.id;
    this.getResumeById(resumeId); // 수정할 이력서 ID로 데이터를 가져오는 메서드 호출
  },
  methods: {
    async getResumeById(id) {
      try {
        const response = await axios.get(`http://localhost:8080/query/memberspr/select/${id}`);
        this.form = response.data;
        if (this.form.photo) {
          this.form.photoPreview = URL.createObjectURL(new Blob([this.form.photo], { type: 'image/jpeg' }));
        }
      } catch (error) {
        console.error('Error fetching resume:', error);
      }
    },
    handlePhotoUpload(event) {
      const file = event.target.files[0];
      this.form.photo = file;
      this.form.photoPreview = URL.createObjectURL(file);
    },
    addEducation() {
      this.form.education.push({ school: "", period: "", major: "" });
    },
    removeEducation(index) {
      this.form.education.splice(index, 1);
    },
    addExperience() {
      this.form.experience.push({ company: "", role: "", period: "", description: "" });
    },
    removeExperience(index) {
      this.form.experience.splice(index, 1);
    },
    filterTags() {
      const searchText = this.newTag.trim().toLowerCase();
      if (searchText) {
        this.filteredTags = this.predefinedTags.filter(tag =>
            tag.toLowerCase().includes(searchText)
        );
      } else {
        this.filteredTags = [];
      }
    },
    selectTag(tag) {
      this.newTag = tag;
      this.addTag();
    },
    addTag() {
      if (this.newTag.trim() && !this.form.tags.includes(this.newTag)) {
        this.form.tags.push(this.newTag.trim());
        this.newTag = "";
        this.filteredTags = [];
      }
    },
    removeTag(index) {
      this.form.tags.splice(index, 1);
    },
    convertDisplayToInt() {
      return this.form.display ? 1 : 0;
    },
    formatDate(date) {
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      } else if (typeof date === 'string') {
        return date;
      } else {
        return null;
      }
    },
    formatTime(time) {
      if (typeof time === 'string' && time.trim()) {
        return time;
      } else {
        console.warn('Invalid time:', time);
        return null;
      }
    },
    async updateForm() {
      try {
        const formattedBirthDay = this.formatDate(this.form.birthDay);
        const formattedStartTime = this.formatTime(this.form.startTime);
        const formattedEndTime = this.formatTime(this.form.endTime);

        const response = await axios.put(`http://localhost:8080/query/memberspr/update/${this.form.id}`, {
          ...this.form,
          display: this.convertDisplayToInt(),
          birthDay: formattedBirthDay,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        });

        if (response.status === 200) {
          alert('이력서가 성공적으로 수정되었습니다!');
        } else {
          alert('이력서 수정에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error updating form:', error);
        alert('이력서 수정 중 오류가 발생했습니다.');
      }
    },
  },
};
</script>

<style scoped>
.resume-edit {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="date"],
input[type="tel"],
select,
textarea,
input[type="time"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}

button {
  display: inline-block;
  padding: 10px 15px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="button"] {
  background-color: #dc3545;
  margin-left: 10px;
}

button[type="submit"] {
  width: 100%;
  background-color: #28a745;
}

button:hover {
  opacity: 0.9;
}

.education-entry,
.experience-entry {
  margin-bottom: 10px;
}

.make-flex {
  display: flex;
  gap: 5px;
  align-items: center;
}

.photo-preview img {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 5px;
}

.days-select {
  display: flex;
}

.days-select label {
  margin-right: 10px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
}

.tag button {
  background: none;
  border: none;
  color: white;
  margin-left: 5px;
  cursor: pointer;
}

.tag button:hover {
  opacity: 0.8;
}

.tag-suggestions {
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  margin-top: 5px;
  padding-left: 0;
  list-style: none;
  background-color: white;
  position: absolute;
  width: 100px;
}

.tag-suggestions li {
  padding: 8px;
  cursor: pointer;
}

.tag-suggestions li:hover {
  background-color: #f0f0f0;
}

</style>