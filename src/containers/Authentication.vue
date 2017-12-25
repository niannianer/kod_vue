<template>
    <div class="authentication" flex-box="1" @click.stop="showCard=false">
        <div class="authentication-lint">为保障您账号安全，请进行实名认证</div>
        <div class="steps" flex="box:mean">
            <div class="item" flex="main:center">
                <span class="round active" :class="{'app':isApp}">1</span>
                <div class="line-right active" :class="{'app':isApp}"></div>
            </div>
            <div class="item" flex="main:center">
                <span class="round">2</span>
                <div class="line-left"></div>
                <div class="line-right"></div>
            </div>
            <div class="item" flex="main:center">
                <span class="round">3</span>
                <div class="line-left"></div>
            </div>

        </div>
        <dl class="authentication-input">
            <dd flex>
                <span class="span-left">真实姓名</span>
                <div class="span-right" flex="cross:center">
                    <input type="text" placeholder="请输入您的真实姓名" v-model="userName">
                </div>
            </dd>
            <dd flex @click.stop="showCard=true">
                <span class="span-left">身份证号</span>
                <div class="span-right" flex="cross:center">
                    <input type="text" placeholder="请输入您的身份证号码" v-model="userIdCardNumber" readonly>
                </div>
            </dd>
        </dl>
        <div class="authentication-bottom">
            <div class="authentication-btn">
                <button @click.stop="btnAction" :class="{'app':isApp}">下一步</button>
            </div>
            <div class="auth-text">个人信息由公安部认证</div>
        </div>
        <div class="authentication-win" v-show="popup">
            <div class="win-box" flex="dir:top">
                <div class="win-content" flex-box="1">
                    <p class="hint1">请输入验证码进行验证</p>
                    <p class="hint2"><span>已发送验证码到注册手机</span></p>
                    <dl flex="main:justify">
                        <dt>
                            <input type="text" placeholder="请输入验证码" v-model="smsCode" maxlength="6">
                        </dt>
                        <dd>
                            <button :class="{'active':btnActive,'app':isApp}" @click.stop="transmit">{{btnText}}
                            </button>
                        </dd>
                    </dl>
                    <div class="close" flex="main:center cross:center" @click.stop="curse">×</div>
                </div>
                <div class="win-btn" flex-box="0" flex>
                    <button flex-box="1" class="sure" :class="{'app':isApp}" @click.stop="sure" :disabled="loading">确定
                    </button>
                </div>

            </div>
        </div>
        <card-input v-show="showCard"
                    title="请输入身份证号码"
                    @close="showCard=false"
                    @callBack="getCardText"></card-input>
        <div flex="dir:right">
            <div class="customer-service" @click.stop="callService"></div>
        </div>

    </div>
</template>

