const state = {
    events: [],
    currentEvent: null,
  };
  
  const mutations = {
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_CURRENT_EVENT(state, event) {
      state.currentEvent = event;
    },
  };
  
  const actions = {
    fetchEvents({ commit }) {
      // 這裡可以用 API 請求獲取活動資料
      const events = [
        { id: 1, name: '活動1', date: '2024-12-20' },
        { id: 2, name: '活動2', date: '2024-12-21' },
      ];
      commit('SET_EVENTS', events);
    },
    fetchEventDetails({ commit }, eventId) {
      // 根據活動ID獲取活動詳細資料
      const event = { id: eventId, name: '活動1', date: '2024-12-20' };
      commit('SET_CURRENT_EVENT', event);
    },
  };
  
  const getters = {
    events: (state) => state.events,
    currentEvent: (state) => state.currentEvent,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  