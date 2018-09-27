import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
  state: {
    rcloud_userId: null
  },
  mutations: {
    get_rcloud_userId(state, payload) {
      state.rcloud_userId = payload.userid
    }
  }
})
