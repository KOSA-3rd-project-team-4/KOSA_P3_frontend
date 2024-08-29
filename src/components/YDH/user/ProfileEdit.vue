<template>
    <div class="profile-edit">
        <div class="header">
            <h2>회원정보</h2>
        </div>

        <!-- 보기 모드 -->
        <div v-if="!editMode">
            <p><strong>이름:</strong> {{ nick_name }}</p>
            <p><strong>이메일:</strong> {{ email }}</p>
            <p class="last-modified">최근 수정일: {{ edit_date }}</p>
            <button @click="editMode = true">수정</button>
        </div>

        <!-- 수정 모드 -->
        <form v-else @submit.prevent="saveProfile">
            <div class="form-group">
                <label for="nick_name">이름:</label>
                <input type="text" v-model="nick_name" id="nick_name" />
            </div>

            <div class="form-group">
                <label for="email">이메일:</label>
                <input type="email" v-model="email" id="email" />
            </div>

            <div class="form-group button-group">
                <button type="submit">저장</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['getUser']),
        user() {
            const userData = this.getUser;
            console.log('User data from Vuex:', userData);
            return userData;
        },
        nick_name() {
            return this.user ? this.user.nick_name : '';
        },
        userId() {
            return this.user ? this.user.member_id : '';
        },
        email() {
            return this.user ? this.user.email : '';
        },
        formattedLastModified() {
            return this.edit_date ? this.edit_date.split('T')[0] : '';
        },
    },
    data() {
        return {
            editMode: false,
            nick_name: '',
            userId: '',
            email: '',
            edit_date: '', // LocalDate 형식으로 초기화
        };
    },
    created() {
        this.fetchProfile();
    },
    methods: {
        async fetchProfile() {
            try {
                const response = await axios.get(`http://localhost:8080/query/members/select/${this.user.member_id}`);
                const { nick_name, email, edit_date } = response.data;
                this.nick_name = nick_name;
                this.email = email;
                this.edit_date = edit_date; // LocalDate 형식으로 받아온 값
            } catch (error) {
                console.error('프로필을 불러오는 중 오류가 발생했습니다:', error);
            }
        },
        async saveProfile() {
            try {
                const now = new Date();
                // `edit_date`를 `YYYY-MM-DD` 형식으로 변환합니다.
                const formattedDate = now.toISOString().split('T')[0];

                const response = await axios.put(`http://localhost:8080/query/members/update/${this.user.member_id}`, {
                    nick_name: this.nick_name,
                    email: this.email,
                    edit_date: formattedDate, // LocalDate 형식으로 변환된 데이터
                });

                if (response.status === 204) {
                    this.editMode = false;
                    alert('프로필이 저장되었습니다.');
                } else {
                    throw new Error('서버 응답 오류');
                }
            } catch (error) {
                console.error('프로필 저장 중 오류가 발생했습니다:', error);
                alert('프로필 저장에 실패했습니다.');
            }
        },
    },
};
</script>

<style scoped>
.profile-edit {
    max-width: 1000px;
    min-width: 600px;
    margin: 20px auto;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.form-group label {
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input {
    padding: 8px;
    font-size: 14px;
}

.last-modified {
    font-size: 12px;
    color: gray;
    margin-top: 10px;
}

.button-group {
    display: flex;
    justify-content: flex-end;
}

button {
    padding: 10px 20px;
    font-size: 14px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
