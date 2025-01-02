<template>
  <div>
    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button type="button" class="close-btn" @click="closeModal">&times;</button>
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
                v-model.number="formData.participantLimit"
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
      required: false, // 當不傳入 event 時，會以創建模式運行
    },
    eventId: {
      type: String,
      required: true
    },
    showModal: {
      type: Boolean,
      required: true
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
        participantLimit: 0,
        creator: '',
      },
      formStatus: null, // 表單狀態訊息
    };
  },
  watch: {
    showModal(newValue) {
    console.log(newValue);
    if (newValue) {
      this.loadEventDataIfNeeded();
    } else {
      this.resetForm();
    }
  },
    event(newEvent) {
      if (newEvent && newEvent.id) {
        this.isEditMode = true;
        this.loadEventData(newEvent.id);
      }
    },
  },
  created() {
    if (this.event && this.event._id) {
    this.isEditMode = true;
    this.loadEventData(this.event._id);
  } else {
    this.isEditMode = false; 
    this.initializeCreator();
  }
  },
  methods: {
    async loadEventDataIfNeeded() {
      if (this.isEditMode && this.eventId) {
        await this.loadEventData(this.eventId);
      }
    },
    // 載入事件資料
    async loadEventData(eventId) {
      try {
        const response = await axios.get(`/events/${eventId}`);
        this.formData = { ...response.data };
        if (this.formData.date) {
          this.formData.date = new Date(this.formData.date).toISOString().slice(0, 16);
        }
        if (!this.formData.creator) {
          this.formData.creator = await this.getUserId();
        }
      } catch (error) {
        console.error('無法載入活動資料', error);
      }
    },
    // 初始化創建者 ID
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
        return response.data._id;
      } catch (error) {
        console.error('無法取得使用者資訊', error);
        return null;
      }
    },
    
    // 提交表單
    async handleSubmit() {
      this.isSubmitting = true;
      try {
        if (this.isEditMode) {
          await axios.put(`/events/${this.eventId}`, this.formData);
          this.formStatus = { type: 'success', message: '活動更新成功！' };
          this.$emit('event-updated');
        } else {
          await axios.post('/events', this.formData);
          this.formStatus = { type: 'success', message: '活動創建成功！' };
          this.$emit('event-created'); 
        }
        this.resetForm();  // 清空表單
        window.location.reload();  // 重新載入頁面（可選，根據需求）
      } catch (error) {
        console.error('提交活動資料失敗', error);
        this.formStatus = { type: 'error', message: '提交活動資料失敗' };  // 設置錯誤訊息
      } finally {
        this.isSubmitting = false;
        // 確保在處理成功時才關閉模態框
        if (this.formStatus && this.formStatus.type === 'success' && !this.isEditMode) {
          this.closeModal();
        }
      }
    },
    // 關閉模態框
    closeModal() {
      this.$emit('update:showModal', false);
    },
    // 重置表單資料
    resetForm() {
      this.formData = {
        title: '',
        description: '',
        date: '',
        location: '',
        participantLimit: 0,
        creator: '',
      };
      this.isEditMode = false;
    },
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
.close-btn {
  position: absolute;
  top: 20px;
  right: 450px;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
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
