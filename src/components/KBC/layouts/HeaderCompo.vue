<template>
    <div id="header-container">
        <header-src-compo></header-src-compo>
    </div>
</template>

<script>
import HeaderSrcCompo from '../headers/HeaderSrcCompo.vue';

export default {
    components: {
        HeaderSrcCompo,
    },
};
</script>

<style>
#header-container {
    width: 100%;
    height: 100px;
    display: flex;
    position: relative;
    top: 0;
    border-bottom: 1px solid grey;
}
</style>
