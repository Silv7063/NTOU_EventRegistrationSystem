<template>
  <div class="events">
    <div class="event-card">
      <h1>{{ event.title }}</h1>
      <p>{{ event.description }}</p>
      <p><strong>時間：</strong>{{ formattedDate }}</p>

      <!-- 顯示人數上限和創建者名字 -->
      <p><strong>人數上限：</strong>{{ event.participantLimit }}</p>
      <p><strong>創建者：</strong>{{ user.Name }}</p>

      <div class="buttons">
        <button v-if="!isRegistered" @click="registerEvent" class="register-button">報名</button>
        <button v-if="isRegistered" @click="cancelRegistration" class="cancel-button">取消報名</button>
      </div>

      <!-- 顯示編輯活動和刪除活動的按鈕 -->
      <div class="buttons">
        <button 
          v-if="canEditEvent" 
          @click="openEditEventModal" 
          class="edit-button"
        >
          編輯活動
        </button>
        <button 
          v-if="isAdmin" 
          @click="deleteEvent" 
          class="delete-button"
        >
          刪除活動
        </button>
      </div>

      <!-- 顯示編輯活動的 EventForm -->
      <EventForm
        v-if="showModal"
        v-model:showModal="showModal"
        :event="event"
        :eventId="eventId"
        @event-updated="fetchEventData"
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
      event: {}, // 存儲活動數據
      user: {},
      isRegistered: false, // 是否已報名
      showModal: false, // 控制 EventForm 顯示
      eventId: null, // 活動 ID
      loading: true, // 加載狀態
      isAdmin: false, // 判斷是否為管理員
      canEditEvent: false,
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
    this.getUser().then(() => {
      if (this.user) {
        this.fetchEventData();
      }
      console.log({Id: this.user.Id });
      
    });
  },
  methods: {
    async getUser() {
      try {
        const response = await axios.get('/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        this.user = response.data;
        this.isAdmin = this.user.Role === 'admin';
      } catch (error) {
        console.error('無法取得使用者資訊', error);
        return null;
      }
    },
    // 獲取活動數據
    async fetchEventData() {
      const eventId = this.$route.params.id;
      this.eventId = eventId;
      try {
        const response = await this.$axios.get(`/events/${eventId}`);
        this.event = response.data;
        const participants = response.data.participants;
        this.isRegistered = participants.includes(this.user.Id);
        this.canEditEvent = this.user.Id === this.event.creator || this.isAdmin;
      } catch (error) {
        this.$router.push('/not-found');
      } finally {
        this.loading = false;
      }
    },
    // 打開編輯活動模態框
    openEditEventModal() {
      this.showModal = true;
    },
    // 關閉模態框
    closeModal() {
      this.showModal = false;
    },
    // 報名活動
    async registerEvent() {
      try {
        const eventId = this.$route.params.id;
        await this.$axios.post(`/events/${eventId}/register`, this.user);
        this.isRegistered = true;
        alert('成功報名活動！'); // Replace toast with alert
      } catch (error) {
        alert('報名活動失敗，請稍後再試。'); // Replace toast with alert
      }
    },

    // 取消報名
    async cancelRegistration() {
      try {
        const eventId = this.$route.params.id;
        await this.$axios.delete(`/events/${eventId}/unregister`, { data: this.user });
        this.isRegistered = false;
        alert('成功取消報名！'); // Replace toast with alert
      } catch (error) {
        console.error('取消報名錯誤:', error); // 詳細打印錯誤
        const errorMessage = error?.response?.data?.message || '取消報名失敗，請稍後再試。';
        alert(errorMessage); // Replace toast with alert
      }
    },

    // 刪除活動
    async deleteEvent() {
      const eventId = this.$route.params.id;
      try {
        await this.$axios.delete(`/events/${eventId}`);
        alert('活動刪除成功！'); // Replace toast with alert
        this.$router.push('/events');
      } catch (error) {
        alert('刪除活動失敗，請稍後再試。'); // Replace toast with alert
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

.events h1 {
  font-size: 32px;
  margin-bottom: 15px;
  color: #333;
  font-weight: bold;
}

.events p {
  font-size: 18px;
  margin-bottom: 15px;
  color: #555;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

/* 按鈕樣式 */
button {
  border: none;
  padding: 14px 28px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.2s, background-color 0.3s;
  width: 48%;
}

.edit-button {
  background-color: #007bff;
  color: white;
}

.edit-button:hover {
  background-color: #075fbc;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
}

.delete-button:hover {
  background-color: #c0392b;
}

.register-button {
  background-color: #08aa41;
  color: white;
}

.register-button:hover {
  background-color: #31970c;
}

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
