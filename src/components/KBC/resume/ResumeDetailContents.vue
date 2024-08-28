<template>
    <div class="resume-detail">
        <div class="profile-card-container">
            <div class="profile-card">
                <div class="profile-info">
                    <div class="profile-title">
                        <span class="name">[[이름]]</span>
                    </div>
                    <div class="profile-detail">
                        <span class="age">[[나이]]세</span>
                        <span class="gender">남</span>
                    </div>
                </div>
                <div class="profile-info-detail">
                    <div class="detail-data">
                        <p>주소</p>
                        [[주소데이터]]
                    </div>
                    <div class="detail-data">
                        <p>이메일</p>
                        [[이메일데이터]]
                    </div>
                    <div class="detail-data">
                        <p>전화번호</p>
                        [[전화데이터]]
                    </div>
                </div>
            </div>
            <div class="profile-img">
                <img src="/src/assets/KBC/man.png" />
            </div>
        </div>
        <div class="underline"></div>
        <div class="profile-talent-card">
            <a class="career-card">
                <!-- 카드 뷰의 내용 -->
                <span class="title">
                    <img src="/src/assets/KBC/cityhall.png" />
                    <h3>경력</h3>
                </span>

                <span class="company-name"> [[회사명]] </span>
                <span class="period"> [[기간데이터]] </span>
            </a>
            <a class="career-card">
                <!-- 카드 뷰의 내용 -->
                <span class="title">
                    <img src="/src/assets/KBC/university.png" />
                    <h3>학력</h3>
                </span>

                <span class="company-name"> [[학교명]] </span>
                <span class="period"> [[학교기간데이터]] </span>
            </a>
            <a class="career-card">
                <!-- 카드 뷰의 내용 -->
                <span class="title">
                    <img src="/src/assets/KBC/store.png" />
                    <h3>희망시급</h3>
                </span>

                <span class="company-name"> [[시급정보]] </span>
            </a>
        </div>
        <div class="career-container">
            <div class="box-title">
                <h2>경력</h2>
                <div class="period-txt">총 n년 n개월</div>
            </div>
            <ul class="box-container">
                <li class="box-list">
                    <div class="period-career">[[기간데이터]]</div>
                    <div class="career-data">
                        <h3 class="company-name">[[회사명]]</h3>
                        <span class="job">[[직무]]</span>
                        <sapn class="desc">
                            <p>[[상세설명]]</p>
                        </sapn>
                    </div>
                </li>
            </ul>
        </div>
        <div class="academy-container">
            <div class="box-title">
                <h2>학력</h2>
                <div class="period-txt">총 n년 n개월</div>
            </div>
            <ul class="box-container">
                <li class="box-list">
                    <div class="period-career">[[기간데이터]]</div>
                    <div class="career-data">
                        <h3 class="company-name">[[회사명]]</h3>
                        <span class="job">[[직무]]</span>
                        <sapn class="desc">
                            <p>[[상세설명]]</p>
                        </sapn>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.resume-detail {
    font-family: 'GodoM', sans-serif;
    width: 100%;
    display: grid;
    justify-content: center;
}
.profile-card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1260px;
    height: 200px;
    margin-top: 30px;
}

.profile-card {
    display: grid;
    width: 80%;
    height: 100%;

    margin-left: 20px;
}

.profile-card .profile-info {
    display: flex;
    justify-content: left;
    align-items: center;
    height: 25%;
    margin-top: 10px;
}
.profile-title {
    font-size: 1.8rem;
    margin-right: 30px;
}

.profile-detail .age {
    margin-right: 10px;
}

.profile-img {
    width: 20%;
}

.profile-card .profile-info-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: 25%;
}
.profile-info-detail .detail-data {
    display: flex;
    justify-content: left;
    align-items: center;
    width: calc(33%-15px);
}

.profile-img img {
    width: 50%;
    height: 50%;
    object-fit: contain;
}

.underline {
    margin-top: 10px;
    border-bottom: 1px solid #d5d9df;
    width: 100%;
    margin-left: 0;
}

.profile-card .profile-talent-card {
    height: 120px;
    display: flex;
    border: 1px solid #d5d9df;
}

.profile-talent-card {
    display: flex;
    justify-content: center;
    align-items: center;
}

.career-card {
    overflow: unset;
    float: left;
    position: relative;
    width: calc(22% - 15px);
    height: 200px;
    margin: 20px 0 0 40px;
    border-radius: 12px;
    background-color: #fff;
    border: 1px solid #d5d9df;
}
.career-card .title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
}

.career-card .title h3 {
    margin-left: 10px;
}

.career-card .company-name {
    display: block;
    height: 50%;
    text-align: left;
    margin: 10px;
}
.career-card .period {
    display: block;
    height: 30%;
    text-align: left;
    margin: 10px;
}

.career-container {
    width: 1260px;
    flex-direction: column;
    margin-top: 50px;
}
.academy-container {
    width: 1260px;
    flex-direction: column;
    margin-top: 50px;
}
.box-title {
    border-top: 1px solid #3a3a3a;
    border-bottom: 1px solid #d5d9df;
    display: flex;
    align-items: center;
}

.box-title h2 {
    margin-right: 20px;
}
.box-container {
    position: relative;
    box-sizing: border-box;
}
.box-list {
    display: flex;
    justify-content: left;
    align-items: center;
    border-bottom: 1px solid #d5d9df;
}
.period-career {
    width: 20%;
    margin-right: 30px;
}
.career-data {
    width: 80%;
    text-align: left;
}

.career-card .title img {
    width: 30px;
    height: 30px;
    object-fit: contain;
}
</style>
