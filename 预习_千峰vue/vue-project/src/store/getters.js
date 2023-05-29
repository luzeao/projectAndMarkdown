

export default {
  isLogin(state) {
    return !!(state.adminname && state.token && state.role)
  }
}