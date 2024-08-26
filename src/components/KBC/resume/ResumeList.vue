<template>
    <div class="resume-list-container">
        <header-compo></header-compo>
        <div class="resume-list-top-container">
            <resume-list-top></resume-list-top>
        </div>
        <div class="resume-list-main">
            <div class="resume-list-main-container">
                <resume-list-left></resume-list-left>
                <resume-list-right></resume-list-right>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderCompo from '../layouts/HeaderCompo.vue';
import ResumeListLeft from './ResumeListLeft.vue';
import ResumeListRight from './ResumeListRight.vue';
import ResumeListTop from './ResumeListTop.vue';

export default {
    components: {
        ResumeListTop,
        ResumeListLeft,
        ResumeListRight,
        HeaderCompo,
    },
};
</script>

<style>
.resume-list-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.resume-list-top-container {
    margin-top: 20px;
    width: 100%;
    height: 20px;
    min-height: 300px;
    background-color: #fff;
    display: flex;
    justify-content: center;
}

.resume-list-main {
    margin-top: 20px;
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    min-height: 800px;
    background-color: #f7f8fa;
}

.resume-list-main-container {
    width: 1260px;
    display: flex;
}
</style>
