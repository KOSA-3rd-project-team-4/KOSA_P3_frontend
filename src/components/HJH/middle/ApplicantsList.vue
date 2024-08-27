<template>
    <div id="root-applicants">
        <div id="post-applicants">
            <div id="board-top">
                <div id="board-title">
                    <h1>지원자 리스트</h1>
                </div>
                <div id="board-options">
                    <div id="board-options-content">
                        
                        <div id="board-filter-component">
                            <button @click="toggleDropdown" id="board-filter-button">
                                {{ selectOption ? selectedOption : '전체 보기'}} 
                            </button>
    
                            <ul v-if="showDropdown" class="dropdown">
                                <li 
                                    v-for="(option, index) in options"
                                    :key="index"
                                    @click="selectOption(option)">
                                {{ option }}
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>

            </div>

            <!-- TODO 지원자 정보를 받으면 여기에 내려주기-->
            <div id="board-contents">
                <div id="board-contents-content">
                    
                    <div class="applicant-box">
                        <div class="applicant-left">
                        지원자 이미지
                        </div>
                        <div class="applicant-center">
                        지원자 간략 정보
                        </div>
                        <div class="applicant-right">
                        지원자 채팅하기
                        </div>
                    </div>

                    <div class="applicant-box">
                        <div class="applicant-left">
                        지원자 이미지
                        </div>
                        <div class="applicant-center">
                        지원자 간략 정보
                        </div>
                        <div class="applicant-right">
                        지원자 채팅하기
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            showDropdown: false, // 드롭다운 표시 여부
            selectedOption: '전체 보기', // 선택된 옵션
            options: ['전체 보기', '공고 1', '공고 2', '공고 3'] // 드롭다운 옵션 목록
        }
    },
    computed: {
        applicant_id() {
           return this.$route.params.applicant_id;
        }
    },
    methods: {
        toggleDropdown() {
            // 드롭다운 표시/숨기기
            this.showDropdown = !this.showDropdown;
        },
        selectOption(option) {
            // 옵션을 선택하면 selectedOption에 저장하고 드롭다운 숨김
            this.selectedOption = option;
            this.showDropdown = false;
        }
    }
};
</script>

<style scoped>

body { margin: 0; }

h1 {
    font-size: 36px;
    width: 100%;
}

.content-text {
    font-size: 14px;
    width: fit-content;
}

.dropdown {
    border: 1px solid #ccc;
    margin-top: 40px;
    margin-right: 0;
    padding: 0;
    list-style: none;
    background-color: #fff;
    width: 200px; /* 버튼과 같은 너비로 설정 */
    position: absolute;
    z-index: 1;
}

.dropdown li {
    padding: 8px;
    cursor: pointer;
}

.dropdown li:hover {
    background-color: #007bff;
    color: #fff;
}

#board-filter-button {
    width: 200px; /* 드롭다운 버튼의 너비 */
    padding: 8px;
    text-align: center;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
    box-sizing: border-box;
}

/* --------------------------------------------------------------- */

#root-applicants {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: relative;
    display: flex;
    justify-content: center;
}

#post-applicants {
    width: 70%;
    height: 100%;
    /* border: 1px solid; */
    /* background-color: cyan; */
}

#board-top {
    width: 100%;
    height: 80px;
    border: 1px solid;
    display: flex;
    flex-direction: row;
    justify-content: space-between
}

#board-title {
    width: 30%;
    height: 100%;
}

#board-options {
    width: 30%;
    height: 100%;
    /* background-color: cyan; */
    padding: 10px 85px 10px 10px;
    box-sizing: border-box;
}

#board-options-content {
    width: 100%;
    height: 100%;
    /* background-color: blue; */
    align-content: center;
}

#board-filter-component {
    width: 100%;
    display: flex;
    justify-content: end;
}

/* --------------------------------------------------------------- */

#board-contents {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px 85px;
}

#board-contents-content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
}



.applicant-box {
    width: 100%;
    min-width: 580px;
    height: 135px;
    padding: 20px 40px;
    background-color: lightgrey;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
  }
  
  .applicant-left {
    width: 20%;
    min-width: 100px;
    background-color: aliceblue;
    padding-left: 0px;
  }
  
  .applicant-center {
    width: 60%;
    min-width: 300px;
    background-color:darkcyan;
  }
  
  .applicant-right {
    width: 20%;
    min-width: 100px;
    background-color:hotpink;
  }


</style>