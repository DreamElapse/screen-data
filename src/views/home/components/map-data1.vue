<template>
  <div class="data-box">
    <div class="map2"></div>
    <div v-show="!hideChart" :id="chartId" class="wrap-map" style="width: 100%; height: 100%"></div>
    <div v-show="hideChart" class="no-data">暂无数据</div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'MAP_DATA'

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
        }
      }
    },
    computed: {},
    watch: {},
    mounted() {

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
      // 地图
      drawMap(data) {
        this.hideChart = false
        this.$nextTick(() => {
          let el = document.getElementById(this.chartId)
          // this.$echarts.dispose(el) // 销毁之前的实例
          let myChart = this.$echarts.init(el)
          this.myChart = myChart
          window.addEventListener('resize', this.resize) // 加监听
          myChart.setOption(this.createMap())
        })
      },
      // 地图配置
      createMap() {
        let geoGpsMap = [113.27324, 23.15792]
        let geoCoordMap = {
          南京: [[118.8062, 31.9208], 159],
          北京: [[116.4551, 40.2539], 3120],
          石家庄: [[114.4995, 38.1006], 1679],
          天津: [[117.4219, 39.4189], 1502],
          西安: [[109.1162, 34.2004], 2244],
          兰州: [[103.5901, 36.3043], 622],
          银川: [[106.3586, 38.1775], 2000],
          成都: [[103.9526, 30.7617], 925],
          重庆: [[108.384366, 30.439702], 1480],
          济南: [[117.1582, 36.8701], 79],
          郑州: [[113.4668, 34.6234], 1817],
          武汉: [[114.3896, 30.6628], 1209],
          福州: [[119.4543, 25.9222], 1237],
          南昌: [[116.0046, 28.6633], 1004],
          长沙: [[113.0823, 28.2568], 1911],
          贵阳: [[106.6992, 26.7682], 345],
          昆明: [[102.9199, 25.4663], 1429],
          广州: [[113.12244, 23.009505], 2242],
          南宁: [[108.479, 23.1152], 2271],
          海口: [[110.3893, 19.8516], 2159],
          上海: [[121.4648, 31.2891], 2045],
          合肥: [[117.30794, 31.79322], 895],
          杭州: [[120.21201, 30.2084], 1534],
        }

        let colors = ['#82b6fc', '#53f7ff']
        return this.dataHandle(geoGpsMap, geoCoordMap, colors)
      },
      dataHandle(geoGpsMap, geoCoordMap, colors) {

        let mapData = []
        for (let key in geoCoordMap) {
          mapData.push({
            year: '广州',
            name: key,
          })
        }
        
        let chinaMap = require('./chinaMap.json')
        this.$echarts.registerMap('china', chinaMap)
        function convertData(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name][0];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        }

        function convertToLineData(data, gps) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var toCoord = geoCoordMap[dataItem.name][0]
            var fromCoord = gps;
            if (fromCoord && toCoord) {
              res.push([{
                coord: fromCoord,
                value: dataItem.value
              }, {
                coord: toCoord,
              }]);
            }
          }
          return res;
        }
        return {
          timeline: {
            data: '广州',
            show: false,
            axisType: 'category',
          },
          baseOption: {
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicInOut',
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'cubicInOut',
            grid: {
              right: '1%',
              top: '15%',
              bottom: '10%',
              width: '20%'
            },
            tooltip: {
              trigger: 'axis', // hover触发器
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                shadowStyle: {
                  color: 'rgba(150,150,150,0.1)' // hover颜色
                }
              }
            },
            geo: {
              show: true,
              map: 'china',
              roam: false,
              zoom: 1.2,
              center: [104.5, 35.5],
              label: {
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                opacity: 0,
                normal: {
                  borderColor: 'rgba(255,63,158, 0)',
                  borderWidth: 1,
                  areaColor: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.8,
                    colorStops: [{
                      offset: 0,
                      // color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                      color: 'rgba(6,63,158,0)' // 0% 处的颜色
                    }, {
                      offset: 1,
                      // color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                      color: 'rgba(6,63,158,0)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  },
                  // shadowColor: 'rgba(128, 217, 248, 0.2)',
                  shadowColor: 'rgba(6,63,158,0)',
                  // shadowColor: 'rgba(255, 255, 255, 1)',
                  shadowOffsetX: -2,
                  shadowOffsetY: 2,
                  shadowBlur: 10
                },
                emphasis: {
                  areaColor: 'rgba(6,63,158, 0)',
                  borderWidth: 0
                }
              }
            },
          },
          options: [
            {
              xAxis: {
                type: 'value',
                scale: true,
                position: 'top',
                min: 0,
                boundaryGap: false,
                splitLine: {
                  show: false
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  margin: 2,
                  textStyle: {
                    color: '#aaa'
                  }
                },
              },
              yAxis: {
                type: 'category',
                //  name: 'TOP 20',
                nameGap: 16,
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#ddd'
                  }
                },
                axisTick: {
                  show: false,
                  lineStyle: {
                    color: '#ddd'
                  }
                },
                axisLabel: {
                  show: false,
                  interval: 0,
                  textStyle: {
                    color: '#ddd'
                  }
                },
                data: []
              },

              series: [
                // 地图线的动画效果
                {
                  type: 'lines',
                  zlevel: 2,
                  effect: {
                    show: true,
                    period: 4, // 箭头指向速度，值越小速度越快
                    trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
                    symbol: 'arrow', // 箭头图标
                    symbolSize: 5, // 图标大小
                  },
                  lineStyle: {
                    normal: {
                      color: colors[1],
                      width: 0.3, // 尾迹线条宽度
                      opacity: 0.6, // 尾迹线条透明度
                      curveness: .2 // 尾迹线条曲直度
                    }
                  },
                  data: convertToLineData(mapData, geoGpsMap)
                }
              ]
            }
          ]
        }
        // myChart.setOption(optionXyMap)
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
  .map2 {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: url('../../../asset/images/map.png') no-repeat center center;
    background-size: contain;
    left: cn(0);
    opacity: 0.8
  }
  .wrap-map {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 111;
    //display: none;
    // top: cn(30);
    // left: cn(50);
  }
}
</style>
