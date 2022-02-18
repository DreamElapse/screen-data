<template>
  <div class="data-box">
    <div v-show="!hideChart" :id="chartId" style="width: 100%; height: 100%"></div>
    <div v-show="hideChart" class="no-data">暂无数据</div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'LINE_DATA'

  export default {
    name: COMPONENT_NAME,
    props: {
      chartId: {
        type: String,
        default: 'line'
      }
    },
    data() {
      return {
        tabIndex: 0,
        hideChart: false,
        myChart: '',
        data: {
          x: ['02-10', '02-11', '02-12', '02-13', '02-14', '02-15', '02-16'],
          series: ['100', '50', '200', '120', '180', '90', '50'],
          series1: ['100', '50', '200', '120', '180', '90', '50']
        }
      }
    },
    computed: {},
    watch: {},
    mounted() {
      this.$set(this.data, 'series', this.random(7, 300))
      this.$set(this.data, 'series1', this.random(7, 300))
    },
    beforeDestroy() {
      this.myChart = ''
      window.removeEventListener('resize', this.resize) // 取消监听
    },
    methods: {
      resize() {
        this.myChart && this.myChart.resize()
      },
      random(itemNumber, max) {
        return new Array(itemNumber).fill(1).map((item, index) => {
          return Math.ceil(Math.random() * max)
        })
      },
      // 折线图
      drawLine(data, rate) {
        this.$nextTick(() => {
          let xAxisData = data.xAx.length > 0 ? data.xAx : this.data.x
          let seriesData = data.series.length > 0 ? data.series : this.data.series
          let el = document.getElementById(this.chartId)
          // this.$echarts.dispose(el) // 销毁之前的实例
          let myChart = this.$echarts.init(el)
          this.myChart = myChart
          window.addEventListener('resize', this.resize) // 加监听
          myChart.setOption(this.createLine(xAxisData, seriesData))
        })
      },
      createLine(xAxisData, seriesData) {
        return {
          legend: {
            left: 'center',
            top: '0',
            itemWidth: 18,
            itemHeight: 12,
            itemGap: 30,
            align: 'auto',
            data: ['用户量', '订单量'],
            icon: 'rect',
            itemStyle: {
              borderWidth: 0,
              color: '#f0f',
            },
            textStyle: {
              fontSize: 12,
              color: '#fff',
              lineHeight: 16
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
            top: '15%',
            containLabel: true
          },
          tooltip: {
            trigger: 'item',
            padding: [5, 10],
            axisPointer: {
              type: 'shadow',
              shadowStyle: {
                opacity: 0
              }
            }
          },
          xAxis: [{
            type: '',
            offset: 5,
            nameGap: 20,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#CCE9FB',
                width: 1
              }
            },
            axisLabel: {
              show: true,
              color: '#fff',
              fontSize: 14,
              interval: 0,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#183965'
              }
            },
            axisTick: {
              show: false,
            },
            boundaryGap: ['2%', '2%'],
            data: xAxisData
          }],
          yAxis: [{
            type: 'value',
            splitNumber: 2,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(204, 233, 251, 0.1)',
                type: 'dashed'
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#9581F5'
              },
            },
            axisLabel: {
              show: true,
              color: '#fff',
              fontSize: 14
            },
            axisTick: {
              show: false,
            }
          }],
          series: [{
            name: '用户量',
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            symbol: 'none',
            symbolSize: 2,
            lineStyle: {
              width: '3',
              shadowColor: 'rgba(0, 0, 0, .1)',
              shadowBlur: 0,
              shadowOffsetY: 1,
              shadowOffsetX: 1,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#A7FFF6' },
                { offset: 1, color: '#C6EFFF' }
              ]),
            },
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#6c50f3',
              }
            },
            itemStyle: {
              color: "#0766cc",
              borderColor: "#fff",
              borderWidth: 1
            },
            tooltip: {
              
              trigger: 'axis',
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0, 237, 249, 0.6)'
                }, {
                  offset: 0.8,
                  color: 'rgba(0, 237, 249, 0)'
                }], false),
                // shadowColor: 'rgba(108,80,243, 0.9)',
                shadowBlur: 5
              }
            },
            data: seriesData
          },
          {
            name: '订单量',
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            symbol: 'none',
            symbolSize: 2,
            lineStyle: {
              width: '3',
              shadowColor: 'rgba(0, 0, 0, .1)',
              shadowBlur: 0,
              shadowOffsetY: 1,
              shadowOffsetX: 1,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#2257BF' },
                { offset: 1, color: '#C6EFFF' }
              ]),
            },
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#6c50f3',
              }
            },
            itemStyle: {
              color: "#0766cc",
              borderColor: "#fff",
              borderWidth: 1
            },
            tooltip: {
              show: true
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(34, 87, 191, 0.6)'
                }, {
                  offset: 0.8,
                  color: 'rgba(34, 87, 191, 0)'
                }], false),
                // shadowColor: 'rgba(108,80,243, 0.9)',
                shadowBlur: 5
              }
            },
            data: this.data.series1
          }]
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  
.data-box{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  position: relative;
  .no-data{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: cn(14);
  }
  
}
</style>
