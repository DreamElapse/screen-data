<template>
  <div class="bar-data">
    <div v-show="!hideChart" :id="chartId" style="width: 100%; height: 100%"></div>
    <div v-show="hideChart" class="no-data">暂无数据</div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BAR_DATA'

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
        data: {
          x: ['1月1号', '1月2号', '1月3号', '1月4号', '1月5号', '1月6号', '1月7号'],
          x1: ['广州南', '广州东', '长沙南', '深圳北', '佛山西', '潮汕'],
          series: [[], [], []]
        }
      }
    },
    computed: {},
    watch: {},
    mounted() {
      this.$set(this.data.series, 0, this.random(7, 300))
      this.$set(this.data.series, 1, this.random(7, 300))
      this.$set(this.data.series, 2, this.random(7, 300))
    // this.drawBar(this.data, '退货数')
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
      // 纵向柱状图
      drawBar(data) {
        
        this.hideChart = false
        this.$nextTick(() => {
          let xAxisData = data.xAx.length > 0 ? data.xAx : this.data.x
          let seriesData = data.series.length > 0 ? data.series : this.data.series
          let el = document.getElementById(this.chartId)
          // this.$echarts.dispose(el) // 销毁之前的实例
          let myChart = this.$echarts.init(el)
          this.myChart = myChart
          window.addEventListener('resize', this.resize) // 加监听
          let color = ['#c0f100', '#ff9952', '#008fff', '#6978fc', '#fe9275']
          myChart.setOption(this.createBar(xAxisData, seriesData, color))
        })
      },

      // 双纵向柱状图
      drawBar1(data, msg) {
        this.hideChart = false
        this.$nextTick(() => {
          let xAxisData = data.xAx.length > 0 ? data.xAx : this.data.x1
          let seriesData = data.series.length > 0 ? data.series : this.data.series
          let el = document.getElementById(this.chartId)
          // this.$echarts.dispose(el) // 销毁之前的实例
          let myChart = this.$echarts.init(el)
          this.myChart = myChart
          window.addEventListener('resize', this.resize) // 加监听
          let color = ['#19089a', '#fe9275']
          myChart.setOption(this.createBar1(xAxisData, seriesData, msg, color))
        })
      },

      // 纵向柱状图加折线
      drawBar2(data) {
        this.hideChart = false
        this.$nextTick(() => {
          let xAxisData = data.xAx.length > 0 ? data.xAx : this.data.x
          let seriesData = data.series.length > 0 ? data.series : this.data.series
          let el = document.getElementById(this.chartId)
          // this.$echarts.dispose(el) // 销毁之前的实例
          let myChart = this.$echarts.init(el)
          this.myChart = myChart
          window.addEventListener('resize', this.resize) // 加监听
          myChart.setOption(this.createBar2(xAxisData, seriesData))
        })
      },
      // 纵向柱状图
      createBar(xAxisData, seriesData, color) {
        // let total = seriesData[0].map((item, index) => {
        //   return (item+seriesData[1][index]+seriesData[2][index]).toFixed(1)
        // })
        return {
          legend: {
            left: 'center',
            top: '5%',
            itemWidth: 18,
            itemHeight: 12,
            itemGap: 30,
            type: 'plain',
            align: 'auto',
            // data: ['现金', '线上支付', '12306自营', '销售额'],
            data: ['现金', '线上支付', '12306自营', '聚合收款'],
            textStyle: {
              fontSize: 12,
              color: '#fff',
              lineHeight: 16
            }
          },
          grid: {
            left: 0,
            right: 0,
            bottom: '4%',
            top: '20%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: xAxisData,
            nameGap: 20,
            splitLine: {
              show: false,
              lineStyle: {
                color: '#1c3b70',
                width: 0.5
              }
            },
            axisLabel: {
              color: '#FFF',
              fontSize: 14,
              align: 'center',
              interval:0,
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#ccc',
                width: 0.5
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#1c3b70',
                width: 0.5
              }
            }
          },
          yAxis: {
            type: 'value',
            // max: function(value) {
            //   return Math.ceil((value.max + value.max/5))
            // },
            // name: "单位：万元",
            // nameTextStyle: {
            //   color: "#FFF"
            // },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#1c3b70',
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#FFF',
              fontSize: 14
            },
            axisLine: {
              show: false,
              lineStyle: {
                width: 0.5,
                color: '#1c3b70'
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            padding: [5, 10],
            axisPointer: {
              type: 'shadow'
            },
            formatter(prams) {
              let result = `<p style="color:#ffffff;font-size:0.8vw">${prams[0].name}</p>`
              prams.slice(0, 4).forEach(function(item) {
                result += `<p><span style="display:inline-block;margin-right:5px;margin-bottom:-1px;width:0.9vw;height:0.6vw;border-radius:0.1vw;background-color:${
                  item.color
                }"></span><span style="color:#ffffff;font-size:0.8vw;line-height: 0.8vw">${item.seriesName}: ¥${parseFloat(item.value).toLocaleString()}</span></p>`
              })
              return result
              // `${prams[0].name}<br />12306订单：${prams[0].value}<br />旅客下单：${prams[1].value}<br />乘务下单：${prams[2].value}`
            }
          },
          series: [
            {
              type: 'bar',
              name: '现金',
              data: seriesData[0],
              stack: 'one',
              barWidth: '40%',
              itemStyle: {
                normal: {
                  barBorderRadius: 0,
                  color: color[0]
                }
              }
            },
            {
              type: 'bar',
              name: '线上支付',
              data: seriesData[1],
              stack: 'one',
              barWidth: '40%',
              itemStyle: {
                normal: {
                  barBorderRadius: 0,
                  color: color[1]
                }
              }
            },
            {
              type: 'bar',
              name: '12306自营',
              data: seriesData[2],
              stack: 'one',
              barWidth: '40%',
              itemStyle: {
                normal: {
                  barBorderRadius: 0,
                  color: color[2]
                }
              }
            },
            {
              type: 'bar',
              name: '聚合收款',
              data: seriesData[3],
              stack: 'one',
              barWidth: '40%',
              itemStyle: {
                normal: {
                  barBorderRadius: 0,
                  color: color[3]
                }
              }
            },
            /* {
              type: 'line',
              show: false,
              name: '销售额',
              smooth: false,
              symbol: "circle", // 标记的图形为实心圆
              symbolSize: 6,
              itemStyle: {
                normal: {
                  color: "#fef375",
                },
                width: 1.5,
                shadowColor: "#3D7EEB",
                shadowBlur: 4
              },
              lineStyle: {
                color: "#f5eb73",
                width: 1.5,
                shadowColor: "#3D7EEB",
                shadowBlur: 4
              },
              data: seriesData[3],
            }, */
            {
              name: "",
              type: "bar",
              symbolSize: 1,
              symbol:'circle',
              barGap: '-100%',
              barWidth: '40%',
              label: {
                normal: {
                  show: false,
                  position: 'top',
                  distance: '3',
                  offset: [0, 0],
                  color: '#89eaff',
                  fontSize: '12'
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)',
                  opacity: 1
                }
              },
              data: seriesData[4]
            }
          ]
        }
      },
      // 双纵向柱状图渐变色
      createBar1(xAxisData, seriesData, msg, color) {
        return {
          legend: {
            show: false,
            left: 'center',
            top: '2%',
            itemWidth: 18,
            itemHeight: 12,
            itemGap: 30,
            align: 'auto',
            type: 'plain',
            borderRadius: 0,
            data: '今日销售额',
            textStyle: {
              fontSize: 12,
              color: '#fff',
              lineHeight: 16
            }
          },
          grid: {
            left: 0,
            right: 0,
            bottom: '4%',
            top: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: xAxisData,
            nameGap: 20,
            splitLine: {
              show: false,
              lineStyle: {
                color: '#1c3b70',
                width: 0.5
              }
            },
            axisLabel: {
              color: '#FFF',
              fontSize: 12,
              align: 'center',
              interval:0,
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#ccc',
                width: 0.5
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#1c3b70',
                width: 0.5
              }
            }
          },
          yAxis: {
            type: 'value',
            // max: function(value) {
            //   return Math.ceil((value.max + value.max/5))
            // },
            minInterval: 2,
            splitLine: {
              show: false,
              lineStyle: {
                color: '#1c3b70',
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              color: '#FFF',
              fontSize: 14
            },
            axisLine: {
              show: false,
              lineStyle: {
                width: 0.5,
                color: '#1c3b70'
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            padding: [5, 10],
            axisPointer: {
              type: 'shadow'
            },
            formatter(prams) {
              if (!msg[0].length) return
              let result = `<p style="color:#ffffff;font-size:0.8vw">${prams[0].name}</p>`
              prams.forEach(function(item, index) {
                result += `<p><span style="display:inline-block;margin-right:5px;margin-bottom:-1px;width:0.9vw;height:0.6vw;border-radius:0.1vw;background:${typeof(item.color) === 'object' ? 'linear-gradient(0deg, ' + item.color.colorStops[0].color +',' + item.color.colorStops[1].color+')' : item.color}"></span><span style="color:#ffffff;font-size:0.8vw;line-height: 0.8vw">${index === 0 ? '目标额' : item.seriesName}: ¥${parseFloat(msg[index][prams[0].dataIndex]).toLocaleString()}</span></p>`
              })
              result += `<p><span style="display:inline-block;margin-right:5px;margin-bottom:-1px;width:0.9vw;height:0.6vw;border-radius:0.1vw;background: transparent"></span><span style="color:#ffffff;font-size:0.8vw;line-height: 0.8vw">目标完成率: ${prams[1].value}%</span></p>`
              return result
            }
          },
          series: [
            {
              type: 'bar',
              name: '',
              data: [100, 100, 100, 100, 100, 100],
              barWidth: '40%',
              itemStyle: {
                normal: {
                  barBorderRadius: [0, 0, 0, 0],
                  color: color[0]
                }
              }
            },
            {
              type: 'bar',
              name: '今日销售额',
              data: seriesData,
              barWidth: '40%',
              barGap: '-100%',
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  formatter: '{c}%',
                  color: '#fff',
                  textShadow: 'none',
                  fontSize: 12
                }
              },
              itemStyle: {
                normal: {
                  barBorderRadius: [0, 0, 0, 0],
                  color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: 'rgb(57,89,255,1)'
                  }, {
                    offset: 1,
                    color: 'rgb(46,200,207,1)'
                  }]),
                },
              }
            }
          ]
        }
      },
      // 纵向柱状图加折线
      createBar2(xAxisData, seriesData) {
        return {
          legend: {
            left: '45%',
            top: '2%',
            itemWidth: 18,
            itemHeight: 12,
            itemGap: 20,
            align: 'auto',
            type: 'plain',
            borderRadius: 0,
            data: ['车底销售额', '车底销售平均值'],
            textStyle: {
              fontSize: 12,
              color: '#fff',
              lineHeight: 16
            }
          },
          grid: {
            left: 0,
            right: 0,
            bottom: '4%',
            top: '20%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: xAxisData,
            nameGap: 20,
            splitLine: {
              show: false,
              lineStyle: {
                color: '#1c3b70',
                width: 0.5
              }
            },
            axisLabel: {
              color: '#FFF',
              fontSize: 14,
              align: 'center',
              interval:0,
              formatter(params) {
                let dateArr = params.split('-');
                return `${dateArr[1]}.${dateArr[2]}`
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#ccc',
                width: 0.5
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#1c3b70',
                width: 0.5
              }
            }
          },
          yAxis: {
            type: 'value',
            // max: function(value) {
            //   return Math.ceil((value.max + value.max/5))
            // },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#1c3b70',
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#FFF',
              fontSize: 14
            },
            axisLine: {
              show: false,
              lineStyle: {
                width: 0.5,
                color: '#1c3b70'
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            padding: [5, 10],
            axisPointer: {
              type: 'shadow'
            },
            formatter(prams) {
              let result = `<p style="color:#ffffff;font-size:0.8vw">${prams[0].name}</p>`
              prams.forEach(function(item, index) {
                result += `<p><span style="display:inline-block;margin-right:5px;margin-bottom:-1px;width:0.9vw;height:0.6vw;border-radius:0.1vw;background-color:${
                  item.color
                }"></span><span style="color:#ffffff;font-size:0.8vw;line-height: 0.8vw">${item.seriesName}: ¥${parseFloat(item.value).toLocaleString()}</span></p>`
              })
              return result
            }
          },
          series: [
            {
              type: 'bar',
              name: '车底销售额',
              data: seriesData[0],
              barWidth: '50%',
              barGap: 0,
              itemStyle: {
                normal: {
                  barBorderRadius: 0,
                  color: '#008fff'
                }
              }
            },
            {
              type: 'line',
              name: '车底销售平均值',
              smooth: false,
              symbol: "circle", // 标记的图形为实心圆
              symbolSize: 6,
              itemStyle: {
                normal: {
                  color: "#fef375",
                },
                width: 1.5,
                shadowColor: "#3D7EEB",
                shadowBlur: 4
              },
              lineStyle: {
                color: "#f5eb73",
                width: 1.5,
                shadowColor: "#3D7EEB",
                shadowBlur: 4
              },
              data: seriesData[1],
            }
          ]
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .bar-data{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    pointer-events: auto;
    position: relative;

    
    #barData{
      width: 100%;
      height: 100%;
    }
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
