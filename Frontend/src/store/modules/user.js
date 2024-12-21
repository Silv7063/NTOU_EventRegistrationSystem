// store/modules/user.js
const state = {
  userInfo: {},
};

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
};

const actions = {
  fetchUserInfo({ commit }) {
    // 假設從 API 獲取使用者資料
    const userInfo = { name: '學生', email: 'student@ntou.edu.tw' };
    commit('SET_USER_INFO', userInfo);
  },
};

const getters = {
  userInfo: (state) => state.userInfo,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
