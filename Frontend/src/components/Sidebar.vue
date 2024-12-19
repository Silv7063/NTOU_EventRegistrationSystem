<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h2>活動報名系統</h2>
    </div>
    <ul class="sidebar-menu">
      <li>
        <router-link to="/home">
          首頁
        </router-link>
      </li>
      <li>
        <router-link to="/events">
          活動列表
        </router-link>
      </li>
      <li v-if="isAdmin">
        <router-link to="/admin/dashboard">
          管理員儀表板
        </router-link>
      </li>
      <li v-if="isAdvancedUser">
        <router-link to="/user/dashboard">
          使用者儀表板
        </router-link>
      </li>
      <li>
        <router-link to="/profile">
          我的個人資料
        </router-link>
      </li>
    </ul>
    <div class="sidebar-footer">
      <button @click="toggleSidebar">
        關閉
      </button>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props: {
      isAdmin: Boolean,
      isAdvancedUser: Boolean,
    },
    methods: {
      toggleSidebar() {
        this.$emit('toggle-sidebar');
      }
    }
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    height: 100vh;
    background-color: #2c3e50;
    color: white;
    padding-top: 20px;
    position: fixed;
    top: 0;
    left: 0;
  }
  
  .sidebar-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .sidebar-menu {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar-menu li {
    padding: 10px;
    text-align: left;
  }
  
  .sidebar-menu li a {
    color: white;
    text-decoration: none;
    font-size: 16px;
  }
  
  .sidebar-footer {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
  }
  
  button {
    background-color: #e74c3c;
    border: none;
    padding: 10px;
    color: white;
    cursor: pointer;
  }
  </style>
  