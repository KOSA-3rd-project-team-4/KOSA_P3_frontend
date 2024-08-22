<template>
  <header-compo></header-compo>
  <middl-compo></middl-compo>
  <footer-compo></footer-compo>
</template>

<script>
import FooterCompo from './components/KBC/layouts/FooterCompo.vue';
import HeaderCompo from './components/KBC/layouts/HeaderCompo.vue';
import MiddlCompo from './components/KBC/layouts/MiddlCompo.vue';




export default {
  name: 'App',
  components: {
    HeaderCompo,MiddlCompo,FooterCompo
  },
}
</script>

<style>
@import url(assets/base.css);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
