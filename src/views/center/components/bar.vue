<template>
  <div class="bar" :id="chartId"></div>
</template>
<script>
export default {
  name: 'bar',
  props: {
    chartId: {
      type: String,
      default: 'bar',
    },
  },
  data: function() {
    return {
      tabIndex: 0,
      hideChart: !1,
      myChart: '',
      data: {
        x: ['1月1号', '1月2号', '1月3号', '1月4号', '1月5号', '1月6号', '1月7号'],
        x1: ['广州南', '广州东', '长沙南', '深圳北', '佛山西', '潮汕'],
        series: [[], [], []],
      },
    };
  },
  computed: {},
  watch: {},
  mounted: function() {
    this.$set(this.data.series, 0, this.random(7, 300)),
      this.$set(this.data.series, 1, this.random(7, 300)),
      this.$set(this.data.series, 2, this.random(7, 300));
  },
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
    drawBar: function(t) {
      var e = this;
      (this.hideChart = !1),
        this.$nextTick(function() {
          var a = t.xAx.length > 0 ? t.xAx : e.data.x,
            i = t.series.length > 0 ? t.series : e.data.series,
            r = document.getElementById(e.chartId),
            n = e.$echarts.init(r);
          (e.myChart = n), window.addEventListener('resize', e.resize);
          var o = ['#c0f100', '#ff9952', '#008fff', '#6978fc', '#fe9275'];
          n.setOption(e.createBar(a, i, o));
        });
    },
    drawBar1: function(t, e) {
      var a = this;
      (this.hideChart = !1),
        this.$nextTick(function() {
          var i = t.xAx.length > 0 ? t.xAx : a.data.x1,
            r = t.series.length > 0 ? t.series : a.data.series,
            n = document.getElementById(a.chartId),
            o = a.$echarts.init(n);
          (a.myChart = o), window.addEventListener('resize', a.resize);
          var s = ['#19089a', '#fe9275'];
          o.setOption(a.createBar1(i, r, e, s));
        });
    },
    drawBar2: function(t) {
      var e = this;
      (this.hideChart = !1),
        this.$nextTick(function() {
          var a = t.xAx.length > 0 ? t.xAx : e.data.x,
            i = t.series.length > 0 ? t.series : e.data.series,
            r = document.getElementById(e.chartId),
            n = e.$echarts.init(r);
          (e.myChart = n), window.addEventListener('resize', e.resize), n.setOption(e.createBar2(a, i));
        });
    },
    createBar: function(t, e, a) {
      return {
        legend: {
          left: 'center',
          top: '5%',
          padding: [5, 3],
          itemWidth: 16,
          itemHeight: 12,
          itemGap: 30,
          type: 'plain',
          align: 'auto',
          data: ['现金', '线上支付', '12306自营', '聚合收款'],
          textStyle: {
            fontSize: 12,
            color: '#fff',
            lineHeight: 16,
          },
        },
        grid: {
          left: 0,
          right: '3%',
          bottom: '4%',
          top: 0,
          containLabel: !0,
        },
        xAxis: {
          type: 'category',
          boundaryGap: !0,
          data: t,
          nameGap: 20,
          splitLine: {
            show: !1,
            lineStyle: {
              color: '#1c3b70',
              width: 0.5,
            },
          },
          axisLabel: {
            color: '#FFF',
            fontSize: 14,
            align: 'center',
            interval: 0,
          },
          axisTick: {
            show: !1,
            lineStyle: {
              color: '#ccc',
              width: 0.5,
            },
          },
          axisLine: {
            show: !1,
            lineStyle: {
              color: '#1c3b70',
              width: 0.5,
            },
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: !0,
            lineStyle: {
              color: '#1c3b70',
            },
          },
          axisTick: {
            show: !1,
          },
          axisLabel: {
            color: '#FFF',
            fontSize: 14,
          },
          axisLine: {
            show: !1,
            lineStyle: {
              width: 0.5,
              color: '#1c3b70',
            },
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderColor: '#0c053c',
          trigger: 'axis',
          padding: [5, 10],
          axisPointer: {
            type: 'shadow',
          },
          formatter: function(t) {
            var e = '<p style="color:#ffffff;font-size:0.8vw">'.concat(t[0].name, '</p>');
            return (
              t.slice(0, 4).forEach(function(t) {
                e += '<p><span style="display:inline-block;margin-right:5px;margin-bottom:-1px;width:0.9vw;height:0.6vw;border-radius:0.1vw;background-color:'
                  .concat(t.color, '"></span><span style="color:#ffffff;font-size:0.8vw;line-height: 0.8vw">')
                  .concat(t.seriesName, ': ¥')
                  .concat(parseFloat(t.value).toLocaleString(), '</span></p>');
              }),
              e
            );
          },
        },
        series: [
          {
            type: 'bar',
            name: '现金',
            data: e[0],
            stack: 'one',
            barWidth: '40%',
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: a[0],
              },
            },
          },
          {
            type: 'bar',
            name: '线上支付',
            data: e[1],
            stack: 'one',
            barWidth: '40%',
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: a[1],
              },
            },
          },
          {
            type: 'bar',
            name: '12306自营',
            data: e[2],
            stack: 'one',
            barWidth: '40%',
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: a[2],
              },
            },
          },
          {
            type: 'bar',
            name: '聚合收款',
            data: e[3],
            stack: 'one',
            barWidth: '40%',
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: a[3],
              },
            },
          },
          {
            name: '',
            type: 'bar',
            symbolSize: 1,
            symbol: 'circle',
            barGap: '-100%',
            barWidth: '40%',
            label: {
              normal: {
                show: !1,
                position: 'top',
                distance: '3',
                offset: [0, 0],
                color: '#89eaff',
                fontSize: '12',
              },
            },
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0)',
                opacity: 1,
              },
            },
            data: e[4],
          },
        ],
      };
    },
    createBar1: function(t, e, a, i) {
      return {
        legend: {
          show: !1,
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
            lineHeight: 16,
          },
        },
        grid: {
          left: 0,
          right: 0,
          bottom: '4%',
          top: '5%',
          containLabel: !0,
        },
        xAxis: {
          type: 'category',
          boundaryGap: !0,
          data: t,
          nameGap: 20,
          splitLine: {
            show: !1,
            lineStyle: {
              color: '#1c3b70',
              width: 0.5,
            },
          },
          axisLabel: {
            color: '#FFF',
            fontSize: 12,
            align: 'center',
            interval: 0,
          },
          axisTick: {
            show: !1,
            lineStyle: {
              color: '#ccc',
              width: 0.5,
            },
          },
          axisLine: {
            show: !1,
            lineStyle: {
              color: '#1c3b70',
              width: 0.5,
            },
          },
        },
        yAxis: {
          type: 'value',
          minInterval: 2,
          splitLine: {
            show: !1,
            lineStyle: {
              color: '#1c3b70',
            },
          },
          axisTick: {
            show: !1,
          },
          axisLabel: {
            show: !1,
            color: '#FFF',
            fontSize: 14,
          },
          axisLine: {
            show: !1,
            lineStyle: {
              width: 0.5,
              color: '#1c3b70',
            },
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderColor: '#0c053c',
          trigger: 'axis',
          padding: [5, 10],
          axisPointer: {
            type: 'shadow',
          },
          formatter: function(t) {
            console.log('--------------------');
            if (a[0].length) {
              var e = '<p style="color:#ffffff;font-size:0.8vw;margin-bottom:4px">'.concat(t[0].name, '</p>');
              return (
                t.forEach(function(i, r) {
                  console.log('-----------', i);
                  e += '<p style="display:flex;margin-bottom:4px"><span style="display:inline-block;margin-right:5px;margin-bottom:-1px;width:0.9vw;height:0.6vw;border-radius:0.1vw;background:'
                    .concat(
                      'object' === typeof i.color
                        ? 'linear-gradient(0deg, ' +
                            i.color.colorStops[0].color +
                            ',' +
                            i.color.colorStops[1].color +
                            ')'
                        : i.color,
                      '"></span><span style="color:#ffffff;font-size:0.8vw;line-height: 0.8vw">',
                    )
                    .concat(0 === r ? '目标额' : i.seriesName, ': ¥')
                    .concat(parseFloat(a[r][t[0].dataIndex]).toLocaleString(), '</span></p>');
                }),
                (e += '<p style="display:flex"><span style="display:inline-block;margin-right:5px;margin-bottom:-1px;width:0.9vw;height:0.6vw;border-radius:0.1vw;background: transparent"></span><span style="color:#ffffff;font-size:0.8vw;line-height: 0.8vw">目标完成率: '.concat(
                  t[1].value,
                  '%</span></p>',
                )),
                e
              );
            }
          },
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
                color: i[0],
              },
            },
          },
          {
            type: 'bar',
            name: '今日销售额',
            data: e,
            barWidth: '40%',
            barGap: '-100%',
            label: {
              normal: {
                show: !0,
                position: 'inside',
                formatter: '{c}%',
                color: '#fff',
                textShadow: 'none',
                fontSize: 12,
              },
            },
            itemStyle: {
              normal: {
                barBorderRadius: [0, 0, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: 'rgb(57,89,255,1)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(46,200,207,1)',
                  },
                ]),
              },
            },
          },
        ],
      };
    },
    createBar2: function(t, e) {
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
            lineHeight: 16,
          },
        },
        grid: {
          left: 0,
          right: 0,
          bottom: '4%',
          top: '20%',
          containLabel: !0,
        },
        xAxis: {
          type: 'category',
          boundaryGap: !0,
          data: t,
          nameGap: 20,
          splitLine: {
            show: !1,
            lineStyle: {
              color: '#1c3b70',
              width: 0.5,
            },
          },
          axisLabel: {
            color: '#FFF',
            fontSize: 14,
            align: 'center',
            interval: 0,
            formatter: function(t) {
              var e = t.split('-');
              return ''.concat(e[1], '.').concat(e[2]);
            },
          },
          axisTick: {
            show: !1,
            lineStyle: {
              color: '#ccc',
              width: 0.5,
            },
          },
          axisLine: {
            show: !1,
            lineStyle: {
              color: '#1c3b70',
              width: 0.5,
            },
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: !0,
            lineStyle: {
              color: '#1c3b70',
            },
          },
          axisTick: {
            show: !1,
          },
          axisLabel: {
            color: '#FFF',
            fontSize: 14,
          },
          axisLine: {
            show: !1,
            lineStyle: {
              width: 0.5,
              color: '#1c3b70',
            },
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderColor: '#0c053c',
          trigger: 'axis',
          padding: [5, 10],
          axisPointer: {
            type: 'shadow',
          },
          formatter: function(t) {
            var e = '<p style="color:#ffffff;font-size:0.8vw">'.concat(t[0].name, '</p>');
            return (
              t.forEach(function(t, a) {
                e += '<p><span style="display:inline-block;margin-right:5px;margin-bottom:-1px;width:0.9vw;height:0.6vw;border-radius:0.1vw;background-color:'
                  .concat(t.color, '"></span><span style="color:#ffffff;font-size:0.8vw;line-height: 0.8vw">')
                  .concat(t.seriesName, ': ¥')
                  .concat(parseFloat(t.value).toLocaleString(), '</span></p>');
              }),
              e
            );
          },
        },
        series: [
          {
            type: 'bar',
            name: '车底销售额',
            data: e[0],
            barWidth: '50%',
            barGap: 0,
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: '#008fff',
              },
            },
          },
          {
            type: 'line',
            name: '车底销售平均值',
            smooth: !1,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: '#fef375',
              },
              width: 1.5,
              shadowColor: '#3D7EEB',
              shadowBlur: 4,
            },
            lineStyle: {
              color: '#f5eb73',
              width: 1.5,
              shadowColor: '#3D7EEB',
              shadowBlur: 4,
            },
            data: e[1],
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.bar {
  width: 100%;
  height: 100%;
}
</style>
