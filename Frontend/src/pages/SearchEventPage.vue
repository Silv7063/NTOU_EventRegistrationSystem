<template>
    <div class="search-events">
      <header class="header"> 
        <h1>查詢活動</h1>
      </header>  
      <input
        v-model="keyword"
        type="text"
        placeholder="輸入關鍵字查詢活動"
        @keyup.enter="searchEvents"
      />
      <button @click="searchEvents">搜尋</button>
  
      <div v-if="loading" class="loading">查詢中...</div>
      <div v-if="error" class="error">{{ error }}</div>
  
      <div v-if="events.length > 0" class="results">
        <h2>查詢結果</h2>
        <div v-for="event in events" :key="event._id" class="activity-list">
          <ActivityCard :event="event" />
        </div>
      </div>
  
      <div v-if="!loading && !error && events.length === 0" class="no-results">
        尚無符合的活動。
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import ActivityCard from "@/components/ActivityCard.vue"; // Adjust path if necessary
  
  export default {
    components: {
      ActivityCard,
    },
    data() {
      return {
        keyword: "",
        events: [],
        loading: false,
        error: null,
      };
    },
    methods: {
      async searchEvents() {
        if (!this.keyword.trim()) {
          this.error = "請輸入關鍵字";
          return;
        }
  
        this.loading = true;
        this.error = null;
        this.events = [];
  
        try {
          const response = await axios.get("/events/search/events", {
            params: { keyword: this.keyword },
          });
          this.events = response.data;
        } catch (err) {
          this.error = err.response?.data?.msg || "查詢失敗";
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .search-events {
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    background-image: url('@/assets/banner-background.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
  }
  .header {
    text-align: center;
    margin-bottom: 20px;
  }
  input {
    width: 80%;
    padding: 10px;
    margin-bottom: 10px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  .loading {
    color: #007bff;
  }

  .error {
    color: red;
  }

  .results {
    display: grid;
    grid-template-columns: 1fr;  /* 每行顯示一個活動 */
    gap: 20px;
    justify-content: center;  /* 居中顯示卡片 */
  }

  .no-results {
    color: #777;
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  </style>
  