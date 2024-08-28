<template>
    <div id="root-applicants">
        <div id="post-applicants">
            <div id="board-top">
                <div id="board-title">
                    <h1>지원자 리스트</h1>
                </div>
                <div id="board-options">
                    <div id="board-options-content">
                        <div id="board-filter-component">
                            <button @click="toggleDropdown" id="board-filter-button">
                                {{ selectOption ? selectedOption : '전체 보기' }}
                            </button>

                            <ul v-if="showDropdown" class="dropdown">
                                <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
                                    {{ option }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TODO 지원자 정보를 받으면 여기에 내려주기-->
            <div id="board-contents">
                <div id="board-contents-content">
                    <div v-for="item in applicants" :key="item.apply_id" class="applicant-box">
                        <div class="applicant-left">
                            <img :src="item.member_thumbnail" alt="지원자 이미지" class="applicant-thumbnail">
                        </div>
                        <div class="applicant-center">
                            {{item.member_apply_title}}
                        </div>
                        <div class="applicant-right">
                            <button class="chat-button">채팅</button>
                            <button class="reject-button">거절</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            applicants: [
                {
                    member_thumbnail: '*.jpg',
                    member_apply_title: 'apply title 1',
                    

                    apply_id: 1,
                    member_id: 1,
                    announcement_id: 1,
                    apply_date: 'date',
                    chat_created: 1, // true | false
                    user_hired: 1 // true | false
                }
            ],
            showDropdown: false, // 드롭다운 표시 여부
            selectedOption: '전체 보기', // 선택된 옵션
            options: ['전체 보기', '공고 1', '공고 2', '공고 3'], // 드롭다운 옵션 목록
        };
    },
    computed: {
        applicant_id() {
            return this.$route.params.applicant_id;
        }
    },
    methods: {
        toggleDropdown() {
            // 드롭다운 표시/숨기기
            this.showDropdown = !this.showDropdown;
        },
        selectOption(option) {
            // 옵션을 선택하면 selectedOption에 저장하고 드롭다운 숨김
            this.selectedOption = option;
            this.showDropdown = false;
        },
    },
    mounted() {
        // 실제 데이터 로드
        // applies에서 특정 공고의 id에 해당하는 것만 where로 가져와야 함
        
        // 서버에서 데이터를 가져와 applicants 배열에 할당
        axios.get('http://localhost:8080/query/applies/select/all')
            .then(response => {
                // 서버에서 받아온 데이터로 applicants 배열 업데이트
                this.applicants = response.data.map(item => ({
                    member_thumbnail: item.member_thumbnail || 'default.jpg', // 썸네일 이미지 경로 (기본값 포함)
                    member_apply_title: item.member_apply_title || '지원자 타이틀', // 지원자 타이틀

                    apply_id: item.apply_id,
                    member_id: item.member_id,
                    announcement_id: item.announcement_id,
                    apply_date: item.apply_date,
                    chat_created: item.chat_created,
                    user_hired: item.user_hired
                }));
                console.log(this.applicants);
            })
            .catch(error => {
                console.error("There was an error fetching the applicants data:", error);
            });
    },
};
</script>

<style scoped>
/* 추가된 스타일 */
.applicant-thumbnail {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}

.chat-button,
.reject-button {
    padding: 8px 16px;
    margin: 0 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.chat-button {
    background-color: #007bff;
    color: white;
}

.reject-button {
    background-color: #dc3545;
    color: white;
}

.chat-button:hover {
    background-color: #0056b3;
}

.reject-button:hover {
    background-color: #c82333;
}

body {
    margin: 0;
}

h1 {
    font-size: 36px;
    width: 100%;
}

.content-text {
    font-size: 14px;
    width: fit-content;
}

.dropdown {
    border: 1px solid #ccc;
    margin-top: 40px;
    margin-right: 0;
    padding: 0;
    list-style: none;
    background-color: #fff;
    width: 200px; /* 버튼과 같은 너비로 설정 */
    position: absolute;
    z-index: 1;
}

.dropdown li {
    padding: 8px;
    cursor: pointer;
}

.dropdown li:hover {
    background-color: #007bff;
    color: #fff;
}

#board-filter-button {
    width: 200px; /* 드롭다운 버튼의 너비 */
    padding: 8px;
    text-align: center;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
    box-sizing: border-box;
}

/* --------------------------------------------------------------- */

#root-applicants {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: relative;
    display: flex;
    justify-content: center;
}

#post-applicants {
    width: 70%;
    height: 100%;
    /* border: 1px solid; */
    /* background-color: cyan; */
}

#board-top {
    width: 100%;
    height: 80px;
    /* border: 1px solid; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#board-title {
    width: 30%;
    height: 100%;
}

#board-options {
    width: 30%;
    height: 100%;
    /* background-color: cyan; */
    padding: 10px 85px 10px 10px;
    box-sizing: border-box;
}

#board-options-content {
    width: 100%;
    height: 100%;
    /* background-color: blue; */
    align-content: center;
}

#board-filter-component {
    width: 100%;
    display: flex;
    justify-content: end;
}

/* --------------------------------------------------------------- */

#board-contents {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px 85px;
}

#board-contents-content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
}

.applicant-box {
    width: 100%;
    min-width: 580px;
    height: 135px;
    padding: 20px 40px;
    background-color: #fff; /* 배경색 변경 */
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    border-radius: 8px; /* 모서리 둥글게 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
    margin-bottom: 20px; /* 카드 간격 추가 */
}

.applicant-left {
    width: 20%;
    min-width: 100px;
    background-color: #f8f9fa; /* 배경색 변경 */
    padding-left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px; /* 모서리 둥글게 */
}

.applicant-center {
    width: 60%;
    min-width: 300px;
    background-color: #f1f1f1; /* 배경색 변경 */
    padding: 10px;
    border-radius: 8px; /* 모서리 둥글게 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #333; /* 텍스트 색상 조정 */
}

.applicant-right {
    width: 20%;
    min-width: 100px;
    background-color: #e7e7e7; /* 배경색 변경 */
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px; /* 모서리 둥글게 */
    color: #007bff; /* 텍스트 색상 조정 */
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.applicant-right:hover {
    background-color: #cfe2ff; /* 호버 시 배경색 변경 */
}
</style>
