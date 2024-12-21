<template>
  <div class="login">
    <h1>登入</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="email"
          type="email"
          required
          placeholder="請輸入電子郵件"
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label for="password">密碼</label>
        <input
          v-model="password"
          type="password"
          required
          placeholder="請輸入密碼"
          class="form-input"
        />
      </div>
      <button type="submit" :disabled="loading" class="login-btn">
        登入
      </button>
    </form>

    <!-- 顯示錯誤訊息 -->
    <p v-if="error" class="error">
      {{ error }}
    </p>

    <!-- 顯示載入提示 -->
    <p v-if="loading" class="loading">
      登入中...
    </p>

    <p>還沒有帳號？ <router-link to="/register">立即註冊</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      loading: false, // 新增載入狀態
    }
  },
  methods: {
    async login() {
      this.error = null; // 清除之前的錯誤訊息
      this.loading = true; // 顯示載入提示

      try {
        // 發送登入請求
        const response = await this.$axios.post('/auth/login', {
          email: this.email,
          password: this.password
        });

        // 登入成功，跳轉至使用者儀表板
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token); // 保存 token
          this.$router.push('/dashboard');
        }
      } catch (error) {
        // 如果有錯誤，顯示錯誤訊息
        this.error = error.response?.data?.message || '登入失敗，請檢查您的電子郵件或密碼。';
      } finally {
        this.loading = false; // 隱藏載入提示
      }
    }
  }
}
</script>

<style scoped>
.login {
  padding: 40px;
  max-width: 400px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
}

button {
  padding: 15px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.login-btn {
  background-color: #4caf50;
  color: white;
  margin-bottom: 20px;
}

.login-btn:disabled {
  background-color: #ccc;
}

.error {
  color: red;
  text-align: center;
}

.loading {
  color: blue;
  text-align: center;
}
</style>
