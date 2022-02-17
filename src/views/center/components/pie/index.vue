<template>
  <div class="wrap-pie-cont">
    <div class="pie" :id="charId" :ref="charId"></div>
  </div>
</template>
<script>
//import { nextTick } from "vue"
export default {
  data() {
    return { myChart: '' };
  },
  props: {
    charId: {
      type: String,
      default: 'pie',
    },
  },
  methods: {
    drawPie(data) {
      let that = this;
      this.$nextTick(() => {
        var ele = that.$refs[that.charId];
        var echart = that.$echarts.init(ele);
        that.myChart = echart;
        let options = that.createPie(data);
        echart.setOption(options);
      });
    },
    toThousands(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    createPie(data) {
      let that = this;
      return {
        tooltip: {
          trigger: 'item',
          showContent: true,
          backgroundColor: 'rgba(51,51,51,0.6)',
          borderColor: '#333',
          padding: [6, 10, 6, 10],
          borderWidth: 0,
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
          formatter: function(option) {
            let str = '';
            str =
              '<span  style="display:inline-block;margin-right:5px;width: 10px;height: 10px;border-radius: 50%;background:' +
              option.color +
              '"></span>' +
              this.toThousands(option.value) +
              '个';

            return "<p style='text-align:left;line-height:20px;font-size:10px'>" + option.name + '<br/>' + str + '</p>';
          }.bind(this),
        },
        legend: {
          //top: '5%',
          padding: [0, 0, 20, 0],
          left: 'center',
          itemWidth: 18,
          itemHeight: 10,
          //bottom: 10,
          itemStyle: {
            // color: '#fff',
          },
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
        },
        color: ['#2671F7', '#38E4B7', '#ffb80a'],
        grid: {
          //top: '0%',
          left: 0,
          right: 0,
          // bottom: '10%',
          //top: '10%',
          containLabel: !0,
        },
        calculable: !0,
        series: [
          {
            name: '用户数据分布',
            type: 'pie',
            radius: ['35%', '75%'],
            avoidLabelOverlap: false,
            bottom: -15,
            // itemStyle: {
            //   borderRadius: 8,
            // },
            //left: 'center',
            // legendHoverLink: false,

            // center: ['50%', '50%'],
            emphasis: {
              label: {
                show: false,
                fontSize: '12',
                // fontWeight: 'bold',
              },
            },
            label: {
              position: 'center',

              fontSize: 12,
              align: 'left',
              lineHeight: 12,
              show: false,
              color: '#fff',
              // fontWeight: '700',
              // formatter: function(options) {
              //   console.log('=========', that.toThousands(options.value) + '\n' + options.name);
              //   return that.toThousands(options.value) + '\n' + options.name;
              // },
            },

            data: data ? data : [{ value: 100 }, { value: 40 }],
          },
        ],
      };
    },
  },
  mouted() {
    // this.drawPie()
  },
};
</script>

<style lang="scss" scoped>
.wrap-pie-cont {
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
