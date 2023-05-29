export default {
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
}