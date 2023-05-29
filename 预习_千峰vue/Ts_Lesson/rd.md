

## 安装 TypeScript
```
cnpm install -g typescript  // ts的运行环境 => 全局安装

tsc --version
```

## 初始化tsconfig

```
tsc --init
```
"removeComments": true, => 删除注释
"outDir": "./js/", => 导出路径

## 开启监听

```
tsc --watch
```

- ts文件中如果没有使用模块化语法,默认所有变量都是全局的,在一个文件中声明了一个变量,在另一个文件中就无法再次声明