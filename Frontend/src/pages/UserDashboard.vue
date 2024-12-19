<template>
  <div class="user-dashboard">
    <h1>使用者儀表板</h1>
    <div v-if="loading">
      <p>加載中...</p>
    </div>
    <div v-else-if="user">
      <h2>歡迎，{{ user.name }}</h2>
      <div>
        <h3>已報名的活動</h3>
        <ul>
          <li
            v-for="event in userEvents"
            :key="event._id"
          >
            {{ event.title }} 
            <button @click="cancelRegistration(event._id)">
              取消報名
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>無法加載使用者資料。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null, // 使用者資料
      userEvents: [], // 已報名的活動
      loading: true // 加載狀態
    }
  },
  mounted() {
    this.fetchUserInfo()
  },
  methods: {
    async fetchUserInfo() {
      try {
        const response = await this.$axios.get('/api/user/me')
        this.user = response.data
        this.userEvents = response.data.events
      } catch (error) {
        this.$toast.error('無法加載使用者資料') // 使用第三方庫來顯示錯誤訊息
      } finally {
        this.loading = false
      }
    },
    async cancelRegistration(eventId) {
      try {
        await this.$axios.delete(`/api/events/${eventId}/unregister`)
        this.userEvents = this.userEvents.filter(event => event._id !== eventId)
        this.$toast.success('已成功取消報名') // 顯示成功的提示
      } catch (error) {
        this.$toast.error('取消報名失敗') // 顯示錯誤提示
      }
    }
  }
}
</script>

<style scoped>
.user-dashboard {
  padding: 20px;
}

button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}
</style>
