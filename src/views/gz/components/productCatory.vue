<template>
  <div :id="chartId" class="pie"></div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      tabIndex: 0,
      hideChart: !1,
      myChart: '',
      data: [
        {
          value: 10,
          name: '主食',
        },
        {
          value: 5,
          name: '小吃',
        },
        {
          value: 15,
          name: '饮品',
        },
        {
          value: 25,
          name: '其它',
        },
        {
          value: 20,
          name: '冬奥会系列',
        },
        {
          value: 35,
          name: '故宫文创系列',
        },
        {
          value: 30,
          name: '零食',
        },
        {
          value: 40,
          name: '现制饮品',
        },
      ],
    };
  },
  props: {
    chartId: {
      type: String,
      default: 'bar',
    },
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.resize), (this.myChart = '');
  },
  mounted: function() {
    this.$set(this.data, 'series', this.random(8, 300));
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
    drawPie: function(t) {
      var e = this;
      (this.hideChart = !1),
        this.$nextTick(function() {
          t.length || (t = e.data);
          var a = document.getElementById(e.chartId),
            i = echarts.init(a);
          (e.myChart = i), window.addEventListener('resize', e.resize), i.setOption(e.createPie(t));
        });
    },
    createPie: function(t) {
      return {
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          containLabel: !0,
        },
        label: {
          show: !0,
          position: 'outside',
          formatter: function(e) {
            for (var a = 0, i = 0, r = 0; r < t.length; r++) i += Number(t[r].value);
            return (
              (a = ((e.value / i) * 100).toFixed(2)),
              '' !== e.name ? '{b|'.concat(e.name, '} \n {c|').concat(a, '%}') : ''
            );
          },
          rich: {
            b: {
              color: '#FFF',
              align: 'center',
            },
            c: {
              color: '#FFF',
              align: 'center',
            },
          },
        },
        color: ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea'],
        tooltip: {
          trigger: 'item',
          borderColor: '#0c053c',
          //borderWidth: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          formatter: function(t) {
            var e = '<p style="color:#ffffff;font-size:0.8vw">'.concat(t.seriesName, '</p>');
            return (
              (e += '<p style="display:flex"><span style="display:inline-block;margin-right:5px;margin-bottom:-1px;width:0.9vw;height:0.6vw;border-radius:0.1vw;background-color:'
                .concat(t.color, '"></span><span style="color:#ffffff;font-size:0.8vw;line-height: 0.8vw">')
                .concat(t.name, ': ¥')
                .concat(parseFloat(t.value).toLocaleString(), ' (')
                .concat(t.percent, '%)</span></p>')),
              e
            );
          },
        },
        calculable: !0,
        series: [
          {
            name: '商品品类销售额占比',
            type: 'pie',
            center: ['62%', '52%'],
            radius: ['20%', '65%'],
            roseType: 'area',
            label: {
              show: !0,
            },
            labelLine: {
              show: !0,
            },
            data: t,
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.pie {
  width: 100%;
  height: 100%;
}
</style>
