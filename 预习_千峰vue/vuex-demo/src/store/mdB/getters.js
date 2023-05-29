export default {
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
}