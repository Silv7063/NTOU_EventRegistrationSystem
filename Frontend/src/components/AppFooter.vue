<template>
  <footer class="footer" aria-label="網站頁腳">
    <p>&copy; {{ currentYear }} 國立台灣海洋大學. 版權所有.</p>
    <ul class="footer-links">
      <li>
        <router-link to="/privacy-policy" aria-label="隱私政策" rel="nofollow">
          隱私政策
        </router-link>
      </li>
      <li>
        <router-link to="/terms-of-service" aria-label="服務條款" rel="nofollow">
          服務條款
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
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
  font-size: 16px;
}

.footer-links {
  list-style-type: none;
  padding: 0;
  margin: 10px 0 0;
}

.footer-links li {
  display: inline;
  margin: 0 10px;
}

.footer-links li a {
  color: white;
  text-decoration: none;
}

.footer-links li a:hover {
  text-decoration: underline;
  color: #1abc9c;
}

@media (max-width: 600px) {
  .footer {
    font-size: 14px;
    padding: 10px;
  }
  .footer-links li {
    display: block;
    margin: 5px 0;
  }
}
</style>
