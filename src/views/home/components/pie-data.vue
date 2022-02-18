<template>
  <div class="data-box">
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
        data: [
          {value: 10, name: '主食'},
          {value: 5, name: '小吃'},
          {value: 15, name: '饮品'},
          {value: 25, name: '其它'},
          {value: 20, name: '冬奥会系列'},
          {value: 35, name: '故宫文创系列'},
          {value: 30, name: '零食'},
          {value: 40, name: '现制饮品'}
        ]
      }
    },
    computed: {},
    watch: {},
    mounted() {
      this.$set(this.data, 'series', this.random(8, 300))
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
      // 画饼状图
      drawPie(data) {
        this.hideChart = false
        this.$nextTick(() => {
          if (!data.length) data = this.data
          let el = document.getElementById(this.chartId)
          // this.$echarts.dispose(el) // 销毁之前的实例
          let myChart = this.$echarts.init(el)
          this.myChart = myChart
          window.addEventListener('resize', this.resize) // 加监听
          myChart.setOption(this.createPie(data))
        })
      },
      // 纵向柱状图
      createPie(data) {
        return {
          title: {
            show: true,
            top: '1%',
            left: 'center',
            itemGap: 2,
            // text: ,
            textStyle: {
              color: '#dfdfdf',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: 14
            },
            // text: `2021年6月数据`,
            subtext: '',
            subtextStyle: {
              color: '#fff',
              fontSize: 12
            }
          },
          grid: {
            left: 0,
            right: 0,
            bottom: '10%',
            top: '10%',
            containLabel: true
          },
          label: {
            show: true,
            position: 'outside',
            formatter: function (params) {
              var percent = 0
              var total = 0
              for (var i = 0; i < data.length; i++) {
                total += Number(data[i].value)
              }
              percent = ((params.value / total) * 100).toFixed(2)
              if (params.name !== '') {
                return `{b|${params.name}} \n {c|${percent}%}`
              } else {
                return '';
              }
            },
            rich: {
              b: {
                color: '#FFF',
                align: 'center'
              },
              c: {
                color: '#FFF',
                align: 'center'
              }
            }
          },
          color: ['#37a2da','#32c5e9','#9fe6b8','#ffdb5c','#ff9f7f','#fb7293','#e7bcf3','#8378ea'],
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          calculable : true,
          series : [
            {
              name: '商品品类销售额占比',
              type: 'pie',
              labelLine: { // 线
                length: 60
              },
              radius: ['20%', '67%'],
              center: ['50%', '50%'],
              roseType: 'area',
              data
            }
          ]
        }
      },
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
  
}
</style>
