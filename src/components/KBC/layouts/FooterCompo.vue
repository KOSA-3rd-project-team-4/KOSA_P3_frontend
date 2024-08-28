<template>
    <div class="footer-container">
        <div class="footer-team">
            <div class="footer-team-logo"><img src="/src/assets/KBC/present-logo-nonbg.png" /></div>
            <div class="footer-team-info">
                <address>
                    <strong>팀이름</strong>
                    <span>|</span>신재안:(작업내용) <span>|</span>함종훈:(작업내용) <span>|</span>김범철:(작업내용)
                    <span>|</span>박정환:(작업내용) <span>|</span>윤다희:(작업내용)
                </address>
                <div class="footer-company-copyright">Copyright © (주)Team.SpecialONE. All Rights Reserved.</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
export default {};
</script>

<style>
.footer-container {
    width: 100%;
    height: auto;
    min-height: 200px;
    display: flex;
    justify-content: center;
    background: #fff;
    border: 1px solid #d5d9df;
}

.footer-team {
    width: 1260px;
    margin-top: 20px;
    display: flex;
    justify-content: left;
    align-items: center;
}

.footer-team-logo img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-right: 40px;
}
</style>
