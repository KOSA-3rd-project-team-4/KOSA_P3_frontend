<template>
  <div id="posts-background">
      <div id="posts-block">
          <div id="posts-header">
              <div id="posts-header-content">
                  <div id="post-header-title">
                    {{ category }} 공고 리스트
                  </div>
                  <div id="post-header-filter">

                      <div id="board-options">
                          <div id="board-options-content">
                              
                              <div id="board-filter-component">
                                  <button @click="toggleDropdown" id="board-filter-button">
                                      {{ selectOption ? selectedOption : '전체 보기'}} 
                                  </button>
          
                                  <ul v-if="showDropdown" class="dropdown">
                                      <li 
                                          v-for="(option, index) in options"
                                          :key="index"
                                          @click="selectOption(option)">
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
              
              <div v-for="post in init_listData" :key="post" class="post-content" @click="handleClick">
                  <div class="post-content-title">
                      <div class="post-content-title-thumbnail">
                          {{post.company_thumbnail}}
                      </div>
                      <div v-if="post.favorate" class="favorate">
                          T
                      </div>
                      <div v-else class="favorate">
                          F
                      </div>
                  </div>
                  <div class="post-content-company">
                      <div class="content-title">
                          {{ post.company_name }}
                      </div>
                  </div>
                  <div class="post-content-post-name">
                      <div class="content-post-title">
                          {{ post.post_name }}
                      </div>
                  </div>
                  <div class="post-content-location">
                      <div class="content-location-text">
                          {{ post.company_location }}
                      </div>
                  </div>
                  <div class="post-content-payment">
                      <div class="content-payment-box">
                          <div class="salary-type">{{post.salary_type}}</div>
                          <div class="payment">{{post.salary_price}}원</div>
                      </div>
                  </div>
              </div>

          </div>
      </div>
  </div>

</template>

<script>
import axios from 'axios'; // axios 가져오기

export default {
  name: 'JobList',
  components: {
  },
  computed: {
    category() {
      return this.$route.params.category;
    }
  },
  methods: {
    toggleDropdown() {
        this.showDropdown = !this.showDropdown;
    },
    selectOption(option) {
        this.selectedOption = option;
        this.showDropdown = false;
    },
    handleClick() {
        alert('hello!');
    }
  },
  data () {
      return {
          init_listData: [
            
              // {
              //     'company_name': '삼성',
              //     'company_thumbnail': 'image_path_samsung',
              //     'is_favorate': true,
              //     'post_name': '일일 알바 구합니다.',
              //     'company_location': '경기도 어쩌구',
              //     'salary_type': '일급',
              //     'salary_price': 100000,
              // },
              // {
              //     'company_name': 'LG',
              //     'company_thumbnail': 'image_path_lg',
              //     'is_favorate': true,
              //     'post_name': '일일 알바 많이 구합니다.',
              //     'company_location': '경기도 어쩌구',
              //     'salary_type': '시급',
              //     'salary_price': 120000,
              // },
              // {
              //     'company_name': 'LG',
              //     'company_thumbnail': 'image_path_lg',
              //     'is_favorate': true,
              //     'post_name': '일일 알바 많이 구합니다.',
              //     'company_location': '경기도 어쩌구',
              //     'salary_type': '시급',
              //     'salary_price': 120000,
              // },
              // {
              //     'company_name': 'LG',
              //     'company_thumbnail': 'image_path_lg',
              //     'is_favorate': true,
              //     'post_name': '일일 알바 많이 구합니다.',
              //     'company_location': '경기도 어쩌구',
              //     'salary_type': '시급',
              //     'salary_price': 120000,
              // },
              // {
              //     'company_name': 'LG',
              //     'company_thumbnail': 'image_path_lg',
              //     'is_favorate': true,
              //     'post_name': '일일 알바 많이 구합니다.',
              //     'company_location': '경기도 어쩌구',
              //     'salary_type': '시급',
              //     'salary_price': 120000,
              // },
              // {
              //     'company_name': 'LG',
              //     'company_thumbnail': 'image_path_lg',
              //     'is_favorate': true,
              //     'post_name': '일일 알바 많이 구합니다.',
              //     'company_location': '경기도 어쩌구',
              //     'salary_type': '시급',
              //     'salary_price': 120000,
              // },
              // {
              //     'company_name': 'LG',
              //     'company_thumbnail': 'image_path_lg',
              //     'is_favorate': true,
              //     'post_name': '일일 알바 많이 구합니다.',
              //     'company_location': '경기도 어쩌구',
              //     'salary_type': '시급',
              //     'salary_price': 120000,
              // },
              // {
              //     'company_name': 'LG',
              //     'company_thumbnail': 'image_path_lg',
              //     'is_favorate': true,
              //     'post_name': '일일 알바 많이 구합니다.',
              //     'company_location': '경기도 어쩌구',
              //     'salary_type': '시급',
              //     'salary_price': 120000,
              // },
              // {
              //     'company_name': 'LG',
              //     'company_thumbnail': 'image_path_lg',
              //     'is_favorate': true,
              //     'post_name': '일일 알바 많이 구합니다.',
              //     'company_location': '경기도 어쩌구',
              //     'salary_type': '시급',
              //     'salary_price': 120000,
              // },
              // {
              //     'company_name': 'LG',
              //     'company_thumbnail': 'image_path_lg',
              //     'is_favorate': true,
              //     'post_name': '일일 알바 많이 구합니다.',
              //     'company_location': '경기도 어쩌구',
              //     'salary_type': '시급',
              //     'salary_price': 120000,
              // },
              // {
              //     'company_name': 'LG',
              //     'company_thumbnail': 'image_path_lg',
              //     'is_favorate': true,
              //     'post_name': '일일 알바 많이 구합니다.',
              //     'company_location': '경기도 어쩌구',
              //     'salary_type': '시급',
              //     'salary_price': 120000,
              // },
              // {
              //     'company_name': 'LG',
              //     'company_thumbnail': 'image_path_lg',
              //     'is_favorate': true,
              //     'post_name': '일일 알바 많이 구합니다.',
              //     'company_location': '경기도 어쩌구',
              //     'salary_type': '시급',
              //     'salary_price': 120000,
              // },
              // {
              //     'company_name': 'LG',
              //     'company_thumbnail': 'image_path_lg',
              //     'is_favorate': true,
              //     'post_name': '일일 알바 많이 구합니다.',
              //     'company_location': '경기도 어쩌구',
              //     'salary_type': '시급',
              //     'salary_price': 120000,
              // },

          ],
          showDropdown: false,
          selectedOption: '최신순',
          options: ['최신순', '가격순', '거리순'],
      }
  },
  mounted() {
    // 컴포넌트가 마운트될 때 데이터베이스에서 데이터 가져오기
    axios.get('http://localhost:8080/posts/all')
      .then(response => {
        this.init_listData = response.data; // 서버로부터 받은 데이터를 저장
      })
      .catch(error => {
        console.error("There was an error fetching the data:", error);
      })
  },
}
</script>

