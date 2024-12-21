<template>
    <div class="google-callback">
      <p>正在處理 Google 登入...</p>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      // 1. 從 URL 中獲取 Google 登入返回的參數
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');  // 假設後端返回的 token 在 URL 中
  
      if (token) {
        // 2. 將 token 存儲到 localStorage 或 vuex
        localStorage.setItem('authToken', token);  // 儲存 token
  
        // 3. 跳轉到用戶儀表板頁面
        this.$router.push('/user/dashboard');
      } else {
        // 如果沒有 token，顯示錯誤訊息並導向登入頁面
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .google-callback {
    padding: 20px;
    text-align: center;
    font-size: 18px;
  }
  </style>
  