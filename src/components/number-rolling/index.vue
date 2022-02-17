<template>
  <div class="number-rolling-wrap">
    <ul class="number-rolling" :style="{ height: fontSize, color: color }">
      <li
        :key="index"
        v-for="(item, index) in numbers"
        :class="{ 'number-item': !isNaN(item), com: isNaN(item) }"
        :style="{
          // fontSize: !isNaN(item) ? fontSize : 18 / 24 + 'rem',
          fontSize: fontSize,
          height: fontSize,
          lineHeight: fontSize,
          // fontFamily: !isNaN(item) ? fontFamily : 'inherit',
          fontWeight: fontWeight,
          color: color,
          width: !isNaN(item) ? swidth : 'auto',
        }"
      >
        <div ref="numberItem" v-if="!isNaN(item)" class="number-list" :class="itemClass">
          <span v-for="num in 10" :key="num">{{ num - 1 }}</span>
        </div>
        <template v-else>
          {{ item }}
        </template>
      </li>
      <!-- <li
        :style="{
          fontSize: fontSize,
          height: fontSize,
          lineHeight: fontSize,
          width: !isNaN(item) ? swidth : 'auto',
        }"
        class="number-item"
      >
        %
      </li> -->
    </ul>
  </div>
</template>
<script>
//import { nextTick } from '@vue/runtime-core';
export default {
  data() {
    return {
      numbers: [0, '0', 0, 0, 0, 0, 0, 0, 0, 0],
    };
  },
  props: {
    itemClass: {
      type: String,
      default: 'itemClass',
    },
    size: {
      type: Number,
      default: 72,
    },
    width: {
      type: Number,
      default: 50,
    },
    number: {
      type: Number,
      default: 1000233,
    },
    fontFamily: {
      type: String,
      default: 'customeFont',
    },
    fontWeight: {
      type: [String, Number],
      default: 'bold',
    },
    color: {
      type: String,
      color: '#fff',
    },
  },
  // setup(props) {
  //   return {

  //   };
  // },
  computed: {
    fontSize() {
      return this.size / 24 + 'rem';
    },

    swidth() {
      return this.width / 24 + 'rem';
    },
  },
  watch: {
    number() {
      this.buildData(this.number);
    },
  },
  methods: {
    toThousands(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    //buildData
    buildData(num) {
      let arr = num.toString().split('.');
      let str = '';
      if (arr[1]) {
        str = this.toThousands(arr[0]) + '.' + arr[1];
      } else {
        str = this.toThousands(arr[0]);
      }

      let numbers = [];
      for (var i = 0; i < str.length; i++) {
        numbers.push(str.charAt(i));
      }
      this.$nextTick(() => {
        this.numbers = numbers;
        this.setNumberTransform();
      });
    },
    setNumberTransform() {
      this.$nextTick(() => {
        console.log(this.numbers);
        const numberItems = document.getElementsByClassName(this.itemClass);
        // 拿到数字的ref，计算元素数量
        const numberArr = this.numbers.filter(item => !isNaN(item)); // 结合CSS 对数字字符进行滚动,显示订单数量
        console.log(numberArr);
        for (let index = 0; index < numberItems.length; index++) {
          const elem = numberItems[index];
          elem.style.transform = `translateY( -${numberArr[index] * 10}%)`;
        }
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.buildData(this.number);
    });
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: customeFont;
  src: url('../../scss/custome.ttf') format('truetype'), url('../../scss/custome2.eot') format('embedded-opentype');
}
// @font-face {
//   font-family: googleMedium;
//   src: url("../../scss/GoogleSans-Medium.ttf");
// }
// @font-face {
//   font-family: googleRegular;
//   src: url("../../scss/GoogleSans-Regular.ttf");
// }
.number-rolling-wrap {
  // display: inline-block;
  //margin-top: n(18);
}
.number-rolling {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: n(72);
  color: #fff;
  font-family: customeFont;
  .com {
    display: inline-block;
    font-size: cn(18);
    font-weight: 700;
    width: auto;
    //font-family: googleBold;
  }
  .number-item {
    position: relative;
    display: inline-block;
    width: n(50);
    height: n(72);
    font-size: n(72);
    line-height: n(72);
    font-weight: bold;
    font-family: customeFont;
    overflow: hidden;
    // -webkit-box-shadow: 0 0 5px 0 rgb(0 150 255 / 60%);
    //box-shadow: 0 0 5px 0 rgb(0 150 255 / 60%);
    .number-list {
      position: absolute;
      top: 0;
      -webkit-transition: 0.3s ease-in-out;
      transition: 0.3s ease-in-out;
      //margin: 0 0 0.5vh;
      span {
        display: block;
      }
    }
  }
}
.number-rolling > li {
  //margin: 0 0.7%;
}
</style>
