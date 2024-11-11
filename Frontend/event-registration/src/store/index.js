import { createStore } from 'vuex';

export default createStore({
  state: {
    events: [],
    eventDetail: null,
  },
  /*
  actions: {
    async fetchEvents({ commit }) {
      // 這裡可以添加從 API 獲取活動資料的邏輯
      const events = await getEvents();
      commit('setEvents', events);
    },
    async fetchEventDetail({ commit }, id) {
      // 這裡可以添加從 API 獲取單一活動詳情的邏輯
      const eventDetail = await getEventDetails(id);
      commit('setEventDetail', eventDetail);
    }
  },
  */
  mutations: {
    setEvents(state, events) {
      state.events = events;
    },
    setEventDetail(state, eventDetail) {
      state.eventDetail = eventDetail;
    }
  },
  getters: {
    allEvents: state => state.events,
    eventDetail: state => state.eventDetail,
  }
});
