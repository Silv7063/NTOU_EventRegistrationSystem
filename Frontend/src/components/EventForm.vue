<template>
  <div class="event-form">
    <h2>{{ isEditMode ? '編輯活動' : '創建活動' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">活動名稱</label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          placeholder="請輸入活動名稱"
          required
        >
      </div>

      <div class="form-group">
        <label for="description">活動描述</label>
        <textarea
          id="description"
          v-model="formData.description"
          placeholder="請輸入活動描述"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="date">活動日期</label>
        <input
          id="date"
          v-model="formData.date"
          type="datetime-local"
          required
        >
      </div>

      <div class="form-group">
        <label for="location">活動地點</label>
        <input
          id="location"
          v-model="formData.location"
          type="text"
          placeholder="請輸入活動地點"
          required
        >
      </div>

      <div class="form-group">
        <label for="capacity">報名人數上限</label>
        <input
          id="capacity"
          v-model.number="formData.capacity"
          type="number"
          min="1"
          placeholder="請輸入報名人數上限"
          required
        >
      </div>

      <div class="form-group">
        <label>
          <input
            id="isOnline"
            v-model="formData.isOnline"
            type="checkbox"
          >
          線上活動
        </label>
        <span>{{ formData.isOnline ? '活動將會在線上舉行。' : '' }}</span>
      </div>

      <div class="form-group">
        <button
          type="submit"
          :disabled="isSubmitting"
        >
          {{ isEditMode ? '更新活動' : '創建活動' }}
        </button>
      </div>
    </form>

    <transition name="fade">
      <div
        v-if="formStatus"
        :class="['form-status', formStatus.type]"
      >
        {{ formStatus.message }}
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    eventId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isEditMode: false, // 是否為編輯模式
      isSubmitting: false, // 提交表單時禁用按鈕
      formData: {
        title: '',
        description: '',
        date: '',
        location: '',
        capacity: 0,
        isOnline: false,
      },
      formStatus: null, // 表單狀態訊息
    };
  },
  created() {
    if (this.eventId) {
      this.isEditMode = true;
      this.loadEventData();
    }
  },
  methods: {
    // 加載活動資料（編輯模式時）
    async loadEventData() {
      try {
        const response = await axios.get(`/api/events/${this.eventId}`);
        this.formData = response.data;
      } catch (error) {
        console.error('無法加載活動資料', error);
        this.formStatus = { type: 'error', message: '無法加載活動資料。' };
      }
    },

    // 提交表單
    async handleSubmit() {
      this.isSubmitting = true;
      try {
        if (this.isEditMode) {
          await axios.put(`/api/events/${this.eventId}`, this.formData);
          this.formStatus = { type: 'success', message: '活動更新成功！' };
        } else {
          await axios.post('/api/events', this.formData);
          this.formStatus = { type: 'success', message: '活動創建成功！' };
        }
      } catch (error) {
        console.error('提交活動資料失敗', error);
        this.formStatus = {
          type: 'error',
          message: error.response?.data?.message || '活動創建/更新失敗。',
        };
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
.event-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.event-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea,
.form-group button {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.form-group textarea {
  height: 150px;
}

button:disabled {
  background-color: #ddd;
}

.form-status {
  margin-top: 20px;
  padding: 10px;
  text-align: center;
}

.form-status.success {
  background-color: #d4edda;
  color: #155724;
}

.form-status.error {
  background-color: #f8d7da;
  color: #721c24;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
