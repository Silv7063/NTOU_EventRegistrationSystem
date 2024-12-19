<template>
  <div
    v-if="isVisible"
    class="modal-overlay"
    @click.self="close"
  >
    <div class="modal-content">
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
      <div class="modal-actions">
        <button
          class="btn-confirm"
          @click="onConfirm"
        >
          確定
        </button>
        <button
          class="btn-cancel"
          @click="onCancel"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        default: '確認',
      },
      content: {
        type: String,
        default: '您確定要執行此操作嗎？',
      },
      visible: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      isVisible() {
        return this.visible;
      }
    },
    methods: {
      close() {
        this.$emit('update:visible', false); // 關閉 Modal
      },
      onConfirm() {
        this.$emit('confirm'); // 確認按鈕
        this.close();
      },
      onCancel() {
        this.$emit('cancel'); // 取消按鈕
        this.close();
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    width: 300px;
    text-align: center;
  }
  
  .modal-actions {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
  }
  
  .btn-confirm,
  .btn-cancel {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-confirm {
    background-color: #007bff;
    color: white;
  }
  
  .btn-cancel {
    background-color: #ccc;
  }
  
  .btn-confirm:hover {
    background-color: #0056b3;
  }
  
  .btn-cancel:hover {
    background-color: #aaa;
  }
  </style>
  