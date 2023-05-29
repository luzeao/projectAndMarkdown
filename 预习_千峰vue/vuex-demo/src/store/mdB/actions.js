export default {
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
}