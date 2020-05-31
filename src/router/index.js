import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '../views/About.vue';
import Logged from '../views/Logged.vue';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import Economics from '../components/Economics.vue';
import Goal from '../components/Goal.vue';
import Calendar from '../components/Calendar.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Logged',
    component: Logged
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: Economics
  },
  {
    path: '/goal',
    name: 'Goal',
    component: Goal
  },
  {
    path: '/income',
    name: 'Income',
    component: Economics
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    name: 'Logged',
    component: Logged
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;