import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { AUTHORITY_INIT_VALUE } from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...JSON.parse(JSON.stringify(AUTHORITY_INIT_VALUE))  // ...是浅拷贝,后期赋值可能会影响checkedkeys,要改成深拷贝
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
  }
})
