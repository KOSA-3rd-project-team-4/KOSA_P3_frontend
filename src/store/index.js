import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        users: [],
        user: '',
    },
    mutations: {
        ADD_USER(state, user) {
            state.users.push(user);
        },
        setUser(state, user) {
            state.user = user; // 배열로 저장
        },
        clearUser(state) {
            state.user = null; // 빈 배열로 초기화
        },
    },
    actions: {
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                try {
                    commit('ADD_USER', user);
                    resolve();
                } catch (error) {
                    reject(new Error('회원가입 처리 중 오류가 발생했습니다.'));
                }
            });
        },
        async fetchlogin({ commit }) {
            try {
                const response = await axios.get('http://localhost:8080/api/user', { withCredentials: true });
                if (response.status === 200) {
                    commit('setUser', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                commit('clearUser');
            }
        },
        logout({ commit }) {
            commit('clearUser');
        },
    },
    getters: {
        isAuthenticated(state) {
            return !!state.user;
            // return state.users.length > 0; // 사용자가 로그인 상태인지 확인
        },
        getUser: (state) => state.user,
        getUsers: (state) => state.users,
    },
});

export default store;
