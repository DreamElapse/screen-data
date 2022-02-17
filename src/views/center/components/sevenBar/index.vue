<template>
  <div class="wrap-bar-cont">
    <div class="bar1" :id="charId" :ref="charId"></div>
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
    drawBar(data, dateList) {
      let that = this;
      this.$nextTick(() => {
        var ele = that.$refs[that.charId];
        var echart = that.$echarts.init(ele);
        that.myChart = echart;
        let options = that.createBar(data, dateList);
        window.addEventListener('resize', that.resize);
        echart.setOption(options);
      });
    },
    createBar(data, dateList) {
      let items = [];
      data.forEach((item, index) => {
        items.push({
          name: item.belongBureau == 1 ? '广州局' : '南昌局',
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              item.belongBureau == 1
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
            borderRadius: [5, 5, 0, 0],
          },
          barWidth: 10,
          label: {
            show: false,
            position: 'right',
            color: '#57A3F5',
            fontSize: 12,
            textShadowColor: 'transparent',
          },

          data: item.list,
        });
      });
      return {
        // color: ["#2671F7", "#38E4B7", "#ffb80a"],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          showContent: true,
          backgroundColor: 'rgba(51,51,51,0.6)',
          borderColor: '#333333',
          padding: [4, 5, 4, 8],
          textStyle: {
            color: '#fff',
          },
          formatter: function(option) {
            let str = '';
            option.forEach((item, index) => {
              if (item.seriesName == '南昌局') {
                let money2 =
                  '<span  style="display:inline-block;margin-right:5px;width: 10px;height: 10px;background: linear-gradient(0deg, #00B584 0%, #41E8BB 100%);border-radius: 50%;"></span>' +
                  ('南昌局：' + item.value * 1000 + '个');
                str = str.concat(money2);
              } else if (item.seriesName == '广州局') {
                let money1 =
                  '<span  style="display:inline-block;margin-right:5px;width: 10px;height: 10px;background: linear-gradient(0deg, #2C6AE7 0%, #57A3F5 100%);border-radius: 50%;"></span>' +
                  ('广州局：' + item.value * 1000 + '个');
                str = str.concat(money1);
              }
              if (index != option.length - 1) {
                str = str.concat('<br/>');
              }
            });

            return (
              "<p style='text-align:left;line-height:16px;font-size:10px'>" +
              option[0].axisValue +
              '<br/>' +
              str +
              '</p>'
            );
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: !0,
          // data: t,
          nameGap: 20,
          splitLine: {
            show: !1,
            lineStyle: {
              color: '#1c3b70',
              width: 0.5,
            },
          },
          axisLabel: {
            color: 'rgba(255,255,255,1)',
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
            show: true,
            lineStyle: {
              color: '#1c3b70',
              width: 0.5,
            },
          },

          // type: 'category',
          // boundaryGap: [0, 0.01],
          // axisLabel: {
          //   show: true,
          //   showMaxLabel: true,
          //   color: 'rgba(255,255,255,0.5)',
          //   //fontWeight: 'bold',
          // },
          // splitLine: {
          //   show: true,
          //   lineStyle: {
          //     color: ['rgba(255, 255, 255, 0.1)'],
          //     width: 1,
          //     type: 'dotted',
          //   },
          // },
          data: dateList ? dateList : ['09-07', '09-06', '09-05', '09-04', '09-03', '09-02', '09-01'],
        },
        grid: {
          left: '0%',
          right: '8%',
          bottom: '0%',
          top: '5%',
          containLabel: true,
          show: false,
          borderColor: 'red',
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false,
            lineStyle: {
              color: '#1c3b70',
            },
          },
          axisTick: {
            show: !1,
          },
          axisLabel: {
            color: 'rgba(255,255,255,1)',
            fontSize: 14,
            interval: 0,
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 0.5,
              color: 'rgba(255, 255, 255, 0.1)',
            },
          },
          // splitLine: {
          //   show: false,
          //   lineStyle: {
          //     color: ['rgba(255, 255, 255, 0.1)'],
          //     width: 1,
          //     type: 'dotted',
          //   },
          // },
          // type: 'value',
          // axisTick: {
          //   show: false,
          // },
          // axisLabel: {
          //   show: true,
          //   color: 'rgba(255,255,255,0.5)',
          //   fontWeight: 'bold',
          // },

          // axisLine: {
          //   show: true,
          //   lineStyle: {
          //     color: 'rgba(255, 255, 255, 0.1)',
          //     width: 1,
          //     type: 'solid',
          //   },
          // },
        },
        series: items,
      };
    },
    resize: function() {
      this.myChart && this.myChart.resize();
    },
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.resize);
  },
  mouted() {
    // this.drawPie()
  },
};
</script>

<style lang="scss" scoped>
.wrap-bar-cont {
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
.bar1 {
  width: 100%;
  height: 100%;
}
</style>
