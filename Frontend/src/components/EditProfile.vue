<template>
    <div class="edit-profile">
      <h3>修改個人資料</h3>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="username">姓名</label>
          <input
            id="username"
            type="text"
            v-model="formData.username"
            placeholder="輸入新名稱"
          />
        </div>
        <div class="form-group">
          <label for="email">電子郵件</label>
          <input
            id="email"
            type="email"
            v-model="formData.email"
            placeholder="輸入新電子郵件"
          />
        </div>
        <div class="form-group">
          <label for="password">新密碼</label>
          <input
            id="password"
            type="password"
            v-model="formData.password"
            placeholder="輸入新密碼"
          />
        </div>
        <div class="form-group">
          <label for="password">確認密碼</label>
          <input
            id="password"
            type="password"
            v-model="formData.doubleCheck"
            placeholder="輸入新密碼"
          />
        </div>
        <button type="submit" class="save-button">儲存更改</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        formData: {
          username: this.user.username || '',
          email: this.user.email || '',
          password: '',
          doubleCheck: '',
        },
      };
    },
    methods: {
      async updateProfile() {
        // 檢查是否有空的欄位
        if (!this.formData.username.trim() || !this.formData.email.trim() || !this.formData.password.trim()) {
          alert('請確保所有欄位都已填寫');
          return;
        }

        if (this.formData.password != this.formData.doubleCheck) {
          alert('請確保密碼一致');
          return;
        }
  
        try {
          const form = {
            username: this.formData.username,
            email: this.formData.email,
            password: this.formData.password,
          }
          const token = localStorage.getItem('authToken');
          console.log("form: ", form);
          await this.$axios.put(
            '/users/updateProfile',
             form ,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert('個人資料更新成功');
          this.$emit('profileUpdated'); // 通知父組件更新資料
        } catch (error) {
          this.$toast.error('更新個人資料失敗');
        }
      },
    },
  };
  </script>  
  
  <style scoped>
  .edit-profile {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .save-button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 4px;
  }
  .save-button:hover {
    background-color: #45a049;
  }
  </style>