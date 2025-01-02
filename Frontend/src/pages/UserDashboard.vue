<template>
  <div class="user-dashboard">
    <div v-if="loading" class="loading-container">

      <p>加載中...</p>
    </div>
    <div v-else-if="user" class="user-info">
      <h2 class="welcome-message">歡迎，{{ user.username }}</h2>
      <div class="role-display">
        <p>角色：
          <span v-if="user.role === 'user'" class="role-user">普通使用者</span>
          <span v-else-if="user.role === 'advanced'" class="role-advanced">進階使用者</span>
          <span v-else-if="user.role === 'admin'" class="role-admin">管理員</span>
        </p>
      </div>
      <div class="user-details">
        <p>電子郵件：{{ user.email }}</p>
        <p>身份：{{ user.identity }}</p>
      </div>

      <button @click="showEditProfile = true" class="edit-profile-button">
        修改個人資料
      </button>

      <div class="event-section">
        <h3>已報名的活動</h3>
        <ul class="event-list">
          <li
            v-for="event in userEvents"
            :key="event._id"
            class="event-item"
          >
            <span class="event-title">活動 ID：{{ event.event }}</span>
            <span class="event-state">狀態：{{ event.state }}</span>
            <span class="event-date">報名日期：{{ new Date(event.registrationDate).toLocaleDateString() }}</span>
            <button @click="cancelRegistration(event)" class="cancel-button">
              取消報名
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="error-message">
      <p>無法加載使用者資料。</p>
    </div>

    <div v-if="showEditProfile" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="showEditProfile = false">×</button>
        <edit-profile :user="user" @profileUpdated="handleProfileUpdated" />
      </div>
    </div>
  </div>
</template>

<script>
import EditProfile from '../components/EditProfile.vue';

export default {
  components: {
    EditProfile,
  },
  data() {
    return {
      user: null,
      userEvents: [],
      loading: true,
      showEditProfile: false, // 用於控制彈出層顯示
    };
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      try {
        const token = localStorage.getItem('authToken');
        alert(token)
        const response = await this.$axios.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert(response)
        
        await this.fetchUserEvents(token);
      } catch (error) {
        this.$store.dispatch('logout');
        this.$router.push('/login');
        this.$toast.error('無法加載使用者資料');
      } finally {
        this.loading = false;
      }
    },
    async fetchUserEvents(token) {
      try {
        const response = await this.$axios.get('/participants/getEvent', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.userEvents = response.data;
      } catch (error) {
        this.$toast.error('無法加載使用者活動資料');
      }
    },
    async cancelRegistration(targetEvent) {
      try {
        const token = localStorage.getItem('authToken');
        await this.$axios.delete(`/participants/${targetEvent._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.$toast.success('已成功取消報名');
        await this.fetchUserEvents(token);
      } catch (error) {
        this.$toast.error('取消報名失敗');
      }
    },
    handleProfileUpdated() {
      this.showEditProfile = false; // 隱藏表單
      this.fetchUserInfo(); // 重新加載使用者資料
    },
  },
};
</script>

<style scoped>
.user-dashboard {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.loading-container {
  text-align: center;
  font-size: 18px;
  color: #555;
}

.user-info {
  text-align: center;
}

.welcome-message {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.role-display {
  margin-bottom: 20px;
  font-size: 18px;
}

.role-user {
  color: #4caf50;
  font-weight: bold;
}

.role-advanced {
  color: #2196f3;
  font-weight: bold;
}

.role-admin {
  color: #ff5722;
  font-weight: bold;
}

.user-details {
  margin-bottom: 20px;
  text-align: left;
}

.user-details p {
  margin: 5px 0;
  font-size: 16px;
  color: #333;
}

.event-section {
  text-align: left;
  margin-top: 20px;
}

.event-list {
  list-style: none;
  padding: 0;
}

.event-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.event-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
}

.event-state {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.event-date {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.cancel-button {
  align-self: flex-end;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #e60000;
}

.error-message {
  text-align: center;
  color: #ff4d4d;
  font-size: 18px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

.edit-profile-button {
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-profile-button:hover {
  background-color: #0056b3;
}
</style>