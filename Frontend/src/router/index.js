import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'vuex'; // 假設使用 Vuex 來管理認證狀態
import Home from '../pages/HomePage.vue';
import Event from '../pages/EventsPage.vue';
import Login from '../pages/LoginPage.vue';
import Register from '../pages/RegisterPage.vue';
import UserDashboard from '../pages/UserDashboard.vue';
import Search from '../pages/SearchEventPage.vue';

const routes = [
  // 公共路由
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/events',
    name: 'Search',
    component: Search,
    props: true,
  },
  {
    path: '/get/:eventId',
    name: 'Event',
    component: Event,
    props: true,
  },
  // 認證相關路由
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  // 使用者專區路由 (需要認證)
  {
    path: '/user/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true }, // 保護這個路由，要求使用者已經登入
  },
  // 404 路由
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// 登入驗證導航守衛
router.beforeEach((to, from, next) => {
  const store = useStore(); // 使用 Vuex 來取得認證狀態
  const isAuthenticated = store.state.isAuthenticated; // 根據你的 store 結構來調整

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' }); // 如果需要登入才能訪問此頁，且尚未登入，跳轉到登入頁
  } else {
    next(); // 如果已登入或路由不需要認證，繼續導航
  }
});

export default router;
