<template>
  <div class="mypage">
    <Sidebar />
    <router-view />
  </div>
</template>

<script>
import Sidebar from '../Sidebar.vue';

export default {
  name: "MyPage",
  components: {
    Sidebar,
  }
};
</script>

<style scoped>
.mypage {
  display: flex;
}
</style>