<style scoped>

body {
  margin: 0;
  width: 100%;
  height: 100%;
  /* position: absolute; */
}

#posts-background {
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  position: relative;
  /* background-color: black; */
  display: flex;
  justify-content: center;
}

#posts-block {
  width: 75%;
  height: 100%;
  /* background-color: azure; */
  position: relative;
  padding: 0 20px;
  box-sizing: border-box;
}

#posts-header {
  width: 100%;
  height: 100px;
  position: relative;
  /* background-color: black; */
  padding: 20px;
  box-sizing: border-box;
}

#horizontal-container {
  display: flex;
  justify-content: center;
}

#horizontal-line {
  width: 94%;
  border: 1px solid;
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
}

#posts-header-content #post-header-title {
  width: 350px;
  font-size: 28px;
}

/* #posts-header-content #post-header-filter {
  
} */

/** 드롭다운 버튼 할당 */
#board-options {
  /* width: 30%; */
  height: 100%;
  /* background-color: cyan; */
  /* padding: 10px 85px 10px 10px; */
  box-sizing: border-box;
}

#board-options-content {
  /* width: 100%; */
  height: 100%;
  /* background-color: blue; */
  align-content: center;
}

#board-filter-component {
  /* width: 100%; */
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
  border-radius: 10px;
}

/**-------------------------------------------------------- */

#posts-contents {
  /* width: 100%; */
  /* height:  100%; */
  /* background-color: aqua; */
  display: grid;
  grid-template-columns: repeat(4, auto); /* 4열 */
  gap: 16px; /** 카드 사이의 간격 */
  padding: 16px 0; /** 컨테이너 내부의 패딩 */
  box-sizing: border-box; /** 패딩과 테두리를 포함하여  */
  justify-items: center;
}


.post-content {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  width: 300px;
  height: 250px;
}

.post-content:hover {
  background-color: #ddd;
  cursor: pointer;
}

/**------------------------------------------------------------ */

.post-content-title {
  position: relative;
  /* background-color:black; */
  border: 1px solid;
  box-sizing: border-box;
  width: 100%;
  height: 62px;
  display: flex;
  justify-content: space-between;
}

.post-content-title-thumbnail {
  position: relative;
  border: 1px solid;
  width: 200px;
  height: 100%;
  padding-right: 5px;
  padding-left: 10px;
  
}

.post-content-title .favorate {
  position: relative;
  border: 1px solid;
  width: 70px;
  height: 100%;
}


/**------------------------------------------------------------ */

.post-content-company {
  position: relative;
  /* background-color:black; */
  border: 1px solid;
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.content-title {
  position: relative;
  display: flex;
  font-size: 18px;
}

/**------------------------------------------------------------ */

.post-content-post-name {
  position: relative;
  border: 1px solid;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.content-post-title {
  position: relative;
  display: flex;
  font-size: 18px;
}

/**------------------------------------------------------------ */

.post-content-location {
  position: relative;
  border: 1px solid;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.content-location-text {
  position: relative;
  display: flex;
  font-size: 14px;
}

/**------------------------------------------------------------ */

.post-content-payment {
  position: relative;
  border: 1px solid;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.content-payment-box {
  position: relative;
  display: flex;
  font-size: 14px;
}

.content-payment-box .salary-type {
  position: relative;
  display: flex;
  font-size: 14px;
  color: green;
  border: 1px border black;
  width: fit-content;
  height: fit-content;
  padding-right: 5px;
}

.content-payment-box .payment {
  position: relative;
  display: flex;
  font-size: 14px;
}

</style>