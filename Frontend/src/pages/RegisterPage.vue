<template>
  <div class="register">
    <h1>註冊</h1>
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="name">名稱</label>
        <input
          v-model="name"
          type="text"
          required
          placeholder="請輸入名稱"
          class="form-input"
        />
      </div>
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
      <div class="form-group">
        <label for="identity">使用者身份</label>
        <select v-model="identity" required class="form-input">
          <option value="student">學生</option>
          <option value="teacher">教師</option>
          <option value="staff">行政人員</option>
        </select>
      </div>
      <button type="submit" :disabled="loading" class="register-btn">
        {{ loading ? '註冊中...' : '註冊' }}
      </button>
    </form>

    <!-- 顯示錯誤訊息 -->
    <p v-if="errorMessage" class="error">
      {{ errorMessage }}
    </p>

    <!-- 註冊成功後顯示提示 -->
    <p v-if="successMessage" class="success">
      {{ successMessage }}
      <router-link to="/login">立即登入</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: 'user',  // You can modify this if needed
      identity: 'student',
      loading: false,
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
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
          identity: this.identity,
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

.register-form {
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

.register-btn {
  background-color: #4caf50;
  color: white;
  margin-bottom: 20px;
}

.register-btn:disabled {
  background-color: #ccc;
}

.error {
  color: red;
  text-align: center;
}

.success {
  color: green;
  text-align: center;
}

.success a {
  color: blue;
  text-decoration: underline;
}
</style>
