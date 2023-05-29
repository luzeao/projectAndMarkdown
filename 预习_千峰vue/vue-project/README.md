

# 后台管理系统
vue2 + vue-router + vuex
vue组件库: ElementUI

## 环境搭建
1. 基于vue-cli搭建vue项目(vue2)

## 安装依赖
开发依赖
```
  cnpm i sass sass-loader -D    sass解析
```

生产依赖(运行依赖) => 项目运行也需要使用
```
  cnpm i element-ui -S
  cnpm i lodash -S
```

## 在main.js中引入
ElementUI配置
你可以引入整个 Element，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Element

全局引入(完整引入)
```
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```

按需引入
```
import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */
```

## 下载过程出现丢包
1. 删除node-modules
2. 清除缓存 npm cache verify
3. 反向安装 cnpm i

## 权限处理
分为页面权限和按钮权限
1. 页面权限: 将用户可以访问的页面存在后台,每次登陆验证(checkedkeys 包含用户可以访问的权限页面)

2. 按钮权限: 优先页面可以访问,但是某些功能不能使用(1. 功能对你不展示 功能禁用)