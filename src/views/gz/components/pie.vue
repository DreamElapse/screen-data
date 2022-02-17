<template>
  <div class="pie" :id="chartId"></div>
</template>
<script>
export default {
  name: 'salpie',
  props: {
    chartId: {
      type: String,
      default: 'pie',
    },
  },
  data: function() {
    return {
      tabIndex: 0,
      hideChart: !1,
      myChart: '',
      data: [
        {
          value: 102058.5,
          name: '线上收款',
        },
        {
          value: 100042,
          name: '现金收款',
        },
        {
          value: 104855,
          name: '12306自营',
        },
        {
          value: 104855,
          name: '聚合收款',
        },
      ],
    };
  },
  computed: {},
  watch: {},
  mounted: function() {
    this.$set(this.data, 'series', this.random(8, 300));
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.resize), (this.myChart = '');
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
    drawPie: function(t, e, a) {
      var i = this;
      (this.hideChart = !1),
        this.$nextTick(function() {
          t.length || (t = i.data);
          var r = document.getElementById(i.chartId),
            n = i.$echarts.init(r);
          console.log(r);
          i.myChart = n;
          window.addEventListener('resize', i.resize);
          let options = i.createPie(t, e, a);
          console.log(options);

          n.setOption(options);
        });
    },
    createPie: function(t, e, a) {
      return {
        title: {
          show: !1,
          top: '55%',
          left: 'center',
          itemGap: 2,
          textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12,
          },
          text: '昨日销售额(元)',
          subtext: e,
          subtextStyle: {
            color: '#fff',
            fontSize: 12,
          },
        },
        legend: {
          right: '0',
          bottom: '15%',
          orient: 'vertical',
          itemWidth: 18,
          itemHeight: 12,
          itemGap: 10,
          align: 'auto',
          borderRadius: 20,
          data: ['线上收款', '现金收款', '12306自营', '聚合收款'],
          textStyle: {
            fontSize: 12,
            color: '#fff',
            lineHeight: 16,
          },
        },
        grid: {
          left: 0,
          right: 0,
          bottom: '10%',
          top: '10%',
          containLabel: !0,
        },
        color: ['#ff7452', '#00c7ff', '#ece807', '#6978fc'],
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderColor: '#0c053c',
          trigger: 'item',
          formatter: function(t) {
            if (t.name) {
              var e = '<p style="color:#ffffff;font-size:0.8vw">'.concat(t.seriesName, '</p>');
              return (
                (e += '<p style="display:flex"><span style="display:inline-block;margin-right:5px;margin-bottom:-1px;width:0.9vw;height:0.6vw;border-radius:0.1vw;background-color:'
                  .concat(t.color, '"></span><span style="color:#ffffff;font-size:0.8vw;line-height: 0.8vw">')
                  .concat(t.name, ': ¥')
                  .concat(parseFloat(t.value).toLocaleString(), ' (')
                  .concat(t.percent, '%)</span></p>')),
                e
              );
            }
            return '';
          },
        },
        calculable: !0,
        series: [
          {
            type: 'liquidFill',
            radius: '50%',
            color: ['#53d5ff', '#fae345', '#ece807', '#6978fc'],
            center: ['50%', '55%'],
            itemStyle: {
              normal: {
                opacity: 1,
                shadowBlur: 0,
                shadowColor: '#4056ff',
              },
            },
            label: {
              show: !1,
              normal: {
                formatter: ''.concat(a),
                textStyle: {
                  fontSize: '150%',
                  color: '#FFF',
                  fontWeight: 'normal',
                  lineHeight: 14,
                },
                position: ['50%', '50%'],
              },
            },
            backgroundStyle: {
              color: 'rgba(4,50,145, 0.6)',
            },
            name: this.data,
            data: [
              {
                value: a.split('%')[0] / 100,
                itemStyle: {
                  normal: {
                    color: '#4056ff',
                    opacity: 0.6,
                  },
                },
              },
            ],
            outline: {
              itemStyle: {
                borderColor: '#86c5ff',
                borderWidth: 0,
              },
              borderDistance: 0,
            },
          },
          {
            name: '今日销售额',
            type: 'pie',
            radius: ['45%', '65%'],
            center: ['50%', '55%'],
            label: {
              color: '#FFF',
              formatter: function(t) {
                var e = t.value.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
                return '{text| ' + e + '}';
              },
              rich: {
                text: {
                  padding: [15, -65, 0, -65],
                  color: '#FFF',
                },
                num: {
                  padding: [0, -50, 0, -50],
                  color: '#FFF',
                },
              },
            },
            labelLine: {
              length2: 80,
              show: !0,
              color: '#00ffff',
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
