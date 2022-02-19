<template>
  <div class="page-home" @click="closeSelect">
    <!--顶部标题栏-->
    <div class="logo">
      <!--日期时间-->
      <div class="date-box">{{ date }} <span>{{ week }}</span> {{ time }}</div>
      <!--铁路局下拉选择-->
      <div class="select-box" style="color:#fff">
        <span>铁路局</span>
        <div class="select">
          <input v-model="selectContext" class="context" @input="inputTrain" @click.stop="showSelect = true">
          <span :class="['icon', {'active': showSelect}]"></span>
          <div :class="['select-list', {'active': showSelect}]">
            <span v-for="(item, index) in areaTempList" :key="index" class="select-item" @click.stop="selectItem(item, index)">{{item}}</span>
          </div>
        </div>
      </div>
    </div>
      
    <!--页面内容-->
    <div class="page-main">
      <div class="left-content main-content">
        <!--左一小数据模块-->
        <div class="small-sec left-top">
          <!--模块标题-->
          <div class="sec-title">
            <p class="title-left">
              <span class="left-icon"></span>
              <span class="title-text">防疫防控实时监测</span>
            </p>
            <p class="title-deco"></p>
          </div>

          <div class="epidemic">
            <div 
              v-for="(item, index) in epidemic"
              :key="index"
              class="epidemic-data-item">
                <img :src="item.icon" alt="" class="epi-icon">
                <div class="epi-right">
                  <p class="epi-data">
                    <span>{{item.text[0]}}<b>{{item.allNum}}</b>{{item.text[2]}}</span>
                    <span>{{item.text[1]}}<b class="num-text" :style="{color: item.color[1]}">{{item.num}}</b>{{item.text[2]}}</span>
                  </p>
                  <div class="bar-box" :style="{background: `linear-gradient(90deg, ${item.color[0]} 0, ${item.color[2]} 60%)`}">
                    <span :style="{width: item.num / item.allNum * 100 + '%', background: `linear-gradient(90deg, ${item.color[0]}, ${item.color[1]})` }" class="bar"></span>
                  </div>

                </div>
            </div>
          </div>
        </div>

        <!--左二小数据模块-->
        <div class="small-sec left-middle">
          <!--模块标题-->
          <div class="sec-title">
            <p class="title-left">
              <span class="left-icon"></span>
              <span class="title-text">近7日销售额</span>
            </p>
            <p class="title-deco"></p>
          </div>
          <div class="sec-data">
            <div class="box-header">
              <span>金额(万元)</span>
              <div class="train-select" style="color:#fff">
                <span>车底</span>
                <div class="select">
                  <input v-model="selectContext" class="context" @input="inputTrain" @click.stop="showSelect = true">
                  <span :class="['icon', {'active': showSelect}]"></span>
                  <div :class="['select-list', {'active': showSelect}]">
                    <span v-for="(item, index) in areaTempList" :key="index" class="select-item" @click.stop="selectItem(item, index)">{{item}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="echarts-data">
              <bar-data ref="bar" chartId="bar"> </bar-data>
            </div>
          </div>
          

        </div>
        <!--左三小数据模块-->
        <div class="small-sec left-bottom">
          <!--模块标题-->
          <div class="sec-title">
            <p class="title-left">
              <span class="left-icon"></span>
              <span class="title-text">当月商品销售排行TOP10</span>
            </p>
            <p class="title-deco"></p>
          </div>

          <div class="sec-data">
            <DataScroll :list="goodsSalesRank" />
            <div class="order-data">
              <cssSeamlessScroll
                :class-option="defaultOption"
                v-if="orderDataList.length > 0"
                ref="cssScroll"
                :data="orderDataList"
                class="wrap-list"
              >
                <div class="order-data-item" :key="index" v-for="(item, index) in orderDataList">
                  <p class="data-left">
                    <span class="left-icon"></span>
                    <span class="title-text">实时订单{{index}}</span>
                  </p>
                  <p class="data-text">12:00:00</p>
                  <p class="data-text">南昌局</p>
                  <p class="data-text">G1600</p>
                  <p class="data-text">¥20</p>
                </div>
              </cssSeamlessScroll>
            </div>
          </div>
        </div>
      </div>
      <div class="center-content main-content">
        <div class="center-sec center-top">
          <div class="data">
            <ul>
              <li>
                <img src="https://img.gaolvzongheng.com/img-static/user.4dba7aadc99d99d2.png" />
                <div class="u-m">
                  <div class="data-des">
                    <numberRolling
                      itemClass="nbscroll1"
                      :number="historyData.mealUserNum"
                      :size="28"
                      :width="16"
                      :fontWeight="600"
                      color="#fff"
                    ></numberRolling>
                  </div>
                  <div class="label">订餐用户量</div>
                </div>
              </li>
              <li>
                <img src="https://img.gaolvzongheng.com/img-static/train.dee4fb3057fb6bdf.png" />
                <div class="u-m">
                  <div class="data-des">
                    <numberRolling
                      itemClass="nbscroll2"
                      :number="historyData.trainNum"
                      :size="28"
                      :width="16"
                      fontWeight="600"
                      color="#fff"
                    ></numberRolling>
                  </div>
                  <div class="label">累计服务车次</div>
                </div>
              </li>
              <li>
                <img src="https://img.gaolvzongheng.com/img-static/pie.d964c6405a6250a1.png" />
                <div class="u-m">
                  <div class="data-des">{{ historyData.amountRate }}%</div>
                  <div class="label">成交率</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="b3"></div>
          <div class="amount-tit-des">
            高旅数字餐饮销售总额(元)
          </div>
          <div class="b4"></div>
          <div class="inner">
            <div class="number-rolling-wrap1">
              <ul class="number-rolling">
                <li
                  :key="index"
                  v-for="(item, index) in numbers"
                  :class="{ 'number-item': !isNaN(item), com: isNaN(item) }"
                >
                  <div ref="numberItem" v-if="!isNaN(item)" class="number-list">
                    <span v-for="num in 10" :key="num" :class="{ qqbrow: qqbrow }">{{ num - 1 }}</span>
                  </div>
                  <template v-else>
                    {{ item }}
                  </template>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--地图-->
        <div class="center-sec center-middle">
          <map-data ref="map" chartId="map"> </map-data>
        </div>
        <div class="center-sec center-bottom">
          <ul>
            <li>
              <div class="amount">
                <numberRolling
                  itemClass="nbscroll3"
                  :number="todayData.amount"
                  :size="28"
                  :width="16"
                  :fontWeight="600"
                  color="#fff"
                ></numberRolling>
              </div>
              <div class="label">今日销售额(元)</div>
            </li>
            <li>
              <div class="amount">
                <numberRolling
                  itemClass="nbscroll4"
                  :number="todayData.mealUserNum"
                  :size="28"
                  :width="16"
                  :fontWeight="600"
                  color="#fff"
                ></numberRolling>
              </div>
              <div class="label">今日用户量</div>
            </li>
            <li>
              <div class="amount">
                <numberRolling
                  itemClass="nbscroll5"
                  :number="userOrigin.newOrder"
                  :size="28"
                  :width="16"
                  :fontWeight="600"
                  color="#fff"
                ></numberRolling>
              </div>
              <div class="label">今日订单量</div>
            </li>
          </ul>

        </div>
      </div>
      <div class="right-content main-content">
        <div class="small-sec right-top">
          <div class="top-left">
            <!--模块标题-->
            <div class="sec-title">
              <p class="title-left">
                <span class="left-icon"></span>
                <span class="title-text">今日车底下单Top10</span>
              </p>
            </div>

            <div class="sec-data">
              <OrderScroll :list="orderRankData" />
            </div>

          </div>
          <div class="top-right">
            <!--模块标题-->
            <div class="sec-title">
              <p class="title-left">
                <span class="left-icon"></span>
                <span class="title-text">订单来源</span>
              </p>
            </div>
          </div>
        </div>
        <div class="small-sec right-middle">
          <!--模块标题-->
          <div class="sec-title">
            <p class="title-left">
              <span class="left-icon"></span>
              <span class="title-text">上月商品品类销售额占比</span>
            </p>
            <p class="title-deco"></p>
          </div>

          <div class="sec-data">
            <div class="box-header">
              <div class="train-select" style="color:#fff">
                <span>品类</span>
                <div class="select">
                  <input v-model="selectContext" class="context" @input="inputTrain" @click.stop="showSelect = true">
                  <span :class="['icon', {'active': showSelect}]"></span>
                  <div :class="['select-list', {'active': showSelect}]">
                    <span v-for="(item, index) in areaTempList" :key="index" class="select-item" @click.stop="selectItem(item, index)">{{item}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="echarts-data">
              <pie-data ref="pie" chartId="pie"></pie-data>
            </div>
          </div>
        </div>
        <div class="small-sec right-bottom">
          <!--模块标题-->
          <div class="sec-title">
            <p class="title-left">
              <span class="left-icon"></span>
              <span class="title-text">近7日用户量/订单量</span>
            </p>
            <p class="title-deco"></p>
          </div>

          <div class="echarts-data">
              <line-data ref="line" chartId="line"> </line-data>
            </div>
        </div>
      </div>

    </div>





  </div>
</template>

<script>
import api from '@/js/api';
import dayjs from 'dayjs';
import cssSeamlessScroll from 'vue-seamless-scroll';

import numberRolling from '@/components/number-rolling/index.vue';
import MapData from './components/map-data'
import BarData from './components/bar-data'
import LineData from './components/line-data'
import PieData from './components/pie-data'
import DataScroll from './components/data-scroll'
import OrderScroll from './components/order-scroll'
// import MapInfo from './components/map';



const epidemic = [
  {
    icon: require('@/asset/images/icon_tem.png'),
    allNum: 100,
    num: 20,
    color: ['rgba(40, 112, 254, 0)', 'rgba(40, 112, 254, 1)', 'rgba(40, 112, 254, 0.2)'],
    text: ['应测温工作人员', '实测温工作人员', '人']
  },
  {
    icon: require('@/asset/images/icon_train.png'),
    allNum: 100,
    num: 100,
    color: ['rgba(8, 233, 255, 0)', 'rgba(8, 233, 255, 1)', 'rgba(8, 233, 255, 0.2)'],
    text: ['应消毒车底', '已消毒车底', '辆']
  },
  {
    icon: require('@/asset/images/icon_food.png'),
    allNum: 100,
    num: 80,
    color: ['rgba(255, 204, 102, 0)', 'rgba(255, 204, 102, 1)', 'rgba(255, 204, 102, 0.2)'],
    text: ['应消毒餐食品品类', '已消毒餐食品品类', '种']
  }
]

export default {
  name: 'home',
  data() {
    return {
      date: '',
      time: '',
      week: '',
      area: 0,
      areaList: ['全部', '南昌局', '广州局', '北京局'],
      areaTempList: [],
      timer1: '',
      timer2: '',
      timer3: '',
      showSelect: false,
      selectContext: '',
      epidemic,
      historyData: {}, //GVM
      numbers: [0, '0', 0, 0, 0, ',', 0, 0, 0, '.', 0, 0],
      todayData: {}, //今日数据
      currentOrder: [], //实时订单
      userOrigin: {}, //用户来源分布
      goodsSalesRank: [
        { name: '矿泉水', cate: '水', num: '100', money: '100.00' },
        { name: '矿泉水', cate: '水', num: '100', money: '100.00' },
        { name: '矿泉水', cate: '水', num: '100', money: '100.00' },
        { name: '矿泉水', cate: '水', num: '100', money: '100.00' },
        { name: '矿泉水', cate: '水', num: '100', money: '100.00' },
      ],
      orderDataList: [1, 2, 3],
      orderRankData: [
        { train: 'G1600', orderNum: '100', name: '张三', money: '100' },
        { train: 'G1600', orderNum: '100', name: '张三', money: '100' },
        { train: 'G1600', orderNum: '100', name: '张三', money: '100' },
        { train: 'G1600', orderNum: '100', name: '张三', money: '100' },
      ]
    };
  },
  components: {
    numberRolling,
    MapData,
    BarData,
    LineData,
    PieData,
    DataScroll,
    cssSeamlessScroll,
    OrderScroll
  },
  computed: {
    qqbrow() {
      return navigator.userAgent.toLowerCase().indexOf('qqbrowser') > -1;
    },
    defaultOption() {
      return {
        step: 0, // 滚动速度(本效果设定为0.8~4)
        limitMoveNum: 2, // 重复列表数
        direction: 1, // 方向
        singleHeight: 40, // 单次滚动高度(有单次滚动高度才会开启单次滚动)
        waitTime: 2000, // 单次滚动等待时间
      }
    }
  },
  methods: {
    getWeekDate() {
      var now = new Date();
      var day = now.getDay();
      var weeks = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
      var week = weeks[day];
      return week;
    },

    inputTrain() {
      // this.showSelect = true
      this.areaTempList = this.areaList.filter(item => {
        return item.title.includes(this.selectContext)
      })
    },
    openSelect() {
      this.showSelect = true
    },
    closeSelect() {
      this.showSelect = false
    },
    selectItem(item, index) {
      this.showSelect = false
      this.$router.push({ name: 'home', query: { area: index } });
      this.selectContext = item
      // this.getOrderNumCompare()
    },
    getHistoryData() {
      this.$get(api.historyData(this.area)).then(res => {
        if (res.code == 100000) {
          this.historyData = res.data;
          this.buildData(res.data.gmv.toFixed(2).toString());
        }
      });
    },
    //实时订单
    getCurrentOrder(time) {
      this.$get(api.currentOrder(this.area, time)).then(res => {
        if (res.code == 100000) {
          let arr = res.data.slice(-4);
          this.currentOrder = this.currentOrder.slice(0, 4 - arr.length);
          arr.forEach(item => {
            this.currentOrder.unshift(item);
          });

          //
        }
      });
    },
    toThousands(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    //buildData
    buildData(num) {
      let arr = num.split('.');
      let newStr = '';
      if (arr[0].length < 7) {
        for (var j = 0; j < 7 - arr[0].length; j++) {
          newStr = newStr.concat(0);
        }
      }
      let str = this.toThousands(newStr + arr[0]) + '.' + arr[1];

      let numbers = [];
      for (var i = 0; i < str.length; i++) {
        numbers.push(str.charAt(i));
      }
      this.numbers = numbers;
      this.$set(this.$data, 'numbers', numbers);
      this.setNumberTransform();
    },
    setNumberTransform() {
      const numberItems = this.$refs.numberItem; // 拿到数字的ref，计算元素数量
      const numberArr = this.numbers.filter(item => !isNaN(item)); // 结合CSS 对数字字符进行滚动,显示订单数量
      for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index];
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`;
      }
    },
    draw() {
      // this.$refs.mapInfo && this.$refs.mapInfo.drawMap(this.area);
      this.$refs.map && this.$refs.map.drawMap()
    },
    //今日数据
    getTodayData() {
      this.$get(api.todayData(this.area, 0)).then(res => {
        if (res.code == 100000) {
          this.todayData = res.data;
        }
      });
    },
    //用户来源分布
    getUserOrigin() {
      this.$get(api.userSource(this.area)).then(res => {
        if (res.code == 100000) {
          this.userOrigin = res.data;
          //let { userSource } = res.data;
          // if (this.area == 0) {
          //   let arr = [
          //     { value: this.userOrigin.gzUser, name: '广州局', itemStyle: { color: '#2671F7' } },
          //     { value: this.userOrigin.ncUser, name: '南昌局', itemStyle: { color: '#38E4B7' } },
          //   ];
            // this.$refs.distribution.drawPie(arr);
          // } else {
          //   console.log(this.ORDERTYPE);
          //   let arr = [];
          //   res.data.userSource.forEach(item => {
          //     arr.push({
          //       value: item.userNum,
          //       name: this.ORDERTYPE[item.userSource],
          //       itemStyle: {
          //         color: this.COLORS[item.userSource],
          //       },
          //     });
          //   });
            
            // this.$refs.distribution.drawPie(arr);
          // }
        }
      });
    },
  },
  created() {
    let token = sessionStorage.getItem('Token');
    this.areaTempList = this.areaList.map(item => item)
    if (!token) {
      this.$router.push({ name: 'login' });
      return;
    }
  },

  mounted() {
    let { area } = this.$route.query;
    this.selectContext = this.areaList[area || 0]
    this.area = area || 0;
    this.draw()
    this.$nextTick(() => {
      // 获取各模块数据
      //获取总的历史数据
      this.getHistoryData();
      //实时订单
      this.getCurrentOrder(1200);
      //今日数据
      this.getTodayData();
      this.$refs.bar && this.$refs.bar.drawBar({xAx: [], series: []})
      this.$refs.line && this.$refs.line.drawLine({xAx: [], series: []})
      this.$refs.pie && this.$refs.pie.drawPie([]) // params:[{value: 10, name: 'xxx'}]

    })

    this.timer1 = setInterval(() => {
      this.date = dayjs().format('YYYY-MM-DD');
      this.time = dayjs().format('HH:mm:ss');
      this.week = this.getWeekDate();
    }, 1000);
  },
  beforeDestroy() {
    this.timer1 && clearInterval(this.timer1);
    this.timer2 && clearInterval(this.timer2);
    this.timer3 && clearInterval(this.timer3);
  },
};
</script>
<style lang="scss" scoped>
@import './home.scss';
</style>
