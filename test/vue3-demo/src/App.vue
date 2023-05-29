

<template>
  <router-link to="/home">成绩表页面</router-link>
  <router-link to="/ech">数据页面</router-link>
  <router-view></router-view>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { provide } from "vue";

//引入echarts
import * as echarts from "echarts";

//通过provide提供echarts
provide("echarts", echarts);
</script>
