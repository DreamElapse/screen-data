<template>
  <div class="main-wrap">
    <div class="logo">
      <p></p>
      <span class="date-box"
        >{{ date }} <span>{{ week }}</span> {{ time }}</span
      >

      <div class="selectList2" style="color:#fff">
        当前局:<v-select
          :value="selectVal"
          @option:selected="changeHandler"
          class="c-select"
          :options="vtNumlist"
          label="title"
          :clearable="false"
          ref="select"
        >
          <template v-slot:option="option">
            <span :class="option.icon"></span>
            {{ option.title }}
          </template>
        </v-select>
      </div>
    </div>

    <div class="viewport">
      <div class="column">
        <div class="f11"></div>
        <div class="overview panel">
          <div class="inner">
            <h3>近7日销售额</h3>
            <div class="wrap-legend">
              <span class="dw">金额(万元)</span>
              <ul>
                <li v-if="area == 0 || area == 2">
                  <span class="circle circle1"></span>
                  广州局
                </li>
                <li v-if="area == 0 || area == 1">
                  <span class="circle circle2"></span>
                  南昌局
                </li>
              </ul>
            </div>
            <div class="sales-seven-day">
              <LineChart color="#00b584" lineColor="#00b584" ref="firstLine" charId="firstLine"></LineChart>
            </div>
          </div>
        </div>
        <!--近7日用户量-->
        <div class="f22"></div>
        <div class="overview panel">
          <div class="inner">
            <h3>近7日用户量</h3>
            <div class="wrap-legend">
              <span class="dw">数量(千)</span>
              <ul>
                <li v-if="area == 0 || area == 2">
                  <span class="circle circle1"></span>
                  广州局
                </li>
                <li v-if="area == 0 || area == 1">
                  <span class="circle circle2"></span>
                  南昌局
                </li>
              </ul>
            </div>
            <div class="user-seven-day">
              <SevenBar ref="userSeven" charId="userSeven"></SevenBar>
            </div>
          </div>
        </div>
        <!--监控-->
        <div class="f33"></div>
        <div class="overview panel lastOverView">
          <div class="inner">
            <h3>近7日订单量</h3>
            <div class="wrap-legend">
              <span class="dw">单量({{ area == 1 ? '百' : '千' }})</span>
              <ul>
                <li v-if="area == 0 || area == 2">
                  <span class="circle circle1"></span>
                  广州局
                </li>
                <li v-if="area == 0 || area == 1">
                  <span class="circle circle2"></span>
                  南昌局
                </li>
              </ul>
            </div>
            <div class="sales-seven-day2">
              <LineChart color="#00b584" lineColor="#00b584" ref="secondLine" charId="secondLine"></LineChart>
            </div>
            <!-- <div class="order-seven-day"></div> -->
          </div>
        </div>
        <!--点位-->
      </div>
      <div class="column">
        <!-- 用户 -->
        <div class="users">
          <div class="b1"></div>
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
          <div class="b2"></div>
        </div>
        <!-- 地图 -->
        <div class="map mapOuter">
          <div class="chart">
            <div class="geo">
              <MapInfo ref="mapInfo" chartId="mapinfoid"></MapInfo>
            </div>
          </div>
        </div>
        <!-- 今日销售额 用户量 订单量-->
        <div class="amount-user">
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
      <div class="column">
        <div class="f1"></div>
        <div class="order-user right-c">
          <div class="order panel">
            <h3 class="h3-title">实时订单</h3>
            <div class="inner">
              <div class="orderList">
                <div class="blank1"></div>
                <div class="head">
                  <div class="t-title">时间</div>
                  <div class="t-title">路局</div>
                  <div class="t-title">车次</div>
                  <div class="t-title">金额</div>
                </div>
                <div class="wrap-list">
                  <!-- <div class="list" v-if="currentOrder.length <= 4">
                    <dl :key="index" v-for="(item, index) in currentOrder">
                      <dd>{{ item.orderTime }}</dd>
                      <dd>{{ item.belongBureau == 0 ? '南昌局' : '广州局' }}</dd>
                      <dd>{{ item.diningTrainNo }}</dd>
                      <dd class="amount">{{ item.realPayAmount }}</dd>
                    </dl>
                  </div> -->
                  <!-- <div class="list">

                    <VueScroll ref="h-scroll" :interval="1000" :isStart="isStart" :row="4">
                     
                      <template #up="{ up }">
                        <dl class="col up">
                          <dd>{{ up.orderTime }}</dd>
                          <dd>{{ up.belongBureau == 0 ? '南昌局' : '广州局' }}</dd>
                          <dd>{{ up.diningTrainNo }}</dd>
                          <dd class="amount">￥{{ up.realPayAmount }}</dd>
                        </dl>
                        
                      </template>
                      <template #down="{ down }">
                        <dl :class="['col', 'up']">
                          <dd>{{ down.orderTime }}</dd>
                          <dd>{{ down.belongBureau == 0 ? '南昌局' : '广州局' }}</dd>
                          <dd>{{ down.diningTrainNo }}</dd>
                          <dd class="amount">￥{{ down.realPayAmount }}</dd>
                        </dl>
                      
                      </template>
                    </VueScroll>
                  </div> -->

                  <!-- <cssSeamlessScroll
                    :class-option="defaultOption"
                    v-if="currentOrder.length > 0"
                    ref="cssScroll"
                    :data="currentOrder"
                    class="wrap-list2"
                  > -->
                  <div class="list">
                    <!-- {{ currentOrder.length }} -->
                    <dl :key="index" v-for="(item, index) in currentOrder">
                      <dd>{{ item.orderTime }}</dd>
                      <dd>{{ item.belongBureau == 0 ? '南昌局' : '广州局' }}</dd>
                      <dd>{{ item.diningTrainNo }}</dd>
                      <dd class="amount">￥{{ item.realPayAmount }}</dd>
                    </dl>
                  </div>
                  <!-- </cssSeamlessScroll> -->
                </div>
              </div>
            </div>
          </div>
          <!-- 销售额 -->
          <div class="distribution panel">
            <h3 class="h3-title">{{ area == 0 ? '订单用户数据分布' : '订单支付来源' }}</h3>
            <div class="inner">
              <div class="b1"></div>
              <div class="chart">
                <Pie charId="distribution" ref="distribution"> </Pie>
              </div>
            </div>
          </div>
        </div>
        <div class="f2"></div>
        <!--今日车次下单TOP10排行榜 -->
        <div class="topsales panel right-c">
          <h3>今日车次下单TOP10</h3>
          <div class="inner">
            <TopList v-if="area == 0" :list="top10List" />
            <Top2List v-else :list="topArr" />
          </div>
        </div>
        <div class="f3"></div>
        <!-- 排行榜 -->
        <div class="trainSetOff panel right-c">
          <div class="inner">
            <h3>近7日出乘车次数量</h3>
            <div class="bar">
              <Bar charId="bar" ref="bar" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css';
