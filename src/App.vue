<template>
  <div id="app">
    <!-- headers 컴포넌트를 화면에 렌더링 -->
    <headers />

    <!-- 라우터를 통해 로드된 컴포넌트를 렌더링 -->
    <router-view></router-view>
  </div>
</template>

<script>
import headers from './components/YDH/headers/headers.vue';

export default {
  name: "App",
  components: {
    headers,
  },
  data() {
    return {};
  },
};
</script>

<style>
/* 스타일 정의 */
#app {

}
</style>
