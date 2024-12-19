<template>
  <div class="activity-detail">
    <h1>{{ event.title }}</h1>
    <p>{{ event.description }}</p>
    <p><strong>時間：</strong>{{ formattedDate }}</p>
    <button
      v-if="!isRegistered"
      @click="registerEvent"
    >
      報名
    </button>
    <button
      v-if="isRegistered"
      @click="cancelRegistration"
    >
      取消報名
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      event: {},
      isRegistered: false
    };
  },
  computed: {
    ...mapState(['user']), // 獲取用戶資料
    formattedDate() {
      return new Date(this.event.date).toLocaleString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  },
  mounted() {
    this.getEventDetails();
  },
  methods: {
    async getEventDetails() {
      const eventId = this.$route.params.id;
      try {
        const response = await this.$axios.get(`/api/events/${eventId}`);
        this.event = response.data;
        this.isRegistered = response.data.isRegistered;
      } catch (error) {
        this.$router.push('/not-found'); // 導向 404 頁面
      }
    },
    async registerEvent() {
      try {
        const eventId = this.$route.params.id;
        await this.$axios.post(`/api/events/${eventId}/register`);
        this.isRegistered = true;
        this.$toast.success('成功報名活動！');
      } catch (error) {
        this.$toast.error('報名失敗，請稍後再試。');
      }
    },
    async cancelRegistration() {
      try {
        const eventId = this.$route.params.id;
        await this.$axios.delete(`/api/events/${eventId}/unregister`);
        this.isRegistered = false;
        this.$toast.success('成功取消報名！');
      } catch (error) {
        this.$toast.error('取消報名失敗，請稍後再試。');
      }
    }
  }
};
</script>

<style scoped>
.activity-detail {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.activity-detail h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.activity-detail p {
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
