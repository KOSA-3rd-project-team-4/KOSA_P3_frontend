<template>
  <div>
    <header-compo></header-compo>
    <div id="post-background">
    <!-- <div v-if="user" id="post-background"> -->
      <div id="post-block">
        <!-- Post Overview -->
        <div id="post-overview">
          <div class="flex">
            <div class="content-block">
              <h1>{{ title }}</h1>
              <p>{{ bizname }}</p>
            </div>
            <img :src="companyLogoUrl" alt="Company Logo" class="company-logo">
          </div>
          <div id="sub-title">
            <div>
              <p><span class="subject">급여:</span>{{ salary }}</p>
              <!-- <p><strong>연봉:</strong></p>
              <p>{{ salary }}</p> -->
            </div>
            <div>
              <p><span class="subject">근무 시간:</span>{{ day_of_work }}</p>
              <!-- <p><strong>근무 시간:</strong></p>
              <p>{{ day_of_work }}</p> -->
            </div>
          </div>
        </div>
  
        <!-- Post Apply Condition -->
        <div id="post-apply-condition">
          <h2>채용 조건</h2>
          <div class="grid">
            <div>
              <p><span class="subject">모집 기간:</span>{{ applicationPeriod }}</p>
              <!-- <p><strong>모집 기간:</strong></p>
              <p>{{ applicationPeriod }}</p> -->
            </div>
            <div>
              <p><span class="subject">모집 인원:</span>{{ numberOfPositions }}</p>
              <!-- <p><strong>모집 인원:</strong></p>
              <p>{{ numberOfPositions }}</p> -->
            </div>
          </div>
        </div>
  
        <!-- Post Work Area Info -->
        <div id="post-work-area-info">
          <h2>근무지 정보</h2>
          <div>
            <!-- <p><strong>근무지 명:</strong></p>
            <p>{{ workLocationName }}</p> -->
            <p><span class="subject">주소:</span>{{ location_description }}</p>
            <!-- <p><strong>주소:</strong></p>
            <p>{{ location_description }}</p> -->
            <div class="map-placeholder">
              <p>[지도 위치]</p>
            </div>
          </div>
        </div>
  
        <!-- Post Details -->
        <div id="post-details">
          <h2>세부 사항</h2>
          <p>
            {{ contents }}
          </p>
        </div>
  
        <!-- Post Apply or Applicant List Button -->
        <div id="post-apply" style="text-align: center;">
          <a v-if="'nick_name' in user" href="#" class="apply-button" @click="apply()">지금 지원하기</a>
          <a v-else-if="'bizname' in user" href="#" class="apply-button" @click="seeAplicants()">지원자 보기</a>
        </div>
  
        <!-- TODO: 사업자일 경우 지원자 목록으로 버튼 추가-->
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  import HeaderCompo from '../../KBC/layouts/HeaderCompo.vue';
  
  export default {
    name: 'JobPost',
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

        return userData;
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
        title: '소프트웨어 엔지니어',
        bizname: 'TechCorp Inc.',
        companyLogoUrl: 'https://via.placeholder.com/100x100',
        salary: '80,000,000원 - 100,000,000원',
        day_of_work: '오전 9:00 - 오후 5:00',
        applicationPeriod: '2024년 8월 1일 - 2024년 9월 1일',
        numberOfPositions: '3명',
        workLocationName: 'TechCorp 본사',
        location_description: '서울특별시 강남구 테크로 123',
        contents: `
          우리는 다양한 프로젝트에서 일할 숙련된 소프트웨어 엔지니어를 찾고 있습니다. 
          새로운 기능을 개발하고, 재능 있는 팀원들과 협업하게 될 것입니다. 최신 
          프로그래밍 언어에 대한 지식이 있어야 하며, 클라우드 인프라 경험과 
          소프트웨어 개발 모범 사례에 대한 깊은 이해를 가진 분을 기대합니다.
        `,
        is_biz_member: true,
        announcement_id: this.$route.params.announcement_id || 1, // 공고 id

        userInfo: '',
      };
    },
    methods: {
        apply() {
          // 지원합니다.
          // userData가 구직자인 상태
          const announcement_id = this.announcement_id; // 공고 id 가져오기
          
          // 새 지원 생성
          const insertApplyUrl = 'http://localhost:8080/query/applies/insert';
          const newApply = {
            'member_id': this.getUser.member_id, // 멤버 id 가져오기
            'announcement_id': announcement_id,
            'chat_created': 0,
            'user_hired': 0,
          }

          try {
            axios.post(insertApplyUrl, newApply)
              .then(() => {
                alert('지원되었습니다!');
              })
          } catch (error) {
            console.error('Error:', error);
          }

        },
        seeAplicants() {
            // alert(`Selected Announcement ID: ${applicant_id}`);
            const bizmember_id = 1; // TODO 0830 데이터 나중에 아래꺼로 변경
            // const bizmember_id = this.user.bizmember_id;

            this.$router.push({ name: 'ApplicantList', params: { bizmember_id: bizmember_id } });
        }
    },
    mounted() {
    //   // 사용자의 상태를 기반으로 is_biz_member 설정
    //   this.is_biz_member = this.user.is_biz_member;
  
      // 실제 데이터 로드
      axios.get('http://localhost:8080/query/view/announcements/select/' + this.$route.params.announcement_id)
        .then(response => {
          // 서버에서 받아온 데이터로 data 속성 업데이트
          const data = response.data;
          console.log(data);
          this.title = data.title;
          this.bizname = data.bizname; // 회사명
          this.companyLogoUrl = data.image_url; // 회사 로고
          this.salary = data.salary; 

          // day_of_work의 시간 추출
          const dayOfWork = new Date(data.day_of_work);
          const dayOfWorkHours = dayOfWork.getUTCHours(); // UTC 기준의 시간 추출
          const dayOfWorkMinutes = dayOfWork.getUTCMinutes();

          // start_work_time의 시간 추출
          const startWorkTime = new Date(data.start_work_time);
          const startWorkHours = startWorkTime.getUTCHours();
          const startWorkMinutes = startWorkTime.getUTCMinutes();
          const startWorkHoursText = startWorkTime.getUTCHours() / 12 == 1 ? '오전' : '오후';

          // end_work_time의 시간 추출
          const endWorkTime = new Date(data.end_work_time);
          const endWorkHours = endWorkTime.getUTCHours();
          const endWorkMinutes = endWorkTime.getUTCMinutes();
          const endWorkHoursText = endWorkTime.getUTCHours() / 12 == 1 ? '오전' : '오후';

          // TODO DATA
          // 시간 표시 포맷 바꾸기
          this.day_of_work = `${startWorkHoursText} ${startWorkHours%12}시 ~ ${endWorkHoursText} ${endWorkHours%12}시`;
          
          // this.applicationPeriod = data.applicationPeriod; // 이거 없네
          // this.numberOfPositions = data.numberOfPositions; // 이것도 없네
          this.location_description = data.location_description;
          this.contents = data.contents;
        })
        .catch(error => {
          console.error("There was an error fetching the job post data:", error);
        });
    }
  }
  </script>
  
  <style scoped>
  #post-background {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  #post-overview,
  #post-apply-condition,
  #post-work-area-info,
  #post-details,
  #post-apply {
    margin-bottom: 40px;
  }

  .subject {
    padding-right: 20px;
    font-weight: bold;
    font-weight: 800;
  }
  
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin: 0 0 10px;
  }
  
  h2 {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
  }
  
  p {
    margin: 5px 0;
    color: #555;
  }
  
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid #ccc; */
    padding: 10px 15px;
  }

  #post-overview,
  #post-apply-condition,
  #post-work-area-info,
  #post-details
  {
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  #sub-title {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .company-logo {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  #post-apply-condition {
    
  }
  
  .map-placeholder {
    width: 100%;
    height: 250px;
    background-color: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #777;
    font-size: 18px;
  }
  
  .apply-button {
    display: inline-block;
    padding: 15px 30px;
    background-color: #007BFF;
    color: white;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .apply-button:hover {
    background-color: #0056b3;
  }
  </style>
  