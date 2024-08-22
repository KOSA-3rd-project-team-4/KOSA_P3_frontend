<template>
    <div id="header-container">
        <div class="header"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    }
}
</script>

<style scoped>
#header-container{
    width:100%;
    height:100px;
    display: flex;
    position: relative;
    top:0;
    border-bottom: 1px solid grey;
}

.header {
    width: 100%;
    height: 100px;   
    display: flex;
    justify-content: center;
   
}
</style>