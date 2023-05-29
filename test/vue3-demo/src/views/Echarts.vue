
<template>
  <div>
    <div id="myEChartsBar"></div>
    <div id="myEChartsLine"></div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    // 基本柱形图
    changeBar() {
      const myEChart = this.$echarts.init(document.getElementById("myEChartsBar"));
      const option1 = {
        xAxis: {
          type: "category",
          data: ["学员", "班主任", "讲师", "管理员"],
        },
        yAxis: {},
        series: [
          { type: "bar", data: [1, 2, 3, 4] },
          {
            data: [
              { value: 1, name: "学员", },
              { value: 2, name: "班主任", },
              { value: 3, name: "讲师", },
              { value: 4, name: "管理员", },
            ],
          },
        ],
      };
      myEChart.setOption(option1);
      // 根据页面大小自动响应图表大小
    },

    changePie() {
      const myEChart = this.$echarts.init(document.getElementById("myEChartsLine"));
      const option2 = {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1, name: "学员", },
              { value: 2, name: "班主任", },
              { value: 3, name: "讲师", },
              { value: 4, name: "管理员", },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        legend: {
          orient: 'vertical',
          left: 'left'
        },
      };
      myEChart.setOption(option2);
    }
  },
  mounted() {
    this.changeBar();
    this.changePie()
  },
};
</script>
 
<style lang="scss" scoped>
#myEChartsBar {
  width: 300px;
  height: 300px;
}

#myEChartsLine {
  width: 300px;
  height: 300px;
  position: absolute;
  left: 500px;
  top: 50px;
}
</style>