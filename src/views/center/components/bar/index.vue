<template>
  <div class="wrap-pie-cont">
    <div class="pie" :id="charId" :ref="charId"></div>
  </div>
</template>
<script>
//import { nextTick } from 'vue';
import * as echarts from 'echarts';

export default {
  data() {
    return { myChart: '' };
  },
  name: 'bar',
  props: {
    charId: {
      type: String,
      default: 'bar',
    },
  },
  methods: {
    drawBar(data, area, max) {
      let that = this;
      this.$nextTick(() => {
        var ele = that.$refs[that.charId];
        var echart = that.$echarts.init(ele);
        that.myChart = echart;
        let options = that.createBar(data, area, max);
        window.addEventListener('resize', that.resize);
        echart.setOption(options);
      });
    },
    createBar(data, area = 0, max) {
      return {
        // color: ["#2671F7", "#38E4B7", "#ffb80a"],
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          max: max,
          axisLabel: {
            show: true,
            color: 'rgba(255,255,255,1)',
            // fontWeight: 'bold',
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(255, 255, 255, 0.1)'],
              width: 1,
              type: 'dotted',
            },
          },
        },
        grid: {
          left: '1%',
          right: '12%',
          bottom: '3%',
          top: '0%',
          containLabel: true,
          show: false,
          borderColor: 'red',
        },
        yAxis: {
          type: 'category',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            color: 'rgba(255,255,255,1)',
            //fontWeight: 'bold',
          },

          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)',
              width: 1,
              type: 'solid',
            },
          },
          data: data ? data[0] : ['09-07', '09-06', '09-05', '09-04', '09-03', '09-02', '09-01'],
        },
        series: [
          {
            name: '出乘车次数量',
            type: 'bar',

            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                1,
                0,
                area == 0 || area == 2
                  ? [
                      { offset: 0, color: '#83bff6' },
                      { offset: 0.5, color: '#188df0' },
                      { offset: 1, color: '#188df0' },
                    ]
                  : [
                      { offset: 0, color: '#00B584' },
                      { offset: 0.5, color: '#41E8BB' },
                      { offset: 1, color: '#41E8BB' },
                    ],
              ),
              borderRadius: 3,
            },
            // labelLine: {
            //   show: true,
            //   lineStyle: {
            //     color: "red",
            //     width: 1,
            //   },
            // },
            barWidth: 5,
            label: {
              show: true,
              position: 'right',
              color: '#57A3F5',
              fontSize: 16,
              fontWeight: '600',
              textShadowColor: 'transparent',
            },

            data: data ? data[1] : [100, 200, 300, 400, 500, 320, 110],
          },
        ],
      };
    },
    resize: function() {
      this.myChart && this.myChart.resize();
    },
  },
  mouted() {
    // this.drawPie()
  },
  beforeDestroy: function() {
    this.myChart = ''
    window.removeEventListener('resize', this.resize);
  },
};
</script>

<style lang="scss" scoped>
.wrap-pie-cont {
  box-sizing: content-box;
  padding: 0 cn(20);
  width: 100%;
  height: 100%;
  position: relative;
}
.slot {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.pie {
  width: 100%;
  height: 100%;
}
</style>
