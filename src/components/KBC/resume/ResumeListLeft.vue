<template>
    <div class="talent-filter-wrap">
        <div class="filter_container">
            <div class="filter_header">
                <h2 class="filter-title">필터</h2>
            </div>
            <div class="talent-filter-item on">
                <span class="talent-filter-title">지역</span>
                <div class="filter-input">
                    <button type="button" id="more_detail" class="location_detail">
                        <img src="" class="filter-img" />지역 선택
                    </button>
                </div>
                <div id="filter-area-layer" class="ModalBox filter-layer-depth" style="display: none">
                    <h4>지역</h4>
                    <div class="ModalCont">
                        <div class="filter-choose-wrap">
                            <ul class="filter-depth1-list scrollbar" id="area_depth1">
                                <li>
                                    <button type="button" class="filter-depth on" value="101000">서울</button>
                                </li>
                            </ul>
                            <ul class="filter-depth2-list scrollbar" id="area_depth2">
                                <li>
                                    <div class="InpBox">
                                        <span class="Chk"> <input type="checkbox" value="101000" />서울전체 </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="BtnArea">
                        <button type="button" class="btn-cancle">취소</button>
                        <button type="button" class="btn-save">저장</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.talent-filter-wrap {
    position: relative;
    width: 300px;
}

.filter_container {
    position: relative;
    padding: 24px;
    border: 1px solid grey;
    border-radius: 8px;
    box-sizing: border-box;
    background: #fff;
}
.filter_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 16px;
    text-align: right;
    border-bottom: 1px solid grey;
}

.talent-filter-item {
    position: relative;
    margin-top: 24px;
}
.talent-filter-title {
    display: block;
    color: gray;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
}

.filter-input {
    display: block;
    margin-top: 8px;
}

.location-detail {
    width: 100%;
    border-color: grey;
    color: black;
    background: #fff;
    display: inline-flex;
    position: relative;
    border-radius: 4px;
    box-sizing: border-box;
    text-align: center;
    justify-content: center;
    align-items: center;
}

.filter-layer-depth {
    position: absolute;
    top: 0;
    left: -5px;
    z-index: 1100;
    width: 800px;
    min-height: 600px;
    transform: none;
}

.ModalBox {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 110;
    padding: 40px;
    border-radius: 16px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
}

.ModalBox ModalCont {
    font-size: 14px;
    line-height: 20px;
}

.filter-choose-wrap {
    margin-top: 16px;
    height: 238px;
    border: 1px solid grey;
    border-radius: 4px;
}

.filter-depth1-list {
    overflow-x: hidden;
    overflow-y: auto;
    float: left;
    padding: 16px 0 16px 24px;
    width: 168px;
    height: 238px;
    border-right: 1px solid grey;
    box-sizing: border-box;
}

ol,
ul,
li {
    list-style: none;
}

.filter-depth1 {
    display: block;
}

.filter-depth2-list {
    overflow-x: hidden;
    overflow-y: auto;
    margin-left: 168px;
    padding: 8px 5 16px 24px;

    height: 238px;
    box-sizing: border-box;
}
</style>
