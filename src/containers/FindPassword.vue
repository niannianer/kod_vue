<template>
    <div class="find-password" ref="login">
        <div class="form">
            <div class="form-item" flex>
                <label class="label" for="phone" flex-box="0">手机号</label>
                <input class="input" type="tel" name="phone" id="phone" flex-box="1"
                       v-model.trim="investorMobile"
                       autocomplete="off" placeholder="请输入手机号">
            </div>
            <div class="form-item" flex>
                <label class="label" for="yzm" flex-box="0">验证码</label>
                <input class="input" type="text" name="yzm" id="yzm" flex-box="1"
                       v-model.trim="verifyCode"
                       autocomplete="off" placeholder="请输入验证码">
                <button flex-box="0" class="btn-default btn-code" @click.stop="getVerify"
                        v-if="verifyTimeLeft<=0">{{verifyText}}
                </button>
                <button flex-box="0" class="btn-default btn-code" v-else>{{verifyTimeLeft}}</button>
            </div>

            <div class="form-item" flex v-if="imageCode">
                <label class="label" for="imageCode" flex-box="0">校验码</label>
                <input class="input" type="text" name="imageCode" id="imageCode" flex-box="1"
                       v-model="inputCode"
                       autocomplete="off" placeholder="请输入校验码">
                <button flex-box="0" class="btn-default btn-text">{{imageCode}}</button>
            </div>

            <div class="form-item" flex>
                <label class="label" for="password" flex-box="0">重设密码</label>
                <input class="input" type="password" name="password" id="password" flex-box="1"
                       v-model.trim="userLoginPassword"
                       autocomplete="off" placeholder="请设置6-20位数字或字母密码">
            </div>


        </div>

        <div class="btn-group">
            <button class="btn-primary btn-register" @click.stop="resetPassword">重置</button>

        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import $api from '../tools/api';
    import '../less/find-password.less';
    export default {
        name: 'find-password',
        data(){
            return {
                investorMobile: '',
                verifyCode: '',
                userLoginPassword: '',
                inputCode: '',
                imageCode: '',
                verifyText: '获取验证码',
                verifyTimeLeft: 0,
                timer: null
            }
        },
        created(){
        },
        computed: {},
        methods: {
            checkPhone(){
                if (!this.investorMobile) {
                    Toast('手机号不能为空');
                    return false;
                }
                let reg = /^1[3|4|5|7|8]\d{9}$/;
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
                    Toast('请输入正确的登录密码（6~20位数字和字母）');
                    return false;
                }
                let regD = /^\d*$/;
                if (regD.test(this.userLoginPassword)) {
                    Toast('请输入正确的登录密码（6~20位数字和字母）');
                    return false;
                }
                let regW = /^[a-zA-Z]*$/;
                if (regW.test(this.userLoginPassword)) {
                    Toast('请输入正确的登录密码（6~20位数字和字母）');
                    return false;
                }
                return true;
            },
            getVerify(){
                if (!this.checkPhone()) {
                    return false
                }
                if (this.imageCode && !this.inputCode) {
                    Toast('请输入图形验证码');
                    return false;
                }
                let {investorMobile} = this;
                let imageCode = this.inputCode;
                let bussType = 1;
                this.verifyTimeLeft = 60;
                this.timeCount();
                this.verifyText = '重新发送';
                $api.get('/sendVerifyCode', {investorMobile, imageCode, bussType})
                    .then(data => {
                        if (data.code == 200) {
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
                            Toast('图片验证码错误!');
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
            resetPassword(){
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
                let {investorMobile, verifyCode, userLoginPassword} = this;
                $api.post('/resetUserPassword', {investorMobile, verifyCode, userLoginPassword})
                    .then(data => {
                        if (data.code == 200) {
                            let logoutUrl = window.sessionStorage.getItem('logoutUrl');
                            window.sessionStorage.removeItem('logoutUrl');
                            logoutUrl = decodeURIComponent(logoutUrl);
                            if (logoutUrl && /http/.test(logoutUrl)) {
                                window.location.replace(logoutUrl);
                            } else {
                                this.$router.replace('/personal-center');
                                this.$store.dispatch('getAccountBaofoo');
                                this.$store.dispatch('getBankInfo');
                                this.$store.dispatch('getUserInfo');
                            }
                            return false;
                        }
                        if (data.code == 1002) {
                            Toast('验证码错误');
                            return false;
                        }
                        if (data.code == 1003) {
                            Toast('注册人手机号不存在');
                            return false;
                        }
                        Toast(data.msg);
                    });
            }
        },
        mounted(){
            let heigth = window.innerHeight;
            this.$refs.login.style.height = heigth+'px';
        },
        destroyed(){

        }
    }
</script>
