<template>
  <div class="page">
    <el-container class="home">
      <el-header style="text-align: right; font-size: 12px">
        <Header />
      </el-header>
      <el-container class="container">
        <el-aside width="200px" class="aside">
          <Aside />
        </el-aside>
        <el-main class="main">
          <!-- 二级视图 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import Header from './Header';
import Aside from './Aside';
import { mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },

  components: {
    Header,
    Aside,
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}

.page {
  width: 100%;
  height: 100%;
}


.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.container {
  flex: 1;
  overflow: hidden;

  .aside {
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff;
  }
}

.main {
  height: 100%;
  overflow: auto;
}
</style>