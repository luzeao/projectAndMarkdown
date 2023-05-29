
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import mdA from './mdA'
import mdB from './mdB'

// 使用vuex插件
Vue.use(Vuex)

// 创建store实例
export default new Vuex.Store({
  state: {
    a: 1,
    b: 2
  },
  getters,
  mutations,
  actions,
  modules: {
    // 键名是模块的名字,键值是模块的配置对象(子模块/store)
    mdA: mdA,
    mdB: mdB
  }
})
