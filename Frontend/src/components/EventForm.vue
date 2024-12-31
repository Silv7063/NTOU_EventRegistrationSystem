<template>
  <div>
    <!-- Button to open the modal -->
    <button class="create-event-btn" @click="showModal = true">創建活動</button>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
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
              />
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
              />
            </div>

            <div class="form-group">
              <label for="location">活動地點</label>
              <input
                id="location"
                v-model="formData.location"
                type="text"
                placeholder="請輸入活動地點"
                required
              />
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
              />
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false, // 控制彈出式視窗的顯示
      isEditMode: false, // 是否為編輯模式
      isSubmitting: false, // 提交表單時禁用按鈕
      formData: {
        title: '',
        description: '',
        date: '',
        location: '',
        participantLimit: 0,
        creator: '',
      },
      formStatus: null, // 表單狀態訊息
    };
  },
  created() {
    this.initializeCreator();
    if (this.eventId) {
      this.isEditMode = true;
      this.loadEventData();
    }
  },
  methods: {
    async initializeCreator() {
      const userId = await this.getUserId();
      this.formData.creator = userId;
    },
    async getUserId() {
      try {
        const response = await axios.get('/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, 
          },
        });
        console.log(response.data.Id);
        return response.data.Id; 
      } catch (error) {
        console.error('無法取得使用者資訊', error);
        return null; // 錯誤時回傳 null
      }
    },

    // 提交表單
    async handleSubmit() {
      this.isSubmitting = true;
      console.log('提交的資料:', this.formData);
      try {
        if (this.isEditMode) {
          await axios.put(`/events/${this.eventId}`, this.formData);
          this.formStatus = { type: 'success', message: '活動更新成功！' };
        } else {
          await axios.post('/events', this.formData);
          this.formStatus = { type: 'success', message: '活動創建成功！' };
        }
        window.location.reload(); 
        this.resetForm();
      } catch (error) {
        console.error('提交活動資料失敗', error);
        console.error('錯誤詳細:', error.response?.data || '未知錯誤');
      } finally {
        this.isSubmitting = false;
        if (this.formStatus.type === 'success' && !this.isEditMode) {
          // Only close the modal if the submission was successful and it's not in edit mode
          this.showModal = false;
        }
      }
    }
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.event-form {
  width: 100%;
}

.event-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.create-event-btn {
  background-color: #007bff; /* 藍色背景 */
  color: white; /* 文字顏色為白色 */
  padding: 10px 20px; /* 內邊距 */
  border: none; /* 去除邊框 */
  border-radius: 8px; /* 圓角 */
  font-size: 16px; /* 文字大小 */
  cursor: pointer; /* 鼠標懸停時顯示為可點擊 */
  margin: 4px 0; /* 上下邊距為 4px */
  transition: background-color 0.3s ease; /* 背景顏色過渡效果 */
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

/* 將按鈕向左對齊並添加一些風格 */
.form-group button {
  width: auto; /* 使按鈕的寬度根據內容自適應 */
  padding: 10px 20px; /* 調整內邊距使按鈕更大 */
  margin-left: 0; /* 確保按鈕不被居中 */
  background-color: #007bff; /* 設置背景色 */
  color: white; /* 設置文字顏色 */
  border: none; /* 去掉邊框 */
  border-radius: 4px; /* 添加圓角效果 */
  font-size: 16px; /* 增加字體大小 */
  cursor: pointer; /* 設置鼠標指針 */
  transition: background-color 0.3s; /* 添加過渡效果 */
}

.form-group button:hover {
  background-color: #0056b3; /* 設置懸停時的背景色 */
}

.form-group button:disabled {
  background-color: #ddd; /* 禁用狀態下的背景色 */
  cursor: not-allowed; /* 禁用狀態下的指針樣式 */
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
