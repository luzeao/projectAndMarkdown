
import Vue from 'vue'
import Vuex from 'vuex'


// 使用vuex插件
Vue.use(Vuex)

/* 
  mdA模块
    默认情况下,子模块中的state中的数据会对应模块名称,挂载到父模块(store)中
    getters,mutations,actions中的属性和方法会挂载到根store(取值直接从根store中取即可 -> 缺点:getters,mutations,actions全都挂载在根store,依存关系不明显)
*/
var mdA = {
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


var mdB = {
  /* 
    是否设置命名空间(默认为false 如果设置为true  state,getters,mutations,actions都会对应模块名称挂载到根store)
      模块划分的比较精准 -> 取值比较麻烦
  */
  namespaced: true,
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
    },
    // 当前模块 mdB => 访问根store中的数据
    lookBoth(state, getters, rootState) {
      return rootState.a + rootState.b
    },
    lookBothDouble(state, getters, rootState, rootGetters) {
      console.log('rootState', rootState);
      console.log('rootGetters', rootGetters);

      // 当前模块访问根store中的state和getters
      // console.log(rootState.a);
      // console.log(rootState.b);
      // console.log(rootGetters.doubleA);
      // console.log(rootGetters.doubleB);

      // 通过 rootState, rootGetters 访问其他模块(mdB -> 假装一下是其他模块)
      // console.log(rootState.mdB.user);
      // console.log(rootState.mdB.token);
      // console.log(rootGetters['mdB/isLogin']);
      // console.log(rootGetters['mdB/lookBoth']);

      // 通过根模块rootState, rootGetters 访问其他模块的子模块
      console.log(rootState.mdB.mdB_1.a1);
      console.log(rootState.mdB.mdB_1.b1);
      console.log(rootGetters['mdB/mdB_1/both_mdB_1']);


      return rootGetters.doubleA + rootGetters.doubleB
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
    // context => {commit,dispatch,state,getters,rootState,rootGetters}
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
    },
    addBoth(context, payload) {
      // context => {commit,dispatch,state,getters,rootState,rootGetters}
      // commit和dispatch可以对应名称调用当前模块的mutations和actions的方法
      // 也可以调用全局模块的方法(如果调用根模块需要添加第三参数root:true)
      // 也可以对应模块名称和方法 调用子模块的方法
      // 其他模块建议通过根模块访问
      var { commit } = context
      console.log('context', context);
      console.log('接收的参数', payload);
      // 访问当前模块
      commit('updateInfo',{user:"dd11111",token:"cccccccc"})
      // 调用全局的需要添加第三参数{root:true}  如果不加 {root:true} 默认是局部的
      commit('addA', payload, { root: true })
      commit('addB', null, { root: true })
    }
  },
  modules: {
    // mdA下的子模块 mdA_1
    mdB_1: {
      namespaced: true,
      state() {
        return {
          a1: 10,
          b1: 20
        }
      },
      getters: {
        both_mdB_1(state) {
          return state.a1 + state.b1
        }
      }
    }
  }
}


// 创建store实例
export default new Vuex.Store({
  state: {
    a: 1,
    b: 2
  },
  getters: {
    // state 形参 => 可以通过state获取state对象中的数据
    // getters 形参 => 可以通过getters获取getters对象中的数据 => 可以复用计算属性
    doubleA: function (state) {
      return state.a * 2
    },
    tripleA: function (state) {
      return state.a * 3
    },

    doubleB: function (state) {
      return state.b * 2
    },
    tripleB: function (state) {
      return state.b * 3
    },
    both(state) {
      return state.a + state.b
    },
    // doubleBoth => doubleA + doubleB(计算属性)
    doubleBoth(state, getters) {
      // return state.a * 2 + state.b * 2 => 比较low => 没有复用doubleA和B
      return getters.doubleA + getters.doubleB
    }
  },
  mutations: {
    // state 形参 => 可以通过state获取state对象中的数据
    // payload 载荷 => 在组件中调用方法时可以传递一些数据
    // 如何调用 => commit('updateA',10)
    addA: function (state) {
      state.a++
    },
    reduceA: function (state) {
      state.a--
    },
    updateA: function (state, payload) {
      state.a = payload
    },
    addB: function (state) {
      state.b++
    },
    reduceB: function (state) {
      state.b--
    },
    updateB: function (state, payload) {
      state.b = payload
    },
    // mutations中的方法中不能直接使用另一个方法 => 要在actions中实现
    // addBoth(state,payload,arg) {
    //   console.log(1111,state,payload,arg);
    // }
  },
  actions: {
    // actions用于存放异步操作 -> 在异步操作结束之后再调用mutations中的方法修改数据
    // context => 和store实例有相同属性和方法的新对象(和store不全等)
    // payload => actions中的方法被调用时,也可以接收参数

    // 简单写法 => 只知道启动异步操作 => 在异步操作结束之后再调用mutations中的方法修改数据(无法知道异步操作什么时候结束)
    addA_Async(context, payload) {
      console.log("context", context);
      console.log("payload", payload);
      // context => {state,getters,commit,dispatch}
      var { commit } = context
      setTimeout(() => {
        commit('addA', payload)
      }, 1000)
    },

    // promise写法 => 返回一个promise实例(pendding) => 在异步操作结束之后,再调用mutations中的方法修改数据(将promise的实例的状态改为fulfilled)
    addA_Async_Pro(context, payload) {
      return new Promise((resolve) => {
        console.log("context", context);
        console.log("payload", payload);
        var { commit } = context
        setTimeout(() => {
          commit('addA', payload)
          resolve(true)
        }, 1000)
      })
    },

    addB_Async(context, payload) {
      console.log("context", context);
      console.log("payload", payload);
      // context => {state,getters,commit,dispatch}
      var { commit } = context
      setTimeout(() => {
        commit('addB', payload)
      }, 1000)
    },

    addB_Async_Pro(context, payload) {
      return new Promise((resolve) => {
        console.log("context", context);
        console.log("payload", payload);
        var { commit } = context
        setTimeout(() => {
          commit('addB', payload)
          resolve(true)
        }, 1000)
      })
    },

    //actions中复用mutations中的多个方法 
    addBoth(context, payload) {
      console.log('参数', payload);
      var { commit } = context
      commit('addA', payload.a)
      commit('addB', payload.b)
    },

    //actions中复用actions中的多个方法 
    addBoth_Async(context, payload) {
      console.log('参数', payload);
      var { dispatch } = context
      dispatch('addA_Async', payload.a)
      dispatch('addB_Async', payload.b)
    },

    //actions中复用actions中的多个方法 promise版本
    async addBoth_Async_Pro(context, payload) {
      console.log('参数', payload);
      var { dispatch } = context
      await dispatch('addA_Async_Pro', payload.a)
      await dispatch('addB_Async_Pro', payload.b)
      alert('a和b更新完毕')
    }
  },
  modules: {
    // 键名是模块的名字,键值是模块的配置对象(子模块/store)
    mdA: mdA,
    mdB: mdB
  }
})
