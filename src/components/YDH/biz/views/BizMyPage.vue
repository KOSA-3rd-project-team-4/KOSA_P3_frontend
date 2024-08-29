<template>
  <div class="bizmypage">
    <Sidebar />
    <router-view />
  </div>
</template>

<script>
import Sidebar from '../BizSidebar.vue';

export default {
  name: "BizMyPage",
  components: {
    Sidebar,
  }
};
</script>

<style scoped>
.bizmypage {
  display: flex;
}
</style>