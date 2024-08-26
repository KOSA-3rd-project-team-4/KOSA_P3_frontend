<template>
  <headers/>
  <!-- <jobPost/> -->
  <partTimeJobPosts/>
  <!-- <applicantBoard2/> -->
  <!-- <chat/> -->
</template>

<script>
import ApplicantBoard2 from './components/HJH/applicant-board2.vue';
import headers from './components/HJH/headers.vue';
import JobPost from './components/HJH/job-post.vue';
import PartTimeJobPosts from './components/HJH/Part-time-job-posts.vue';
import Chat from './components/HJH/Chat.vue';

export default {
  components: {
    headers,
    JobPost,
    PartTimeJobPosts,
    ApplicantBoard2,
    Chat,
  },
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>