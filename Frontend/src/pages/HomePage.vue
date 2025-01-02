<template>
  <div class="home">
    <header class="header">
      <h1>歡迎來到海大活動報名系統</h1>
    </header>

    <div class="event-form-container">
      <button class="create-event-btn" @click="showModal = true">創建活動</button>
      
      <label>
        <input type="checkbox" v-model="showPastEvents" />
        顯示過去的活動
      </label>

      <EventForm
        v-if="showModal"
        v-model:showModal="showModal"
        :formData="formData"
        @event-created="fetchEvents"
      />
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>載入中...</p>
    </div>

    <div v-else>
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
      showModal: false,  // 控制 EventForm 顯示與否
      showPastEvents: false, // 控制是否顯示過去的活動
      formData: {
        title: '',
        description: '',
        date: '',
        location: '',
        participantLimit: 0,
        creator: '',
      },
    };
  },
  mounted() {
    this.fetchEvents();
  },
  watch: {
    showPastEvents(newVal) {
      this.filterEvents(newVal);
    }
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await this.$axios.get('/events/all');
        this.events = response.data;
        this.filterEvents(this.showPastEvents); // 根據勾選框狀態過濾活動
      } catch (error) {
        console.error('API 錯誤:', error);
      } finally {
        this.loading = false;
      }
    },

    filterEvents(showPast) {
      const currentDate = new Date(); // 取得當前日期
      if (showPast) {
        this.filteredEvents = this.events; // 顯示所有活動，包括過去的
      } else {
        this.filteredEvents = this.events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= currentDate; // 只保留未結束的活動
        });
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

.create-event-btn {
  background-color: #007bff; /* 藍色背景 */
  color: white; /* 文字顏色 */
  padding: 10px 20px; /* 內邊距 */
  border: none; /* 去除邊框 */
  border-radius: 8px; /* 圓角 */
  font-size: 16px; /* 文字大小 */
  cursor: pointer; /* 滑鼠指針效果 */
  transition: background-color 0.3s ease; /* 過渡效果 */
  text-align: left; /* 向左對齊文字 */
  margin: 10px 0; /* 添加上下間距 */
}

.create-event-btn:hover {
  background-color: #0056b3; /* 懸停時的深藍色 */
}

.create-event-btn:active {
  background-color: #003f7f; /* 按下時的更深藍色 */
}

/* 確保按鈕父容器的子元素向左對齊 */
.event-form-container {
  text-align: left; /* 父容器文字向左對齊 */
}
</style>
