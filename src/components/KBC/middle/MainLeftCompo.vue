<template>
  <div class="mainTopLeft">
  
    <ul id="PrimaryMenu" class="main-primary"> 
        
        <li id="PrimaryLocal">
            <div class="main-primary-title local-title">
                지역별 알바</div>
            <div class="primary-content-align">
                <div class="primary-local">
                    <router-link :to="{ name: 'JobList', params: { category: '서울' } }" class="primary-local-item">서울</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '경기' } }" class="primary-local-item">경기</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '인천' } }" class="primary-local-item">인천</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '부산' } }" class="primary-local-item">부산</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '대구' } }" class="primary-local-item">대구</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '대전' } }" class="primary-local-item">대전</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '경남' } }" class="primary-local-item">경남</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '전남' } }" class="primary-local-item">전남</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '충남' } }" class="primary-local-item">충남</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '광주' } }" class="primary-local-item">광주</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '울산' } }" class="primary-local-item">울산</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '경북' } }" class="primary-local-item">경북</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '전북' } }" class="primary-local-item">전북</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '충북' } }" class="primary-local-item">충북</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '강원' } }" class="primary-local-item">강원</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '제주' } }" class="primary-local-item">제주</router-link>
                    <router-link :to="{ name: 'JobList', params: { category: '세종' } }" class="primary-local-item">세종</router-link>
                </div>
                <ul class="primary-local-category">
                    <li class="primary-localcategory-item">
                        <img src="/src/assets/KBC/subway.png" class="marker-img">
                        <router-link :to="{ name: 'JobList', params: { category: '역세권' } }">역세권</router-link>
                    </li>
                    <li class="primary-localcategory-item">
                        <img src="/src/assets/KBC/university.png" class="marker-img">
                        <router-link :to="{ name: 'JobList', params: { category: '대학가' } }">대학가</router-link>
                    </li>
                </ul>  
            </div>  
        </li>
        <li id="PrimaryTheme">
            <div class="main-primary-title">테마별 알바</div>
            <ul class="main-primary-contents primary-category">
                <li class="primary-category-item">
                    <img src="/src/assets/KBC/restaurant.png" class="marker-img">
                    <router-link :to="{ name: 'JobList', params: { category: '식당' } }">식당</router-link>
                </li>
                <li class="primary-category-item">
                    <img src="/src/assets/KBC/store.png" class="marker-img">
                    <router-link :to="{ name: 'JobList', params: { category: '편의점' } }">편의점</router-link>
                </li>
                <li class="primary-category-item">
                    <img src="/src/assets/KBC/gym.png" class="marker-img">
                    <router-link :to="{ name: 'JobList', params: { category: '운동센터' } }">운동센터</router-link>
                </li>
                <li class="primary-category-item">
                    <img src="/src/assets/KBC/cityhall.png" class="marker-img">
                    <router-link :to="{ name: 'JobList', params: { category: '공공기관' } }">공공기관</router-link>
                </li>
            </ul>
        </li>
        <li id="PrimaryPrefer">
            <div class="main-primary-title">대상별 알바</div>
            <ul class="main-primary-contents primary-category">
                <li class="primary-prefer-category-item">
                    <img src="/src/assets/KBC/man.png" class="marker-img">
                    <router-link :to="{ name: 'JobList', params: { category: '중장년' } }">중장년</router-link>
                </li>
                <li class="primary-prefer-category-item">
                    <img src="/src/assets/KBC/univer.png" class="marker-img">
                    <router-link :to="{ name: 'JobList', params: { category: '대학생' } }">대학생</router-link>
                </li>
                <li class="primary-prefer-category-item">
                    <img src="/src/assets/KBC/teenager.png" class="marker-img">
                    <router-link :to="{ name: 'JobList', params: { category: '청소년' } }">청소년</router-link>
                </li>
                <li class="primary-prefer-category-item">
                    <img src="/src/assets/KBC/mom.png" class="marker-img">
                    <router-link :to="{ name: 'JobList', params: { category: '주부' } }">주부</router-link>
                </li>
            </ul>
        </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  @import url('/src/assets/KBC/middletop.css');
</style>