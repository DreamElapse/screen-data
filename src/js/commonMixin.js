
export const commonMixin = {
  computed: {
  },
  data() {
    return {}
  },
  methods: {
    // h5 返回
    callAppBack(callback) {
      this.$bridge.registerHandler('callAppBackRefresh', (data) => {
        callback(data)
      })
    },
    // 发消息
    callH5Title(title) {
      this.$bridge.callHandler('callH5Title', title, (response) => {
        console.log('获取app响应数据11111:', response)
      })
    },
    //跳转新的webview
    callAppPushNewWebVC(callUrl){
      this.$bridge.callHandler('callAppPushNewWebVC', callUrl, (response) => {
        console.log('获取app响应数据11111:', response)
      })
    },
    // 获取app的devicedId
    callAppDeviceId (cb) {
      this.$bridge.callHandler('callAppDeviceId', null, (response) => {
        console.log('callAppDeviceId:', response)
        cb(response)
      })
    },
    getImageUrl(url) {
      return process.env.VUE_APP_IMG_URL + url;
    }

  }
};
