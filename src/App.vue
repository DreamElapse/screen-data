<template>
  <div id="app" class="overflow">
    <router-view />
  </div>
</template>

<script>
//import { pageResize } from '@/js/resetScreenSize';

export default {
  name: 'app',
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {
    // pageResize();
  },
};
</script>
<style>
/* @import 'ant-design-vue/dist/antd.css'; */
</style>
<style lang="scss" scoped>
#app {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  width: 100vw;
  //height: 100vh;
  // overflow: hidden;
  overflow-x: hidden;
  padding-top: constant(safe-area-inset-top); //为导航栏+状态栏的高度 88px
  padding-left: constant(safe-area-inset-left); //如果未竖屏时为0
  padding-right: constant(safe-area-inset-right); //如果未竖屏时为0
  padding-bottom: constant(safe-area-inset-bottom); //为底下圆弧的高度 34px
}
</style>
