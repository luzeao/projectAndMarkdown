import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"


export default {
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
    getters: getters,
    mutations: mutations,
    actions: actions,
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