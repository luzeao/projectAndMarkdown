<template>
  <div class="echarts-study">
    <div ref="echartsDemo" class="container"></div>
  </div>
</template>

<script>

/* 
  echarts使用
    1. 先下载 
        npm install echarts --save
    2. 在引入
        import * as echarts from 'echarts';
    3. 新建div作为echarts渲染的容器 => 配置容器宽高
    4. echarts相关配置  => 往往伴随着数据处理
    5. 基于准备好的dom，初始化echarts实例
*/



import * as echarts from 'echarts'

export default {
  name: 'EchartsView',
  data() {
    return {
      // echarts配置
      options: {
        title: {
          text: 'Proportion of Browsers',
          subtext: 'Fake Data',
          top: 10,
          left: 10
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          type: 'scroll',
          bottom: 10,
          data: (function () {
            var list = [];
            for (var i = 1; i <= 28; i++) {
              list.push(i + 2000 + '');
            }
            return list;
          })()
        },
        visualMap: {
          top: 'middle',
          right: 10,
          color: ['red', 'yellow'],
          calculable: true
        },
        radar: {
          indicator: [
            { text: 'IE8-', max: 400 },
            { text: 'IE9+', max: 400 },
            { text: 'Safari', max: 400 },
            { text: 'Firefox', max: 400 },
            { text: 'Chrome', max: 400 }
          ]
        },
        series: (function () {
          var series = [];
          for (var i = 1; i <= 28; i++) {
            series.push({
              type: 'radar',
              symbol: 'none',
              lineStyle: {
                width: 1
              },
              emphasis: {
                areaStyle: {
                  color: 'rgba(0,250,0,0.3)'
                }
              },
              data: [
                {
                  value: [
                    (40 - i) * 10,
                    (38 - i) * 4 + 60,
                    i * 5 + 10,
                    i * 9,
                    (i * i) / 2
                  ],
                  name: i + 2000 + ''
                }
              ]
            });
          }
          return series;
        })()
      },
      myEcharts: null,
    }
  },
  methods: {
    initEcharts() {
      // 初始化 echarts实例  => // 基于准备好的dom，初始化echarts实例
      this.myEcharts = echarts.init(this.$refs.echartsDemo);

      // 绘制图表
      this.myEcharts.setOption(this.options)
    }
  },
  mounted() {
    this.initEcharts()
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 1200px;
  height: 600px;
}
</style>