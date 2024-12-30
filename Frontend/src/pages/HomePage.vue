<template>
  <div class="home">
    <header class="header">
      <h1>歡迎來到海大活動報名系統</h1>
    </header>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>載入中...</p>
    </div>

    <div v-else>
      <section class="filters">
        <label for="filter">篩選活動類型：</label>
        <select id="filter" v-model="filter" @change="applyFilter">
          <option value="">全部</option>
          <option value="學術">學術</option>
          <option value="運動">運動</option>
          <option value="娛樂">娛樂</option>
        </select>
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

export default {
  components: {
    ActivityCard
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

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 24px;
  color: #2c3e50;
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
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
</style>