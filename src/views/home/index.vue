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
          <input v-model="selectOrg" class="context" @input="(value) => inputSelect(value, 'org')" @click.stop="showSelect = 'org'">
          <span :class="['icon', {'active': showSelect === 'org'}]"></span>
          <div :class="['select-list', {'active': showSelect === 'org'}]">
            <span v-for="(item, index) in areaTempList" :key="index" class="select-item" @click.stop="selectItem(item, index, 'org')">{{item}}</span>
          </div>
        </div>
      </div>
    </div>
      
    <!--页面内容-->
    <div class="page-main">
      <!--页面左侧模块-->
      <div class="left-content main-content">
        <!--左顶部小数据模块-->
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

        <!--左中部小数据模块-->
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
                  <input v-model="selectTrain" class="context" @input="(value) => inputSelect(value, 'train')" @click.stop="showSelect = 'train'">
                  <span :class="['icon', {'active': showSelect === 'train'}]"></span>
                  <div :class="['select-list', {'active': showSelect === 'train'}]">
                    <span v-for="(item, index) in trainTempList" :key="index" class="select-item" @click.stop="selectItem(item, index, 'train')">{{item}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="echarts-data">
              <bar-data ref="bar" chartId="bar"> </bar-data>
            </div>
          </div>
          

        </div>
        <!--左底部小数据模块-->
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
      <!--页面中部模块-->
      <div class="center-content main-content">
        <!--中顶部小数据模块-->
        <div class="center-sec center-top">
          <div class="data">
            <ul>
              <li>
                <img src="../../asset/images/icon_all.png" />
                <div class="u-m">
                  <div class="data-des">
                    <numberRolling
                      itemClass="nbscroll1"
                      :number="userOrigin.newOrder"
                      :size="28"
                      :width="16"
                      :fontWeight="600"
                      color="#fff"
                    ></numberRolling>
                  </div>
                  <div class="label">累计订单量</div>
                </div>
              </li>
              <li>
                <img src="../../asset/images/icon_user.png" />
                <div class="u-m">
                  <div class="data-des">
                    <numberRolling
                      itemClass="nbscroll2"
                      :number="todayData.mealUserNum"
                      :size="28"
                      :width="16"
                      fontWeight="600"
                      color="#fff"
                    ></numberRolling>
                  </div>
                  <div class="label">订餐用户量</div>
                </div>
              </li>
              <li>
                <img src="../../asset/images/icon_account.png" />
                <div class="u-m">
                  <div class="data-des">{{ todayData.amount }}</div>
                  <div class="label">累计销售额</div>
                </div>
              </li>
            </ul>
          </div>
          <p class="flex-30"></p>
          <div class="amount-tit-des">今日销售金额(元)</div>
          <p class="flex-20"></p>
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
          <p class="flex-15"></p>
          <p class="yestoday-num">昨日销售金额:￥{{toThousands(113311100)}}</p>
        </div>
        <!--中地图-->
        <div class="center-sec center-middle">
          <map-data ref="map" chartId="map"></map-data>
        </div>
        <!--中底部小数据模块-->
        <div class="center-sec center-bottom">
          <div class="data-box">
            <div class="bottom-data-title">
              <span class="left-icon"></span>
              <span class="title-text">出乘车辆</span>
            </div>
            <div class="data-row">
              <p class="left">
                <span class="icon"></span>
                <span class="text">今日出乘</span>
                <span class="num">100</span>
                <span class="unit">辆</span>
              </p>
              <p class="right">
                <span class="icon"></span>
                <span class="text">昨日出乘</span>
                <span class="num">100</span>
                <span class="unit">辆</span>
              </p>
            </div>
          </div>
          <div class="data-box">
            <div class="bottom-data-title">
              <span class="left-icon"></span>
              <span class="title-text">担当车底</span>
            </div>
            <div class="data-row">
              <p class="left">
                <span class="icon"></span>
                <span class="text">今日担当车底</span>
                <span class="num">100</span>
                <span class="unit">辆</span>
              </p>
              <p class="right">
                <span class="icon"></span>
                <span class="text">昨日担当车底</span>
                <span class="num">100</span>
                <span class="unit">辆</span>
              </p>
            </div>
          </div>
            
        </div>
      </div>
      <!--页面右侧模块-->
      <div class="right-content main-content">
        <!--右顶部小数据模块-->
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

            <div class="sec-data">
              <pie-full ref="pieFull" chartId="pie-full"> </pie-full>
            </div>
          </div>
        </div>
        <!--右中部小数据模块-->
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
                  <input v-model="selectCate" class="context" @input="(value) => inputSelect(value, 'cate')" @click.stop="showSelect = 'cate'">
                  <span :class="['icon', {'active': showSelect === 'cate'}]"></span>
                  <div :class="['select-list', {'active': showSelect === 'cate'}]">
                    <span v-for="(item, index) in cateTempList" :key="index" class="select-item" @click.stop="selectItem(item, index, 'cate')">{{item}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="echarts-data">
              <pie-data ref="pie" chartId="pie"></pie-data>
            </div>
          </div>
        </div>
        <!--中底部小数据模块-->
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
import MapData from './components/map-data1'
import BarData from './components/bar-data'
import LineData from './components/line-data'
import PieData from './components/pie-data'
import PieFull from './components/pie-full'
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
      trainList: [],
      cateList: [],
      areaTempList: [],
      trainTempList: [],
      cateTempList: [],
      timer1: '',
      timer2: '',
      timer3: '',
      showSelect: '',
      selectOrg: 0,
      selectTrain: '',
      selectCate: '',
      epidemic,
      numbers: [0, '0', 0, 0, 0, ',', 0, 0, 0, '.', 0, 0],
      todayData: {},
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
    PieFull,
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

    inputOrg() {
      // this.showSelect = true
      this.areaTempList = this.areaList.filter(item => {
        return item.title.includes(this.selectContext)
      })
    },
    inputTrain() {
      // this.showSelect = true
      this.areaTempList = this.trainList.filter(item => {
        return item.title.includes(this.selectTrain)
      })
    },
    inputSelect(value, type) {
      if(type === 'org') {
        this.areaTempList = this.orgList.filter(item => {
          return item.includes(this.selectOrg)
        })
      } else if(type === 'train') {
        this.trainTempList = this.trainList.filter(item => {
          return item.includes(this.selectTrain)
        })
      } else {
        this.cateTempList = this.cateList.filter(item => {
          return item.includes(this.selectCate)
        })
      }
      
    },
    closeSelect() {
      this.showSelect = false
    },
    selectItem(item, index, type) {
      this.showSelect = false
      if(type === 'org'){
        this.selectOrg = index
        this.$router.push({ name: 'home', query: { area: index } });
      } else if (type === 'train') {
        this.selectTrain = item
      } else {
        this.selectCate = item
      }
    },
    // 获取车底
    getTrainList() {
      this.$get(api.getTrainList)
      .then(res => {
        if(res.code == 100000 && res.data) {
          // categoryId,categoryName,sale
          this.trainLsit = res.data.map(item => {
            return item.trainNo
          })
          this.trainTempLsit = res.data.map(item => {
            return item.trainNo
          })
          console.log(res.data)
        }
      })
    },
    // 获取商品品类列表
    getCateList() {
      this.$get(api.getCateList)
      .then(res => {
        if(res.code == 100000 && res.data) {
          this.cateList = res.data.map(item => {
            return item.cateName
          })
          this.cateTempList = res.data.map(item => {
            return item.cateName
          })
        }
      })
    },
    // 近7日数据
    getSevenData() {
      this.$get(api.getSevenData(this.selectTrain))
      .then(res => {
        if (res.code == 100000) {
          let arr = res.data.sales // figure, expression
          console.log(arr, '7日sales')
          let arr1 = res.data.users
          let arr2 = res.data.orderQuantity
          console.log(arr1, arr2, 11)
        }
      });
    },
    goodsSalesRate() {
      this.$get(api.goodsSalesRate)
      .then(res => {
        if(res.code == 100000) {
          // categoryId,categoryName,sale
          console.log(res.data)
        }
      })
    },
    getGoodsSalesRank() {
      this.$get(api.getGoodsSalesRank)
      .then(res => {
        if(res.code == 100000) {
          // goodName,categoryName,goodsCount,sale
          console.log(res.data)
        }
      })
    },
    trainOrderRank() {
      this.$get(api.trainOrderRank)
      .then(res => {
        if(res.code == 100000) {
          // trainNo,orderCount,steward,sale
          console.log(res.data)
        }
      })
    },
    // websocket获取基础数据
    getBaseData() {
      let baseUrl = process.env.VUE_APP_CHAT_URL
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      let userId = userInfo.id+'-SCREEN_PC_LOGIN'
      let ws = new WebSocket(baseUrl+api.getBaseData(userId));

      ws.onopen = function(evt) { 
        console.log("Connection open ..."); 
        // ws.send("Hello WebSockets!");
      };

      ws.onmessage = function(evt) {
        console.log( "Received Message: " + evt.data);
        // ws.close();
      };

      ws.onclose = function(evt) {
        console.log("Connection closed.");
      };      
    },
    getTrainWork() {
      this.$get(api.getTrainWork)
      .then(res => {
        if(res.code == 100000) {
          // trainNo,orderCount,steward,sale
          console.log(res.data)
        }
      })
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

    this.getTrainList()
    this.getCateList()
  },

  mounted() {
    let { area } = this.$route.query;
    this.selectOrg = this.areaList[area || 0]
    this.area = area || 0;
    this.draw()
    this.$nextTick(() => {
      // 获取各模块数据
      // 近7日数据统计
      this.getSevenData()
      //今日数据
      // this.getTodayData();
      this.$refs.bar && this.$refs.bar.drawBar({xAx: [], series: []})
      this.$refs.line && this.$refs.line.drawLine({xAx: [], series: []})
      this.$refs.pie && this.$refs.pie.drawPie([]) // params:[{value: 10, name: 'xxx'}]
      this.$refs.pieFull && this.$refs.pieFull.drawPie([], '20') // params:[{value: 10, name: 'xxx'}]

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
