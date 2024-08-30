<template>
<div>
    <header-compo></header-compo>
    <div id="root-applicants">
    <!-- <div v-if="user" id="root-applicants"> -->
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

            <div id="board-contents">
                <div id="board-contents-content">
                    <div v-for="item in applicants" :key="item.apply_id" class="applicant-box">
                        <div class="applicant-left">
                            <img :src="item.image_url" alt="지원자 이미지" class="applicant-thumbnail" />
                        </div>
                        <div class="applicant-center">
                            <div id="app-center-block">
                                <div class="announcement-title">
                                    {{ item.announcement }}
                                </div>
                                <div class="user-block">
                                    <div class="nick-name">
                                        {{ item.nick_name }}
                                    </div>
                                    <div class="user-profile">
                                        {{ item.userprofile }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="applicant-right">
                            <button
                                v-if="item.chat_created == 1"
                                class="chat-button"
                                @click="connectChat(item.apply_id, item.member_id, item.chat_created)"
                            >
                                채팅하기
                            </button>
                            <button v-else class="chat-button" @click="connectChat(item.apply_id, item.member_id, item.chat_created)">
                                채팅시작
                            </button>

                            <button
                                v-if="item.user_hired == -1"
                                class="reject-button"
                                @click="rejectApply(item.apply_id, item.member_id, item.user_hired)"
                                disabled
                            >
                                거절됨
                            </button>
                            <button
                                v-else-if="item.user_hired == 0"
                                class="reject-button"
                                @click="rejectApply(item.apply_id, item.member_id, item.user_hired)"
                            >
                                거절하기
                            </button>
                            <button
                                v-else
                                class="reject-button"
                                @click="rejectApply(item.apply_id, item.member_id, item.user_hired)"
                                style="background-color: cadetblue"
                            >
                                채용됨
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import HeaderCompo from '../../KBC/layouts/HeaderCompo.vue';

export default {
    name: 'Applies',
    components: {
        HeaderCompo,
    },
    computed: {
        ...mapGetters(['getUser']),
        user() {
            const userData = this.getUser;
            console.log('User data from Vuex:', userData);
            this.userInfo = userData;

            if (!userData) {
                console.log('비로그인 상태');
                return null;
            }

            if ('nick_name' in userData) {
                // alert('구직자입니다.');
                this.userRole = 1;
            }
            else if('bizname' in userData) {
                // alert('사업자입니다.');
                this.userRole = 2;
            }
            return userData;
        },
        applicant_id() {
            return this.$route.params.applicant_id;
        },
    },
    async created() {
      const loginType = this.$store.getters.getLoginType;

      // 로그인 유형에 따라 필요한 경우에만 fetch 호출
      if (loginType === 'oauth' && !this.$store.getters.isAuthenticated) {
        await this.$store.dispatch('fetchMemberLogin');
      } else if (loginType === 'normal' && !this.$store.getters.isAuthenticated) {
        await this.$store.dispatch('fetchBizLogin');
      }
    },
    data() {
        return {
            applicants: [
                {
                    apply_id: 1, // 지원 정보를 나타냅니다. (기본키)
                    announcement_id: 1, // 공고 정보를 찾을 수 있는 id
                    member_id: 1, // 구직자 정보를 찾을 수 있는 id

                    image_url: '*.jpg', // 이미지 썸네일
                    announcement: 'announcement', // 공고 이름
                    userprofile: '이력서 제목', // 구직자 이력서 제목
                    nick_name: '닉네임',
                    apply_date: 'date', // 지원시각

                    chat_created: 1, // true | false // 채팅 생성여부
                    user_hired: 1, // true | false // 사용자 고용여부
                },
            ],
            showDropdown: false, // 드롭다운 표시 여부
            selectedOption: '전체 보기', // 선택된 옵션
            options: ['전체 보기', '공고 1', '공고 2', '공고 3'], // 드롭다운 옵션 목록

            userInfo: '',
            userRole: 1, // 1이면 구직자, 2이면 사업자
        };
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
        async connectChat(apply_id, member_id, chat_created) {
            // console.log(apply_id, member_id, chat_created);
            // 채팅에 연결, 접속합니다.
            // alert(`채팅 시작, 선택된 apply_id: ${apply_id}, member_id: ${member_id}`);
            
            if (chat_created != 1) {
                // 채팅을 시작하면 이 유저의 item.chat_created 값을 1로 변경 (서버로)    
                const url = `http://localhost:8080/query/applies/update/chat/1/${apply_id}`;

                // PUT 요청으로 보낼 데이터 정의 (필요한 데이터를 여기에 추가)
                const data = {
                    chat_created: 0,
                    apply_id: apply_id, // 필요에 따라 추가
                };

                try {
                    const response = await axios.put(url, data);
                    // alert('Response:', response.data);
                } catch (error) {
                    console.error('Error:', error);
                }
                
                const createUrl = `http://localhost:8080/query/contractchatrooms/insert`

                const createData = {
                    apply_id: apply_id,
                    room_opening_time: null,
                }

                try {
                    const createResponse = await axios.post(createUrl, createData);
                } catch (error) {
                    console.error('Error:', error);
                }

            }

            const getRoomUrl = `http://localhost:8080/query/contractchatrooms/select/${apply_id}`
            try {
                const getRoomResponse = await axios.get(getRoomUrl);
                if (getRoomResponse.status == 200 || 201 || 202 || 203 || 204) {

                    this.$router.push({ name: 'ChatApply', params: { chat_id: apply_id } });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async rejectApply(apply_id, member_id, user_hired) {
            // 지원을 거절합니다.
            // alert(`채용 거절, 선택된 apply_id: ${apply_id}, member_id: ${member_id}`);
            
            // applies 컬럼 user_hired 채용 거절값 -1로 변경
            const url = `http://localhost:8080/query/applies/update/hired/-1/${apply_id}`;

            // PUT 요청으로 보낼 데이터 정의 (필요한 데이터를 여기에 추가)
            const data = {
                user_hired: -1,
                apply_id: apply_id, // 필요에 따라 추가
            };

            try {
                const response = await axios.put(url, data);
                // alert('Response:', response.data);
            } catch (error) {
                console.error('Error:', error);
            }

        },
    },
    mounted() {
        // 실제 데이터 로드
        // applies에서 특정 공고의 id에 해당하는 것만 where로 가져와야 함

        // 서버에서 데이터를 가져와 applicants 배열에 할당
        // 이 데이터를 요청하기에 앞서, 어떤 사업가를 기준으로 게시글을 보여야 하는지 알아야 합니다.
        // 그래서 vuex에서 사용자 id를 받아옵니다.
        const bizmember_id = 1; // 현재 로그인된 사업자 id를 받았습니다. 가정

        // axios.get('http://localhost:8080/query/view/bizmember/applies/select/' + this.$route.params.applicant_id)
        axios
            .get('http://localhost:8080/query/view/bizmember/applies/select/' + this.$route.params.bizmember_id)
            .then((response) => {
                // 서버에서 받아온 데이터로 applicants 배열 업데이트
                console.log(response.data);
                this.applicants = response.data.map((item) => ({
                    image_url: item.image_url || 'default.jpg', // 썸네일 이미지 경로 (기본값 포함)
                    userprofile: item.userprofile || '지원자 타이틀', // 지원자 타이틀

                    apply_id: item.apply_id,
                    member_id: item.member_id,
                    announcement_id: item.announcement_id,

                    announcement: item.announcement,
                    nick_name: item.nick_name,
                    apply_date: item.apply_date,
                    chat_created: item.chat_created,
                    user_hired: item.user_hired,
                }));
                console.log(this.applicants);
            })
            .catch((error) => {
                console.error('There was an error fetching the applicants data:', error);
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
    padding: 15px 30px;
    background-color: #fff; /* 배경색 변경 */
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    border-radius: 8px; /* 모서리 둥글게 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
    margin-bottom: 20px; /* 카드 간격 추가 */
}

.applicant-left {
    width: 15%;
    min-width: 100px;
    background-color: #f8f9fa; /* 배경색 변경 */
    border-top: 1px solid rgb(16, 209, 209);
    border-bottom: 1px solid rgb(16, 209, 209);
    border-left: 1px solid rgb(16, 209, 209);
    padding-left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border-radius: 8px; */
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}

/** applicant-center 자리 */

.applicant-center {
    width: 60%;
    min-width: 300px;
    background-color: #e9e9e9;
    border-top: 1px solid rgb(16, 209, 209);
    border-bottom: 1px solid rgb(16, 209, 209);
    padding: 10px;
    /* border-radius: 8px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #333; /* 텍스트 색상 조정 */
}

#app-center-block {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    /* background-color: #fff500; */
}

.announcement-title {
    position: absolute;
    padding: 5px;
    font-size: 1.2rem;
}

.user-block {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 20px;
    font-size: 1.1rem;
    align-items: end;
    box-sizing: border-box;
}

.nick-name {
    margin-left: 50px;
    margin-right: 10px;
}

.applicant-right {
    width: 24%;
    right: 0;
    min-width: 100px;
    /* background-color: #e7e7e7; */
    border-top: 1px solid rgb(16, 209, 209);
    border-bottom: 1px solid rgb(16, 209, 209);
    border-right: 1px solid rgb(16, 209, 209);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border-radius: 8px; */
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    color: #007bff; /* 텍스트 색상 조정 */
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.applicant-right:hover {
    background-color: #cfe2ff; /* 호버 시 배경색 변경 */
}

.chat-button {
    min-width: 100px;
    box-sizing: border-box;
}

.reject-button {
    min-width: 100px;
    box-sizing: border-box;
}
</style>
