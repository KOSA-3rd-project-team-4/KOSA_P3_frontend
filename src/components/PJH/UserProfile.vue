<template>
    <div class="user-profile">
        <div class="profile-header">
            <div class="profile-left">
                <img src="/src/assets/PJH/profile.png" alt="Profile Image" class="profile-image" />
            </div>
            <div class="profile-right">
                <p class="user-name">{{ user.username || user.nick_name }}</p>
                <a href="#" class="manage-info-link" @click.prevent="manageInfo">내 정보 관리</a>
            </div>
        </div>
        <div class="edit-resume">
            <a href="#" class="edit-resume-link" @click.prevent="editResume">
                <img src="/src/assets/PJH/edit-icon.png" alt="Edit Icon" class="edit-icon" />
                이력서 관리
            </a>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['isAuthenticated', 'getUser']),
        user() {
            return {
                username: this.getUser.bizname || this.getUser.nick_name,
                isBiz: !!this.getUser.bizname, // bizname이 존재하면 true, 아니면 false
            };
        },
    },
    methods: {
        manageInfo() {
            // bizname이 존재하는 경우와 존재하지 않는 경우를 구분하여 경로를 설정
            const routeName = this.user.isBiz ? 'BizProfileEdit' : 'ProfileEdit';
            alert(`내 정보 관리 페이지로 이동합니다. (${routeName})`);
            this.$router.push({ name: routeName });
        },
        editResume() {
            // bizname이 존재하는 경우와 존재하지 않는 경우를 구분하여 경로를 설정
            const routeName = this.user.isBiz ? 'BizAnnouncements' : 'ResumeList';
            alert(`내 정보 관리 페이지로 이동합니다. (${routeName})`);
            this.$router.push({ name: routeName });
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
}
.user-profile {
    padding: 30px;
    border-radius: 10px;
    max-width: 500px;
    margin: 0 auto;
    font-family: 'GodoM', sans-serif;
}

.profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px; /* 프로필과 이력서 관리 간격 */
}

.profile-left {
    margin-right: 20px;
}

.profile-image {
    width: 80px;
    height: 80px;
    border-radius: 70%;
    border: 2px solid black;
}

.profile-right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.user-name {
    font-weight: bold;
    font-size: 1.5rem;
    margin-top: 0px;
    margin-bottom: 8px;
}

.manage-info-link {
    font-size: 1rem;
    color: #007bff;
    text-decoration: none;
}

.manage-info-link:hover {
    text-decoration: underline;
}

.edit-resume {
    display: flex;
    align-items: center;
    justify-content: center;
}

.edit-resume-link {
    display: flex;
    align-items: center; /* 아이콘과 텍스트를 수평으로 정렬 */
    color: black;
    text-decoration: none;
    font-size: 1.2rem; /* 이력서 관리 폰트 크기 증가 */
    margin-top: 10px; /* 프로필 아래에 위치 */
}

.edit-resume-link:hover {
    text-decoration: underline;
}

.edit-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}
</style>
