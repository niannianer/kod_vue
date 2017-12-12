<template>
    <div class="login">
        <div class="header" flex="box:mean">
            <p class="p" @click.stop="checkType('pass')" :class="{'active':!isCodeType}">密码登录</p>
            <p class="p" @click.stop="checkType('code')" :class="{'active':isCodeType}">验证码登录</p>
        </div>
        <div class="body">
            <div class="form">
                <label for="username">
                    <div class="input-warp" flex="cross:center">
                        <img flex-box="0" class="phone" src="../images/login/phone_icon1@2x.png"/>
                        <input type="tel" flex-box="1"
                               v-model.trim="username"
                               placeholder="请输入手机号码"
                               class="input" id="username" @keyup="change"/>
                        <div flex="main:right cross:center">
                            <img class="input-img" src="../images/login/pwd-show@2x.png"/>
                        </div>
                    </div>
                </label>
                <label for="password" v-if="!isCodeType">
                    <div class="input-warp" flex="cross:center">
                        <img flex-box="0" class="phone" src="../images/login/key_icon@2x.png"/>
                        <input v-if="showPassword" type="text" class="input" flex-box="1" id="password"
                               placeholder="请输入密码"
                               v-model.trim="password"/>
                        <input v-else type="password" class="input"
                               placeholder="请输入密码"
                               flex-box="1" id="password1" v-model.trim="password"/>
                        <div class="pass" flex="main:right cross:center" @click.stop="showPassword=!showPassword">
                            <img class="show-hide" v-if="showPassword" src="../images/login/pwd-show@2x.png"/>
                            <img class="show-hide" src="../images/login/pwd-hide@2x.png" v-else/>
                        </div>
                    </div>
                </label>
                <label for="verifycode" v-else flex>
                    <div class="input-warp" flex="cross:center" flex-box="1">
                        <img flex-box="0" class="phone" src="../images/login/key_icon@2x.png"/>
                        <input type="tel" class="input"
                               placeholder="请输入验证码" id="verifycode"
                               flex-box="1" v-model.trim="verifyCode"/>

                    </div>
                    <button flex-box="0" @click.stop="getVerify"
                            v-if="verifyTimeLeft<=0" class="btn-code">{{verifyText}}
                    </button>
                    <button flex-box="0" class="btn-code disable" v-else>{{verifyTimeLeft}}</button>
                </label>
                <label for="image-code" class="label-warp" flex v-if="imageCode">
                    <div class="code-warp" flex-box="1" flex="cross:center">
                        <input id="image-code" class="input"
                               v-model.trim="inputCode"
                               placeholder="请输入图形校验码"/>
                    </div>
                    <div class="image-warp" flex-box="0">
                        {{imageCode}}
                    </div>
                </label>
            </div>
            <div flex="box:justify" class="oper-box">
                <p @click.stop="pathTo('/register')">注册新用户</p>
                <p></p>
                <p @click.stop="pathTo('/find-password')">忘记密码？</p>
            </div>
        </div>
        <div class="bottom">
            <p class="btn" @click.stop="login" v-if="!isCodeType">登录</p>
            <p class="btn" @click.stop="smsLogin" v-if="isCodeType">登录</p>
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    import $api from '../tools/api';
    import '../less/login.less';
    export default {
        name: 'login',
        data(){
            return {
                username: '',
                password: '',
                showPassword: false,
                imageCode: '',
                inputCode: '',
                isCodeType: false,
                verifyCode: '',
                verifyTimeLeft: '',
                verifyText: '获取验证码'

            }
        },
        created(){
            console.log(this.$route.query.type);
            this.isCodeType = !!Number(this.$route.query.type);
        },
        computed: {},
        methods: {
            change(){
                if (this.username.length < 6) {
                    console.log(this.username.length)
                    this.username = this.username.replace(/(^(\d{3})(\d+))/, ($1, $2, $3, $4) => {
                        return $3 + ' ' + $4;
                    });
                } else {
                    console.log('sss')
                    this.username = this.username.replace(/(^(\d{3})\s(\d{4})(\d+))/, ($1, $2, $3, $4, $5) => {
                        return $3 + ' ' + $4 + ' ' + $5;
                    });
                }


                /*  newNum = newNum.replace(/\s+/g, "");//去除空格方法
                 document.getElementById("cellphoneNumber1").value = newNum;*/
                /*this.username = this.username.replace(/\D/g, '').replace(/...(?!$)/g, '$& ');
                 console.log(this.username)*/
            },
            checkType(str){
                this.isCodeType = str == 'code';
                this.imageCode = '';
                this.inputCode = '';
            },
            getVerify(){
                if (!this.checkPhone()) {
                    return false
                }
                if (this.imageCode && !this.inputCode) {
                    Toast('请输入图形验证码');
                    return false;
                }
                let imageCode = this.inputCode;
                let bussType = 4;
                /*bussType 4  短信登录*/
                this.verifyTimeLeft = 59;
                this.timeCount();
                this.verifyText = '重新发送';
                let investorMobile = this.username.replace(/\D/g, '');
                $api.post('/sendVerifyCode', {
                    investorMobile,
                    imageCode,
                    bussType
                })
                    .then(data => {
                        if (data.code == 200) {
                            this.imageCode = '';
                            this.inputCode = '';
                            return false;
                        }
                        else {
                            this.clearTimeCount();
                        }
                        if (data.code == 1001) {
                            Toast('验证码错发送失败!');
                            return false;
                        }
                        if (data.code == 1004) {
                            if (this.inputCode) {
                                Toast('图片验证码错误!');
                            } else {
                                Toast('请输入图片验证码!');
                            }

                            this.imageCode = data.data.imageCode;
                            return false;
                        }

                        Toast(data.msg);
                    })

            },
            timeCount(){
                this.timer = setTimeout(() => {
                    this.verifyTimeLeft = this.verifyTimeLeft - 1;
                    if (this.verifyTimeLeft >= 1) {
                        this.timeCount();
                    }
                }, 1000);
            },
            clearTimeCount(){
                this.verifyTimeLeft = 0;
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            checkPhone(){
                if (!this.username) {
                    Toast('请输入手机号码');
                    return false;
                }
                let reg = /^1[3|4|5|7|8]\d{9}$/;
                if (!reg.test(this.username.replace(/\D/g, ''))) {
                    Toast('请输入正确的手机号码');
                    return false;
                }
                return true;
            },
            checkPassword(){
                let regStr = /^[a-zA-Z0-9]{6,20}$/;
                if (!this.password) {
                    Toast('请输入密码');
                    return false;
                }
                if (!regStr.test(this.password)) {
                    Toast('请输入正确的登录密码（6~20位数字和字母）');
                    return false;
                }
                let regD = /^\d*$/;
                if (regD.test(this.password)) {
                    Toast('请输入正确的登录密码（6~20位数字和字母）');
                    return false;
                }
                let regW = /^[a-zA-Z]*$/;
                if (regW.test(this.password)) {
                    Toast('请输入正确的登录密码（6~20位数字和字母）');
                    return false;
                }
                return true;
            },
            login(){
                this.addHive(0, 'login_btn_login');
                if (this.checkPhone() && this.checkPassword()) {
                    if (this.imageCode && !this.inputCode) {
                        Toast('请输入图形验证码');
                        return false;
                    }
                    let investorMobile = this.username.replace(/\D/g, '');
                    let userLoginPassword = this.password;
                    let imageCode = this.inputCode;
                    $api.post('/login', {
                        investorMobile,
                        userLoginPassword,
                        imageCode
                    }).then(data => {
                        if (data.code == 1109) {
                            Toast('该手机号已被禁用，如有疑问请联系客服。');
                            return false;
                        }
                        if (data.code == 1103) {
                            Toast('该手机号未注册，快去注册吧！');
                            return false;
                        }
                        if (data.code == 1004) {
                            Toast(data.msg);
                            this.imageCode = data.data.imageCode;
                            return false;
                        }
                        if (data.code == 200) {
                            this.loginSucc();
                            return false;
                        } else {
                            Toast(data.msg);
                        }

                    });
                }

            },
            smsLogin(){
                if (!this.checkPhone()) {
                    return false;
                }
                if (!this.verifyCode) {
                    Toast('请输入短信验证码');
                    return false;
                }
                let investorMobile = this.username.replace(/\D/g, '');
                $api.post('/smsLogin', {
                    investorMobile,
                    smsCode: this.verifyCode
                })
                    .then(data => {
                        if (data.code == 200) {
                            this.loginSucc();
                            return false;
                        }
                        if (data.code == 1002) {
                            Toast('验证码错误或失效');
                            return false;
                        }
                        if (data.code == 1101) {
                            Toast('注册人手机号已经存在,请直接登录');
                            return false;
                        }
                        if (data.code == 1102) {
                            Toast('邀请人手机号不存在');
                            return false;
                        }
                        Toast(data.msg);
                    });
            },
            pathTo(path){
                if (path == '/register') {
                    let event = ['_trackEvent', '注册', 'SHOW', '从登录页进入注册页', '从登录页进入注册页'];
                    window._hmt.push(event);
                    this.addHive(2, 'login_to_register');
                }
                this.$router.replace(path)
            },
            loginSucc(){
                let logoutUrl = window.sessionStorage.getItem('logoutUrl');
                window.sessionStorage.removeItem('logoutUrl');
                window.sessionStorage.removeItem('logoutIndex');
                logoutUrl = decodeURIComponent(logoutUrl);
                if (logoutUrl && /http/.test(logoutUrl)) {
                    window.location.replace(logoutUrl);
                } else {

                    this.$store.dispatch('getAccountBaofoo');
                    this.$store.dispatch('getBankInfo');
                    this.$store.dispatch('getPersonalCenterMsg').then((resp) => {
                        if (resp.code == 200) {
                            //做过风险评估，调用查询风险评估数据
                            if (resp.data.user.investorRiskScore != 0) {
                                this.$store.dispatch('getRiskInfo');
                            }
                        }
                    });
                    this.$store.dispatch('getAccountInfo');
                    this.$store.dispatch('getPaymentInfo');
                    this.$router.replace('/personal-center');

                }
            }

        }
    }
</script>
