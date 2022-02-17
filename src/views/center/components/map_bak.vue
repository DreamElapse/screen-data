<template>
  <div class="map" :id="chartId"></div>
</template>
<script>
let mapInfo = require('./mapInfo');
export default {
  name: 'mapInfo',
  props: {
    chartId: {
      type: String,
      default: 'mapInfo',
    },
  },
  data: function() {
    return {
      tabIndex: 0,
      hideChart: !1,
      myChart: '',
      data: {
        x: ['1月1号', '1月2号', '1月3号', '1月4号', '1月5号', '1月6号', '1月7号'],
        series: [],
      },
    };
  },
  computed: {},
  watch: {},
  mounted: function() {},
  beforeDestroy: function() {
    (this.myChart = ''), window.removeEventListener('resize', this.resize);
  },
  methods: {
    resize: function() {
      this.myChart && this.myChart.resize();
    },
    random: function(t, e) {
      return new Array(t).fill(1).map(function(t, a) {
        return Math.ceil(Math.random() * e);
      });
    },
    drawMap: function(t) {
      debugger;
      var e = this;
      (this.hideChart = !1),
        this.$nextTick(function() {
          var t = document.getElementById(e.chartId),
            a = e.$echarts.init(t);
          (e.myChart = a), window.addEventListener('resize', e.resize), a.setOption(e.createMap());
        });
    },
    createMap: function() {
      var t = [113.27324, 23.15792],
        e = {
          南京: [[118.8062, 31.9208], 159],
          北京: [[116.4551, 40.2539], 3120],
          石家庄: [[114.4995, 38.1006], 1679],
          天津: [[117.4219, 39.4189], 1502],
          西安: [[109.1162, 34.2004], 2244],
          兰州: [[103.5901, 36.3043], 622],
          银川: [[106.3586, 38.1775], 2e3],
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
        },
        a = {
          南京: 159,
          黑龙江: 355,
          内蒙古: 54,
          北京: 30,
          辽宁: 100,
          石家庄: 1679,
          天津: 1,
          山西: 2698,
          西安: 1744,
          兰州: 362,
          银川: 429,
          青海: 122,
          新疆: 731,
          成都: 3925,
          重庆: 1480,
          济南: 79,
          郑州: 1017,
          安徽: 208,
          武汉: 1209,
          浙江: 1418,
          福州: 1237,
          南昌: 1004,
          长沙: 1511,
          贵阳: 345,
          昆明: 1429,
          广州: 2242,
          南宁: 2271,
          海口: 59,
          上海: 8,
        },
        i = ['#82b6fc', '#53f7ff'];
      return this.dataHandle(t, e, i, a);
    },
    dataHandle: function(t, e, i) {
      var r = [],
        n = [],
        o = [];
      for (var s in e)
        r.push({
          year: '广州',
          name: s,
          value: e[s][1] / 100,
          value1: e[s][1] / 100,
        });
      r.sort(function(t, e) {
        return t.value - e.value;
      });
      for (var l = 0; l < r.length; l++) n.push(r[l].value1), o.push(r[l].name);
      var c = mapInfo;
      function d(t) {
        for (var a = [], i = 0; i < t.length; i++) {
          var r = e[t[i].name][0];
          r &&
            a.push({
              name: t[i].name,
              value: r.concat(t[i].value),
            });
        }
        return a;
      }
      function u(t, a) {
        for (var i = [], r = 0; r < t.length; r++) {
          var n = t[r],
            o = e[n.name][0],
            s = a;
          s &&
            o &&
            i.push([
              {
                coord: s,
                value: n.value,
              },
              {
                coord: o,
              },
            ]);
        }
        return i;
      }
      return (
        this.$echarts.registerMap('china', c),
        {
          timeline: {
            data: '广州',
            show: !1,
            axisType: 'category',
          },
          baseOption: {
            animation: !0,
            animationDuration: 1e3,
            animationEasing: 'cubicInOut',
            animationDurationUpdate: 1e3,
            animationEasingUpdate: 'cubicInOut',
            //backgroundColor: '#080a20',
            grid: {
              right: '1%',
              top: '15%',
              bottom: '10%',
              width: '20%',
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                shadowStyle: {
                  color: 'rgba(150,150,150,0.1)',
                },
              },
            },
            geo: {
              show: !0,
              map: 'china',
              roam: !1,
              zoom: 1.2,
              center: [104.5, 35.5],
              label: {
                emphasis: {
                  show: !1,
                },
              },
              itemStyle: {
                normal: {
                  areaColor: '#142957',
                  borderColor: '#0692a4',
                },
                emphasis: {
                  areaColor: '#0b1c2d',
                },
              },
            },
          },
          options: [
            {
              xAxis: {
                type: 'value',
                scale: !0,
                position: 'top',
                min: 0,
                boundaryGap: !1,
                splitLine: {
                  show: !1,
                },
                axisLine: {
                  show: !1,
                },
                axisTick: {
                  show: !1,
                },
                axisLabel: {
                  margin: 2,
                  textStyle: {
                    color: '#aaa',
                  },
                },
              },
              yAxis: {
                type: 'category',
                nameGap: 16,
                axisLine: {
                  show: !1,
                  lineStyle: {
                    color: '#ddd',
                  },
                },
                axisTick: {
                  show: !1,
                  lineStyle: {
                    color: '#ddd',
                  },
                },
                axisLabel: {
                  show: !1,
                  interval: 0,
                  textStyle: {
                    color: '#ddd',
                  },
                },
                data: o,
              },
              series: [
                {
                  name: 'light',
                  type: 'scatter',
                  coordinateSystem: 'geo',
                  data: d(r),
                  symbolSize: function(t) {
                    return t[2] / 9;
                  },
                  label: {
                    normal: {
                      formatter: '{b}',
                      position: 'top',
                      fontSize: 10,
                      show: !0,
                    },
                    emphasis: {
                      show: !1,
                    },
                  },
                  itemStyle: {
                    normal: {
                      color: i[1],
                    },
                  },
                },
                {
                  type: 'map',
                  map: 'china',
                  geoIndex: 0,
                  aspectScale: 0.75,
                  showLegendSymbol: !1,
                  label: {
                    normal: {
                      show: !1,
                    },
                    emphasis: {
                      show: !1,
                      textStyle: {
                        color: '#fff',
                      },
                    },
                  },
                  roam: !0,
                  itemStyle: {
                    normal: {
                      areaColor: '#031525',
                      borderColor: '#FFFFFF',
                    },
                    emphasis: {
                      areaColor: '#2B91B7',
                    },
                  },
                  animation: !1,
                  data: r,
                },
                {
                  type: 'effectScatter',
                  coordinateSystem: 'geo',
                  data: d(
                    r.sort(function(t, e) {
                      return e.value - t.value;
                    }),
                  ),
                  showEffectOn: 'render',
                  rippleEffect: {
                    brushType: 'stroke',
                  },
                  hoverAnimation: !0,
                  label: {
                    normal: {
                      formatter: '{b}',
                      position: 'right',
                      show: !1,
                    },
                  },
                  symbolSize: function(t) {
                    return t[2] / 5;
                  },
                  symbol: 'circle',
                  itemStyle: {
                    normal: {
                      show: !1,
                      color: i[1],
                      shadowBlur: 10,
                      shadowColor: i[1],
                    },
                  },
                  zlevel: 1,
                },
                {
                  type: 'lines',
                  zlevel: 2,
                  effect: {
                    show: !0,
                    period: 4,
                    trailLength: 0.02,
                    symbol: 'arrow',
                    symbolSize: 5,
                  },
                  lineStyle: {
                    normal: {
                      color: i[1],
                      width: 0.3,
                      opacity: 0.6,
                      curveness: 0.2,
                    },
                  },
                  data: u(r, t),
                },
              ],
            },
          ],
        }
      );
    },
  },
};
</script>
<style lang="scss">
.map {
  width: 100%;
  height: 100%;
}
</style>
