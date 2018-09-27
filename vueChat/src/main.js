// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import {
  Loading,
  Message
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import qs from 'qs'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: 'http://jkytest.oss-cn-beijing.aliyuncs.com/staticimg/break_img.png',
  loading: 'http://jkytest.oss-cn-beijing.aliyuncs.com/staticimg/loading_circle.png',
  attempt: 1,
  throttleWait: 500
})
let loadinginstace = null
Vue.prototype.$api = 'http://39.105.24.238:8080/zp'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  loadinginstace = Loading.service({
    fullscreen: true,
    lock: true,
    text: '数据加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.8)'
  })
  // loadinginstace.close()
  return config;
}, (error) => {
  console.log(error)
  loadinginstace.close()
  Message.error({
    message: '加载超时'
  })
  // 对请求错误做些什么
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  setTimeout(function () {
    loadinginstace.close()
  }, 500)
  console.log(response.data.code)
  if (response.data.msg == 'success') {
    Message.success({
      message: '数据获取成功'
    })
  } else {
    Message.warning({
      message: response.data.msg
    })
  }
  return response;
}, function (error) {
  console.log(error)
  Message.error({
    message: '服务器连接异常，3秒后返回登录页'
  })
  setTimeout(function () {
    loadinginstace.close()
    window.location.href = './index.html#/'
  }, 3000)
  // 对响应错误做点什么
  return Promise.reject(error);
});
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$ajax = axios
Vue.prototype.qs = qs
import store from './store'

// RongIMClient.setConnectionStatusListener({
//   onChanged: function (status) {
//     switch (status) {
//       case RongIMLib.ConnectionStatus.CONNECTED:
//         console.log('链接成功');
//         break;
//       case RongIMLib.ConnectionStatus.CONNECTING:
//         console.log('正在链接');
//         break;
//       case RongIMLib.ConnectionStatus.DISCONNECTED:
//         console.log('断开连接');
//         break;
//       case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
//         console.log('其他设备登录');
//         break;
//       case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
//         console.log('域名不正确');
//         break;
//       case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
//         console.log('网络不可用');
//         break;
//     }
//   }
// });
// // 消息监听器
// RongIMClient.setOnReceiveMessageListener({
//   // 接收到的消息
//   onReceived: function (message) {
//     // 判断消息类型
//     console.log(message)
//     switch (message.messageType) {
//       case RongIMClient.MessageType.TextMessage:
//         // message.content.content => 消息内容
//         break;
//       case RongIMClient.MessageType.VoiceMessage:
//         // 对声音进行预加载                
//         // message.content.content 格式为 AMR 格式的 base64 码
//         break;
//       case RongIMClient.MessageType.ImageMessage:
//         // message.content.content => 图片缩略图 base64。
//         // message.content.imageUri => 原图 URL。
//         break;
//       case RongIMClient.MessageType.DiscussionNotificationMessage:
//         // message.content.extension => 讨论组中的人员。
//         break;
//       case RongIMClient.MessageType.LocationMessage:
//         // message.content.latiude => 纬度。
//         // message.content.longitude => 经度。
//         // message.content.content => 位置图片 base64。
//         break;
//       case RongIMClient.MessageType.RichContentMessage:
//         // message.content.content => 文本消息内容。
//         // message.content.imageUri => 图片 base64。
//         // message.content.url => 原图 URL。
//         break;
//       case RongIMClient.MessageType.InformationNotificationMessage:
//         // do something...
//         break;
//       case RongIMClient.MessageType.ContactNotificationMessage:
//         // do something...
//         break;
//       case RongIMClient.MessageType.ProfileNotificationMessage:
//         // do something...
//         break;
//       case RongIMClient.MessageType.CommandNotificationMessage:
//         // do something...
//         break;
//       case RongIMClient.MessageType.CommandMessage:
//         // do something...
//         break;
//       case RongIMClient.MessageType.UnknownMessage:
//         // do something...
//         break;
//       default:
//         // do something...
//     }
//   }
// });
// RongIMClient.connect(token, {
//   onSuccess: function (userId) {
//     console.log("Connect successfully." + userId);
//     store.commit({
//       type: 'get_rcloud_userId',
//       userid: userId
//     })
//     var callback = {
//       onSuccess: function (userId) {
//         console.log("Reconnect successfully." + userId);
//         // localStorage.setItem['ry_userId'] = userId

//       },
//       onTokenIncorrect: function () {
//         console.log('token效');
//       },
//       onError: function (errorCode) {
//         console.log(errorcode);
//       }
//     };
//     var config = {
//       // 默认 false, true 启用自动重连，启用则为必选参数
//       auto: true,
//       // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
//       url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js',
//       // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
//       rate: [100, 1000, 3000, 6000, 10000]
//     };
//     RongIMClient.reconnect(callback, config);
//     // RongIMClient.getInstance().getConversationList({
//     //   onSuccess: function (list) {
//     //     console.log(list)
//     //     list = list
//     //     // list => 会话列表集合。
//     //   },
//     //   onError: function (error) {
//     //     // do something...
//     //   }
//     // }, null);
//   },
//   onTokenIncorrect: function () {
//     console.log('token无效');
//   },
//   onError: function (errorCode) {
//     var info = '';
//     switch (errorCode) {
//       case RongIMLib.ErrorCode.TIMEOUT:
//         info = '超时';
//         break;
//       case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
//         info = '不可接受的协议版本';
//         break;
//       case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
//         info = 'appkey不正确';
//         break;
//       case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
//         info = '服务器不可用';
//         break;
//     }
//     console.log(errorCode);
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
