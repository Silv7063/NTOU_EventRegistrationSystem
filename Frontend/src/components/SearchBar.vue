<template>
  <div class="search-bar">
    <input 
      v-model="query" 
      type="text" 
      placeholder="搜尋活動..." 
      class="search-input" 
      @input="onSearch"
    >
    <button
      class="search-button"
      @click="onSearch"
    >
      搜尋
    </button>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        query: '',
      };
    },
    methods: {
      // 發送搜尋請求的回調
      onSearch() {
        if (this.query.trim() !== '') {
          this.$emit('search', this.query); // 發射搜尋事件，並將搜尋關鍵字傳遞給父元件
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .search-input {
    padding: 0.5rem;
    font-size: 1rem;
    margin-right: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .search-button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .search-button:hover {
    background-color: #0056b3;
  }
  </style>
  