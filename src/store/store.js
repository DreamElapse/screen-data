import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: '', //获取token
    memberId: ''
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload.token
      state.memberId = payload.memberId
      window.localStorage.setItem('token',payload.token)
      window.localStorage.setItem('memberId',payload.memberId)
    },
    LOGOUT(state, payload) {
       localStorage.setItem('token', '');
       localStorage.setItem('memberId', '');
      state.token = '';
      state.memberId = '';
    }
  },

})


export default store;
