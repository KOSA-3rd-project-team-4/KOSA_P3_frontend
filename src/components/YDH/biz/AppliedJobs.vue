<template>
  <div class="applied-jobs">
    <div class="header">
      <h2>내가 지원한 공고 보기</h2>
    </div>
    <ul class="applied-list">
      <li v-for="(resume) in paginatedResumes" :key="resume.id">
        {{ resume.title }} - {{ resume.date }}
      </li>
    </ul>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppliedJobs",
  data() {
    return {
      resumes: [
        { id: 1, title: "공고 1", date: "2024-08-21" },
        { id: 2, title: "공고 2", date: "2024-08-20" },
        { id: 3, title: "공고 3", date: "2024-08-19" },
        { id: 4, title: "공고 4", date: "2024-08-20" },
        { id: 5, title: "공고 5", date: "2024-08-20" },
        { id: 6, title: "공고 6", date: "2024-08-20" },
        { id: 7, title: "공고 7", date: "2024-08-20" },
        { id: 8, title: "공고 8", date: "2024-08-20" },
        { id: 9, title: "공고 9", date: "2024-08-20" },
        { id: 10, title: "공고 10", date: "2024-08-20" },
        { id: 11, title: "공고 11", date: "2024-08-20" },
        { id: 12, title: "공고 12", date: "2024-08-20" },
        { id: 13, title: "공고 13", date: "2024-08-20" },
        { id: 14, title: "공고 14", date: "2024-08-20" },
        { id: 15, title: "공고 15", date: "2024-08-20" },
      ],
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.resumes.length / this.itemsPerPage);
    },
    paginatedResumes() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.resumes.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>
.applied-jobs {
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
  gap: 300px;
}

.applied-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.applied-list li {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  word-wrap: break-word;
  background-color: #f9f9f9;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

@media (max-width: 2000px) {
  .resume-edit {
    max-width: 100%;
    padding: 0 10px;
  }

  .resume-list li {
    padding: 8px;
  }

  button {
    padding: 8px 16px;
    font-size: 12px;
  }
}
</style>