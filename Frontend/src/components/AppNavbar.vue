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
        活動
      </router-link>
      <router-link
        to="/about"
        class="nav-link"
      >
        關於我們
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
        @click="logout"
      >
        登出
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false, // 判斷是否已登入
    };
  },
  methods: {
    logout() {
      // 登出邏輯
      this.isAuthenticated = false;
      this.$router.push('/login');
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
