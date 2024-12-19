<template>
  <div class="default-layout">
    <!-- 頂部導航列 -->
    <Navbar />
  
    <!-- 內容區域 -->
    <main>
      <router-view /> <!-- 動態顯示頁面內容 -->
    </main>
  
    <!-- 頁尾 -->
    <footer>
      <p>&copy; 2024 National Taiwan Ocean University</p>
    </footer>
  </div>
</template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  
  export default {
    name: 'DefaultLayout',
    components: {
      Navbar,
    },
  };
  </script>
  
  <style scoped>
  .default-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  main {
    flex: 1;
    padding: 20px;
  }
  
  footer {
    text-align: center;
    padding: 10px;
    background-color: #f1f1f1;
  }
  </style>
  