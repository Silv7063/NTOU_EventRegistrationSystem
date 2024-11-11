<template>
  <div>
    <h1>{{ eventDetail.name }}</h1>
    <p>{{ eventDetail.description }}</p>
    <p>Date: {{ eventDetail.date }}</p>
    <button @click="registerEvent">Register</button>
  </div>
</template>

<script>
export default {
  name: 'EventDetail',
  data() {
    return {
      eventDetail: {}
    };
  },
  created() {
    this.fetchEventDetail();
  },
  methods: {
    async fetchEventDetail() {
      const eventId = this.$route.params.id;
      // 模擬 API 請求，實際上會從後端 API 拉取資料
      const response = await fetch(`http://localhost:4000/api/events/${eventId}`);
      this.eventDetail = await response.json();
    },
    registerEvent() {
      // 實現報名邏輯
      console.log('Registered for event:', this.eventDetail.name);
    }
  }
};
</script>
