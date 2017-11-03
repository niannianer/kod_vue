<template>
    <div class="login" ref="login">
        <div class="logo-warp">
            <img class="logo" src="../images/logo.png" />
        </div>
        <div class="title">金疙瘩</div>

        <div class="form">
            <label for="username">
                <div class="input-warp" flex>
                    <img flex-box="0" class="phone" src="../images/login/phone_icon1@2x.png" />
                    <input type="tel" flex-box="1" v-model.trim="username" placeholder="请输入手机号" class="input" id="username" />
                    <div flex="main:right cross:center">
                        <img class="input-img" src="../images/login/pwd-show@2x.png" />
                    </div>
                </div>
            </label>
            <label for="password">
                <div class="input-warp" flex>
                    <img flex-box="0" class="phone" src="../images/login/key_icon@2x.png" />
                    <input v-if="showPassword" type="text" class="input" flex-box="1" id="password" placeholder="请输入密码" v-model.trim="password"
                    />
                    <input v-else type="password" class="input" placeholder="请输入密码" flex-box="1" id="password1" v-model.trim="password" />
                    <div class="pass" flex="main:right cross:center" @click.stop="showPassword=!showPassword">
                        <img class="show-hide" v-if="showPassword" src="../images/login/pwd-show@2x.png" />
                        <img class="show-hide" src="../images/login/pwd-hide@2x.png" v-else/>
                    </div>

                </div>
            </label>
            <label for="image-code" class="label-warp" flex v-if="imageCode">
                <div class="code-warp" flex-box="1">
                    <input id="image-code" class="input" v-model.trim="inputCode" placeholder="请输入图形校验码" />
                </div>
                <div class="image-warp" flex-box="0">
                    {{imageCode}}
                </div>
            </label>
        </div>

        <div class="btn-warp">
            <button class="btn-primary btn-login" @click.stop="login">登 录</button>
        </div>
        <!--footer -->
        <div class="footer" flex>
            <span class="link" flex-box="1" @click.stop="pathTo('/register')">立即注册</span>
            <router-link class="link" flex-box="1" :to="{path:'/find-password'}" replace>忘记密码</router-link>
        </div>
    </div>
</template>
<script>
    import { Toast } from "mint-ui";
    import $api from "../tools/api";
    import "../less/login.less";
    export default {
      name: "login",
      data() {
        return {
          username: "",
          password: "",
          showPassword: false,
          passType: "password",
          imageCode: "",
          inputCode: ""
        };
      },
      created() {

      },
      computed: {},
      methods: {
        checkPhone() {
          if (!this.username) {
            Toast("请输入手机号码");
            return false;
          }
          let reg = /^1[3|4|5|7|8]\d{9}$/;
          if (!reg.test(this.username)) {
            Toast("请输入正确的手机号码");
            return false;
          }
          return true;
        },
        checkPassword() {
          let regStr = /^[a-zA-Z0-9]{6,20}$/;
          if (!this.password) {
            Toast("请输入密码");
            return false;
          }
          if (!regStr.test(this.password)) {
            Toast("请输入正确的登录密码（6~20位数字和字母）");
            return false;
          }
          let regD = /^\d*$/;
          if (regD.test(this.password)) {
            Toast("请输入正确的登录密码（6~20位数字和字母）");
            return false;
          }
          let regW = /^[a-zA-Z]*$/;
          if (regW.test(this.password)) {
            Toast("请输入正确的登录密码（6~20位数字和字母）");
            return false;
          }
          return true;
        },
        login() {
          if (this.checkPhone() && this.checkPassword()) {
            if (this.imageCode && !this.inputCode) {
              Toast("请输入图形验证码");
              return false;
            }
            let investorMobile = this.username;
            let userLoginPassword = this.password;
            let imageCode = this.inputCode;
            $api.post("/login", {
                investorMobile,
                userLoginPassword,
                imageCode
              })
              .then(data => {
                if (data.code == 1109) {
                  Toast("该手机号已被禁用，如有疑问请联系客服。");
                  return false;
                }
                if (data.code == 1103) {
                  Toast("该手机号未注册，快去注册吧！");
                  return false;
                }
                if (data.code == 1004) {
                  Toast(data.msg);
                  this.imageCode = data.data.imageCode;
                  return false;
                }
                if (data.code == 200) {
                  let logoutUrl = window.sessionStorage.getItem("logoutUrl");
                  window.sessionStorage.removeItem("logoutUrl");
                  window.sessionStorage.removeItem("logoutIndex");
                  logoutUrl = decodeURIComponent(logoutUrl);
                  if (logoutUrl && /http/.test(logoutUrl)) {
                    window.location.replace(logoutUrl);
                  } else {
                    this.$store.dispatch("getAccountBaofoo");
                    this.$store.dispatch("getBankInfo");
                    this.$store.dispatch("getPersonalCenterMsg");
                    this.$router.replace("/personal-center");
                  }
                  return false;
                } else {
                  Toast(data.msg);
                }
              });
          }
        },
        pathTo(path) {
          if (path == "/register") {
            let event = ["_trackEvent", "注册", "SHOW", "从登录页进入注册页", "从登录页进入注册页"];
            window._hmt.push(event);
          }
          this.$router.replace(path);
        }
      },
      mounted() {
        let heigth = window.innerHeight;
        this.$refs.login.style.height = heigth + "px";
      }
    };
</script>
