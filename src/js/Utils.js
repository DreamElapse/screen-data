import wx from 'weixin-js-sdk'
import { axios } from "@/js/http";
function getUserEnv() {
  const ua = navigator.userAgent.toLowerCase();
  const url = window.location.href;
  if (ua.indexOf('micromessenger') > -1) {
    return 'weChat';
  }

  if (ua.indexOf('gaolvapp') > -1) {
    return 'app'
  }

  return 'Browser';
}

function GetUrlParam(paraName) {
  var url = document.location.toString();
  var arrObj = url.split("?");

  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split("&");
    var arr;
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");

      if (arr != null && arr[0] == paraName) {
        return arr[1];
      }
    }
    return "";
  } else {
    return "";
  }
}

function weChat(params = {}) {
  if (this.getUserEnv() === 'weChat') {
    let url = `${process.env.VUE_APP_CHAT_URL}/share/wechat/config`;
    let signUrl = location.href.split("#")[0];
    let form = new FormData();
    form.append("signUrl", signUrl);
    //let imgUrl = 'https://img.gaolvzongheng.com/gl_activity/23/1403ddf6620241f0a7deee9d49495583_!!23.png'
    let { title, desc, imgUrl } = params
    axios.post(url, form)
      .then(res => {
        wx.config({
          debug: false,
          appId: res.appid,
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: [
            "onMenuShareAppMessage",
            "onMenuShareTimeline",
            "updateAppMessageShareData", // 分享给朋友
            "updateTimelineShareData", // 分享到朋友圈
            "showMenuItems" // 界面显示
          ]
        });
        wx.ready(function () {
          // const link = `${process.env.VUE_APP_LINKS}/gf-h5-mall/#/new-user`;
          const link = window.location.href;
          console.log('1121212212', link)
          // const title = `异业活动`;
          // const desc = "【高旅纵横】惊喜福利来袭，购票立享优惠！";

          wx.updateAppMessageShareData({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link,
            imgUrl: imgUrl, // 分享图标
            success: function () { }
          });
          wx.updateTimelineShareData({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link,
            imgUrl: imgUrl, // 分享图标
            success: function () { }
          });
        });
      })
      .catch(err => {
        console.log(err)
      });
  }
}

export default {
  getUserEnv,
  GetUrlParam,
  weChat
}
