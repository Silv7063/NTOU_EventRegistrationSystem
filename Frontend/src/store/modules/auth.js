const state = {
    user: null,
    isAuthenticated: false,
  };
  
  const mutations = {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    LOGOUT(state) {
      state.user = null;
      state.isAuthenticated = false;
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
  