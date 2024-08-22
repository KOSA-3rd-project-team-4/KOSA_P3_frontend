<template>
  <div class="middle">
    <div class="main-contents-head">
        <h2 class="head-title">모집해요</h2>
        <div class="head-title-func">
            <input type="button" value="카드" />
            <hr>
            <input type="button" value="지도" />
        </div>
    </div>
    <div class="main-contents-display">
        <ul class="contents">
            <li class="contents-card">
                <a class="contents-card-info">
                    <span class="logo">
                        <img src="/src/assets/vue.svg">
                    </span>
                    <span class="company">
                        기업명
                    </span>
                    <span class="title">
                        글제목
                    </span>
                    <span class="wrap">
                        <span class="local">위치정보</span>
                        <span class="pay">
                            <span class="timepay">시급</span>
                            <span class="money">10,000원</span>
                        </span>
                    </span>
                </a>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
     @import url('/src/assets/middle.css');
</style>