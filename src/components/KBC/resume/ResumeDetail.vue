<template>
    <div>
        <header-compo></header-compo>
        <div class="resume-detail-container">
            <resume-detail-contents></resume-detail-contents>
        </div>
    </div>
</template>

<script>
import HeaderCompo from '../layouts/HeaderCompo.vue';
import ResumeDetailContents from './ResumeDetailContents.vue';

export default {
    components: {
        HeaderCompo,
        ResumeDetailContents,
    },
};
</script>

<style>
.resume-detail-container {
    width: 100%;
}
</style>
