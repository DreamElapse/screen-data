<template>
  <div class="top-content">
    <div class="b1"></div>
    <div class="topList">
      <div class="wrapBoday">
        <div class="tr" :key="index" v-for="(item, index) in list[0]">
          <div class="td">
            <img v-if="index == 0" src="https://img.gaolvzongheng.com/img-static/p1.3e3b4538f6ebb710.png" />
            <img v-else-if="index == 1" src="https://img.gaolvzongheng.com/img-static/p2.127f24035c3c1400.png" />
            <img v-else-if="index == 2" src="https://img.gaolvzongheng.com/img-static/p3.6ec4f168f1dfb9f5.png" />
            <template v-else>{{ index + 1 }}</template>
          </div>
          <!-- <div class="td">{{ item.belongBureau == 0 ? "南昌" : "广州" }}</div> -->
          <div class="td">{{ item.diningTrainNo }}</div>
          <!-- <div class="td">{{ toThousands(item.orderNum) }}</div> -->
          <div class="td">￥{{ toThousands(item.amount) }}</div>
          <!-- <div class="td">
          <div class="process">
            <div class="inner" :style="{ width: item.rate + '%' }"></div>
          </div>
          {{ item.rate.toFixed(1) }}%
        </div> -->
        </div>
      </div>
      <div class="wrapBoday">
        <div class="tr" :key="index" v-for="(item, index) in list[1]">
          <div class="td">
            {{ index + 6 }}
          </div>
          <!-- <div class="td">{{ item.belongBureau == 0 ? "南昌" : "广州" }}</div> -->
          <div class="td">{{ item.diningTrainNo }}</div>
          <!-- <div class="td">{{ toThousands(item.orderNum) }}</div> -->
          <div class="td">￥{{ toThousands(item.amount) }}</div>
          <!-- <div class="td">
          <div class="process">
            <div class="inner" :style="{ width: item.rate + '%' }"></div>
          </div>
          {{ item.rate.toFixed(1) }}%
        </div> -->
        </div>
      </div>
    </div>
    <div class="b2"></div>
  </div>
</template>
<script>
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
  components: {},
  computed: {},
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
.top-content {
  display: flex;
  flex-flow: column;
  height: 100%;
  .b1 {
    width: 100%;
    flex: 43;
  }
  .b2 {
    width: 100%;
    flex: 16;
  }
}
.topList {
  display: flex;
  flex: 196;
  .wrapBoday {
    flex: 1;
    padding: 0 cn(30);
    height: 100%;
    overflow-y: hidden;
    display: flex;
    flex-flow: column;
    // margin-bottom: cn(12);
    .tr {
      display: flex;
      flex: 42;
      //margin-bottom: n(13);

      .td {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

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
  .wrapBoday:first-child {
    border-right: rgba($color: #fff, $alpha: 0.2) dashed 1px;
  }
  .up_down {
    display: flex;
    align-items: center;
    justify-content: center;
    width: n(152);
    margin: 0 auto;
    height: n(52);
    font-size: n(24);
    color: #fff;
    //margin-top: n(40);
    border: n(2) solid rgba($color: #fff, $alpha: 0.2);
    border-radius: n(10);
    img {
      margin-left: n(3);
      width: n(18);
      height: n(18);
    }
  }
}
</style>
