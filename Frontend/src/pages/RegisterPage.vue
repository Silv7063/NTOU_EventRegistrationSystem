<template>
  <div class="register">
    <h1>註冊</h1>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email</label>
        <input
          v-model="email"
          type="email"
          required
        >
      </div>
      <div>
        <label for="password">密碼</label>
        <input
          v-model="password"
          type="password"
          required
        >
      </div>
      <div>
        <label for="role">使用者身份</label>
        <select
          v-model="role"
          required
        >
          <option value="student">
            學生
          </option>
          <option value="teacher">
            教師
          </option>
          <option value="staff">
            行政人員
          </option>
        </select>
      </div>
      <button 
        type="submit"
        :disabled="loading"
      >
        {{ loading ? '註冊中...' : '註冊' }}
      </button>
    </form>

    <!-- 顯示錯誤訊息 -->
    <div 
      v-if="errorMessage" 
      class="error-message"
    >
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      role: 'student',
      loading: false, // 加載狀態
      errorMessage: '' // 錯誤訊息
    };
  },
  methods: {
    async register() {
      this.loading = true; // 註冊開始時顯示加載狀態
      this.errorMessage = ''; // 清除任何之前的錯誤訊息
      try {
        await this.$axios.post('/api/auth/register', {
          email: this.email,
          password: this.password,
          role: this.role
        });
        // 註冊成功後跳轉至登入頁面
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || '註冊失敗，請稍後再試'; // 顯示錯誤訊息
      } finally {
        this.loading = false; // 完成註冊後，隱藏加載狀態
      }
    }
  }
};
</script>

<style scoped>
.register {
  padding: 20px;
}

button:disabled {
  background-color: #ccc;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
