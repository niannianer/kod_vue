<template>
    <div class="register" ref="register">
        <div class="form">
            <div class="form-item" flex>
                <label class="label" for="phone" flex-box="0">手机号</label>
                <input class="input" type="tel" name="phone" id="phone" flex-box="1"
                       v-model.trim="investorMobile"
                       maxlength="11"
                       autocomplete="off" placeholder="请输入手机号">
            </div>
            <div class="form-item" flex v-if="imageCode">
                <label class="label" for="imageCode" flex-box="0">校验码</label>
                <input class="input" type="text" name="imageCode" id="imageCode" flex-box="1"
                       v-model="inputCode"
                       autocomplete="off" placeholder="请输入校验码">
                <button flex-box="0" class="btn-default btn-code">{{imageCode}}</button>
            </div>
            <div class="form-item" flex>
                <label class="label" for="yzm" flex-box="0">验证码</label>
                <input class="input" type="tel" name="yzm" id="yzm" flex-box="1"
                       v-model.trim="verifyCode"
                       autocomplete="off" placeholder="请输入验证码">
                <button flex-box="0" class="btn-primary btn-code" @click.stop="getVerify"
                        v-if="verifyTimeLeft<=0">{{verifyText}}
                </button>
                <button flex-box="0" class="btn-default btn-text" v-else>{{verifyTimeLeft}}</button>
            </div>


            <div class="form-item" flex>
                <label class="label" for="password" flex-box="0">设置密码</label>
                <input class="input" type="password" name="password" id="password" flex-box="1"
                       v-model.trim="userLoginPassword"
                       autocomplete="off" placeholder="请设置6-20位密码,需包含数字和字母">
            </div>

            <div class="form-item" flex>
                <label class="label" for="invitation" flex-box="0">邀请人</label>
                <input class="input" type="tel" name="invitation" id="invitation" flex-box="1"
                       v-model.trim="inviterPhone"
                       autocomplete="off" placeholder="请输入邀请人手机号（非必填）">
            </div>
        </div>
        <div class="agreement">
            <!--  <span class="box" :class="{'active':ischecked}" @click.stop="ischecked=!ischecked"></span>-->
            <p class="info">我已阅读并同意
                <span class="link" @click.prevent="link('/registration-service-agreement.html')">
                    《注册服务协议》
                </span>和
                <span class="link" @click.prevent="link('/privacy-agreement.html')">
                《隐私协议》
                </span>
            </p>

        </div>

        <div class="btn-group">
            <button class="btn-primary btn-register" @click.stop="register">注册</button>

            <button class="btn-default btn-login" @click.stop="login">已有账号请登录</button>
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    import $api from '../tools/api';
    import $device from '../tools/device';
    import '../less/register.less';
    export default{
        name: 'register',
        data(){
            return {
                investorMobile: '',
                verifyCode: '',
                userLoginPassword: '',
                inviterPhone: '',
                inputCode: '',
                imageCode: '',
                verifyText: '获取验证码',
                verifyTimeLeft: 0,
                ischecked: true,
                timer: null
            }
        },
        created(){
            this.addHive(1, 'register',1032);
            let event = ['_trackEvent', '注册', 'SHOW', '进入注册页面', '进入注册页面'];
            window._hmt.push(event);

        },
        methods: {
            checkPhone(){
                if (!this.investorMobile) {
                    Toast('手机号不能为空');
                    return false;
                }
                let reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
                if (!reg.test(this.investorMobile)) {
                    Toast('请输入正确的手机号码');
                    return false;
                }
                return true;
            },
            checkInviter(){
                let reg = /^1[3|4|5|7|8]\d{9}$/;
                if (!reg.test(this.inviterPhone)) {
                    Toast('请输入正确的邀请人手机号');
                    return false;
                }
                return true;
            },
            checkPassword(){
                let regStr = /^[a-zA-Z0-9]{6,20}$/;
                if (!this.userLoginPassword) {
                    Toast('请输入密码');
                    return false;
                }
                if (!regStr.test(this.userLoginPassword)) {
                    Toast('请输入正确的密码（6~20位数字和字母）');
                    return false;
                }
                let regD = /^\d*$/;
                if (regD.test(this.userLoginPassword)) {
                    Toast('请输入正确的密码（6~20位数字和字母）');
                    return false;
                }
                let regW = /^[a-zA-Z]*$/;
                if (regW.test(this.userLoginPassword)) {
                    Toast('请输入正确的密码（6~20位数字和字母）');
                    return false;
                }
                return true;
            },
            getVerify(){
                this.addHive(0, 'register_btn_getVerify',103201);
                let event = ['_trackEvent', '注册', 'CLICK', '注册页面获取验证码', '注册-获取验证码'];
                window._hmt.push(event);
                if (!this.checkPhone()) {
                    return false
                }
                if (this.imageCode && !this.inputCode) {
                    Toast('请输入图形验证码');
                    return false;
                }
                let {investorMobile} = this;
                let imageCode = this.inputCode;
                let bussType = 0;
                this.verifyTimeLeft = 59;
                this.timeCount();
                this.verifyText = '重新发送';
                $api.post('/sendVerifyCode', {investorMobile, imageCode, bussType})
                    .then(data => {
                        if (data.code == 200) {
                            this.imageCode ='';
                            this.inputCode='';
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
                        if (data.code == 1113) {
                            Toast('该手机号已注册，可直接登录!');
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
            login(){
                this.addHive(0, 'register_btn_login',103202);
                this.addHive(2, 'register_to_login',1032);
                let event = ['_trackEvent', '注册', 'CLICK', '注册页面点击登录', '注册页面点击登录'];
                window._hmt.push(event);
                this.$router.replace('/login');
            },
            register(){
                this.addHive(0, 'register_btn_register',103203);
                let event = ['_trackEvent', '注册', 'CLICK', '在注册页面点击注册按钮', '注册-点击注册'];
                window._hmt.push(event);
                if (!this.checkPhone()) {
                    return false;
                }
                if (!this.verifyCode) {
                    Toast('请输入短信验证码');
                    return false;
                }
                if (!this.checkPassword()) {
                    return false;
                }
                if (this.inviterPhone && !this.checkInviter()) {
                    return false;
                }
                let {investorMobile, verifyCode, userLoginPassword} = this;
                let params = {investorMobile, verifyCode, userLoginPassword};
                if (this.inviterPhone) {
                    params.inviterPhone = this.inviterPhone;
                }
                params.registerSharePageType = window.localStorage.getItem('registerSharePageType') || '';
                params.registerActivityBatch = window.localStorage.getItem('registerActivityBatch') || '';
                params.registerChannelCode = window.localStorage.getItem('registerChannelCode') || 'H5_weixin';
                params.registerDeviceOs = $device.os + '-' + $device.osVersion;

                $api.post('/regist', params)
                    .then(data => {
                        if (data.code == 200) {
                            let logoutUrl = window.sessionStorage.getItem('logoutUrl');
                            window.sessionStorage.removeItem('logoutUrl');
                            logoutUrl = decodeURIComponent(logoutUrl);
                            let event = ['_trackEvent', '注册', 'SHOW', '在注册页面注册成功', '注册-注册成功'];
                            window._hmt.push(event);
                            if (logoutUrl && /http/.test(logoutUrl)) {
                                window.location.replace(logoutUrl);
                            } else {
                                this.addHive(2, 'register_to_personalCenter',1032);
                                this.$router.replace('/personal-center');
                                this.$store.dispatch('getAccountBaofoo');
                                this.$store.dispatch('getPersonalCenterMsg');
                                this.$store.dispatch('getBankInfo');
                            }
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
            link(src){
                this.addHive(0, 'register_link_deal',103204);
                this.addHive(2, 'register_to_deal',1032);
                let event = ['_trackEvent', '注册', 'CLICK', '在注册页面点击协议', '注册-点击协议'];
                window._hmt.push(event);
                window.location.href = src;
            }

        },
        mounted(){
            let heigth = window.innerHeight;
            this.$refs.register.style.height = heigth + 'px';
        },
        destroyed(){
            this.clearTimeCount();
        }
    }
</script>
