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
                        {{ item.company }}
                    </span>
                    <span class="title">
                        {{ item.title }}
                    </span>
                    <span class="wrap">
                        <span class="local"><img src="/src/assets/KBC/locationpointer.png" />{{ item.location }}</span>
                        <span class="pay">
                            <span class="timepay">시급</span>
                            <span class="money">{{ item.salary }}</span>
                        </span>
                    </span>
                    <div class="tag">
                        <ul class="tag-contents">
                            <li v-for="(tag, tagIndex) in filteredTags(item.id)" :key="tagIndex" class="tag-card">
                                <span>{{ tag.value }}</span>
                            </li>
                        </ul>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'CardView',

    data() {
        return {
            jobListings: [],
            tagList: [],
        };
    },

    methods: {
        fetchData(fileName, targetArray) {
            fetch(`/src/assets/KBC/${fileName}`) // public 디렉토리에 있는 파일 경로
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${fileName}: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    this[targetArray] = data;
                })
                .catch((error) => {
                    console.error(`Error loading ${fileName}:`, error);
                });
        },

        // 특정 item.id에 대해 tagList를 필터링하는 메소드
        filteredTags(itemId) {
            return this.tagList.filter((tag) => tag.an_id === itemId);
        },
    },

    mounted() {
        this.fetchData('tempdata.json', 'jobListings');
        this.fetchData('tagdata.json', 'tagList');
    },
};
</script>

<style scoped>
@import url('/src/assets/KBC/middle.css');
</style>
