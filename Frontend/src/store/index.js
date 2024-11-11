import Vue from 'vue';
import Vuex from 'vuex';
import { getEvents, getEventDetails } from '../services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    eventDetail: null,
  },
  actions: {
    async fetchEvents({ commit }) {
      const events = await getEvents();
      commit('setEvents', events);
    },
    async fetchEventDetail({ commit }, id) {
      const eventDetail = await getEventDetails(id);
      commit('setEventDetail', eventDetail);
    }
  },
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
