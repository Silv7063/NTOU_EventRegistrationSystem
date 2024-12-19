<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <router-link
        to="/"
        class="logo"
      >
        NTOU Event
      </router-link>
    </div>
    <div class="navbar-links">
      <router-link
        to="/"
        class="nav-link"
      >
        Home
      </router-link>
      <router-link
        to="/events"
        class="nav-link"
      >
        Events
      </router-link>
      <router-link
        to="/about"
        class="nav-link"
      >
        About
      </router-link>
    </div>
    <div class="navbar-actions">
      <button
        class="btn btn-secondary"
        @click="toggleLanguage"
      >
        {{ currentLanguage === 'en' ? '中文' : 'English' }}
      </button>
      <router-link
        v-if="!isAuthenticated"
        to="/login"
        class="btn btn-primary"
      >
        Login
      </router-link>
      <button
        v-if="isAuthenticated"
        class="btn btn-danger"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </nav>
</template>
  
  <script>
  export default {
    data() {
      return {
        currentLanguage: 'en',  // 預設語言
        isAuthenticated: false  // 用於判斷是否已登入
      };
    },
    methods: {
      toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'zh' : 'en';
        this.$i18n.locale = this.currentLanguage;  // 切換語言，假設使用 vue-i18n
      },
      logout() {
        // 登出邏輯
        this.isAuthenticated = false;
        this.$router.push('/login');
      }
    }
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
  </style>
  