<script>
    import '../less/authentication.less';
    import $api from '../tools/api';
    import $device from '../tools/device';
    import {mapState} from 'vuex';
    import $fun from '../tools/fun';
    import {Toast} from 'mint-ui';
    import CardInput from '../components/CardInput';
    import {telNumber} from '../tools/config';
    import requestHybrid from '../tools/hybrid';
    export default {
        name: 'authentication',
        data(){
            return {
                userName: '',
                userIdCardNumber: '',
                popup: false,
                btnActive: true,
                loading: false,
                smsCode: '',
                btnText: '获取验证码',
                nextClick: true,
                flag: true,
                showCard: false
            };
        },
        components: {
            CardInput
        },
        created(){
            let event = ['_trackEvent', '实名认证', 'SHOW', '进入实名认证页面', '进入实名认证页面'];
            window._hmt.push(event);
            this.addHive(1, 'authentication',1005);
        },
        computed: {
            ...mapState([
                    'investorMobile',
                    'userId'
                ]
            ),
            isApp(){
                return true;
            }
        },
        methods: {
            //下一步
            btnAction(){
                this.addHive(0, 'authentication_btn_next',100501);
                if (!this.nextClick) {
                    return
                }
                this.nextClick = false;
                setTimeout(() => {
                    this.nextClick = true;
                }, 2000);

                let {userName, userIdCardNumber} = this;
                if (!$fun.valiRealName(userName)) {
                    Toast({
                        message: '请输入真实姓名',
                        duration: 5000
                    });
                    return
                }
                if (!$fun.valiIdCard(userIdCardNumber)) {
                    Toast({
                        message: '请输入正确身份证号',
                        duration: 5000
                    });
                    return
                }
                let event = ['_trackEvent', '实名认证', 'CLICK', '实名认证页面-点击下一步', '实名认证页面-点击下一步'];
                window._hmt.push(event);
                this.getAccount();
            },
            //提交数据
            getAccount(){
                this.addHive(0, 'authentication_btn_submit',100502);
                let {userName, userIdCardNumber, smsCode} = this;
                let data = {
                    userName: userName, userIdCardNumber: userIdCardNumber
                }
                if (this.popup) {
                    data = {
                        userName: userName, userIdCardNumber: userIdCardNumber, smsCode: smsCode
                    }
                }
                $api.post('/openAccount', data).then(msg => {

                    if (msg.code == 200) {
                        Toast({
                            message: '身份认证成功！',
                            duration: 5000
                        });
                        this.popup = false;

                        setTimeout(() => {

                            this.$store.dispatch('getUserInfo');
                            this.$router.replace('/bind-bank-card');
                        }, 1000);
                    } else if (msg.code == 8003) {
                        //弹窗
                        this.popup = true;
                        this.smsCode = '';
                        this.btnText = '获取验证码';
                        this.btnActive = true;
                        let event = ['_trackEvent', '实名认证', 'SHOW', '实名认证监测到已在其他商户开户', '实名认证监测到已在其他商户开户'];
                        window._hmt.push(event);
                        this.transmit();
                    } else {
                        Toast({
                            message: msg.msg,
                            duration: 5000
                        });
                    }
                });
            },
            //下发按钮
            transmit(){
                this.addHive(0, 'authentication_btn_sms',100503);
                if (this.btnActive) {
                    $api.get('/sendBaofooAuthSMS', {type: 2}).then(msg => {
                        if (msg.code != 200) {
                            Toast({
                                message: msg.msg,
                                duration: 5000
                            });
                            this.btnText = '获取验证码';
                            this.btnActive = true;
                            this.flag = false;
                        }
                    });
                    //下发验证码
                    this.send(120);
                }
            },
            //确定
            sure(){
                this.addHive(0, 'authentication_ensure',100504);
                if (this.smsCode.length >= 4) {
                    this.getAccount();
                } else {
                    Toast({
                        message: '请输入正确验证码！',
                        duration: 5000
                    });
                }
            },
            //取消
            curse(){
                this.popup = false;
                this.nextClick = true;
                //this.flag = false;
            },
            //下发验证码
            send(time){
                this.flag = true;
                this.btnActive = false;
                let timer;
                let recursion = () => {
                    if (this.flag) {
                        if (time <= 1) {
                            this.btnText = '重新获取';
                            this.btnActive = true;
                        } else {
                            time--;
                            this.btnText = '(' + time + 's)';
                            timer = setTimeout(recursion, 1000);
                        }
                    } else {
                        clearTimeout(timer);
                    }
                };
                recursion();
            },
            // 获取数字键盘的身份证号
            getCardText(text){
                this.userIdCardNumber = text;
            },
            callService(){
                this.addHive(0, 'authentication_btn_call',100505);
                if ($device.kingold) {
                    requestHybrid({
                        tagname: 'tel',
                        param: {
                            callService: telNumber
                        }
                    })
                    return false
                }
                if ($device.mobile) {
                    window.open('tel:' + telNumber.replace(/-/g, ''));
                }
            }
        }
    }
</script>
