<template>
    <div id="post-background">
        <div id="post-block">
            <!-- Post Overview -->
            <div id="post-overview">
                <div class="flex">
                    <div>
                        <h1>소프트웨어 엔지니어</h1>
                        <p>TechCorp Inc.</p>
                    </div>
                    <img src="https://via.placeholder.com/100x100" alt="Company Logo" class="company-logo">
                </div>
                <div class="grid">
                    <div>
                        <p><strong>연봉:</strong></p>
                        <p>80,000,000원 - 100,000,000원</p>
                    </div>
                    <div>
                        <p><strong>근무 시간:</strong></p>
                        <p>오전 9:00 - 오후 5:00</p>
                    </div>
                </div>
            </div>

            <!-- Post Apply Condition -->
            <div id="post-apply-condition">
                <h2>채용 조건</h2>
                <div class="grid">
                    <div>
                        <p><strong>모집 기간:</strong></p>
                        <p>2024년 8월 1일 - 2024년 9월 1일</p>
                    </div>
                    <div>
                        <p><strong>모집 인원:</strong></p>
                        <p>3명</p>
                    </div>
                </div>
            </div>

            <!-- Post Work Area Info -->
            <div id="post-work-area-info">
                <h2>근무지 정보</h2>
                <div>
                    <p><strong>근무지 명:</strong></p>
                    <p>TechCorp 본사</p>
                    <p><strong>주소:</strong></p>
                    <p>서울특별시 강남구 테크로 123</p>
                    <div class="map-placeholder">
                        <p>[지도 위치]</p>
                    </div>
                </div>
            </div>

            <!-- Post Details -->
            <div id="post-details">
                <h2>세부 사항</h2>
                <p>
                    우리는 다양한 프로젝트에서 일할 숙련된 소프트웨어 엔지니어를 찾고 있습니다. 새로운 기능을 개발하고,
                    재능 있는 팀원들과 협업하게 될 것입니다. 최신 프로그래밍 언어에 대한 지식이 있어야 하며, 클라우드
                    인프라 경험과 소프트웨어 개발 모범 사례에 대한 깊은 이해를 가진 분을 기대합니다.
                </p>
            </div>

            <!-- Post Apply -->
            <div id="post-apply" style="text-align: center;">
                <a href="#" class="apply-button">지금 지원하기</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    }
}
</script>

<style scoped>
#post-background {
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }

        #post-overview,
        #post-apply-condition,
        #post-work-area-info,
        #post-details,
        #post-apply {
            margin-bottom: 40px;
        }

        h1 {
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 10px;
        }

        h2 {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
        }

        p {
            margin: 5px 0;
            color: #555;
        }

        .flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .company-logo {
            width: 100px;
            height: 100px;
            object-fit: cover;
        }

        .map-placeholder {
            width: 100%;
            height: 250px;
            background-color: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #777;
            font-size: 18px;
        }

        .apply-button {
            display: inline-block;
            padding: 15px 30px;
            background-color: #007BFF;
            color: white;
            font-weight: bold;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        .apply-button:hover {
            background-color: #0056b3;
        }

</style>