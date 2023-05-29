<template>
  <div>
    <h3>vue-router</h3>
  </div>
</template>

<script setup>

// import TheWelcome from '../components/TheWelcome.vue'

// 组件内路由守卫 => 组合式
// import { onBeforeRouteLeave,onBeforeRouteUpdate } from "vue-router";

// 组件内获取 路由实例和当前路由信息 
// 1. 通过组件实例获取
// 2. 官方提供了 useRouter useRoute  => 用于获取路由实例和当前路由信息

// import { getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router"


// var app = getCurrentInstance();
// console.log(app.appContext.config.globalProperties.$router);
// console.log(app.appContext.config.globalProperties.$route);

let router = useRouter();
let route = useRoute();
console.log("router", router);
console.log("route", route);




// onBeforeRouteLeave((to, from) => {
//   console.log("from", from);
//   console.log("to", to);
//   // return true;  // next();

//   // if (to.path == "/about") {
//   //   return false;  //  next(false);
//   // }
//   // return true;

//   if (to.path == "/about" ) {
//       // return "/404";  // next("/404")
//       return {path:"/404",query:{a:1,b:2}};  // next("/404")
//   }

//   return true; // next()

// })
</script>

<style lang="scss" scoped></style>