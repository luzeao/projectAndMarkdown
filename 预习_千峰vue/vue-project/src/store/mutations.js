
import { UPDATE_AUTHORITY_INFO, AUTHORITY_INIT_VALUE } from './types'


export default {
  // 更新认证信息 , 登陆成功后更新vuex中的信息
  // updataAuthorityInfo(state, payload) {
  //   // payload 登陆成功后传递的数据
  //   // 无脑添加,不管原来有没有这个属性(会出现冗余数据)
  //   // for (var k in payload) {
  //   //   state[k] = payload[k]
  //   // }

  //   for (var k in payload) {
  //     // 检测state中是否有这个键名,有的话才会添加
  //     if (Object.keys(state).includes(k)) state[k] = payload[k]
  //   }
  // }

  // [UPDATE_AUTHORITY_INFO](state, payload) {
  //   for (var k in payload) {
  //     // 检测state中是否有这个键名,有的话才会添加
  //     if (Object.keys(state).includes(k)) state[k] = payload[k]
  //   }
  // }

  // AUTHORITY_INIT_VALUE 初始值中有的才能修改
  [UPDATE_AUTHORITY_INFO](state, payload) {
    for (var k in payload) {
      // 检测state中是否有这个键名,有的话才会添加
      if (Object.keys(AUTHORITY_INIT_VALUE).includes(k)) state[k] = payload[k]
    }
  }
}