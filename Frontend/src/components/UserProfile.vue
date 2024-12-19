<template>
  <div class="user-profile">
    <h2>使用者資料</h2>
    <div class="profile-card">
      <div class="profile-info">
        <p><strong>姓名:</strong> {{ user.name }}</p>
        <p><strong>電子郵件:</strong> {{ user.email }}</p>
        <p><strong>角色:</strong> {{ user.role }}</p>
        <button
          class="btn-edit"
          @click="editProfile"
        >
          編輯資料
        </button>
      </div>
    </div>
  
    <!-- 編輯資料的彈窗 -->
    <Modal
      v-if="isEditing"
      @close="closeModal"
    >
      <template #title>
        編輯使用者資料
      </template>
      <template #default>
        <form @submit.prevent="updateProfile">
          <label for="name">姓名</label>
          <input
            id="name"
            v-model="user.name"
            type="text"
            required
          >
  
          <label for="email">電子郵件</label>
          <input
            id="email"
            v-model="user.email"
            type="email"
            required
          >
  
          <button type="submit">
            更新資料
          </button>
        </form>
      </template>
    </Modal>
  </div>
</template>
  
  <script>
  import Modal from './Modal.vue';
  
  export default {
    name: 'UserProfile',
    components: {
      Modal,
    },
    data() {
      return {
        user: {
          name: '張三',
          email: 'example@example.com',
          role: '學生',
        },
        isEditing: false,
      };
    },
    methods: {
      editProfile() {
        this.isEditing = true;
      },
      closeModal() {
        this.isEditing = false;
      },
      updateProfile() {
        // 發送 API 請求更新使用者資料
        console.log('更新資料:', this.user);
        this.isEditing = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .user-profile {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .profile-card {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .btn-edit {
    background-color: #007bff;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-top: 10px;
  }
  
  input {
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  