import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// const VueRouterPush = Router.prototype.push
// Router.prototype.push= function push(to){
//   return VueRouterPush.call(this,to).catch(err=>err)
// }

const router = new Router({
  routes: [
    { // 没匹配到，就引导到主页
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      meta:{
          title:'高旅数字餐饮ERP数据大屏'
      },
      component: () => import('@/views/login'),
    },
    {
      path: '/home',
      name: 'home',
      meta:{
        title:'高旅数字餐饮ERP数据大屏'
      },
      component: () => import('@/views/home'),
    },
    {
      path: '/center',
      name: 'center',
      meta:{
        title:'高旅数字餐饮ERP数据大屏'
      },
      component: () => import('@/views/center/nc.vue'),
    },
    // {
    //   path: '/MainPage',
    //   name: 'MainPage',
    //   meta:{
    //       title:'广州局数据大屏'
    //   },
    //   component: () => import('@/views/gz'),
    // }
  ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

router.beforeEach((routeTo, routeFrom, next) => {
  if(routeTo.name === 'login') {
    let token = sessionStorage.getItem('Token')
    if(token) {
      next('/home')
    }
  }
  next()
  
})

export default router
