<template>
  <div class="events">
    <h1>{{ event.title }}</h1>
    <p>{{ event.description }}</p>
    <p><strong>時間：</strong>{{ formattedDate }}</p>
    
    <!-- 按鈕來創建活動 -->
    <button @click="openCreateEventModal">創建活動</button>
    
    <!-- 按鈕來編輯活動 -->
    <button v-if="eventId" @click="openEditEventModal(event)">編輯活動</button>
    
    <!-- 顯示 EventForm 組件 -->
    <EventForm
      v-if="showModal"
      :event="event"
      :eventId="eventId"
      @close="closeModal"
    />
    
    <button v-if="!isRegistered" @click="registerEvent">報名</button>
    <button v-if="isRegistered" @click="cancelRegistration">取消報名</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EventForm from '../components/EventForm.vue'; // 引入 EventForm 組件

export default {
  components: {
    EventForm,
  },
  data() {
    return {
      event: {},
      isRegistered: false,
      showModal: false, // 控制 EventForm 組件顯示
      eventId: null, // 活動 ID，用於編輯
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
  },
  methods: {
    async getEvent() {
      const eventId = this.$route.params.id;
      this.eventId = eventId; // 記錄活動 ID
      try {
        const response = await this.$axios.get(`/events/${eventId}`);
        this.event = response.data;
        this.isRegistered = response.data.isRegistered;
      } catch (error) {
        this.$router.push('/not-found');
      }
    },
    
    // 打開創建活動模態框
    openCreateEventModal() {
      this.event = {}; // 清空現有的活動資料
      this.showModal = true; // 顯示 EventForm 組件
    },

    // 打開編輯活動模態框
    openEditEventModal(event) {
      this.showModal = true; // 顯示 EventForm 組件
    },

    // 關閉 EventForm
    closeModal() {
      this.showModal = false;
    },

    async registerEvent() {
      try {
        const eventId = this.$route.params.id;
        await this.$axios.post(`/events/${eventId}/register`);
        this.isRegistered = true;
        this.$toast.success('成功報名活動！');
      } catch (error) {
        this.$toast.error('報名失敗，請稍後再試。');
      }
    },

    async cancelRegistration() {
      try {
        const eventId = this.$route.params.id;
        await this.$axios.delete(`/events/${eventId}/unregister`);
        this.isRegistered = false;
        this.$toast.success('成功取消報名！');
      } catch (error) {
        this.$toast.error('取消報名失敗，請稍後再試。');
      }
    },
  },
};
</script>

<style scoped>
.events {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.events h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.events p {
  font-size: 16px;
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>
