<template>
  <div class="pagination">
    <button 
      :disabled="currentPage === 1" 
      class="pagination-btn"
      @click="goToPage(currentPage - 1)"
    >
      Prev
    </button>
    <span class="page-number">{{ currentPage }} / {{ totalPages }}</span>
    <button 
      :disabled="currentPage === totalPages" 
      class="pagination-btn"
      @click="goToPage(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>
  
  <script>
  export default {
    name: 'Pagination',
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      totalPages: {
        type: Number,
        required: true,
      },
    },
    methods: {
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.$emit('page-changed', page);  // 發出事件，讓父組件接收頁碼
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .pagination-btn {
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 14px;
    border-radius: 3px;
  }
  .pagination-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  .page-number {
    font-size: 14px;
  }
  </style>
  