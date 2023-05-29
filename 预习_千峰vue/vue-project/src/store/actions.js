

import { adminLoginAPI } from "@/api/admin"

import { UPDATE_AUTHORITY_INFO, AUTHORITY_INIT_VALUE } from "./types"

export default {
  // 登录更新认证信息
  // loginAndUpdateAuthorityInfo({ commit }, payload) {
  //   // commit 触发 mutations中对应名称的方法
  //   // payload 携带的数据(登录相关{adminname,password})
  //   return adminLoginAPI(payload).then(res => {
  //     var data = res.data
  //     commit('updataAuthorityInfo', data)
  //     return data
  //   })
  // }
  getAuthorityInfo({ commit }) {  // actions方法会根据返回值生成一个promise实例(默认fulfilled)
    var str = localStorage.getItem('Authority', JSON.stringify(data))
    if (str) {
      var data = JSON.parse(str)
      commit(UPDATE_AUTHORITY_INFO, data)
      return data
    } else {
      return ''
    }
  },

  loginAndUpdateAuthorityInfo({ commit }, payload) {
    // commit 触发 mutations中对应名称的方法
    // payload 携带的数据(登录相关{adminname,password})
    return adminLoginAPI(payload).then(res => {
      var data = res.data
      commit(UPDATE_AUTHORITY_INFO, data)

      // 登陆成功之后将数据存储到localStorage中
      localStorage.setItem('Authority', JSON.stringify(data))

      return data
    })
  },
  exitAuthorityInfo({ commit }) {
    // 删除本地数据
    localStorage.removeItem('Authority')
    // 清除vuex中登录相关的数据
    commit(UPDATE_AUTHORITY_INFO, AUTHORITY_INIT_VALUE)
  }
}