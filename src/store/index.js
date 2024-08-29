import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

const store = createStore({
    state: {
        users: [],
        user: null,
        loginType: null
    },
    mutations: {
        setUser(state, user) {
            console.log('Setting user:', user);
            state.user = { ...user };
            console.log('State after setting user:', state.user);
        },
        clearUser(state) {
            state.user = null;
            state.loginType = null;
        },
        setLoginType(state, type) {
            state.loginType = type;
        }
    },
    actions: {
        async fetchBizLogin({ commit }) {
            try {
                const response = await axios.get('http://localhost:8080/api/user', { withCredentials: true });
                if (response.status === 200) {
                    console.log("안녕");
                    console.log(response.data)
                    commit('setUser', response.data),
                    commit('setLoginType', 'normal');
                }
            } catch (error) {
                console.error('Failed to fetch business user info:', error);
                commit('clearUser');
            }
        },
        async fetchMemberLogin({ commit }) {
            try {
                const response = await axios.get('http://localhost:8080/api/user', { withCredentials: true });
                if (response.status === 200) {
                    console.log("안녕");
                    console.log(response.data)
                    commit('setUser', response.data);
                    commit('setLoginType', 'oauth');
                    console.log("commit")
                }
            } catch (error) {
                console.error('Failed to fetch member info:', error);
                console.log("실패ㅜ");
                commit('clearUser');
            }
        },
        async logout({ commit }) {
            try {
                const response = await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
                if (response.status === 200) {
                    commit('clearUser');
                    alert("로그아웃 완료!")

                }
            } catch (error) {
                console.error('Logout failed:', error);
            }
        },
    },
    getters: {
        isAuthenticated(state) {
            return !!state.user;
        },
        getUser: (state) => state.user,
        getUsers: (state) => state.users,
        getLoginType: (state) => state.loginType,
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
});

export default store;
