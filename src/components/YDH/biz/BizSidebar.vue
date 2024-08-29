<template>
  <div class="sidebar">
    <ul>
      <li><router-link to="/bizmypage/profile">회원정보</router-link></li>
      <li><router-link to="/bizmypage/announcement">내 공고 작성/수정</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar"
};
</script>

<style scoped>

body {
  margin: 0;
}
.sidebar {
  width: 200px;
  max-width: 200px;
  min-width: 190px;
  height: calc(100vh - 101px);
  position: fixed;
  background-color: #f4f4f4;
  padding: 20px;
  z-index: 2;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  //padding: 0;
  //padding-top: 120px;
}

li {
  margin: 10px 0;
}

a {
  text-decoration: none;
  color: #333;
}

/* 미디어 쿼리 - 작은 화면에서 사이드바 숨기기 */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: absolute; /* 사이드바가 메인 콘텐츠 위에 위치하도록 함 */
    top: 0;
    left: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.active {
    transform: translateX(0);
  }
}
</style>