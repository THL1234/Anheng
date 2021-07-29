import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/Login.vue'
import all from '../components/All.vue'
import NotFound from '../view/Error.vue'
import tabledata from '../components/Table.vue'
import dataAnalysis from '../components/DataAnalysis.vue'
Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        isRequired: false
      }
    },
   {
      path: '/all',
      name: 'all',
      component: all,
      children:[
        {
          path:'/all/table',
          name:'table',
          component:tabledata
        },
        {
          path:'/all/dataAnalysis',
          name:'dataAnalysis',
          component:dataAnalysis
        },
        {
          path:'/all',
          redirect:'/all/table'
        },
      ],
    },
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'*',
      component:NotFound
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('token');
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router;









