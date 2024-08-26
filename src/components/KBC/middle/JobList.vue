<template>
    <div>
      <h1>{{ category }} 알바 리스트</h1>
      <!-- 전달된 카테고리로 필터링된 데이터 등을 표시 -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'JobList',
    computed: {
      category() {
        return this.$route.params.category;
      }
    }
  }
  </script>