<template>
    <div>
        <header-compo></header-compo>
        <middl-compo></middl-compo>
        <footer-compo></footer-compo>
    </div>
  </template>
  
  <script>
  import HeaderCompo from './layouts/HeaderCompo.vue';
  import MiddlCompo from './layouts/MiddlCompo.vue';
  import FooterCompo from './layouts/FooterCompo.vue';
  
  export default {
    components: {
      HeaderCompo,
      MiddlCompo,
      FooterCompo
    }
  }
  </script>
  
  <style scoped>
  /* 필요한 추가 스타일이 있으면 여기에 작성 */
  </style>
  