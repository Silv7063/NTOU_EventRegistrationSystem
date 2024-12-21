<template>
  <div
    class="home"
  >
    <h1>歡迎來到海大活動報名系統</h1>

    <div
      v-if="loading"
      class="loading"
    >
      載入中...
    </div>
    <div v-else>
      <div
        class="filters"
      >
        <label for="filter">篩選活動類型：</label>
        <select
          id="filter"
          v-model="filter"
          @change="applyFilter"
        >
          <option value="">
            全部
          </option>
          <option value="學術">
            學術
          </option>
          <option value="運動">
            運動
          </option>
          <option value="娛樂">
            娛樂
          </option>
        </select>
      </div>
      <div
        v-if="filteredEvents.length"
        class="activity-list"
      >
        <ActivityCard
          v-for="event in filteredEvents"
          :key="event._id"
          :event="event"
        />
      </div>
      <div
        v-else
        class="no-data"
      >
        目前沒有相關活動。
      </div>
    </div>
  </div>
</template>

<script>
import ActivityCard from '@/components/ActivityCard.vue'
console.log('/events'); // 檢查這是否符合後端的路徑

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
    }
  },
  mounted() {
    this.fetchEvents()
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await this.$axios.get('/events');
        this.events = response.data;
        this.filteredEvents = response.data;
      } catch (error) {
        console.error('API 错误:', error); // 输出完整的 error 对象，帮助调试

        let errorMessage = '發生未知錯誤'; // 默认错误消息
        let errorDetails = '無詳細錯誤訊息'; // 默认错误详情

        // 检查 error 对象的结构，确保安全访问
        if (error && error.response) {
          if (error.response.data) {
            // 确保 error.response.data 存在
            errorMessage = error.response.data.message || '無錯誤訊息';
            errorDetails = error.response.data.error || '無詳細錯誤訊息';
          } else {
            errorMessage = '無法獲得錯誤詳情';
          }
        } else if (error && error.message) {
          // 处理没有 response 的错误（例如网络错误）
          errorMessage = error.message;
        }
      } finally {
        this.loading = false;
      }
    },

    applyFilter() {
      if (this.filter) {
        this.filteredEvents = this.events.filter(event =>
          event.type === this.filter
        )
      } else {
        this.filteredEvents = this.events
      }
    }
  }
}
</script>



<style scoped>
.home {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #555;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.activity-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.no-data {
  text-align: center;
  font-size: 16px;
  color: #888;
  margin-top: 20px;
}
</style>
