<template>
  <div
    v-if="visible"
    :class="['notification', notificationType]"
    @click="closeNotification"
  >
    <span class="notification-message">{{ message }}</span>
    <button
      class="close-btn"
      @click="closeNotification"
    >
      ×
    </button>
  </div>
</template>
  
  <script>
  export default {
    name: 'Notification',
    props: {
      message: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'success',  // 可選 'success', 'error', 'warning'
      },
      duration: {
        type: Number,
        default: 3000,  // 預設通知顯示 3 秒
      },
    },
    data() {
      return {
        visible: true,
      };
    },
    computed: {
      notificationType() {
        return `notification-${this.type}`;
      },
    },
    mounted() {
      setTimeout(this.closeNotification, this.duration);  // 3秒後自動關閉通知
    },
    methods: {
      closeNotification() {
        this.visible = false;
        this.$emit('closed');  // 通知關閉時發出事件
      },
    },
  };
  </script>
  
  <style scoped>
  .notification {
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 300px;
  }
  .notification-success {
    background-color: #4caf50;
    color: white;
  }
  .notification-error {
    background-color: #f44336;
    color: white;
  }
  .notification-warning {
    background-color: #ff9800;
    color: white;
  }
  .notification-message {
    flex-grow: 1;
  }
  .close-btn {
    background: transparent;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }
  </style>
  