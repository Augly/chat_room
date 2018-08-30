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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
