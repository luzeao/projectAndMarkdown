/* 
  mdA模块
    默认情况下,子模块中的state中的数据会对应模块名称,挂载到父模块(store)中
    getters,mutations,actions中的属性和方法会挂载到根store(取值直接从根store中取即可 -> 缺点:getters,mutations,actions全都挂载在根store,依存关系不明显)
*/
export default {
  // namespaced:false, // 默认的
  state: () => {
    return {
      user: 'a123123',
      token: 'aaaaaaaaa',
    }
  },
  getters: {
    // state 形参,默认指向当前模块中的state对象
    // getters 形参,默认指向当前模块中的getters对象
    isLogin(state, getters) {
      console.log(getters)
      return state.user && state.token ? true : false
    }
  },
  mutations: {
    // state 形参,默认指向当前模块中的state对象
    // payload 形参, 调用此方法时,传入的数据 commit('updateInfo',{user,token})
    updateInfo(state, payload) {
      var { user, token } = payload
      if (user) state.user = user

      if (token) state.token = token
    }
  },
  actions: {
    // 和当前module(子模块/store) 有相同的属性和方法的新对象
    loginAndUpdateInfo(context, payload) {

      var { commit } = context
      console.log('接收的参数', payload);

      return new Promise((resolve) => {

        setTimeout(() => {

          commit('updateInfo', {
            user: 'b123123',
            token: 'bbbbbbb'
          })
          resolve(true)

        }, 1000)
      })
    }
  },
  modules: {
    // mdA下的子模块 mdA_1
    mdA_1: {
      state() {
        return {
          a1: 10,
          b1: 20
        }
      },
      getters: {
        both_mdA_1(state) {
          return state.a1 + state.b1
        }
      }
    }
  }
}