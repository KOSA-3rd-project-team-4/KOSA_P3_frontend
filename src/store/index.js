import { createStore } from 'vuex';

const store = createStore({
  state: {
    users: []
  },
  mutations: {
    ADD_USER(state, user) {
      state.users.push(user);
    }
  },
  actions: {
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        // 여기에서 API 요청으로 서버에 사용자 정보를 저장할 수 있습니다.
        // 예: axios.post('/api/register', user).then(response => { ... })
        // 이 예제에서는 로컬에만 저장합니다.
        try {
          commit('ADD_USER', user);
          resolve();
        } catch (error) {
          reject(new Error('회원가입 처리 중 오류가 발생했습니다.'));
        }
      });
    }
  },
  getters: {
    getUsers: state => state.users
  }
});

export default store;
