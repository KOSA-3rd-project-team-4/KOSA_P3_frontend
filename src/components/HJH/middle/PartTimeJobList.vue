<template>
<div>
    <header-compo></header-compo>
    <div id="posts-background">
    <!-- <div v-if="user" id="posts-background"> -->
        <div id="posts-block">
            <div id="posts-header">
                <div id="posts-header-content">
                    <div id="post-header-title">{{ category }} 공고 리스트</div>
                    <div id="post-header-filter">
                        <div id="board-options">
                            <div id="board-options-content">
                                <div id="board-filter-component">
                                    <button @click="toggleDropdown" id="board-filter-button">
                                        {{ selectOption ? selectedOption : '전체 보기' }}
                                    </button>

                                    <ul v-if="showDropdown" class="dropdown">
                                        <li
                                            v-for="(option, index) in options"
                                            :key="index"
                                            @click="selectOption(option)"
                                        >
                                            {{ option }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="horizontal-container">
                <div id="horizontal-line"></div>
            </div>

            <div id="posts-contents">
                <div
                    v-for="post in init_listData"
                    :key="post.announcement_id"
                    class="post-content"
                    @click="handleClick(post.announcement_id)"
                >
                    <div class="post-content-title">
                        <div class="post-content-title-thumbnail">
                            <img :src="post.image_url" alt="지원자 이미지" class="applicant-thumbnail">
                        </div>
                        <div v-if="post.favorate" class="favorate">T</div>
                        <div v-else class="favorate">F</div>
                    </div>
                    <div class="post-content-post-name">
                        <div class="content-post-title">
                            {{ post.title }}
                        </div>
                    </div>
                    <div class="post-content-company">
                        <div class="content-title">
                            {{ post.company_name }}
                        </div>
                        <div class="content-location-text">
                            {{ post.location_description }}
                        </div>
                    </div>
                    <div class="post-content-payment">
                        <div class="content-payment-box">
                            <div class="salary-type">{{ post.salary_type }}</div>
                            <div class="payment">{{ post.salary }} 달러</div>
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
import axios from 'axios'; // axios 가져오기
import HeaderCompo from '../../KBC/layouts/HeaderCompo.vue';

export default {
    name: 'JobList',
    components: {
        HeaderCompo,
    },
    computed: {
        ...mapGetters(['getUser']),
        user() {
            const userData = this.getUser;
            console.log('User data from Vuex:', userData);
            return userData;
        }, 
        category() {
            return this.$route.params.category;
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
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        selectOption(option) {
            this.selectedOption = option;
            this.showDropdown = false;
            this.sortData();
        },
        sortData() {
            if (this.selectedOption === '최신순') {
                this.init_listData.sort((a, b) => b.announcement_id - a.announcement_id);
            } else if (this.selectedOption === '가격순') {
                this.init_listData.sort((a, b) => b.salary - a.salary);
            } else if (this.selectedOption === '거리순') {
                this.init_listData.sort((a, b) => {
                    // 거리순 정렬 로직 추가 (예: location_description에 대한 임의의 거리 값 사용)
                    // 이 부분은 실제 거리 계산 로직에 따라 다르게 구현될 수 있음
                    return a.location_description.localeCompare(b.location_description);
                });
            }
        },
        handleClick(announcement_id) {
            // alert(`Selected Announcement ID: ${announcement_id}`);
            this.$router.push({ name: 'PartTimeJobPost', params: { announcement_id: announcement_id } });
        },
    },
    data() {
        return {
            init_listData: [
                {
                    announcement_id: 1,
                    company_name: '삼성', // id 값 들어오는데 이거 회사명으로 갖고와야함
                    image_url: 'image_path_samsung',
                    is_favorate: true, // 이거 아직 추가 안했다..
                    title: '일일 알바 구합니다.',
                    location_description: '경기도 어쩌구',
                    salary_type: '일급', // 이거 아직 추가 안했는디..?
                    salary: 100000,
                },
            ],
            showDropdown: false,
            selectedOption: '최신순',
            options: ['최신순', '가격순', '거리순'],
        };
    },
    mounted() {
          // 컴포넌트가 마운트될 때 데이터베이스에서 데이터 가져오기
          axios.get('http://localhost:8080/query/view/announcements/select/all')
            .then(response => {
                this.init_listData = response.data.map(item => ({
                    announcement_id: item.announcement_id || 1,
                    company_name: item.bizname || '삼성',
                    image_url: item.image_url || 'image_path_samsung',
                    is_favorate: true, // 이거 아직 추가 안했다..
                    title: item.title || '일일 알바 구합니다.',
                    location_description: item.location_description || '경기도 어쩌구',
                    salary_type: '일급', // 이거 아직 추가 안했는디..?
                    salary: item.salary || 100000,
                }));
                console.log(this.init_listData);
                this.sortData();
            })
            .catch(error => {
              console.error("There was an error fetching the data:", error);
            })
    },
};
</script>

<style scoped>
body {
    margin: 0;
    width: 100%;
    height: 100%;
}

#posts-background {
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    background-color: #f8f9fa; /* PartTimeJobPost.vue와 일관된 배경색 */
}

#posts-block {
    width: 75%;
    height: 100%;
    position: relative;
    padding: 0 20px;
    box-sizing: border-box;
}

