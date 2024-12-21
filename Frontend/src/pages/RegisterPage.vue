<template>
  <div class="register">
    <h1>註冊</h1>
    <form @submit.prevent="register">
      <div>
        <label for="name">名稱</label>
        <input 
          v-model="name" 
          type="name" 
          required 
          placeholder="請輸入名稱"
        >
      </div>
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
      <div>
        <label for="identity">使用者身份</label>
        <select v-model="identity" required>
          <option value="student">學生</option>
          <option value="teacher">教師</option>
          <option value="staff">行政人員</option>
        </select>
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? '註冊中...' : '註冊' }}
      </button>
    </form>

    <!-- 顯示錯誤訊息 -->
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- 註冊成功後顯示提示 -->
    <div v-if="successMessage" class="success-message">
      <p>{{ successMessage }}</p>
      <router-link to="/login">立即登入</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:'',
      email: '',
      password: '',
      role: 'user',
      identity: 'student',
      loading: false,
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    // 註冊處理方法
    async register() {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';
      try {
        const response = await this.$axios.post('http://localhost:4000/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role,
          identity: this.identity
        });

        if (response.status === 200) {
          this.successMessage = '註冊成功，請前往登入頁面。';
          setTimeout(() => this.$router.push('/login'), 2000); // 跳轉至登入頁
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || '註冊失敗，請稍後再試';
      } finally {
        this.loading = false;
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

.success-message {
  color: green;
  margin-top: 10px;
}

.success-message a {
  color: blue;
  text-decoration: underline;
}
</style>
