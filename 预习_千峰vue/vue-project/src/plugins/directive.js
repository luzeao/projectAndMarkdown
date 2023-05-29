
import Vue from "vue"
import store from "@/store";

// v-authority
// v-authority参数: remove(删除元素) disabled(禁用元素)
// v-authority修饰符: SuperAdmin(超级管理员)  admin(管理员) normal(普通用户)
// v-authority:remove.superAdmin => 如果不是超级管理员 就删除
// v-authority:disabled.superAdmin => 如果不是超级管理员 就禁用元素
Vue.directive('authority', async function (el, binding) {
  // console.log('el', el);
  // console.log('binding', binding);

  let { role } = store.state
  let { arg, modifiers: { superAdmin, admin, normal } } = binding

  await Vue.nextTick() // 等视图更新完毕 => 直接指令执行时,组件可能还没有挂载

  // console.log(superAdmin && role != 1);
  if (superAdmin && role != 1) {  // 要求是超级管理员,不是超级管理员=> 就执行操作
    switch (arg) {
      case 'remove':
        el.remove();
        break;
      case 'disabled':
        el.dosabled = true;
        el.classList.add('is-disabled')
        break;
    }
  } else if (admin && role != 1 && role != 2) { // 要求是管理员,不是管理员=> 就执行操作
    switch (arg) {
      case 'remove':
        el.remove();
        break;
      case 'disabled':
        el.dosabled = true;
        el.classList.add('is-disabled')
        break;
    }
  } 

})