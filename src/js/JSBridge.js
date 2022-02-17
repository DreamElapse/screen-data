import Vue from 'vue'
const isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1
const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

// 这是必须要写的，用来创建一些设置
function setupWebViewJavascriptBridge (callback) {
  // Android使用
  if (isAndroid) {
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        () => {
          callback(window.WebViewJavascriptBridge)
        },
        false
      )
    }
    localStorage.phoneType = 'android'
  }

  // iOS使用
  if (isiOS) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
    localStorage.phoneType = 'ios'
  }
}
// 注册回调函数，第一次连接时调用 初始化函数(android需要初始化,ios不用)
setupWebViewJavascriptBridge((bridge) => {
  if (isAndroid) {
    // 初始化
    bridge.init((message, responseCallback) => {
      var data = {
        'Javascript Responds': 'Wee!'
      }
      responseCallback(data)
    })
  }
})
function callAppLogin (params = '') {
  return new Promise((resolve, reject) => {
    this.callHandler('callAppLogin', params, (response) => {
      if (!response) {
        reject()
        return
      }
      const user = JSON.parse(response)
      console.log('callAppLogin', response)
      if (user.token) {
        Vue.prototype.$store.commit('SET_TOKEN',user)
        resolve({ token: user.token, memberId: user.memberId })
      } else {
        console.log('reject')
        reject()
      }
    })
  })
}
//1.5.0新增分享方法
function nativeShare_new (title, type, desc, link, imgUrl,dataType) {  //dataType1:纯图片 2:图片、标题、链接 3：文本标题
  return new Promise((resolve, reject) => {
    this.callHandler('callAppShareAction', {
      type: type,
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link,
      dataType:dataType,
      imgUrl: imgUrl // 分享图标
    }, (response) => {
      if (!response) {
        reject()
      }
    })
  })
}
function callAppImmediately (params = '') {
  return new Promise((resolve, reject) => {
    this.callHandler('callAppImmediately', params, (response) => {
      if (!response) {
        reject()
      }else{
        reject()
      }
    })
  })
}

export default {
  // js调APP方法 （参数分别为:app提供的方法名  传给app的数据  回调）
  nativeShare_new,
  callAppLogin,
  callAppImmediately,
  callHandler (name, data, callback) {
    setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler(name, data, callback)
    })
  },
  // APP调js方法 （参数分别为:js提供的方法名  回调）
  registerHandler (name, callback) {
    setupWebViewJavascriptBridge((bridge) => {
      bridge.registerHandler(name, (data, responseCallback) => {
        callback(data, responseCallback)
      })
    })
  }
}
