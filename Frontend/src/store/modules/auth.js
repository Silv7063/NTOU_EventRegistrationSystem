// store/modules/auth.js
const state = {
  user: JSON.parse(localStorage.getItem('user')) || null, // 儲存使用者資料
  isAuthenticated: !!localStorage.getItem('authToken'), // 檢查是否有 token
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
    state.isAuthenticated = true;
    localStorage.setItem('user', JSON.stringify(user)); // 儲存使用者資料到 localStorage
  },
  LOGOUT(state) {
    state.user = null;
    state.isAuthenticated = false;
    localStorage.removeItem('user'); // 清除 localStorage 資料
    localStorage.removeItem('authToken'); // 清除 token
  },
};

const actions = {
  login({ commit }, user) {
    // 假設登入成功後設定使用者資料
    commit('SET_USER', user);
  },
  logout({ commit }) {
    commit('LOGOUT');
  },
};

const getters = {
  user: (state) => state.user,
  isAuthenticated: (state) => state.isAuthenticated,
};

export default {
  state,
  mutations,
  actions,
  getters,
};