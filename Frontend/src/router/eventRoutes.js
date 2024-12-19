import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/HomePage.vue';
import ActivityDetail from '../pages/ActivityDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/activity/:id',
    name: 'ActivityDetail',
    component: ActivityDetail,
    props: true  // 可以直接將活動 ID 傳遞給組件
  }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

export default router;
