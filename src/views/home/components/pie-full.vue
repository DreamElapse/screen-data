<template>
  <div class="data-box">
    <div v-show="!hideChart" :id="chartId" style="width: 100%; height: 100%"></div>
    <div v-show="hideChart" class="no-data">暂无数据</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import 'echarts-liquidfill/src/liquidFill'
  const COMPONENT_NAME = 'PIE_DATA'

  export default {
    name: COMPONENT_NAME,
    props: {
      chartId: {
        type: String,
        default: 'bar'
      }
    },
    data() {
      return {
        tabIndex: 0,
        hideChart: false,
        myChart: '',
        data: [
          {value: '102058.50', name: '小程序'},
          {value: '100042.00', name: 'PDA订单'},
          {value: '104855.00', name: '手扶码'},
        ]
      }
    },
    computed: {},
    watch: {},
    mounted() {
      this.$set(this.data, 'series', this.random(8, 300))
    },
    beforeDestroy() {
      // let el = document.getElementById(this.chartId)
      window.removeEventListener('resize', this.resize) // 取消监听
      // this.$echarts.dispose(el) // 销毁之前的实例
      this.myChart = ''
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
      // 画饼状图
      drawPie(data, percent) {
        this.hideChart = false
        this.$nextTick(() => {
          if (!data.length) data = this.data
          let el = document.getElementById(this.chartId)
          // this.$echarts.dispose(el) // 销毁之前的实例
          let myChart = this.$echarts.init(el)
          this.myChart = myChart
          window.addEventListener('resize', this.resize) // 加监听
          myChart.setOption(this.createPie(data, percent))
        })
      },
      // 饼状图
      createPie(data, percent) {
        return {
          title: {
            show: false,
            top: '55%',
            left: 'center',
            itemGap: 2,
            // text: ,
            textStyle: {
              color: '#fff',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: 12
            },
            text: `昨日销售额(元)`,
            subtext: '',
            subtextStyle: {
              color: '#fff',
              fontSize: 12
            }
          },
          legend: {
            top: '5%',
            left: 'center',
            itemWidth: 18,
            itemHeight: 12,
            itemGap: 1,
            align: 'auto',
            borderRadius: 20,
            data: ['小程序', 'PDA订单', '手扶码'],
            textStyle: {
              fontSize: 12,
              color: '#fff',
              lineHeight: 16
            }
          },
          grid: {
            left: 0,
            right: 0,
            bottom: 0,
            top: '20%',
            containLabel: true
          },
          color: ['#1DEFFA','#2870FE','#FEC24C'],
          tooltip: {
            show: false,
            trigger: 'item',
            formatter(prams) {
              if (prams.name) {
                let result = `<p style="color:#ffffff;font-size:0.8vw">${prams.seriesName}</p>`
                result += `<p><span style="display:inline-block;margin-right:5px;margin-bottom:-1px;width:0.9vw;height:0.6vw;border-radius:0.1vw;background-color:${
                  prams.color
                }"></span><span style="color:#ffffff;font-size:0.8vw;line-height: 0.8vw">${prams.name}: ¥${parseFloat(prams.value).toLocaleString()} (${prams.percent}%)</span></p>`
                return result
              } else {
                return ''
              }
            }
          },
          calculable : true,
          series : [
            {
              name: '订单',
              type: 'pie',
              radius: ['45%', '65%'],
              center: ['50%', '65%'],
              avoidLabelOverlap: false,
              
              emphasis: {
                label: {
                  show: true,
                  fontSize: 20,
                  fontWeight: 'bold',
                }
                
              },
              label: {
                show: false,
                position: 'center',
                color: '#FFF',
                formatter: function (item) {
                  let value = item.value.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                  return '{text| '+ value+'}'
                },
                rich:{
                  text:{
                    padding:[15,-65,0,-65],
                    color: '#FFF'
                  },
                  num:{
                    padding:[0,-50,0,-50],
                    color: '#FFF'
                  }
                }
              },
              labelLine: {
                length2: 80,
                show: false,
                color: '#00ffff'
              },
              data
            }
          ]
        }
      },
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
