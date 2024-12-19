<template>
  <footer class="footer">
    <p>&copy; 2024 國立台灣海洋大學. 版權所有.</p>
    <ul class="footer-links">
      <li>
        <router-link to="/privacy-policy">
          隱私政策
        </router-link>
      </li>
      <li>
        <router-link to="/terms-of-service">
          服務條款
        </router-link>
      </li>
    </ul>
  </footer>
</template>
  
  <script>
  export default {
  }
  </script>
  
  <style scoped>
  .footer {
    background-color: #34495e;
    color: white;
    text-align: center;
    padding: 20px;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  
  .footer-links {
    list-style-type: none;
    padding: 0;
  }
  
  .footer-links li {
    display: inline;
    margin: 0 10px;
  }
  
  .footer-links li a {
    color: white;
    text-decoration: none;
  }
  </style>
  