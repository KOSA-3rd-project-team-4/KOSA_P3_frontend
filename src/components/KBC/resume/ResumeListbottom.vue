<template>
    <div class="resume-bottom-container">
        <div class="resume-card-container">
            <router-link v-for="resume in resumes" :key="resume.id" to="/resume-detail" class="resume-card">
                <div class="thumbnail">
                    <span class="profile-img">
                        <img src="/src/assets/KBC/person.png" alt="Profile Image" />
                    </span>
                </div>
                <div class="summary-info">
                    <div class="name-container">
                        <span class="name">{{ resume.member.nick_name }}</span>
                        <!-- <span class="age">{{ resume.member.age }}대</span> -->
                    </div>
                    <div class="pr-contents">
                        <span class="contents">{{ resume.title }}</span>
                    </div>
                    <div class="tag-list">
                        <div class="tags">{{ resume.tag }}</div>
                    </div>
                </div>
                <div class="submit-resume">
                    <button type="button">제안하기</button>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            resumes: [], // 데이터를 담을 배열
        };
    },
    created() {
        // 컴포넌트가 생성될 때 데이터 가져오기
        this.fetchResumes();
    },
    methods: {
        async fetchResumes() {
            try {
                const response = await axios.get('http://localhost:8080/api/resume-list');
                this.resumes = response.data;

                console.log(this.resumes); // 서버에서 받은 데이터를 배열에 저장
            } catch (error) {
                console.error('Error fetching resumes:', error);
            }
        },
    },
};
</script>

<style>
.resume-bottom-container {
    width: 1260px;
    font-family: 'GodoM', sans-serif;
}
.resume-card-container {
    display: grid;
    justify-content: left;
    align-items: center;
    width: inherit;
}

.resume-card {
    display: flex;
    border: 1px solid #fff;
    width: inherit;
    height: 200px;
    box-sizing: border-box;
    border-radius: 16px;
    background: #fff;
    margin-top: 20px;
}
.thumbnail {
    width: 20%;
    height: auto;
    align-self: center;
}

.thumbnail img {
    width: 100px;
    height: 100px;
    object-fit: contain;
}
.summary-info {
    width: 60%;
    display: grid;
    justify-content: left;
    align-items: center;
}
.summary-info .name-container {
    margin-bottom: 10px;
    width: 100%;
    text-align: left;
}
.summary-info .name-container .name {
    margin-right: 20px;
}
.summary-info .pr-contents {
    width: 100%;
}
.summary-info .tag-list {
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
}

.tag-list .tags {
    border: 1px solid #f7f8fa;
    border-radius: 4px;
    background-color: #f7f8fa;
}

.submit-resume {
    display: flex;
    justify-content: center;
    align-items: center;
}
.submit-resume button {
    width: 200px;
    height: 30px;
    border: 1px solid #f7f8fa;
    border-radius: 14px;
    background: #93b3f4;
    font-family: 'GodoM', sans-serif;
    transition: background-color 0.3s ease;
    color: white;
}

.submit-resume button:hover {
    background-color: #7a99d4; /* 살짝 어두운 색상 */
}
</style>
