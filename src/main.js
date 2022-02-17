//import '@babel/polyfill'
import Vue from 'vue'
import store from '@/store/store'
import router from '@/router/router'
// import '@/js/sensorsdata'
import App from './App.vue'
import appConfig from '@/js/base.js';
import vSelect from "vue-select";
import * as echarts from 'echarts';
import 'echarts-liquidfill'
Vue.component("v-select", vSelect);
Vue.prototype.appConfig=appConfig;
import { axios, get, post } from "@/js/http";

// 全局守卫
router.beforeEach((to, from, next) => {
  // 设置标题
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()

})
import {
  Calendar,
  Checkbox,
  CheckboxGroup,
  Tab,
  Tabs,
  IndexBar,
  IndexAnchor,
  ActionSheet,
  Cell,
  Search,
  ShareSheet,
  Swipe,
  SwipeItem,
  Loading,
  Toast,
  CountDown,
  Icon 
} from 'vant';

Vue.use(Calendar)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Tab)
    .use(Tabs)
    .use(IndexBar)
    .use(IndexAnchor)
    .use(ActionSheet)
    .use(Cell)
    .use(Search)
    .use(Swipe)
    .use(SwipeItem)
    .use(ShareSheet)
    .use(Loading)
    .use(Toast)
    .use(CountDown)
    .use(Icon)
Vue.prototype.$axios = axios;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$store=store;
Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
