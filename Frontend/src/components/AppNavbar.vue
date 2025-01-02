<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="@/assets/logo.png" alt="Logo" class="logo-image" />
      <router-link
        to="/"
        class="logo"
      >
        海大活動報名系統
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
        to="/user/dashboard/dashboard"
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
  background-color: white;
  padding: 15px 20px;
  color: white;
}

.navbar-logo .logo {
  font-size: 24px;
  font-weight: bold;
  color: black;
  text-decoration: none;
  position: relative;
  top: -8px;
}
.logo-image {
  height: 40px;
  width: auto;
  margin-right: 10px;
}
.navbar-links {
  display: flex;
  gap: 25px;
  margin-left: 333px;
}

.nav-link {
  text-decoration: none;
  color: black;
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
