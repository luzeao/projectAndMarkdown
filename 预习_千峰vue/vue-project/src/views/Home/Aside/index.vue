<template>
  <!-- 
    router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转

   -->

  <!-- <el-menu :router="true" :default-openeds="['0']">

    <el-menu-item index="/home"><i class="el-icon-user"></i>主页</el-menu-item>

    <el-submenu index="1">
      <template slot="title"><i class="el-icon-picture-outline"></i>轮播图管理</template>
      <el-menu-item index="/banner/list">轮播图列表</el-menu-item>
      <el-menu-item index="/banner/add">轮播图新增</el-menu-item>
      <el-menu-item index="/banner/show">轮播图展示</el-menu-item>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title"><i class="el-icon-s-shop"></i>商品管理</template>
      <el-menu-item index="/goods/list">商品列表</el-menu-item>
      <el-menu-item index="/goods/show">商品展示</el-menu-item>
      <el-menu-item index="/goods/search">商品搜索</el-menu-item>
    </el-submenu>

  </el-menu> -->

  <!-- default-active	当前激活菜单的 index -->
  <el-menu :router="true" unique-opened :default-active="$route.path">
    <template v-for="(menu, index) in authMenu">
      <el-menu-item :index="menu.path" :key="index" v-if="!menu.children">
        <i class="el-icon-user"></i>{{ menu.label }}
      </el-menu-item>

      <el-submenu :index="menu.path" :key="index" v-else>
        <template slot="title"><i class="el-icon-picture-outline"></i>{{ menu.label }}</template>
        <el-menu-item v-for="submenu, index in menu.children" :key="index" :index="submenu.path">
          {{ submenu.label }}
        </el-menu-item>
      </el-submenu>

    </template>

  </el-menu>
</template>

<script>
import { mapState } from 'vuex';
import { menus, generateMenuByRole } from '@/router/routes';

export default {
  name: 'AsideLayout',
  data() {
    return {
      menus: menus,  // 所有可以被访问的菜单
    }
  },
  computed: {
    ...mapState(['role', 'checkedkeys']),

    authMenu() {
      return generateMenuByRole(this.menus, {
        role: this.role,
        checkedkeys: this.checkedkeys
      })
    }

  },
  // mounted() {
  //   console.log(11111,this.role);
  //   console.log(11111,this.checkedkeys);
  // },
}
</script>

<style lang="scss" scoped></style>