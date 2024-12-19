<template>
  <div class="login">
    <h1>登入</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input
          v-model="email"
          type="email"
          required
          placeholder="請輸入電子郵件"
        >
      </div>
      <div>
        <label for="password">密碼</label>
        <input
          v-model="password"
          type="password"
          required
          placeholder="請輸入密碼"
        >
      </div>
      <button type="submit">
        登入
      </button>
    </form>

    <!-- 顯示錯誤訊息 -->
    <p 
      v-if="error" 
      class="error"
    >
      {{ error }}
    </p>

    <!-- 顯示載入提示 -->
    <p 
      v-if="loading" 
      class="loading"
    >
      登入中...
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      loading: false // 新增載入狀態
    }
  },
  methods: {
    async login() {
      this.error = null; // 清除之前的錯誤訊息
      this.loading = true; // 顯示載入提示

      try {
        await this.$axios.post('/api/auth/login', {
          email: this.email,
          password: this.password
        });

        // 登入成功，跳轉至使用者儀表板
        this.$router.push('/dashboard');
      } catch (error) {
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
  padding: 20px;
}
.error {
  color: red;
}
.loading {
  color: blue;
}
</style>