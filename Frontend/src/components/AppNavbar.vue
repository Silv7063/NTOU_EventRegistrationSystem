<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <router-link
        to="/"
        class="logo"
      >
        海大活動借用系統
      </router-link>
    </div>
    <div class="navbar-links">
      <router-link
        to="/"
        class="nav-link"
      >
        首頁
      </router-link>
      <router-link
        to="/events"
        class="nav-link"
      >
        查詢活動
      </router-link>
      <!-- New link for event history page -->
      <router-link
        to="/event/:id/History"
        class="nav-link"
      >
        活動紀錄
      </router-link>
      <router-link
        v-if="isAuthenticated"
        to="/user/dashboard"
        class="nav-link"
      >
        個人資料
      </router-link>
      
    </div>
    <div class="navbar-actions">
      <router-link
        v-if="!isAuthenticated"
        to="/login"
        class="btn btn-primary"
      >
        登入
      </router-link>
      <button
        v-if="isAuthenticated"
        class="btn btn-danger"
        @click="logout2"
      >
        登出
      </button>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['logout']),
    async logout2() {
      // 登出邏輯
      await this.logout();
      this.$router.push('/login'); // 登出後跳轉到首頁
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  padding: 10px 20px;
  color: white;
}

.navbar-logo .logo {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.navbar-links {
  display: flex;
  gap: 15px;
}

.nav-link {
  text-decoration: none;
  color: white;
  font-size: 16px;
}

.nav-link:hover {
  text-decoration: underline;
}

.navbar-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #003366;
}

.btn-primary {
  background-color: #28a745;
}

.btn-danger {
  background-color: #dc3545;
}
</style>
