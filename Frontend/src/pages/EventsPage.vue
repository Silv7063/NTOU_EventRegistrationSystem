<template>
  <div class="events">
    <div class="event-card">
      <h1>{{ event.title }}</h1>
      <p>{{ event.description }}</p>
      <p><strong>時間：</strong>{{ formattedDate }}</p>

      <!-- 顯示編輯活動和刪除活動的按鈕（僅對admin可見） -->
      <div v-if="isAdvanced">
        <button v-if="eventId" @click="openEditEventModal" class="edit-button">編輯活動</button>
        <button v-if="eventId" @click="deleteEvent" class="delete-button">刪除活動</button>
        <button v-if="!isRegistered" @click="registerEvent" class="register-button">報名</button>
        <button v-if="isRegistered" @click="cancelRegistration" class="cancel-button">取消報名</button>
      </div>
      
      <!-- 顯示 EventForm 組件 -->
      <EventForm
        v-if="showModal"
        :event="event"
        :eventId="eventId"
        @close="closeModal"
      />
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import EventForm from '../components/EventForm.vue'; // 引入 EventForm 組件

export default {
  components: {
    EventForm,
  },
  data() {
    return {
      event: {}, // 用於存儲活動數據
      isRegistered: false, // 用於記錄是否已報名
      showModal: false, // 控制 EventForm 顯示與否
      eventId: null, // 活動 ID
      loading: true,  // 加載狀態
      isAdvanced: false,  // 用來判斷用戶是否為管理員
    };
  },
  computed: {
    ...mapState(['user']),
    formattedDate() {
      return new Date(this.event.date).toLocaleString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
  mounted() {
    this.getEvent();
    this.checkIfAdmin(); // 檢查用戶是否為管理員
  },
  methods: {
    async getUser() {
      try {
        const response = await axios.get('/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, 
          },
        });
        return response.data; 
      } catch (error) {
        console.error('無法取得使用者資訊', error);
        return null; // 錯誤時回傳 null
      }
    },
    // 獲取活動數據
    async getEvent() {
      const eventId = this.$route.params.id;
      this.eventId = eventId; // 記錄活動 ID
      try {
        const response = await this.$axios.get(`/events/${eventId}`);
        this.event = response.data;
        this.isRegistered = response.data.isRegistered; // 根據活動數據設定報名狀態
      } catch (error) {
        this.$router.push('/not-found');
      } finally {
        this.loading = false;  // 請求完成後將 loading 設為 false
      }
    },
    
    // 檢查用戶是否為管理員
    async checkIfAdmin() {
      const User = await this.getUser();
      console.log(User)
      if (User.Role === 'admin' || User.Role === 'advanced') {
        this.isAdvanced = true;
      }
    },

    // 打開編輯活動模態框
    openEditEventModal() {
      this.showModal = true; // 顯示 EventForm
    },

    // 關閉 EventForm
    closeModal() {
      this.showModal = false;
    },

    // 報名活動
    async registerEvent() {
      try {
        const eventId = this.$route.params.id;
        const user = await this.getUser();
        if (!user) {
          this.$toast.error('未取得使用者資訊，無法報名');
          return;
        }

        await this.$axios.post(`/events/${eventId}/register`, user); // 傳遞使用者資料
        this.isRegistered = true;
        this.$toast.success('成功報名活動！');
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMsg = error.response.data.message || 'An error occurred';
          const errorDetails = error.response.data.error || 'No details available';
          console.error('Error message:', errorMsg, errorDetails);
        } else {
          console.error('Error occurred:', error.message || 'Unknown error');
        }
      }
    },

    // 取消報名
    async cancelRegistration() {
      try {
        const eventId = this.$route.params.id;
        await this.$axios.delete(`/events/${eventId}/unregister`);
        this.isRegistered = false;
        this.$toast.success('成功取消報名！');
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMsg = error.response.data.message || 'An error occurred';
          const errorDetails = error.response.data.error || 'No details available';
          console.error('Error message:', errorMsg, errorDetails);
        } else {
          console.error('Error occurred:', error.message || 'Unknown error');
        }
      }
    },

    // 刪除活動
    async deleteEvent() {
      const eventId = this.$route.params.id;
      try {
        await this.$axios.delete(`/events/${eventId}`);
        this.$toast.success('活動刪除成功！');
        this.$router.push('/events'); // 刪除後跳轉回活動列表頁
      } catch (error) {
        this.$toast.error('刪除活動失敗，請稍後再試。');
      }
    },
  },
};
</script>

<style scoped>
.events {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f4f7fc;
  display: flex;
  justify-content: center;
}

.event-card {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  transition: all 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.events h1 {
  font-size: 28px;
  margin-bottom: 15px;
  color: #333;
  font-weight: bold;
}

.events p {
  font-size: 16px;
  margin-bottom: 15px;
  color: #555;
}

/* 按鈕樣式 */
button {
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
  transition: transform 0.2s, background-color 0.3s;
}

.edit-button {
  background-color: #007bff;
  color: white;
}

.edit-button:hover {
  background-color: #075fbc;
}

/* 刪除按鈕：紅色 */
.delete-button {
  background-color: #e74c3c;
  color: white;
}

.delete-button:hover {
  background-color: #c0392b;
}

/* 報名按鈕：黃色 */
.register-button {
  background-color: #08aa41;
  color: white;
}

.register-button:hover {
  background-color: #31970c;
}

/* 取消報名按鈕：紅色 */
.cancel-button {
  background-color: #e74c3c;
  color: white;
}

.cancel-button:hover {
  background-color: #c0392b;
}

/* 按鈕禁用狀態 */
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>