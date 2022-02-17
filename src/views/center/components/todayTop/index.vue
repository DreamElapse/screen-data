<template>
  <div class="topList">
    <div class="b1"></div>
    <div class="head">
      <div class="item">排行</div>
      <div class="item">车次</div>
      <div class="item">下单量(单)</div>
      <div class="item">销售(元)</div>
      <div class="item">占比</div>
    </div>
    <div class="wrapBoday">
      <cssSeamlessScroll
        :class-option="defaultOption"
        v-if="list.length > 0"
        ref="cssScroll"
        :data="list"
        class="wrap-list"
      >
        <div class="tr" :key="index" v-for="(item, index) in list">
          <div class="td">
            <img v-if="index == 0" src="https://img.gaolvzongheng.com/img-static/p1.3e3b4538f6ebb710.png" />
            <img v-else-if="index == 1" src="https://img.gaolvzongheng.com/img-static/p2.127f24035c3c1400.png" />
            <img v-else-if="index == 2" src="https://img.gaolvzongheng.com/img-static/p3.6ec4f168f1dfb9f5.png" />
            <template v-else>{{ index + 1 }}</template>
          </div>
          <!-- <div class="td">{{ item.belongBureau == 0 ? "南昌" : "广州" }}</div> -->
          <div class="td">{{ item.diningTrainNo }}</div>
          <div class="td">{{ toThousands(item.orderNum) }}</div>
          <div class="td">{{ toThousands(item.amount) }}</div>
          <div class="td">
            <div class="process">
              <div class="inner" :style="{ width: item.rate + '%' }"></div>
            </div>
            {{ item.rate.toFixed(1) }}%
          </div>
        </div>
      </cssSeamlessScroll>
    </div>
    <div class="b2"></div>
    <!-- <div class="up_down" @click="openHandler">
      <span>{{ !open ? '更多' : '收缩' }}</span>
      <img v-if="!open" src="https://img.gaolvzongheng.com/img-static/open.db18b31885a07f76.png" />
      <img v-else src="https://img.gaolvzongheng.com/img-static/closeOpen.e39ba6e218b5f0d9.png" />
    </div> -->
  </div>
</template>
<script>
import cssSeamlessScroll from 'vue-seamless-scroll';

export default {
  data() {
    return {
      open: false,
    };
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    cssSeamlessScroll,
  },
  computed: {
    defaultOption() {
      return {
        step: 0.7, // 数值越大速度滚动越快
        //limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        //hoverStop: false, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        // openWatch: false, // 开启数据实时监控刷新dom
        //singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        //singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  methods: {
    toThousands(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    openHandler() {
      this.open = !this.open;
    },
  },
};
</script>
<style lang="scss" scoped>
.topList {
  height: 100%;
  padding: 0 cn(30);
  display: flex;
  flex-flow: column;
  .b1 {
    flex: 36;
  }
  .head {
    display: flex;
    font-size: cn(14);
    // font-family: Microsoft YaHei;
    color: #92b8fb;
    flex: 40;
    font-weight: 500;
    align-items: center;
    .item {
      text-align: center;
    }
    .item:nth-child(1) {
      width: cn(40);
    }
    .item:nth-child(2) {
      width: cn(120);
    }
    .item:nth-child(3) {
      flex: 1;
    }
    .item:nth-child(4) {
      flex: 1;
    }
    .item:nth-child(5) {
      width: cn(120);
    }
  }
  .wrapBoday {
    display: flex;
    flex: 170;
    overflow-y: hidden;
    height: 0;
    flex-flow: column;
    .wrap-list {
      height: cn(170);
    }
    .tr {
      display: flex;

      //margin-bottom: n(13);
      .td {
        display: flex;
        align-items: center;
        justify-content: center;
        height: cn(42.5);
        color: rgba($color: #fff, $alpha: 1);
        font-size: cn(14);
        font-family: PingFang SC;
        font-weight: 500;
        img {
          width: cn(24);
          height: cn(24);
        }
      }
      .td:nth-child(1) {
        width: cn(40);
      }
      .td:nth-child(2) {
        width: cn(120);
      }
      .td:nth-child(3) {
        flex: 1;
      }
      .td:nth-child(4) {
        flex: 1;
      }
      .td:nth-child(5) {
        justify-content: space-between;
        width: cn(120);
        .process {
          width: cn(70);
          height: cn(6);
          border-radius: cn(3);
          background: rgba($color: #f6f6f6, $alpha: 0.1);
          overflow: hidden;
          .inner {
            height: cn(6);
            border-radius: cn(3);
            background: linear-gradient(270deg, #2c6ae7 0%, #57a3f5 100%);
          }
        }
      }
    }
  }
  .b2 {
    flex: 12;
  }
}
</style>
