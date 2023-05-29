export default {
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
}