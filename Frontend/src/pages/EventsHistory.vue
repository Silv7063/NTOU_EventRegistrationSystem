<template>
    <div
      class="events-history"
      :style="{ backgroundColor: currentColor }"
    >
      <h1>活動歷史紀錄</h1>
      <p>
        這裡將顯示所有歷史活動的資訊。
      </p>
  
      <!-- 假設有個子元件 ActivitiesTable -->
      <ActivitiesTable :events="events" />
  
      <!-- 
        按鈕：按一次暫停、再按一次繼續變色。 
        按鈕文字根據 colorTimer 是否存在動態顯示。
      -->
      <button @click="toggleColorChange">
        {{ colorTimer ? '暫停變色' : '繼續變色' }}
      </button>
    </div>
  </template>
  
  <script>
  import ActivitiesTable from "../components/ActivitiesTable.vue";
  
  export default {
    name: "EventsHistory",
    components: {
      ActivitiesTable,
    },
    data() {
      return {
        currentColor: "#ffffff", // 預設背景白色
        colorTimer: null,        // 用來記錄 setInterval 的計時器 ID (若為 null，代表目前不在變色)
        events: [],
      };
    },
    mounted() {
      this.fetchEvents();
      // 進入此頁面後，每隔 0.5 秒隨機換一次背景顏色
      //this.startColorChange();
    },
    beforeUnmount() {
      // 離開頁面前，若計時器存在則清除
      if (this.colorTimer) {
        clearInterval(this.colorTimer);
      }
    },
    methods: {
      async fetchEvents() {
      try {
        const response = await this.$axios.get('/events/all');
        this.events = response.data;
      } catch (error) {
        console.error('API 錯誤:', error);
      } finally {
        this.loading = false;
      }
    },
      // 隨機更換背景顏色
      changeColor() {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        this.currentColor = randomColor;
      },
      // 開啟計時器
      startColorChange() {
        this.colorTimer = setInterval(this.changeColor, 500);
      },
      // 停止計時器
      stopColorChange() {
        clearInterval(this.colorTimer);
        this.colorTimer = null;
      },
      // 按鈕行為：若目前正在變色（colorTimer 不為 null），就停止；否則開始。
      toggleColorChange() {
        if (this.colorTimer) {
          this.stopColorChange();
        } else {
          this.startColorChange();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .events-history {
    min-height: 100vh; /* 全螢幕高度 */
    padding: 20px;
    color: #333; 
    transition: background-color 0.5s ease; 
    /* 加入 transition，可讓顏色在切換時稍微平滑 */
  }
  
  .events-history h1 {
    margin-bottom: 10px;
  }
  
  .events-history p {
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  button {
    margin-top: 20px;
    padding: 10px;
    cursor: pointer;
  }
  </style>
  