#posts-header {
    width: 100%;
    height: 100px;
    position: relative;
    padding: 20px;
    box-sizing: border-box;
}

#horizontal-container {
    display: flex;
    justify-content: center;
}

#horizontal-line {
    width: 94%;
    border: 1px solid #ddd; /* 라인 색상 조절 */
}

#posts-header-content {
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
    border-radius: 8px; /* 모서리 둥글게 */
}

#posts-header-content #post-header-title {
    width: 350px;
    font-size: 24px; /* 크기 조정 */
    font-weight: bold;
    margin: 0;
    color: #333; /* 강한 텍스트 색상 */
}

#board-options {
    height: 100%;
    box-sizing: border-box;
}

#board-options-content {
    height: 100%;
    align-content: center;
}

#board-filter-component {
    display: flex;
    justify-content: end;
}

.dropdown {
    border: 1px solid #ccc;
    margin-top: 40px;
    margin-right: 0;
    padding: 0;
    list-style: none;
    background-color: #fff;
    width: 200px;
    position: absolute;
    z-index: 1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
    border-radius: 5px; /* 모서리 둥글게 */
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
    width: 200px;
    padding: 8px;
    text-align: center;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 10px;
}

/*--------------------------------------------------------*/

#posts-contents {
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: 16px;
    padding: 16px 0;
    box-sizing: border-box;
    justify-items: center;
}

.post-content {
    background-color: white;
    border: none; /* 테두리 제거 */
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
    box-sizing: border-box;
    width: 300px;
    height: 250px;
}

.post-content:hover {
    background-color: #f8f9fa;
    cursor: pointer;
}

/*------------------------------------------------------------*/

.post-content-title {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center; /* 내용 가운데 정렬 */
    height: 62px;
    margin-bottom: 10px; /* 여백 추가 */
    padding: 0 20px;
}

.post-content-title-thumbnail {
    width: 60px;
    height: 60px;
    object-fit: cover; /* 이미지 크기 조정 */
    border-radius: 8px; /* 이미지 모서리 둥글게 */
}
.post-content-title-thumbnail img{
    width: 60px;
    height: 60px;
    object-fit: cover; /* 이미지 크기 조정 */
    border-radius: 8px; /* 이미지 모서리 둥글게 */
}

.favorate {
    font-weight: bold;
    color: #007bff; /* 강조색 */
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #e7f1ff;
}

/*------------------------------------------------------------*/

.post-content-company {
    display: flex;
    padding: 0 20px;
    font-size: 16px;
    /* font-weight: bold; */
    margin-bottom: 20px;
    color: #333; /* 강한 텍스트 색상 */
    flex-direction: row;
    justify-content: space-between;
}

.content-post-title {
    font-size: 18px;
    color: #555; /* 약간의 텍스트 색상 */
}

.content-location-text {
    font-size: 16px;
    color: #555;
}

/*------------------------------------------------------------*/

.post-content-post-name {
    display: flex;
    width: 100%;
    padding: 0 20px;
    margin-bottom: 10px;
}





/*------------------------------------------------------------*/

.post-content-payment {
    color: #777; /* 약한 텍스트 색상 */
    margin-top: 50px;
}

/*------------------------------------------------------------*/

.content-payment-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
}

.salary-type {
    color: green;
    font-size: 20px;
    font-weight: bold;
}

.payment {
    font-size: 20px;
    font-weight: bold;
}
</style>
