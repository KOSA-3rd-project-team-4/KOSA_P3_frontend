<template>
    <div class="resume-bottom-container">
        <div class="resume-card-container">
            <div class="resume-card">
                <div class="thumbnail">
                    <!--display flex-->
                    <span class="profile-img"><img src="/src/assets/KBC/person.png" /></span>
                </div>
                <div class="summary-info">
                    <div class="name-container">
                        <span class="name">김범철</span>
                        <span class="age">30대</span>
                    </div>
                    <div class="pr-contents">
                        <span class="contents">원하는 일에 딱 맞는 우수한 인재를 찾아보세요</span>
                    </div>
                    <div class="tag-list">
                        <div class="tags">중장년</div>
                    </div>
                </div>
                <div class="submit-resume">
                    <button type="button">제안하기</button>
                </div>
                <!--display grid-->
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.resume-bottom-container {
    width: 1260px;
    font-family: 'GodoM', sans-serif;
}
.resume-card-container {
    display: grid;
    justify-content: left;
    align-items: center;
    width: inherit;
}

.resume-card {
    display: flex;
    border: 1px solid #fff;
    width: inherit;
    height: 200px;
    box-sizing: border-box;
    border-radius: 16px;
    background: #fff;
    margin-top: 20px;
}
.thumbnail {
    width: 20%;
    height: auto;
    align-self: center;
}

.thumbnail img {
    width: 100px;
    height: 100px;
    object-fit: contain;
}
.summary-info {
    width: 60%;
    display: grid;
    justify-content: left;
    align-items: center;
}
.summary-info .name-container {
    margin-bottom: 10px;
    width: 100%;
    text-align: left;
}
.summary-info .name-container .name {
    margin-right: 20px;
}
.summary-info .pr-contents {
    width: 100%;
}
.summary-info .tag-list {
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
}

.tag-list .tags {
    border: 1px solid #f7f8fa;
    border-radius: 4px;
    background-color: #f7f8fa;
}

.submit-resume {
    display: flex;
    justify-content: center;
    align-items: center;
}
.submit-resume button {
    width: 200px;
    height: 30px;
    border: 1px solid #f7f8fa;
    border-radius: 14px;
    background: #93b3f4;
    font-family: 'GodoM', sans-serif;
    transition: background-color 0.3s ease;
    color: white;
}

.submit-resume button:hover {
    background-color: #7a99d4; /* 살짝 어두운 색상 */
}
</style>
