export default {
  // state 形参,默认指向当前模块中的state对象
  // payload 形参, 调用此方法时,传入的数据 commit('updateInfo',{user,token})
  updateInfo(state, payload) {
    var { user, token } = payload
    if (user) state.user = user
    if (token) state.token = token
  }
}