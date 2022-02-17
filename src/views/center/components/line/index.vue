<template>
  <div class="linchar" :id="charId" :ref="charId"></div>
</template>
<script>
//import { nextTick } from "vue"
//import dayjs from 'dayjs';
import * as echarts from 'echarts';

export default {
  data() {
    return { myChart: '' };
  },
  name: 'line-chart',
  props: {
    charId: {
      type: String,
      default: 'lineChart',
    },
    color: {
      type: String,
      default: '#2B61FF',
    },
    lineColor: {
      type: String,
      default: '#57A3F5',
    },
    xtype: {
      type: String,
      default: 'time',
    },
  },
  methods: {
    drawLine(data, XData) {
      let that = this;
      this.bindSort = XData.sort;
      this.$nextTick(() => {
        var ele = that.$refs[that.charId];
        var echart = that.$echarts.init(ele);
        that.myChart = echart;
        window.addEventListener('resize', that.resize);
        let options = that.createLine(data, XData);
        echart.setOption(options);
      });
    },
    createLine(data, XData) {
      let areaColor = [];
      let { maxData, area } = XData;
      let max = 60;
      this.area = area;
      if (XData.sort == 1) {
        areaColor = [
          {
            offset: 0,
            color: '#2C6AE7',
          },
          {
            offset: 1,
            color: 'rgba(87, 163, 245,0.2)',
          },
        ];
        max = 60;
        if (area == 1) {
          max = 7;
          if (maxData > 6) {
            max = 8;
          }
          if (maxData > 7) {
            max = 10;
          }
          if (maxData > 8) {
            max = 12;
          }
          if (maxData > 9) {
            max = 14;
          }
          if (maxData > 10) {
            max = 16;
          }

          if (maxData > 11) {
            max = 18;
          }
          if (maxData > 12) {
            max = 20;
          }
          if (maxData > 13) {
            max = 22;
          }
          if (maxData > 14) {
            max = 24;
          }
          if (maxData > 16) {
            max = 28;
          }
          if (maxData > 20) {
            max = 30;
          }
          if (maxData > 50) {
            max = 120;
          }
        } else {
          max = 60;
          if (maxData > 50) {
            max = 120;
          }
          if (maxData > 110) {
            max = 180;
          }
          if (maxData > 170) {
            max = 240;
          }
          if (maxData > 230) {
            max = 300;
          }
          if (maxData > 290) {
            max = 360;
          }
          if (maxData > 350) {
            max = 410;
          }
          if (maxData > 410) {
            max = 520;
          }
        }
      } else {
        max = 12;
        if (area == 1) {
          if (maxData > 11) {
            max = 14;
          }
          if (maxData > 13) {
            max = 15;
          }
          if (maxData > 15) {
            max = 18;
          }
          if (maxData > 17) {
            max = 24;
          }
          if (maxData > 19) {
            max = 30;
          }
          if (maxData > 21) {
            max = 36;
          }
          if (maxData > 27) {
            max = 42;
          }
          if (maxData > 33) {
            max = 48;
          }
          if (maxData > 39) {
            max = 54;
          }
          if (maxData > 45) {
            max = 120;
          }
        } else {
          if (maxData > 11) {
            max = 18;
          }
          if (maxData > 17) {
            max = 24;
          }
          if (maxData > 23) {
            max = 30;
          }
          if (maxData > 29) {
            max = 36;
          }
          if (maxData > 35) {
            max = 42;
          }
          if (maxData > 41) {
            max = 48;
          }
          if (maxData > 47) {
            max = 54;
          }
          if (maxData > 53) {
            max = 160;
          }
        }
        areaColor = [
          {
            offset: 0,
            color: '#00B584',
          },
          {
            offset: 1,
            color: 'rgba(65, 232, 187,0.2)',
          },
        ];
      }

      let arr = [];
      data.forEach((item, index) => {
        let areaColor = [];
        if (index == 0) {
          //广州
          areaColor = [
            {
              offset: 0,
              color: 'rgba(44, 106, 231,0)',
            },
            {
              offset: 1,
              color: 'rgba(87, 163, 245,0.2)',
            },
          ];
        } else {
          //南昌
          areaColor = [
            {
              offset: 0,
              color: 'rgba(44, 106, 231,0)',
            },
            {
              offset: 1,
              color: 'rgba(87, 163, 245,0)',
            },
          ];
        }
        arr.push({
          name: item.belongBureau == 1 ? '广州局' : '南昌局',
          type: 'line',
          stack: '总量' + index,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, areaColor),
          },
          showSymbol: false,
          lineStyle: {
            color: item.belongBureau == 1 ? '#398AF6' : '#41E8BB',
            // shadowColor: this.lineColor,
            // shadowBlur: 8,
            // shadowOffsetY: 10,
          },
          emphasis: {
            focus: 'series',
          },
          data: item.list,
        });
      });
      return {
        color: ['#41E8BB', '#398AF6'],
        legend: {
          show: false,
          formatter: function(name) {
            return 'Legend ' + name;
          },
        },
        tooltip: {
          trigger: 'axis',
          showContent: true,
          bindSort: XData.sort,
          area: this.area,
          backgroundColor: 'rgba(51,51,51,0.6)',
          borderColor: '#333333',
          padding: [4, 5, 4, 8],
          textStyle: {
            color: '#fff',
          },
          // position: function(point, params, dom, rect, size) {
          //   //console.log(point, params, dom, rect, size);
          //   // 固定在顶部
          //   return [point[0], '5%'];
          // },
          formatter: function(option) {
            let str = '';
            option.forEach((item, index) => {
              if (item.seriesName == '南昌局') {
                let money2 =
                  '<span  style="display:inline-block;margin-right:5px;width: 10px;height: 10px;background: linear-gradient(0deg, #00B584 0%, #41E8BB 100%);border-radius: 50%;"></span>' +
                  (this.bindSort == 1
                    ? '南昌局销售：' + (item.value * 10000).toFixed(2) + '元'
                    : '南昌局订单：' + Math.ceil(item.value * (this.area == 1 ? 100 : 1000)) + '单');
                str = str.concat(money2);
              } else if (item.seriesName == '广州局') {
                let money1 =
                  '<span  style="display:inline-block;margin-right:5px;width: 10px;height: 10px;background: linear-gradient(0deg, #2C6AE7 0%, #57A3F5 100%);border-radius: 50%;"></span>' +
                  (this.bindSort == 1
                    ? '广州局销售：' + (item.value * 10000).toFixed(2) + '元'
                    : '广州局订单：' + Math.ceil(item.value * 1000) + '单');
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
          }.bind(this),
          axisPointer: {
            snap: true,
            type: 'line',
            triggerOn: 'none',
            lineStyle: {
              color: 'rgba(255,255,255,0.5)',
              type: 'dotted',
            },
            crossStyle: {
              color: 'rgba(255,255,255,0.5)',
              type: 'dotted',
            },
            // label: {
            //   fontSize: 12,
            //   lineHeight: 12,
            //   color: '#fff',
            //   height: 10,
            //   backgroundColor: this.color,
            //   bindSort: XData.sort,
            //   formatter: function(value) {
            //     if (value.axisDimension == 'y') {
            //       if (value.value.toString().indexOf('.') > 0) {
            //         if (this.bindSort == 1) {
            //           return (value.value * 10000).toFixed(2);
            //         } else {
            //           return (value.value * 1000).toFixed(2);
            //         }
            //       } else {
            //         if (this.bindSort == 1) {
            //           return value.value * 10000;
            //         } else {
            //           return value.value * 1000;
            //         }
            //       }
            //     } else {
            //       return value.value;
            //     }
            //   }.bind(this),
            // },
          },
        },
        grid: {
          top: '6%',
          left: '3%',
          right: '2%',
          bottom: '3%',
          containLabel: true,
          // containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            // boundaryGap: [0, 0.01],

            //boundaryGap: false,
            data: XData.data,
            axisTick: {
              show: false,
            },
            minInterval: 0,
            axisLabel: {
              show: true,
              color: 'rgba(255,255,255,1)',
              fontSize: 14,
              align: 'center',
              interval: 0,
              //fontWeight: '500',
              //showMinLabel: true,
              showMaxLabel: true,
              // margin: [0, 0, -10, 0],
              //padding: [0, 0, '-20px', 0],
              // formatter(value) {
              //   debugger;
              //   return '<p style="margin-left:-20px">' + value + '</p>';
              // },
              //rotate: 40,
            },
            axisLine: {
              onZero: false,
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.2)',
                type: 'dotted',
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false,
              lineStyle: {
                color: ['rgba(255, 255, 255, 0.2)'],
                width: 1,
                type: 'dotted',
              },
            },
            boundaryGap: [0, 20],
            min: 0,
            max: max,
            //interval: 5,
            axisLine: {
              onZero: true,
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.2)',
              },
            },
            axisLabel: {
              // color:'red',
              show: true,
              color: 'rgba(255,255,255,1)',
              //fontWeight: 'bold',
              fontSize: 14,
              // formatter: function (value) {
              //   //console.log("-------", arguments)
              //   return value
              // },
            },
          },
        ],
        series: arr,
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
    window.removeEventListener('resize', this.resize);
  },
};
</script>

<style lang="scss" scoped>
.linchar {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.test11 {
  width: n(72);
  height: n(26);
  font-size: n(20);
}
.circle {
}
</style>
