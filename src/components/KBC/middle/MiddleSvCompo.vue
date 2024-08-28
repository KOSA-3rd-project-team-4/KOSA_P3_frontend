<template>
    <div class="middle">
        <div class="main-contents-head">
            <h2 class="head-title">모집해요</h2>
            <div class="head-title-func">
                <input type="button" value="카드" @click="goToCard" />
                <input type="button" value="지도" @click="goToMap" />
            </div>
        </div>
        <div class="main-contents-display">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goToCard() {
            this.$router.push('/');
        },
        goToMap() {
            this.$router.push('/map');
        },
    },
};
</script>

<style scoped>
@import url('/src/assets/middle.css');
@import url('/src/assets/KBC/middle.css');
</style>
