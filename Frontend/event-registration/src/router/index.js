// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/HomePage.vue';
import EventDetail from '../pages/EventDetail.vue';
import Login from '../pages/LoginPage.vue';
import Register from '../pages/RegisterPage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/event/:id', component: EventDetail },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
