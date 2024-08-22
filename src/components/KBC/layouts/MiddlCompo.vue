<template>
  <div id="middle-container">
    <div class="main-top">
      <main-left-compo></main-left-compo>
      <main-right-compo></main-right-compo>
    </div>
    <div class="main-contents">
      <middle-sv-compo></middle-sv-compo>
    </div>
  </div>
</template>

<script>
import MainLeftCompo from '../middle/MainLeftCompo.vue';
import MainRightCompo from '../middle/MainRightCompo.vue';
import MiddleSvCompo from '../middle/MiddleSvCompo.vue';


export default {
 components:{
   MainLeftCompo,MainRightCompo,MiddleSvCompo
 },
}
</script>

<style>
 #middle-container{
  margin-top: 20px;
  width:100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
 }


</style>