<template>
    <div class="resume-edit">
        <div class="header">
            <h2>내 공고 작성/수정</h2>
            <button @click="createResume">작성</button>
        </div>

        <ul class="resume-list">
            <li
                v-for="resume in paginatedResumes"
                :key="resume.announcement_id"
                @click="viewResumeDetail(resume.announcement_id)"
            >
                {{ resume.title }}
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
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    name: 'ResumeEdit',
    data() {
        return {
            resumes: [], // 공고 목록을 저장하는 배열
            currentPage: 1, // 현재 페이지 번호
            itemsPerPage: 10, // 한 페이지에 표시할 공고 수
        };
    },
    computed: {
        ...mapGetters(['getUser']),
        user() {
            const userData = this.getUser;
            console.log('User data from Vuex:', userData);
            return userData;
        },
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
        createResume() {
            alert('이력서 작성 페이지로 이동합니다.');
            this.$router.push('/bizmypage/announcement/create');
        },
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
        viewResumeDetail(announcement_id) {
            this.$router.push(`/bizmypage/announcement/detail/${announcement_id}`);
        },
        fetchResumes() {
            // 백엔드에서 공고 목록을 가져오는 로직
            console.log(this.user.bizname);
            axios
                .get(`http://localhost:8080/query/bizannouncement/select/user/${this.user.bizmember_id}`)
                .then((response) => {
                    this.resumes = response.data; // 받아온 데이터를 resumes 배열에 저장
                })
                .catch((error) => {
                    console.error('공고를 가져오는 중 오류가 발생했습니다:', error);
                });
        },
    },
    created() {
        this.fetchResumes(); // 컴포넌트가 생성될 때 공고 데이터를 불러옴
    },
};
</script>

<style scoped>
.resume-edit {
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
    gap: 20px;
}

.resume-list {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.resume-list li {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    word-wrap: break-word;
    background-color: #f9f9f9;
    cursor: pointer;
}

.resume-list li:hover {
    background-color: #eef1f6;
}

.pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    padding: 10px 20px;
    font-size: 14px;
    background-color: #007bff;
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
