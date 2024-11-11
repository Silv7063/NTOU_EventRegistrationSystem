<template>
  <div class="register-page">
    <h1>註冊</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="email">電子郵件</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">密碼</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">確認密碼</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <button type="submit">註冊</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert('密碼不一致');
        return;
      }
      // 將註冊表單數據發送到 API
      console.log('註冊中...', this.email, this.password);
      // 您可以使用 Axios 將數據發送到後端進行處理
    }
  }
};
</script>

<style scoped>
/* 添加基本的樣式 */
.register-page {
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
