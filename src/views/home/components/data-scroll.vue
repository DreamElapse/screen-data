<template>
  <div class="topList">
    <div class="head">
      <div class="item">排行</div>
      <div class="item">商品名称</div>
      <div class="item">所属分类</div>
      <div class="item">销售数量</div>
      <div class="item">销售金额</div>
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
            <img v-if="index == 0" :src="num1" />
            <img v-else-if="index == 1" :src="num2" />
            <img v-else-if="index == 2" :src="num3" />
            <span class="list-num" v-else>{{ index + 1 }}</span>
          </div>
          <div class="td">{{ item.name }}</div>
          <div class="td">{{ item.cate }}</div>
          <div class="td">{{ item.num }}</div>
          <div class="td">¥{{ toThousands(item.money) }}</div>
        </div>
      </cssSeamlessScroll>
    </div>
  </div>
</template>
<script>
import cssSeamlessScroll from 'vue-seamless-scroll';
import num1 from '@/asset/images/num_1.png'
import num2 from '@/asset/images/num_2.png'
import num3 from '@/asset/images/num_3.png'

export default {
  data() {
    return {
      num1,
      num2,
      num3
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
        step: 0.2, // 数值越大速度滚动越快
        //limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        //hoverStop: false, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        // openWatch: false, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1 可以是任何大于0的数值
        //singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  methods: {
    toThousands(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
  },
};
</script>
<style lang="scss" scoped>
.topList {
  // height: 100%;
  padding: 0 cn(30);
  display: flex;
  flex-flow: column;
  flex: 160;
  overflow: hidden;
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
      width: cn(120);
    }
    .item:nth-child(1) {
      width: cn(42);
    }
    
  }
  .wrapBoday {
    display: flex;
    flex: 120;
    overflow-y: hidden;
    height: 0;
    flex-flow: column;
    .wrap-list {
      height: cn(170);
      height: 100%;
      overflow: hidden;
    }
    .tr {
      display: flex;
      //margin-bottom: n(13);
      .td {
        display: flex;
        align-items: center;
        justify-content: center;
        height: cn(42.5);
        height: 3.4vh;
        width: cn(120);
        color: rgba($color: #fff, $alpha: 1);
        font-size: cn(14);
        font-family: PingFang SC;
        font-weight: 500;
        img {
          width: cn(24);
          height: cn(24);
        }
        .list-num{
          width: cn(24);
          height: cn(24);
          border: 2px solid #045489;
          border-radius: 100%;
          text-align: center;
          background: #04225E;
        }
      }
      .td:nth-child(1) {
        width: cn(42);
      }
    }
    .tr:nth-child(2n-1) {
        background: url("../../../asset/images/row_bg.png") repeat-x;
      }
  }
  .b2 {
    flex: 12;
  }
}
</style>
