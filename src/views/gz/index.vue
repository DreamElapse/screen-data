<template>
  <div class="main-wrap">
    <div class="dateTime">
      {{ date }} <span>{{ week }}</span> {{ time }}
    </div>
    <div class="viewport">
      <div class="column">
        <div class="overview panel">
          <div class="inner">
            <h3>近7日销售额统计(万元)</h3>
            <Bar ref="bar" chartId="bar"></Bar>
          </div>
        </div>
        <!--出乘信息-->
        <div class="trainInfo">
          <div class="item">
            <span>今日出乘</span>
            <span>{{ trainBestCrew.today_team }}</span>
          </div>
          <div class="item">
            <span>昨日出乘</span>
            <span>{{ trainBestCrew.yesterday_team }}</span>
          </div>
        </div>
        <div class="trainInfo" style="margin-bottom:0">
          <div class="item">
            <span>今日担当车底</span>
            <span>{{ trainBestCrew.today_vtnum }}</span>
          </div>
          <div class="item">
            <span>昨日担当车底</span>
            <span>{{ trainBestCrew.yesterday_vtnum }}</span>
          </div>
        </div>
        <div class="monitor bestSale">
          <p class="title">昨日最佳销售组</p>
          <div class="inner">
            <div class="content" style="display: block;">
              <div class="marquee-view">
                <div class="marquee">
                  <div class="row" :key="index" v-for="(item, index) in trainBestCrew.yesterday_best_team_sales">
                    <span class="col">{{ item.team_name }}</span>
                    <span class="col">{{ item.base_name }}</span>
                    <span class="col">￥{{ item.total_amount }}</span>
                    <span class="icon-dot"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--监控-->
        <div class="monitor" style="margin-top:0">
          <p class="title">订单监控</p>
          <div class="inner">
            <div class="content" style="display: block;">
              <div class="head">
                <span class="col">时间</span>
                <span class="col">车次</span>
                <span class="col">金额</span>
              </div>
              <swiper v-if="tableData.length > 1" class="marquee-view" ref="mySwiper" :options="swiperOptions">
                <swiper-slide class="marquee swiper-slide" :key="index" v-for="(arr, index) in tableData">
                  <div class="row" :key="jindex" v-for="(item, jindex) in arr">
                    <span class="col">{{ item.order_time }}</span>
                    <span class="col">{{ item.train }}</span>
                    <span class="col">￥{{ item.settlement }}</span>
                    <span class="icon-dot"></span>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
        <!--点位-->
        <div class="point panel">
          <div class="inner">
            <h3>今日各基地目标销售额完成率</h3>
            <div class="chart">
              <Bar ref="bar1" chartId="bar1"></Bar>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <!-- 用户 -->
        <div class="users panel">
          <div class="inner">
            <h3>今日销售额(元)</h3>
            <div class="number-rolling-wrap">
              <ul class="number-rolling">
                <li
                  :key="index"
                  v-for="(item, index) in numbers"
                  :class="{ 'number-item': !isNaN(item), com: isNaN(item) }"
                >
                  <div ref="numberItem" v-if="!isNaN(item)" class="number-list">
                    <span v-for="num in 10" :key="num">{{ num - 1 }}</span>
                  </div>
                  <template v-else>
                    {{ item }}
                  </template>
                </li>
                <span>元</span>
              </ul>
            </div>
            <div class="salTotal">
              昨日销售额 <span>{{ totalNumber }}元</span>
            </div>
            <div class="chart">
              <SaleComparPie ref="pieFull" chartId="salepie"></SaleComparPie>
            </div>
          </div>
        </div>

        <!-- 地图 -->
        <div class="map">
          <div class="chart">
            <div class="geo">
              <MapInfo ref="mapInfo" chartId="mapinfoid"></MapInfo>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="order panel">
          <div class="inner">
            <div class="c-title">
              <h3>商品品类销售额占比</h3>
              <div class="filter">
                <a
                  href="javascript:;"
                  @click="tabHandler(index)"
                  :key="index"
                  v-for="(item, index) in tab"
                  :class="{ active: item.active }"
                  >{{ item.name }}</a
                >
              </div>
            </div>

            <productCatoryPie chartId="saleCatoryPie" ref="saleCatoryPie"></productCatoryPie>
          </div>
        </div>
        <!-- 销售额 -->
        <div class="sales panel">
          <div class="inner">
            <div class="caption">
              <h3>近7日单车底销售额</h3>
              <div class="vnumlist" style="color:#fff">
                车底:<v-select
                  :value="selectVal"
                  @option:selected="changeHandler"
                  class="c-select"
                  :options="vtNumlist"
                  label="title"
                  :clearable="false"
                >
                  <template v-slot:option="option">
                    <span :class="option.icon"></span>
                    {{ option.title }}
                  </template>
                </v-select>
              </div>
            </div>

            <div class="chart">
              <Bar ref="bar2" chartId="bar2" />
            </div>
          </div>
        </div>
        <!-- 渠道 季度 -->

        <!-- 排行榜 -->
        <div class="top panel">
          <div class="inner">
            <h3>今日车底销售额 TOP10</h3>
            <div class="wrap-tab">
              <table>
                <thead>
                  <td>序号</td>
                  <td>车底</td>
                  <td>销售额</td>
                </thead>
                <tbody>
                  <tr :key="index + 1" v-for="(item, index) in vtNumlist1">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.v_tnum }}</td>
                    <td>￥{{ item.total_amount }}</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <td>序号</td>
                  <td>车底</td>
                  <td>销售额</td>
                </thead>
                <tbody>
                  <tr :key="index + 5" v-for="(item, index) in vtNumlist2">
                    <td>{{ index + 6 }}</td>
                    <td>{{ item.v_tnum }}</td>
                    <td>￥{{ item.total_amount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Select } from 'ant-design-vue';
import 'vue-select/dist/vue-select.css';

import api from '@/js/api';
import dayjs from 'dayjs';
import productCatoryPie from './components/productCatory.vue';
import Bar from './components/bar.vue';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import SaleComparPie from './components/pie.vue';
import MapInfo from './components/map';

export default {
  name: 'activeGuid',
  data() {
    return {
      date: '',
      time: '',
      week: '',
      totalNumber: 0,
      numbers: [0, '0', 0, 0, 0, ',', 0, 0, 0, '.', 0, 0],
      swiperOptions: {
        observer: true,
        observeParents: true,
        speed: 2000,
        autoplay: {
          delay: 1000, //1秒切换一次
          disableOnInteraction: false,
        },
        direction: 'vertical',
        loop: true,
      },
      tableData: [],
      trainBestCrew: {},
      selectVal: '',
      carNum: '',
      vtNumlist: [], //车底列表
      vtNumlist1: [], //车底前5
      vtNumlist2: [], //车底后5
      tab: [
        { name: '当日', active: true },
        { name: '上个月', active: false },
      ],
    };
  },
  components: { productCatoryPie, Bar, Swiper, SwiperSlide, SaleComparPie, MapInfo },
  methods: {
    draw() {
      this.$refs.mapInfo && this.$refs.mapInfo.drawMap();
    },
    changeHandler(val) {
      this.selectVal = val;
      this.getNumCompareList(val);
    },
    //今日车底销售前10
    todayVtnum10() {
      this.$get(api.getVtnum10).then(res => {
        if (res.error_code == 0) {
          this.vtNumlist1 = res.data.slice(0, 5);
          this.vtNumlist2 = res.data.slice(5, 10);
        }
      });
    },
    //获取车底列表
    getVtNumList() {
      this.$get(api.getVtNumList).then(res => {
        if (res.error_code == 0) {
          this.vtNumlist = res.data;
          this.selectVal = res.data[0];
          this.carNum = res.data[0];
          this.getNumCompareList(res.data[0]);
        }
      });
    },
    //获取近7日车底数据
    getNumCompareList(cnum) {
      this.$get(api.getNumCompareList(cnum)).then(res => {
        if (0 === res.error_code) {
          var a = [],
            i = [[], []];
          res.data.list.forEach(function(t) {
            a.unshift(t.riqi), i[0].unshift(t.v_tnum_amount), i[1].unshift(t.avg);
          }),
            this.$refs.bar2 &&
              this.$refs.bar2.drawBar2({
                xAx: a,
                series: i,
              });
        }
      });
    },
    //商品品类tab切换
    tabHandler(index) {
      let tabs = this.tab;
      tabs[0].active = false;
      tabs[1].active = false;
      tabs[index].active = true;
      this.tab = tabs;
      if (index == 0) {
        this.getProductCateSaleData();
      } else if (index == 1) {
        let str = dayjs()
          .startOf('month')
          .subtract(1, 'month');
        let start = str.format('YYYY-MM-DD');
        let end = str.endOf('month').format('YYYY-MM-DD');
        console.log(start, end);
        this.getProductCateSaleData(start, end);
      }
    },
    //获取商品分类数据
    getProductCateSaleData(start = undefined, end = undefined) {
      let current = dayjs().format('YYYY-MM-DD');
      if (!start && !end) {
        start = current;
        end = current;
      }
      this.$get(api.productCateSaleData(start, end)).then(res => {
        if (0 === res.code) {
          var arr = [];
          res.data.forEach(function(t) {
            arr.unshift({
              value: t.total,
              name: t.cate_name,
            });
          });
          this.$refs.saleCatoryPie && this.$refs.saleCatoryPie.drawPie(arr);
        }
      });
    },
    //近七日销售额统计
    getWeekSalesAmount() {
      this.$get(api.getWeekSalesAmount).then(res => {
        if (0 === res.error_code) {
          var arr = res.data,
            i = [],
            r = [[], [], [], [], []];
          arr.forEach(function(item) {
            i.unshift(
              item.riqi
                .replace('日', '')
                .replace('月', '.')
                .replace(/\b\d\b/g, '0$&'),
            ),
              r[0].unshift(item.cash_money),
              r[1].unshift(item.online_money),
              r[2].unshift(item.train_money),
              r[3].unshift(item.juhe_money),
              r[4].unshift(item.total_money);
          }),
            this.$refs.bar &&
              this.$refs.bar.drawBar({
                xAx: i,
                series: r,
              });
        }
      });
    },
    //今日各基地目标销售额完成率
    getTodayBaseSalesRate() {
      this.$get(api.getTodayBaseSalesRate).then(res => {
        if (0 === res.error_code) {
          var a = [],
            i = [[], []],
            r = [[], []];
          res.data.forEach(function(item) {
            a.unshift(item.base_name.split('基地')[0]),
              r[0].unshift(item.rate_amount),
              r[1].unshift(item.today_amount),
              i.unshift(item.rate.split('%')[0]);
          }),
            this.$nextTick(function() {
              this.$refs.bar1 &&
                this.$refs.bar1.drawBar1(
                  {
                    xAx: a,
                    series: i,
                  },
                  r,
                );
            });
        }
      });
    },
    //最佳销售组
    getTrainBestCrew() {
      this.$get(api.getTrainBestCrew).then(res => {
        if (res.error_code == 0) {
          this.trainBestCrew = res.data;
        }
      });
    },
    //监控数据
    getMonitorData() {
      this.$get(api.getMonitorData).then(res => {
        if (res.error_code == 0) {
          let arr = res.data.slice(0, 4);
          this.$nextTick(() => {
            this.tableData = [arr.slice(0, 2), arr.slice(2, 4)];
            this.swiper = new Swiper('.swiper-container', {
              autoplay: true,
              direction: 'vertical',
            });
          });
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
      console.log(str);
      for (var i = 0; i < str.length; i++) {
        numbers.push(str.charAt(i));
      }
      console.log(numbers);
      this.numbers = numbers;
      this.$set(this.$data, 'numbers', numbers);
      console.log(numbers);
      this.setNumberTransform();
    },
    //今天和昨天的销售数据
    getTodayYesterDayData() {
      var t = this;
      this.$get(api.getTodayYesterDayData).then(res => {
        if (0 === res.error_code) {
          this.number = res.data.total_money;
          this.totalNumber = res.data.yesterday_total_money;

          var arr = [
            {
              value: res.data.online_money,
              name: '线上收款',
            },
            {
              value: res.data.cash_money,
              name: '现金收款',
            },
            {
              value: res.data.train_money,
              name: '12306自营',
            },
            {
              value: res.data.juhe_money,
              name: '聚合收款',
            },
          ];
          this.$refs.pieFull && this.$refs.pieFull.drawPie(arr, res.data.yesterday_total_money, res.data.percent);
          this.buildData(this.number);
        }
      });
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
    this.getProductCateSaleData();
    this.getVtNumList();
    this.todayVtnum10();
    this.getWeekSalesAmount();
    this.getTodayBaseSalesRate();
    this.getTrainBestCrew();
    this.getMonitorData();
    this.getTodayYesterDayData();
  },
  mounted() {
    this.draw();
    this.timer = setInterval(() => {
      //近七日销售额统计
      this.getWeekSalesAmount();
      //获取近7日车底数据
      this.carNum && this.getNumCompareList(this.carNum);
      //今日各基地目标销售额完成率
      this.getTodayBaseSalesRate();

      //商品分类销售额占比
      this.getProductCateSaleData();

      this.getTrainBestCrew();

      this.getWeekSalesAmount();
    }, 10000);
    this.timer1 = setInterval(() => {
      this.getMonitorData();
      this.getTodayYesterDayData();
    }, 1700);
    this.timer2 = setInterval(() => {
      this.date = dayjs().format('YYYY-MM-DD');
      this.time = dayjs().format('HH:mm:ss');
      this.week = this.getWeekDate();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  },
};
</script>
<style lang="scss" scoped>
.main-wrap {
  min-width: 1024px;
  width: 100%;
  min-height: 780px;
  height: 100vh;
  background: url(https://img.gaolvzongheng.com/img-static/bggz.719ddabd718ea652.png);
  background-size: 100% 100%;
  position: relative;
  .dateTime {
    background: url(https://img.gaolvzongheng.com/img-static/top_bg.d492097930c00dd7.png) no-repeat 0 0 / contain;
    width: 100%;
    background-size: 100% 100%;
    height: cn(125);
    color: #76e4ff;
    position: absolute;
    top: 0;
    text-align: center;
    font-size: cn(20);
    z-index: 9999;
    line-height: cn(185);
    span {
      display: inline-block;
      margin: 0 cn(12);
    }
  }
}
.number-rolling-wrap {
  margin-top: cn(18);
}
.number-rolling {
  display: flex;
  justify-content: center;
  align-items: baseline;
  height: cn(35);
  .com {
    display: inline-block;
    font-size: cn(26);
    font-weight: 700;
    color: #89eaff;
  }
  .number-item {
    position: relative;
    display: inline-block;
    width: cn(40);
    height: 100%;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAABBCAYAAAHZHKYuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEIyNkY0NDJDN0Y4MTFFQTk2MkVGMzEyQ0RDMjVCNjUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEIyNkY0NDFDN0Y4MTFFQTk2MkVGMzEyQ0RDMjVCNjUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTgyODNEMEZCMTJDMTFFQThGRjJFMzlCRTBGQzA1RDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTgyODNEMTBCMTJDMTFFQThGRjJFMzlCRTBGQzA1RDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6KLp4/AAAELklEQVR42mJUOfL/PwMWwPL3+2+G+1U7/NAlmP58/olNAwPTrw/fsEv8/vAdh453OCT+fMQh8RuH5YwMEYcfMTAysqCJ/wcIIEZcHmRkMN3kiy6o2OaxiQmb6j+ffjBglfj9EYfEr/ffcUl8wy7xB5dRv7/8ADo38shTsLMZQd6Ce+IvQAAxKu//+/9u2VY/BiKAcrfXJqY/X38xEAtAapl+Az1PLACHx28cKQGrhg9ADaDAIhb8evcVaMP7byQ66TOJfvjz5TcJofSTASCAMBMaIpIgbCQaa+LDBZgYSACjikcVU0UxC4OK0HSwJuQCBzv4BxCA1nKpARCIgWhpCCcEcAc5BDPowAxBATrwwX66LVs07FTAy0ubmbRbbrVnvzZqPPOxnqy5EGKscmFw53KJGHiJQmwxY8yjmwfBwEOGwzFrkSrN/hVBDlq5rCBz/c1BcOeyvoKDo0JkweOfQOYpA7slKfXeXjQOU/O1SKFPAFrMEAeBIIainWEUBonAohAknICDcIu9GhLJOVAcg+0vbXcEISSY+WLNij8/v2+2P1v2dy8z5aPIlK9iU368/6vssUCuzVz7MY1dFtvL6bw+7g5VYITATaC2qgaMx9DFLcV1vPOI2g8o1WZQYolE3DktFhcnDNRyoOF8VoK4pxHOMRNQ1OWG0pxHNBRaApJsXBznnRZG5iEMWuYeC9L5CxTnkpwrYRMFLRkLw7mLwymsYGTukATiHM7RxcG6RLwPly0D5aAYtEg4Jy1oBIqkBS00WlwTiDrHGKghFwalWgikXyLS9hdWtcjeorAsohTnatoy89H9vMgmQI+/wc/evuso4/m0dnsLUK215DQMxFA7mSUbVkhsOQFcgBtwAK4BJ0OC03CT1jbjz6RpQEIsIvpmUTVpZuJa9pv3XtLJv9qa49PC83l1bPVp3zzp01xb5vlJ49MVY9bp3vSDqji/+/a3DDLXkaN9tEEVP1/fn+jCx83z/ePVw+2LKs9tD4671yhJ0SHR5kZi9Js7eDEj274Hz9yc/f9JvP5zxj3RHQ85Mg5TLMVtPfOZcZChrrI6Zbbj1HdmD9xQalyTUvQ/0PwLgxRLoEqQ2wrcGCRwSbpPyl4qAtOcQ3gG+9QDDo6HTDlItGTRZpCcSzanGVeNQ2Vcg8A1F+QgG2duQD1ezcA7HILgeDSmlwtN6fQbSs5dgHu8XDWOs+VbGE427STGd8Vxr/FpyhpHQcNhlFFk/IDDxwPHe7zadOA4SqmkkW08Ox/HwfF4MCFJClu4t4TFDo21hAThCIlQbN6cCoTjZU0UqogC1birfImSKc2JsnWmPeGw2Dz1MNKtDCEKL1iBatxfzkhfxco7REGV8XhcZQmc767fjLaG8zjatu/abmYa84bdvF7Dq9DybdvN/OWK5RydrcKbu5aR7QxF5PgFg4pcLsCqshkAAAAASUVORK5CYII=)
      no-repeat 50%/100% 100%;
    font-size: cn(26);
    line-height: cn(35);
    font-weight: 700;
    color: #89eaff;
    overflow: hidden;
    // -webkit-box-shadow: 0 0 5px 0 rgb(0 150 255 / 60%);
    //box-shadow: 0 0 5px 0 rgb(0 150 255 / 60%);
    .number-list {
      position: absolute;
      top: 0;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      -webkit-transition: 0.3s ease-in-out;
      transition: 0.3s ease-in-out;
      margin: 0 0 0.5vh;
      span {
        display: block;
      }
    }
  }
}
.number-rolling > li {
  margin: 0 0.7%;
}

.trainInfo {
  color: #fff;
  font-size: cn(18);
  display: flex;
  flex-wrap: wrap;
  margin-left: cn(-20);
  margin-bottom: cn(5);
  .item {
    box-sizing: border-box;
    display: flex;
    width: 50%;
    margin-left: cn(20);
    height: 4.44vh;
    line-height: 4.44vh;
    text-align: center;
    font-size: 0.73vw;
    color: #fff;
    -webkit-box-shadow: 0 0 0.4vw 0.16vw #0a4598;
    box-shadow: 0 0 0.4vw 0.16vw #0a4598;
    border: 1px solid #69a9ff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 1.56vw;
    overflow: hidden;
    cursor: pointer;
    flex: 1;
  }
  .item:last-child {
    margin-right: 0;
  }
}
.bestSale {
  box-sizing: content-box;
  padding: cn(10) cn(18);
  color: #fff;
  -webkit-box-shadow: 0 0 0.4vw 0.16vw #0a4598;
  box-shadow: 0 0 0.4vw 0.16vw #0a4598;
  border: 1px solid #69a9ff;
  font-size: 0.73vw;
  margin-top: cn(22);
  table {
    width: 100%;
    td {
      text-align: center;
      line-height: cn(18);
    }
  }
}
body {
  line-height: 1.15;
  font-size: 0.5rem;
  margin: 0;
  padding: 0;
}
.viewport {
  /* 限定大小 */
  min-width: 1024px;
  width: 100%;
  min-height: 780px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  padding: 3.667rem 0.833rem 0;
}
.column {
  flex: 3;
  position: relative;
  display: flex;
  flex-flow: column;
}
.column:nth-child(2) {
  flex: 4;
  margin: 1.333rem 0.833rem 0;
}
.panel {
  /* 边框 */
  box-sizing: border-box;
  border: 2px solid red;
  border-image: url(../../asset/images/border.png) 51 38 21 132;
  border-width: 2.125rem 1.583rem 0.875rem 5.5rem;
  position: relative;
  margin-bottom: 0.833rem;
}
.panel .inner {
  /* 装内容 */
  /* height: 60px; */
  position: absolute;
  top: -2.125rem;
  right: -1.583rem;
  bottom: -0.875rem;
  left: -5.5rem;
  padding: 1rem 1.5rem;
}
.panel h3 {
  font-size: 0.833rem;
  color: #fff;
}
/* 概览区域 */
.overview {
  height: 12rem;
}

.overview h4 {
  font-size: 1.167rem;
  padding-left: 0.2rem;
  color: #fff;
  margin-bottom: 0.333rem;
}
.overview span {
  font-size: 0.667rem;
  color: #4c9bfd;
}
/* 监控 */
.monitor {
  -webkit-box-shadow: 0 0 0.4vw 0.16vw #0a4598;
  box-shadow: 0 0 0.4vw 0.16vw #0a4598;
  border: 1px solid #69a9ff;
  height: 4.43rem;
  box-sizing: border-box;
  position: relative;
  color: #fff;
  padding: cn(10) cn(18);
  margin-top: cn(22);
  margin-bottom: cn(22);
  .title {
    padding-bottom: cn(5);
  }
}
.monitor .inner {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
}
.monitor .tabs {
  padding: 0 1.5rem;
  margin-bottom: 0.75rem;
}
.monitor .tabs a {
  color: #1950c4;
  font-size: 0.75rem;
  padding: 0 1.125rem;
}

.monitor .tabs a:first-child {
  border-right: 0.083rem solid #00f2f1;
  padding-left: 0;
}

.monitor .tabs a.active {
  color: #fff;
}
.monitor .content {
  flex: 1;
  display: none;
  position: relative;
}
.monitor .head {
  padding: 0 1.5rem;
  color: #fff;
  font-size: cn(14);
  display: flex;
  justify-content: space-between;
  line-height: 1.05;
}
.monitor .col:nth-child(1) {
  width: 3.2rem;
  text-align: center;
}
.monitor .col:nth-child(2) {
  width: 8.4rem;
  /* 不换行  一行省略*/
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.monitor .col:nth-child(3) {
  width: 3.2rem;
  text-align: center;
}
.monitor .marquee-view {
  position: absolute;
  top: 0.8rem;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  height: cn(40);
}
.bestSale .marquee-view {
  position: inherit;
  top: 0;
  height: cn(65);
}

.monitor .row {
  line-height: 1;
  padding: 0.14rem 1.5rem;
  color: #fff;
  font-size: cn(14);
  position: relative;
  display: flex;
  justify-content: space-between;
}
.monitor .row:hover {
  color: #fff;
}
.monitor .row:hover .icon-dot {
  opacity: 1;
}

.monitor .icon-dot {
  position: absolute;
  left: 0.64rem;
  opacity: 0;
}

.monitor .row:hover .icon-dot {
  opacity: 1;
}

.monitor .icon-dot {
  position: absolute;
  left: 0.64rem;
  opacity: 0;
}
/* ------------------------------------------------------------动画 */
@keyframes row {
  0% {
  }
  100% {
    transform: translateY(-50%);
  }
}
/* 调用动画 */
.monitor .marquee {
  /* //infinite永久调用动画 */
  // animation: row 10s linear infinite;
}
/*鼠标划入 停止动画  */
.monitor .marquee:hover {
  animation-play-state: paused;
}
/* 点位 */
.point {
  flex: 1;
}
.point .chart {
  height: 90%;
}

.point h4 {
  margin-bottom: 0.5rem;
  font-size: 1.167rem;
  color: #fff;
}
.point span {
  display: block;
  color: #4c9bfd;
  font-size: 0.667rem;
}
/* 地图  */
.map {
  flex: 1;
  margin-bottom: 0.833rem;
  display: flex;
  flex-direction: column;
}
.map h3 {
  line-height: 1;
  padding: 0.667rem 0;
  margin: 0;
  font-size: 0.833rem;
  color: #fff;
}
.map .icon-cube {
  color: #68d8fe;
}
.map .chart {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.05);
}
.map .geo {
  width: 100%;
  height: 100%;
}
/* 用户模块 */
.users {
  color: #ffffff;
  height: cn(440);
  display: flex;
  .salTotal {
    display: flex;
    font-size: cn(18);
    margin-top: cn(12);
    font-weight: bold;
    justify-content: center;
    span {
      display: inline-block;
      margin-left: cn(40);
      color: #4c9bfd;
    }
  }
}
.users .chart {
  margin-top: cn(-20);
  display: flex;
  height: cn(280);
}

.users h4 {
  margin-bottom: 0.5rem;
  font-size: 1.167rem;
  color: #fff;
}

/* 订单 */
.order {
  height: cn(300);
}
.order .c-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.order .filter {
  margin-left: cn(12);
  display: flex;
}
.order .filter a {
  display: block;
  height: 0.75rem;
  line-height: 1;
  padding: 0 0.75rem;
  color: #1950c4;
  font-size: 0.7rem;
  border-right: 0.083rem solid #00f2f1;
}
.order .filter a:first-child {
  padding-left: 0;
}
.order .filter a:last-child {
  border-right: none;
}
.order .filter a.active {
  color: #fff;
  font-size: 0.7rem;
}

.order h4 {
  font-size: 1.167rem;
  color: #fff;
  margin-bottom: 0.217rem;
}

/* 销售区域 */
.sales {
  flex: 1;
}
.sales .caption {
  display: flex;
  line-height: 1;
  align-items: center;
}
.sales .vnumlist {
  margin-left: cn(12);
  display: flex;
  align-items: center;
  width: cn(220);
}
.sales h3 {
  height: 0.75rem;
  padding-right: 0.75rem;
  border-right: 0.083rem solid #00f2f1;
}
.sales a {
  padding: 0.167rem;
  font-size: 0.667rem;
  margin: -0.125rem 0 0 0.875rem;
  border-radius: 0.125rem;
  color: #0bace6;
}
.sales a.active {
  background-color: #4c9bfd;
  color: #fff;
}
.sales .inner {
  display: flex;
  flex-direction: column;
}
.sales .chart {
  flex: 1;
  padding-top: 0.6rem;
  position: relative;
}
.sales .label {
  position: absolute;
  left: 1.75rem;
  top: 0.75rem;
  color: #4996f5;
  font-size: 0.583rem;
}
.sales .line {
  width: 100%;
  height: 100%;
}

/* 季度区块 */

/* 排行榜 */
.top {
  height: cn(230);
  .wrap-tab {
    padding-top: cn(12);
    color: #fff;
    display: flex;
    font-size: cn(14);
    table {
      flex: 1;
      position: relative;
      tbody td {
        height: cn(22);
        line-height: cn(22);
      }
      text-align: center;
    }
    table:first-child::after {
      content: '';
      display: inline-block;
      width: 1px;
      background: #fff;
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
    }
    table:first-child {
      padding-right: cn(12);
    }
    table:last-child {
      padding-left: cn(12);
    }
  }
}

.clock {
  position: absolute;
  top: -1.5rem;
  right: 1.667rem;
  font-size: 0.833rem;
  color: #0bace6;
}
.clock i {
  margin-right: 5px;
  font-size: 0.833rem;
}
@media screen and (max-width: 1600px) {
  .top span {
    transform: scale(0.9);
  }
  .top .province ul.sup li {
    padding: 0.4rem 0.5rem;
  }
  .top .province ul.sub li {
    padding: 0.23rem 0.5rem;
  }
  .quarter span {
    transform: scale(0.9);
  }
}
</style>
<style scoped lang="scss">
.c-select {
  width: cn(160);
}

/deep/.vs__dropdown-menu {
  -webkit-box-shadow: 0 0 8px 3px #0b4291;
  box-shadow: 0 0 8px 3px #0b4291;
  border: 1px solid #6989ff;
  background: #002156;
  color: #fff;
  left: cn(10);
  width: cn(100);
}
/deep/.vs__dropdown-option {
  color: #fff;
}
/deep/.vs__dropdown-menu::-webkit-scrollbar {
  width: 4px;
  height: 6px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  background-color: hsla(0, 0%, 100%, 0.15);
}
/deep/.vs__dropdown-menu::-webkit-scrollbar-thumb {
  background-color: hsla(0, 0%, 100%, 0.5);
  border-radius: 10px;
}
/deep/.vs__dropdown-menu::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px hsl(0deg 0% 100% / 15%);
  // box-shadow: inset 0 0 6px hsl(0deg 0% 100% / 15%);
  border-radius: 10px;
}
/deep/.vs__dropdown-option--highlight {
  background: rgba(10, 67, 188, 0.2);
}
/deep/.vs__dropdown-toggle {
  margin-left: cn(10);
  border: 1px solid #6989ff;
  -webkit-box-shadow: 0 0 8px 3px #0b4291;
  box-shadow: 0 0 8px 3px #0b4291;
}
/deep/.vs__selected {
  color: #fff;
}
/deep/.vs__open-indicator {
  fill: rgba(43, 69, 243, 0.8);
}
</style>
