<template>
    <div class="resume-list-top">
        <div class="talent_header">
            <div class="search-title-container">
                <span class="search-title"> 원하는 일에 딱 맞는 우수한 인재를 찾아보세요 </span>
            </div>
            <div class="filter-container">
                <div class="worktime-container">
                    <div class="time-picker">
                        <label for="start-time">시작 시간:</label>
                        <select v-model="startTime" id="start-time">
                            <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                        </select>
                        <label for="end-time">종료 시간:</label>
                        <select v-model="endTime" id="end-time">
                            <option v-for="time in filteredEndTimeOptions" :key="time" :value="time">{{ time }}</option>
                        </select>
                    </div>
                </div>

                <div class="search-form">
                    <img src="/src/assets/KBC/search.png" />
                    <input
                        type="text"
                        class="search-input"
                        v-model="searchQuery"
                        placeholder="검색어를 입력하세요"
                        @input="searchData"
                    />
                    <button type="button" class="search-submit" @click="searchData">검색</button>
                </div>

                <!-- 검색 결과 드롭다운 -->
                <ul v-show="searchResults.length > 0" class="search-dropdown">
                    <li v-for="(result, index) in searchResults" :key="index" @click="addTag(result)">
                        {{ result.name }}
                    </li>
                </ul>
            </div>
            <div class="underline"></div>
            <div class="taglist-container">
                <div v-for="(item, index) in filteredTags" :key="index" class="tag-item">
                    {{ item.name }}
                    <span class="remove-tag" @click="removeTag(index)">x</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            startTime: '',
            endTime: '',
            timeOptions: [],
            searchQuery: '',
            allTags: [],
            filteredTags: [],
            searchResults: [], // 검색 결과
        };
    },
    computed: {
        filteredEndTimeOptions() {
            if (!this.startTime) return this.timeOptions;
            const startIndex = this.timeOptions.indexOf(this.startTime);
            return this.timeOptions.slice(startIndex + 1);
        },
    },
    mounted() {
        this.generateTimeOptions();
        this.loadTags();
    },
    methods: {
        generateTimeOptions() {
            for (let hour = 0; hour < 24; hour++) {
                const timeString = `${String(hour).padStart(2, '0')}:00`;
                this.timeOptions.push(timeString);
            }
        },
        loadTags() {
            axios
                .get('http://localhost:8080/api/alltag')
                .then((response) => {
                    this.allTags = response.data;
                })
                .catch((error) => {
                    console.error('Error loading tags:', error);
                });
        },
        searchData() {
            if (this.searchQuery.trim()) {
                this.searchResults = this.allTags.filter((tag) => tag.name.includes(this.searchQuery));
            } else {
                this.searchResults = [];
            }
        },
        addTag(selectedTag) {
            if (!this.filteredTags.includes(selectedTag)) {
                this.filteredTags.push(selectedTag);
            }
            this.searchQuery = ''; // 검색어 초기화
            this.searchResults = []; // 드롭다운 숨기기
        },
        removeTag(index) {
            this.filteredTags.splice(index, 1);
        },
    },
};
</script>

<style>
.resume-list-top {
    width: 1260px;
}

.filter-container {
    display: flex;
    font-family: 'GodoM', sans-serif;
    margin-top: 30px;
    position: relative; /* 드롭다운을 위한 relative 설정 */
}

.search-title-container {
    display: flex;
    justify-content: left;
}

.search-title {
    font-family: 'GodoM', sans-serif;
    font-weight: bold;
    text-align: left;
    margin-left: 50px;
    font-size: 2rem;
}

.worktime-container {
    display: flex;
    width: 40%;
    justify-content: center;
    align-items: center;
}

.time-picker {
    display: flex;
    gap: 10px;
    align-items: center;
}

label {
    font-weight: bold;
    margin-right: 10px;
}

select {
    padding: 5px;
    font-size: 16px;
    background: #f1f3f4;
    border-radius: 4px;
    border: #f1f3f4;
}

.search-form {
    width: 60%;
    display: flex;
    justify-content: left;
}

.search-form img {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

.search-form button {
    width: 70px;
    height: 50px;
    background: #93b3f4;
    border: 1px solid #93b3f4;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    font-family: 'GodoM', sans-serif;
    color: white;
    transition: background-color 0.3s ease;
}

.search-form button:hover {
    background-color: #7a99d4; /* 호버 시 어두운 색상 */
}

.search-input[type='text'] {
    width: 70%;
    border: none;
    outline: none;
    padding: 10px 20px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    font-size: 16px;
    box-sizing: border-box;
    background-color: #f1f3f4;
}

.search-dropdown {
    position: absolute;
    display: grid;
    margin-top: 0;
    justify-content: left;
    border-radius: 4px;
    top: 100%;
    left: 44%;
    width: 42%;
    background: white;
    border: 1px solid #ddd;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding: 0; /* ul 기본 패딩 제거 */
    list-style: none; /* ul 기본 리스트 스타일 제거 */
}

.search-dropdown li {
    padding: 10px;
    cursor: pointer;
    margin-left: 10px;
    width: 100%;
    box-sizing: border-box;
}

.search-dropdown li:hover {
    background-color: #f1f3f4;
}

.underline {
    width: 90%;
    border-bottom: 2px solid #f1f3f4;
    margin-top: 10px;
    margin-left: 5%;
}

.taglist-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
}

.tag-item {
    padding: 10px;
    margin: 5px;
    background-color: #f1f3f4;
    border-radius: 4px;
    position: relative;
}

.remove-tag {
    margin-left: 10px;
    color: red;
    cursor: pointer;
    font-weight: bold;
}
</style>
