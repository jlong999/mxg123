import Vue from "vue";
import Router from "vue-router";
// import Login from "./views/login/index.vue";
import Login from "./views/login";
import Layout from "@/components/Layout.vue";
import Home from "@/views/home";
import Menber from "@/views/menber";
import Goods from "@/views/goods";
import Staff from "@/views/staff";
import Supplier from "@/views/supplier";
import Chaoji from "@/views/chaoji";

Vue.use(Router);

export default new Router({
  routes: [

    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home,
          meta: { title: '首页' }
        }
        ,
        {
          path: '/menber',
          component: Menber,
          meta: { title: '会员管理' }
        }
        ,
        {
          path: '/goods',
          component: Goods,
          meta: { title: '商品管理' }
        },
        {
          path: '/staff',
          component: Staff,
          meta: { title: '员工管理' }
        },
        {
          path: '/supplier',
          component: Supplier,
          meta: { title: '商品供应管理' }
        },
        {
          path: '/chaoji',
          component: Chaoji,
          meta: { title: '超级会员' }
        }
      ]
    }
    // ,
    // {
    //   path:'/menber',
    //   component:Layout,
    //   children: [
    //     {
    //       path: '/',
    //       component:Menber,
    //     }
    //   ]
    // }
  ]
});
