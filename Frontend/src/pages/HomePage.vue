// Home.vue

<template>
  <div class="banner">
    <div class="banner_image">
    </div>
  </div>
  <div class="home">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>載入中...</p>
    </div>

    <div v-else>
      <section class="filters">
        <div class="filters-and-form">
          <div class="event-form-container">
      <EventForm @event-created="fetchEvents" /> <!-- 監聽 event-created 事件 -->
    </div>
          <label for="filter">篩選活動類型：</label>
          <select id="filter" v-model="filter" @change="applyFilter">
            <option value="">全部</option>
           <option value="學術">學術</option>
           <option value="運動">運動</option>
           <option value="娛樂">娛樂</option>
          </select>
        </div>
      </section>

      <section v-if="filteredEvents.length" class="activity-list">
        <ActivityCard
          v-for="event in filteredEvents"
          :key="event._id"
          :event="event"
        />
      </section>

      <div v-else class="no-data">
        <p>目前沒有相關活動。</p>
      </div>
    </div>
  </div>
</template>

<script>
import ActivityCard from '@/components/ActivityCard.vue';
import EventForm from '../components/EventForm.vue';

export default {
  components: {
    ActivityCard,
    EventForm
  },
  data() {
    return {
      events: [],
      filteredEvents: [],
      filter: '',
      loading: true,
    };
  },
  mounted() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await this.$axios.get('/events/all');
        this.events = response.data;
        this.filteredEvents = response.data;
      } catch (error) {
        console.error('API 錯誤:', error);
      } finally {
        this.loading = false;
      }
    },

    applyFilter() {
      if (this.filter) {
        this.filteredEvents = this.events.filter(
          event => event.type === this.filter
        );
      } else {
        this.filteredEvents = this.events;
      }
    }
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
  font-family: 'Noto Sans TC', Arial, sans-serif;
  background-color: #f9fafc;
  min-height: 100vh;
}
.banner{
  height: 220px;
  width: 100%;
  display: flex;
  position: relative;
  padding-top: 0px;
  background-color: #025cbd;
}
.banner_image {
  background-image: url('@/assets/banner-background.jpg');
  background-size: cover;
  background-position: 50% 75%;
  height: 220px;
  width: 100%;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  font-size: 18px;
  color: #555;
}
.filters-and-form {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 150px;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ddd;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.filters {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filters label {
  font-size: 14px;
  color: #34495e;
}

.filters select {
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.no-data {
  text-align: center;
  font-size: 16px;
  color: #888;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.event-form-container {
  margin: 4px 0;
  text-align: left;
}
</style>