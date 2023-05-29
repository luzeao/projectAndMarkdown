<template>
  <div>
    <h2>数据分析</h2>
    <el-row>
      <el-col :span="11">
        <div class="boxone boxitem" ref="oneChart">

        </div>
      </el-col>
      <el-col :span="11" :offset="1">
        <div class="boxtwo boxitem" ref="twoChart">

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { nextTick, onMounted, ref } from 'vue';
import axios from 'axios'
axios.defaults.baseURL = 'http://121.43.116.41/demo/php'

const oneChart = ref()
const twoChart = ref()

const getGradeList = async (wd = '') => {
  let res = await axios.get('/searchGradeOrderLimit.php', {
    params: {
      wd,
      col: 'id',
      type: 'desc',
      page: 1,
      size: 1000
    }
  })
  setTwoChartInit(res.data.list)
}

const setOneChartInit = () => {
  var chart = echarts.init(oneChart.value)
  var option = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  chart.setOption(option)
}

const setTwoChartInit = (data) => {
  var chart = echarts.init(twoChart.value)
  var arr = [
    { name: '0-20', max: 300 },
    { name: '20-40', max: 300 },
    { name: '40-60', max: 300 },
    { name: '60-80', max: 300 },
    { name: '80-100', max: 300 },
    { name: '100以上', max: 300 }
  ]

  // Echarts 自己处理数据 
  let arr1 = []
  arr.forEach((item, index) => {
    arr1.push(data.filter((val) => (val.chinese > (index - 1) * 20 && val.chinese < index * 20)).length)
  })
  let arr2 = []
  arr.forEach((item, index) => {
    arr2.push(data.filter((val) => (val.math > (index - 1) * 20 && val.math < index * 20)).length)
  })
  let arr3 = []
  arr.forEach((item, index) => {
    arr3.push(data.filter((val) => (val.english > (index - 1) * 20 && val.english < index * 20)).length)
  })

  console.log(arr1, arr2, arr3)

  var option = {
    title: {
      text: '语数外分数占比分析'
    },
    legend: {
      data: ['语文', '数学', '英语']
    },
    radar: {
      // shape: 'circle',
      indicator: arr
    },
    series: [
      {
        name: '数据分段占比',
        type: 'radar',
        data: [
          {
            value: arr1,
            name: '语文',
            id: "chinese",
          },
          {
            value: arr2,
            name: '数学',
            id: "math",
          },
          {
            value: arr3,
            name: '英语',
            id: "english"
          }
        ]
      }
    ]
  };
  chart.setOption(option)
}
onMounted(() => {
  nextTick(() => { // 延迟回调到下一次DOM 更新以后执行 
    setOneChartInit()
    // setTwoChartInit()
    getGradeList() // 先获取成绩列表 再去 获取分析后的数据
  })
})

</script>

<style scoped>
.boxitem {
  width: 100%;
  height: 420px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
}
</style>