import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from "@/pages/login"
import editPassword from "@/pages/editPassword"
import infoTable from "@/pages/tablePage"
Vue.use(Router)

let router= new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/editPassword',
      name: 'editPassword',
      component: editPassword
    },
    {
      path: '/infoTable',
      name: 'infoTable',
      component: infoTable,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/infoTableApply',
      name: 'infoTable',
      component: infoTable,
      meta: {
        requireAuth: true
      },
    }
  ]
})
//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (sessionStorage.getItem('username')) {// 判断是否登录
      next()
    } else {// 没登录则跳转到登录界面
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next();
  }
})
export default router