// import { cssSeamlessScroll } from 'vue3-seamless-scroll';
// import cssSeamlessScroll from 'vue-seamless-scroll';

import api from '@/js/api';
import dayjs from 'dayjs';
// import productCatoryPie from './components/productCatory.vue';
// import Bar from './components/bar.vue';
// import 'swiper/css/swiper.css';
// import SaleComparPie from './components/pie.vue';

import MapInfo from './components/map';
import TopList from './components/todayTop/index.vue';
import Top2List from './components/todayTop2/index.vue';
import Bar from './components/bar/index.vue';
import Pie from './components/pie/index.vue';
import numberRolling from '@/components/number-rolling/index.vue';
import LineChart from './components/line/index.vue';
import { ORDERTYPE, COLORS } from './status';
import SevenBar from './components/sevenBar/index.vue';

//import VueScroll from '@/components/scroll/index.vue';
//import VueScroll
//import { VInfoniteScroll } from 'v-infinite-scroll';
// import './pulic.scss';

export default {
  name: 'activeGuid',
  data() {
    return {
      clazz: ['num', 'train', 'from', 'to', 'apartTime', 'achiveTime', 'state'],
      isStart: true,
      date: '',
      time: '',
      week: '',
      area: 0,
      totalNumber: 0,
      numbers: [0, '0', 0, 0, 0, ',', 0, 0, 0, '.', 0, 0],
      autoPlay: true,
      selectVal: '',
      carNum: '',
      topArr: [], //南昌局 广州局
      historyData: {}, //GVM
      top10List: [], //top10
      todayData: {}, //今日数据
      currentOrder: [], //实时订单
      userOrigin: {}, //用户来源分布
      currentAmountInfo: {}, //实时金额
      vtNumlist: [{ title: '全部' }, { title: '南昌局' }, { title: '广州局' }],
      ORDERTYPE,
      COLORS,
    };
  },
  components: {
    //productCatoryPie,
    //  VueScroll,
    // VInfoniteScroll,
    // SaleComparPie,
    // cssSeamlessScroll,

    LineChart,
    MapInfo,
    numberRolling,
    TopList,
    Top2List,
    Bar,
    Pie,
    SevenBar,
  },
  computed: {
    qqbrow() {
      return navigator.userAgent.toLowerCase().indexOf('qqbrowser') > -1;
    },
    defaultOption() {
      return {
        //autoPlay: this.autoPlay,
        // step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        //hoverStop: false, // 是否开启鼠标悬停stop
        direction: 0, // 0向下 1向上 2向左 3向右
        // openWatch: false, // 开启数据实时监控刷新dom
        //singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        //singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 2000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  methods: {
    changeHandler(val) {
      this.selectVal = val;
      if (val.title == '全部') {
        this.$router.push({ name: 'center', query: { area: 0 } });
      } else if (val.title == '南昌局') {
        this.$router.push({ name: 'center', query: { area: 1 } });
      } else if (val.title == '广州局') {
        this.$router.push({ name: 'center', query: { area: 2 } });
      }
      // location.reload();
      //this.getNumCompareList(val);
    },
    resize() {
      // location.reload();
    },
    draw() {
      this.$refs.mapInfo && this.$refs.mapInfo.drawMap(this.area);
    },
    // toThousands(num) {
    //   return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    // },
    //GVM
    getHistoryData() {
      this.$get(api.historyData(this.area)).then(res => {
        if (res.code == 100000) {
          this.historyData = res.data;
          this.buildData(res.data.gmv.toFixed(2).toString());
        }
      });
    },
    //TOP10
    todayTop10() {
      this.$get(api.todayTop10(this.area, 0)).then(res => {
        if (res.code == 100000) {
          if (this.area == 0) {
            this.top10List = res.data;
          } else {
            this.topArr = [res.data.slice(0, 5), res.data.slice(5, 10)];
          }
        }
      });
    },
    //今日数据
    getTodayData() {
      this.$get(api.todayData(this.area, 0)).then(res => {
        if (res.code == 100000) {
          this.todayData = res.data;
          //let { amountList, orderList } = res.data;
          //this.$refs.firstPie.drawPie([{ value: amountList[0].amount }, { value: amountList[1].amount }]);

          // this.$refs.pie2.drawPie([{ value: orderList[0].userNum }, { value: orderList[1].userNum }]);
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

          
        }
      });
    },
    //trainNum
    getTrainNum() {
      this.$get(api.trainNum(this.area)).then(res => {
        if (res.code == 100000) {
          let timeArr = [];
          let trainNum = [];
          res.data.forEach(item => {
            timeArr.push(item.trainTime.replace('-', '.'));
            trainNum.push(item.trainNum);
          });
          let max = Math.max.apply(Math, trainNum);

          this.$refs.bar.drawBar([timeArr, trainNum], this.area, max < 1000 ? max + 100 : max + 500);

          //this.$refs.bar.drawBar([timeArr, trainNum], this.area,max);
        }
      });
    },
    //近七日销售数据
    getRecentSales() {
      let that = this;
      //let { area } = this.$route.query;
      this.$get(api.recentSales(this.area)).then(res => {
        if (res.code == 100000) {
          let temPlist = [];
          let list = [];
          res.data.forEach(item => {
            let arr = [];
            let dateList = [];
            item.saleList.forEach(item => {
              arr.push(item.sales / 10000);
              dateList.push(item.dates.replace('-', '.'));
              temPlist.push(item.sales / 10000);
            });
            let obj = {
              belongBureau: item.belongBureau,
              list: arr,
              dateList,
            };
            list.unshift(obj);
          });
          that.$refs.firstLine.drawLine(list, {
            data: list[0].dateList,
            sort: 1,
            maxData: Math.max.apply(Math, temPlist),
            area: this.area,
          });
        }
      });
    },
    //用户来源分布
    getUserOrigin() {
      this.$get(api.userSource(this.area)).then(res => {
        if (res.code == 100000) {
          this.userOrigin = res.data;
          //let { userSource } = res.data;
          if (this.area == 0) {
            let arr = [
              { value: this.userOrigin.gzUser, name: '广州局', itemStyle: { color: '#2671F7' } },
              { value: this.userOrigin.ncUser, name: '南昌局', itemStyle: { color: '#38E4B7' } },
            ];
            this.$refs.distribution.drawPie(arr);
          } else {
            console.log(this.ORDERTYPE);
            let arr = [];
            res.data.userSource.forEach(item => {
              arr.push({
                value: item.userNum,
                name: this.ORDERTYPE[item.userSource],
                itemStyle: {
                  color: this.COLORS[item.userSource],
                },
              });
            });
            // let arr = [
            //   { value: this.userOrigin.gzUser, name: '广州' },
            //   { value: this.userOrigin.ncUser, name: '南昌' },
            // ];
            this.$refs.distribution.drawPie(arr);
          }
        }
      });
    },
    //近七日订单量
    getRecentOrders() {
      let that = this;
      this.$get(api.recentOrders(this.area)).then(res => {
        if (res.code == 100000) {
          let temPlist = [];
          let list = [];
          res.data.forEach(item => {
            let arr = [];
            let dateList = [];
            item.orderList.forEach(item => {
              arr.push(item.orderNums / (this.area == 1 ? 100 : 1000));
              dateList.push(item.dates.replace('-', '.'));
              temPlist.push(item.orderNums / (this.area == 1 ? 100 : 1000));
            });
            let obj = {
              belongBureau: item.belongBureau,
              list: arr,
              dateList,
            };
            list.unshift(obj);
          });

          that.$refs.secondLine.drawLine(list, {
            data: list[0].dateList,
            sort: 2,
            maxData: Math.max.apply(Math, temPlist),
            area: this.area,
          });
        }
      });
    },

    //近七日用户量
    getRecentUsers() {
      let that = this;
      this.$get(api.recentUsers(this.area)).then(res => {
        if (res.code == 100000) {
          let temPlist = [];
          let list = [];
          res.data.forEach(item => {
            let arr = [];
            let dateList = [];
            item.saleList.forEach(item => {
              arr.push(item.userNum / 1000);
              dateList.push(item.dates.replace('-', '.'));
              temPlist.push(item.userNum / 1000);
            });
            let obj = {
              belongBureau: item.belongBureau,
              list: arr,
              dateList,
            };
            list.unshift(obj);
          });

          that.$refs.userSeven.drawBar(list, list[0].dateList);
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
    getWeekDate() {
      var now = new Date();
      var day = now.getDay();
      var weeks = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
      var week = weeks[day];
      return week;
    },
  },
  created() {
    let token = sessionStorage.getItem('Token');
    if (!token) {
      this.$router.push({ name: 'login' });
      return;
    }
  },

  mounted() {
    window.addEventListener('resize', this.resize);
    // let vselect = document.getElementsByClassName('v-select')[0];
    // vselect.onmouseout = function() {
    //   //document.getElementById('vs1__listbox').style.display = 'none';
    // };
    // let that = this;
    // document.body.addEventListener('click', () => {
    //   that.$refs.select.dropdownShouldOpen(that.$refs.select);
    // });
    let { area } = this.$route.query;
    this.selectVal = this.vtNumlist[area || 0];
    this.area = area || 0;
    this.draw();
    this.$nextTick(() => {
      //获取总的历史数据
      this.getHistoryData();
      //实时订单
      this.getCurrentOrder(1200);

      //订单实时金额
      // this.getCurrentAmount();
      //top10
      this.todayTop10();
      //出乘车次
      this.getTrainNum();
      //用户来源分布
      this.getUserOrigin();
      //今日数据
      this.getTodayData();

      //近七日销售数据
      this.getRecentSales();
      //近七日订单
      this.getRecentOrders();
      //近七日用户
      this.getRecentUsers();
    });
    // this.timer1 = setInterval(() => {
    //   //获取总的历史数据
    //   this.getHistoryData();
    //   //实时订单
    //   this.getCurrentOrder(2);
    // }, 2000);

    // this.timr2 = setInterval(() => {
    //   // //top10
    //   this.todayTop10();
    //   // //今日数据
    //   this.getTodayData();
    //   // //出乘车次
    //   this.getTrainNum();
    //   // //用户来源分布
    //   this.getUserOrigin();
    // }, 1000 * 5 * 60);

    // this.timer3 = setInterval(() => {
    //   this.date = dayjs().format('YYYY-MM-DD');
    //   this.time = dayjs().format('HH:mm:ss');
    //   this.week = this.getWeekDate();
    // }, 1000);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    this.timer1 && clearInterval(this.timer1);
    this.timer2 && clearInterval(this.timer2);
    this.timer3 && clearInterval(this.timer3);
  },
};
</script>
<style lang="scss" scoped>
@import './pulic.scss';
</style>
