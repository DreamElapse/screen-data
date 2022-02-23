<template>
  <div class="wrap">
    <div class="login-wrap">
      <div class="login-cont">
        <div class="title">用户登录 / User login</div>
        <div class="inputWrap">
          <div class="input-box">
            <div class="icon name-icon"></div>
            <input type="text" v-model="username" placeholder="这里是用户名" />
          </div>
          <div class="input-box">
            <div class="icon pwd-icon"></div>
            <input type="password" v-model="password" placeholder="请输入密码" />
          </div>
          <div class="submit" @click="login">登录</div>
        </div>
      </div>
    </div>
    <div class="footer">北京高旅纵横科技有限公司</div>
  </div>
</template>
<script>
import md5 from 'js-md5';
import api from '@/js/api';
import { Toast } from 'vant';

export default {
  data() {
    return {
      username: '',
      password: '',
      loging: false
    };
  },
  methods: {
    login() {
      if (!this.username) {
        Toast('请输入用户名');
        return;
      }
      if (!this.password) {
        Toast('请输入用户密码');
        return;
      }
      if(this.loging) return
      this.loging = true
      setTimeout(() => {
        this.loging = false
      }, 1500)
      this.$post(api.LOGIN, {
        username: this.username,
        password: md5(this.password),
      }).then(res => {
        if (res.code === 100000) {
          sessionStorage.setItem('Token', res.data.token);
          sessionStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
          this.$router.push({ name: 'home' });
        } else {
          this.$message.error(res.msg, 3);
        }
      })

      // this.$post(api.login, {
      //   userName: this.username,
      //   password: md5(this.password),
      //   clientType: 1,
      // }).then(res => {
      //   let data = res;
      //   if (data.code === 100000) {
      //     sessionStorage.setItem('Token', data.data);
      //     this.$router.push({ name: 'home' });
      //   } else if (data.code === 301039) {
      //     this.$message.error('账号无权限，请联系管理员授权');
      //   } else {
      //     this.$message.error(data.msg);
      //   }
      // });
    },
  },
  beforeCreate() {},
  created() {
    let token = sessionStorage.getItem('Token');
    if (token) {
      this.$router.push({ name: 'home' });
    }
  },
  mounted() {},
};
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100vh;
  // background: url('https://img.gaolvzongheng.com/img-static/login11.dab03d83485c3965.jpg?x-oss-process=image/resize,p_100/format,webp/quality,q_80')
  //   no-repeat top center;
  background: url('https://img.gaolvzongheng.com/img-static/login_bg22.164e003e8147a493.png') no-repeat top center;
  background-size: cover;
  position: relative;
  overflow: hidden;
  .login-wrap {
    position: absolute;
    width: cn(1200);
    //margin: 0 auto;
    height: cn(600);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    //margin-top: cn(236);
    // background: url('https://img.gaolvzongheng.com/img-static/loginborder.b38a161f6cb71dda.png?x-oss-process=image/resize,p_100/format,webp/quality,q_80')
    //   no-repeat center;
    background: url('https://img.gaolvzongheng.com/img-static/loginborder2.8a8275f4fd43c723.png') no-repeat center;
    background-size: 100%;
    position: relative;
    .login-cont {
      width: cn(300);
      top: cn(146);
      right: cn(91);
      position: absolute;
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: cn(24);
      color: #00a7f7;
      // margin-top: cn(30);
      margin-bottom: cn(60);
      .split {
        width: cn(14);
        height: cn(14);
        background: rgba(216, 216, 216, 0);
        border: 1px solid #84e6ff;
        rotate: 30;
        margin: 0 cn(10);
        transform: rotate3d(0, 0, 1, 45deg);
      }
    }
    .inputWrap {
      width: cn(300);

      margin: 0 auto;
      margin-top: cn(30);
      .input-box {
        display: flex;
        align-items: center;
        width: cn(300);
        height: cn(50);
        margin-bottom: cn(28);
        border: 2px solid rgba($color: #039ff2, $alpha: 0.5);
        background: rgba($color: #1e5ac6, $alpha: 0.1);
        border-radius: cn(4);

        .icon {
          width: cn(27);
          height: cn(27);
          margin: 0 cn(16);
        }
        .name-icon {
          background: url(https://img.gaolvzongheng.com/img-static/user111.f68eee512e01a854.png) no-repeat center;
          background-size: cover;
        }
        .pwd-icon {
          background: url(https://img.gaolvzongheng.com/img-static/pwd11.0c83df77b7365c40.png) no-repeat center;
          background-size: cover;
        }
        input {
          background: transparent;
          border: 0;
          width: cn(240);
          font-size: cn(14);
          line-height: cn(50);
          font-weight: 400;

          height: 100%;
          color: #fff;
        }
        ::-webkit-input-placeholder {
          color: rgba(255, 255, 255, 0.8);
          background: transparent !important;
        }
        input:-webkit-autofill {
          -webkit-text-fill-color: #cef7ff !important;
          -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
          background-color: transparent;
          background-image: none;
          transition: background-color 50000s ease-in-out 0s;
        }
      }
      .submit {
        width: cn(300);
        height: cn(50);
        margin: 0 auto;
        text-align: center;
        line-height: cn(50);
        font-weight: 400;
        font-size: cn(20);
        color: #fff;
        cursor: pointer;
        margin-top: cn(40);
        border: cn(2) solid rgba($color: #039ff2, $alpha: 0.5);
        border-radius: cn(4);
        background: #006aff;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: cn(39);
    font-size: cn(14);
    font-weight: 400;
    color: #ffffff;
    line-height: 36px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
