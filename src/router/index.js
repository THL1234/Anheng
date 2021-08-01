import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/Login.vue'
import all from '../components/All.vue'
import NotFound from '../view/Error.vue'
import tabledata from '../components/Table.vue'
import dataAnalysis from '../components/DataAnalysis.vue'
import alldata from '../view/Alldata.vue'
import persondata from '../view/PersonData.vue'
import demand from '../components/Demand.vue'
import sanfang from '../view/Sanfang.vue'
import dandian from '../components/Dandian.vue'
import guiji from '../components/GuiJi.vue'
Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path:'/sanfang',
      name:'sanfang',
      component:sanfang
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
          path:'/all/alldata',
          name:'alldata',
          component:alldata
        },
        {
          path:'/all/persondata',
          name:'persondata',
          component:persondata
        },
        {
          path:'/all/demand',
          name:'demand',
          component:demand
        },
        {
          path:'/all/dandian',
          name:dandian,
          component:dandian
        },{
          path:'/all/guiji',
          name:guiji,
          component:guiji
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
  } else if(to.path==='/sanfang'){
     next();
  } else{
    let token = localStorage.getItem('token');
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router;









