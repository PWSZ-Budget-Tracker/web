import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Logged from '../views/Logged.vue';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import Table from '../components/Table.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: Table
  },
  {
    path: '/goal',
    name: 'Goal',
    component: Table
  },
  {
    path: '/income',
    name: 'Income',
    component: Table
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