import { createRouter, createWebHistory } from 'vue-router';
import UserDashboard from '../pages/UserDashboard.vue';

const routes = [
  {
    path: '/user/dashboard',
    name: 'UserDashboard',
    component: UserDashboard
  }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

export default router;
