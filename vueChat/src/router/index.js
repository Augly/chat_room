import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import chatRoom from '@/pages/chatRoom'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: '用户登录',
      component: index
    },
    {
      path: '/index',
      name: '聊天室',
      component: chatRoom
    }
  ]
})
