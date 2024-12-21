import { createApp } from 'vue';              // 引入 Vue 3 的 createApp 方法
import App from './App.vue';                  // 引入主組件
import router from './router';                // 引入路由配置
import store from './store';                  // 引入 Vuex 儲存
import './assets/styles/global.css';                 // 引入全局樣式
import axios from 'axios';


// 設定 axios 基本 URL，這裡可以根據你的後端 API 調整
axios.defaults.baseURL = 'http://localhost:4000'; // 或你後端的伺服器 URL
axios.defaults.headers['Content-Type'] = 'application/json'; // 設定請求的預設標頭

// 創建並掛載 Vue 應用
const app = createApp(App);

// 設置 Vuex 狀態管理
app.use(store);

// 設置 Vue Router 路由管理
app.use(router);

// 設置全局 HTTP 請求 (axios)
app.config.globalProperties.$axios = axios;
// 創建應用
app.mount('#app');
