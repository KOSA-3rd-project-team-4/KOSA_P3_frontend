<template>
    <div>
      <ul class="contents">
        
        <li v-for="(item, index) in jobListings" :key="index" class="contents-card">
          <a class="contents-card-info">
            <!-- 카드 뷰의 내용 -->
            <span class="logo">
            <img :src="item.logo" alt="company logo">
            </span>
            <span class="company">
                {{ item.company }}
            </span>
            <span class="title">
                {{ item.title }}
            </span>
            <span class="wrap">
                <span class="local"><img src="/src/assets/KBC/locationpointer.png">{{ item.location }}</span>
                <span class="pay">
                    <span class="timepay">시급</span>
                    <span class="money">{{ item.salary }}</span>
                </span>
            </span>
          </a>
        </li>
       
      </ul>
    </div>
</template>
  
<script>
  export default {
    name: 'CardView',

    data() {
        return {
        jobListings: []
        };
    },
    mounted() {
    fetch('/src/assets/KBC/tempdata.json') // public 디렉토리에 있는 파일 경로
      .then(response => response.json())
      .then(data => {
        this.jobListings = data;
      })
      .catch(error => {
        console.error('Error loading JSON:', error);
      });
  }
    
  }
</script>

<style scoped>
    @import url('/src/assets/KBC/middle.css');

</style>