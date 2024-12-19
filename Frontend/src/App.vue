<template>
  <div id="app">
    <Navbar /> <!-- 引入導覽列元件 -->
    <router-view /> <!-- 顯示根據路由決定的內容 -->
  </div>
</template>
  
  <script>
  // 引入導覽列元件
  import Navbar from './components/AppNavbar.vue';
  
  export default {
    name: 'App',
    components: {
      Navbar, // 註冊 Navbar 組件
    },
  };
  </script>
  
  <style>
  /* 設置一些全局樣式 */
  #app {
    font-family: 'Arial', sans-serif;
    text-align: center;
  }
  
  body {
    margin: 0;
    padding: 0;
  }
  
  h1 {
    color: #333;
  }
  </style>
  