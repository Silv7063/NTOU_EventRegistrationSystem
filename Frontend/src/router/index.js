import { createRouter, createWebHistory } from 'vue-router';
import authenticationRoutes from './authenticationRoutes';
import eventRoutes from './eventRoutes';
import userRoutes from './userRoutes';

const routes = [
  ...authenticationRoutes.routes,
  ...eventRoutes.routes,
  ...userRoutes.routes
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

export default router;
