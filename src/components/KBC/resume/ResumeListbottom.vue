<template>
    <div class="resume-bottom-container">
        <div class="resume-card-container">
            <router-link v-for="(resume, index) in resumeListings" :key="index" class="resume-card">
                <div class="thumbnail">
                    <span class="profile-img">
                        <img src="/src/assets/KBC/person.png" alt="Profile Image" />
                    </span>
                </div>
                <div class="summary-info">
                    <div class="name-container">
                        <span class="name">{{ resume.nick_name }}</span>
                        <!-- <span class="age">{{ resume.member.age }}대</span> -->
                    </div>
                    <div class="pr-contents">
                        <span class="contents">{{ resume.title }}</span>
                    </div>
                    <div class="tag-list">
                        <ul class="tag-contents">
                            <li v-for="(tag, tagIndex) in filteredTags(resume.pr_id)" :key="tagIndex" class="tag-card">
                                <span>{{ tag.tag }}</span>
                            </li>
                        </ul>
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
    name: 'ResumeListbottom',

    data() {
        return {
            resumeListings: [],
            resumetagList: [],
        };
    },

    methods: {
        // Spring Boot API에서 데이터 가져오기
        fetchData(url, targetArray) {
            axios
                .get(url)
                .then((response) => {
                    this[targetArray] = response.data;
                })
                .catch((error) => {
                    console.error(`Error loading ${url}:`, error);
                });
            console.log(this[targetArray]);
        },

        // 특정 item.id에 대해 tagList를 필터링하는 메소드
        filteredTags(itemId) {
            return this.resumetagList.filter((tag) => tag.pr_id === itemId);
        },
    },

    mounted() {
        // 스프링부트에서 데이터를 가져오는 코드로 수정
        this.fetchData('http://localhost:8080/api/resume-list', 'resumeListings');
        this.fetchData('http://localhost:8080/api/resume-tags', 'resumetagList');
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
    box-sizing: border-box;
    grid-template-columns: 1fr;
}
.summary-info div {
    width: 100%;
    box-sizing: border-box;
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
    text-align: left;
}
.summary-info .tag-list {
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    text-align: left;
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

.tag-contents {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;
}

.tag-contents li {
    overflow: unset;
    float: left;
    position: relative;
    /* width: calc(30% - 15px); */
    height: 20px;
    border-radius: 4px;
    background-color: #b6e6f6;
    margin: 0 6px 2px 0;
}

.tag-card {
    border: 1px solid #92a9b1;
    border-radius: 4px;
    background-color: #92a9b1;
}
</style>
