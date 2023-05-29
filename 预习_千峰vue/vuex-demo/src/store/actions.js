export default {

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

}