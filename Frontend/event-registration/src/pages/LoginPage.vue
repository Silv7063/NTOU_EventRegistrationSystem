<template>
  <div class="login-page">
    <h1>登入</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">電子郵件</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">密碼</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">登入</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      // 將登入表單數據發送到 API
      console.log('登入中...', this.email, this.password);
      // 您可以使用 Axios 將數據發送到後端進行驗證
    }
  }
};
</script>

<style scoped>
/* 添加基本的樣式 */
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
}
.form-group {
  margin-bottom: 1em;
}
button {
  background-color: #42b983;
  color: white;
  padding: 0.5em 1em;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #38a77b;
}
</style>
