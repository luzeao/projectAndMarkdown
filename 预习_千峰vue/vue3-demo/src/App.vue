<template>
  <header>

    <div class="wrapper">

      <nav>
        <!-- 传统的写法RouterLink会默认解析为 a标签 -->
        <RouterLink to="/">Home</RouterLink> |
        <!-- tag属性在v3中废弃了 -->
        <!-- <RouterLink tag="li" to="/about">About</RouterLink> | -->
        <RouterLink to="/vmodel">v-model</RouterLink> |
        <RouterLink to="/pinia">Pinia</RouterLink> |
        <RouterLink to="/pinia/better">PiniaBetter</RouterLink> |
        <RouterLink to="/vuerouter">vuerouter</RouterLink> |

        <!-- 
          vue3 -> RouterLink新增插槽作用域写法(vue2也可以)
            custom(默认false)   RouterLink 是否应该将其内容包裹在一个 a 标签里,通常配合插槽作用域使用
            
            router-link 通过一个插槽作用域暴露底层的定制能力,这是一个更高阶层的API,主要面向库作者,但也可以为开发者提供便利,大多数情况下用在这一个类似的NavLink这样的组件内
                <router-link
                  v-else
                  v-bind="$props"
                  custom
                  v-slot="{  href, navigate, route, isExactActive,isActive }"

                  href: 解析后的url地址,将会作为<a>标签的href属性,如果什么都没提供,他会包含base
                  route: 当前路由信息
                  navigate: 触发的导航函数
                  isActive: 当前导航是否处于活跃状态 => 默认类名 router-link-active
                  isExactActive: 精准活跃状态 => 默认类名 router-link-exact-active
                >
         -->
        <!-- <RouterLink custom to="/404" v-slot="{ isActive, href, navigate, route, isExactActive }"> -->
        <!-- <span @click="$router.push('/404')">404</span> -->
        <!-- <span @click="navigate" :class="isActive ? 'router-link-active' : ''">404</span>
        </RouterLink> | -->

        <NavLink to="https://www.baidu.com">百度</NavLink> |
        <NavLink to="/404" active-class="active" inactiveClass="link">
          滚去404
        </NavLink>
      </nav>
    </div>
  </header>
  <br>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavLink from './components/NavLink.vue';
</script>

<style scoped>
.router-link-active {
  color: red;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
