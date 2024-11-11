import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/Home.vue';
import EventDetail from '../pages/EventDetail.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/event/:id', component: EventDetail },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
  ]
});
