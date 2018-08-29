import Vue from 'vue';
import Router from 'vue-router';
import Crud from '@/components/Crud';
import Main from '@/components/Main';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/crud',
      name: 'Crud',
      component: Crud,
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
  ],
});
