<template>
    <div>
        <ul class="contents">
            <li v-for="(item, index) in jobListings" :key="index" class="contents-card">
                <a class="contents-card-info">
                    <!-- 카드 뷰의 내용 -->
                    <span class="logo">
                        <img :src="item.logo" alt="company logo" />
                    </span>
                    <span class="company">
                        {{ item.bizname }}
                    </span>
                    <span class="title">
                        {{ item.title }}
                    </span>
                    <span class="wrap">
                        <span class="local"
                            ><img src="/src/assets/KBC/locationpointer.png" />{{ item.location_description }}</span
                        >
                        <span class="pay">
                            <span class="timepay">시급</span>
                            <span class="money">{{ item.salary }}</span>
                        </span>
                    </span>
                    <div class="tag">
                        <ul class="tag-contents">
                            <li
                                v-for="(tag, tagIndex) in filteredTags(item.announcement_id)"
                                :key="tagIndex"
                                class="tag-card"
                            >
                                <span>{{ tag.tagname }}</span>
                            </li>
                        </ul>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CardView',

    data() {
        return {
            jobListings: [],
            tagList: [],
        };
    },

    methods: {
        // Spring Boot API에서 데이터 가져오기
        fetchData(url, targetArray) {
            axios
                .get(url)
                .then((response) => {
                    this[targetArray] = response.data;
                })
                .catch((error) => {
                    console.error(`Error loading ${url}:`, error);
                });
        },

        // 특정 item.id에 대해 tagList를 필터링하는 메소드
        filteredTags(itemId) {
            return this.tagList.filter((tag) => tag.announcement_id === itemId);
        },
    },

    mounted() {
        // 스프링부트에서 데이터를 가져오는 코드로 수정
        this.fetchData('http://localhost:8080/api/job-listings', 'jobListings');
        this.fetchData('http://localhost:8080/api/tags', 'tagList');
    },
};
</script>

<style scoped>
@import url('/src/assets/KBC/middle.css');
</style>
