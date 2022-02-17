/*
  神策数据埋点
*/
import Vue from 'vue'
import sensors from 'sa-sdk-javascript'
/* eslint-disable */
// 环境地址
sensors.init({
  sdk_url: 'https://cdn.jsdelivr.net/npm/sa-sdk-javascript@1.15.12/sensorsdata.min.js',
  heatmap_url: 'https://cdn.jsdelivr.net/npm/sa-sdk-javascript@1.15.12/heatmap.min.js',
  name: 'sensors',
  server_url: process.env.VUE_APP_SENSORS_URL,
  heatmap: {
    // 是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
    clickmap: 'default',
    show_log: true, // 打印console，自己配置，可以看到自己是否踩点成功，以及
    // 是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
    scroll_notice_map: 'default',
    element_selector:'not_use_id'
  },
  is_track_single_page: false,
  cross_subdomain: false,
  /* eslint-disable */
  collect_element: function (element_target) {
    // 如果这个元素有属性sensors-disable=true时候，不采集。
    if (element_target.getAttribute('sensors-disable') === 'true') {
      return false
    } else {
      return true
    }
  },
  // 此参数针对预置 $WebClick 事件（包括 quick('trackHeatMap') quick('trackAllHeatMap') 触发的）生效。
  custom_property: function (element_target) {
    // 比如您需要给有 data=test 属性的标签的点击事件增加自定义属性 name:'aa' ，则代码如下：
    if (element_target.getAttribute('data') === 'test') {
      return {
        name: 'aa'
      }
    }
  },
  collect_input: function (element_target) {
    // 例如如果元素的 id 是a，就采集这个元素里的内容。
    if (element_target.id === 'a') {
      return true
    }
  },
  element_selector: 'not_use_id',
  renderRefreshTime: 1000,
  app_js_bridge:true,
})
// const startTime = new Date()
// let endTime = ''
Vue.nextTick(() => {
  // window.onload = function () {
  //   endTime = new Date()
  //   sensors.track('loadingTime', { // 神策页面加载时间事件埋点
  //     loadTime: endTime.getTime() - startTime.getTime() // 页面加载时间
  //   })
  // }
  // sensors.login('356063285')
  // 另外，如果想加额外的属性，可以如下方式（添加 platform 属性为 h5）
  // sensors.quick('autoTrack', {
  //   platform: 'h5'
  // })
  const memberId = localStorage.getItem('memberId')
  sensors.identify(memberId, true)
  sensors.logout(true)
  // 注册公共属性
  sensors.registerPage({
    current_url: location.href,
    referrer: document.referrer
  })
})
