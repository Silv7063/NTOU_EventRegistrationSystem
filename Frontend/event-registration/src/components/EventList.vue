<template>
  <div>
    <h2>Upcoming Events</h2>
    <ul>
      <li v-for="event in events" :key="event.id">
        <router-link :to="`/event/${event.id}`">{{ event.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'EventList',
  data() {
    return {
      events: []
    };
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      // 模擬 API 請求，實際上會從後端 API 拉取資料
      const response = await fetch('http://localhost:4000/api/events');
      this.events = await response.json();
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
