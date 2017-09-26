<template>
    <div class="authentication" flex-box="1">
        <div class="authentication-lint">为保护您账号安全，请进行实名认证</div>
        <div class="authentication-input">
            <div flex>
                <span class="span-left">真实姓名</span>
                <div class="span-right" flex="cross:center">
                    <input type="text" placeholder="请输入您的真实姓名" v-model="userName">
                </div>
            </div>
            <div flex>
                <span class="span-left">身份证号</span>
                <div class="span-right" flex="cross:center">
                    <input type="text" placeholder="请输入您的身份证号码" v-model="userIdCardNumber">
                </div>
            </div>
        </div>
        <div class="authentication-bottom">
            <div class="authentication-btn">
                <button @click.stop="btnAction">下一步</button>
            </div>
            <div class="authentication-text">
                <p>仅支持大陆身份证；</p>
                <p>请输入您的本人身份信息，确保信息真实有效，所有资料将会保密;</p>
                <p>实名认证通过后，身份信息不可更改；</p>
                <p>未满18周岁用户暂无法实名认证。</p>
            </div>
        </div>
        <div class="authentication-win" v-show="popup">
            <div class="win-box" flex="dir:top">
                <div class="win-content" flex-box="1">
                    <p class="hint1">监测到您在其他商户已开通宝付账户，请完成短信验证，确保是您本人操作。</p>
                    <p class="hint2"><span>短信验证码已发送到{{investorMobile | mobileFormat}}</span></p>
                    <div flex flex="main:justify">
                        <div>
                            <input type="text" placeholder="请输入验证码" v-model="smsCode" maxlength="6">
                        </div>
                        <div>
                            <button :class="{'active':btnActive}" @click.stop="transmit">{{btnText}}</button>
                        </div>
                    </div>
                </div>
                <div class="win-btn" flex-box="0" flex>
                    <button flex-box="1" @click.stop="curse">取消</button>
                    <button flex-box="1" class="sure" @click.stop="sure" :disabled="loading">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    import $fun from '../tools/fun';
    import {Toast} from 'mint-ui';
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
                flag: true
            };
        },
        created(){
            let event = ['_trackEvent', '实名认证', 'SHOW', '进入实名认证页面', '进入实名认证页面'];
            window._hmt.push(event);
        },
        computed: mapState([
                'investorMobile',
                'userId'
            ]
        ),
        methods: {
            //下一步
            btnAction(){
                if (!this.nextClick) {
                    return
                }
                this.nextClick = false;
                setTimeout(() => {
                    this.nextClick = true;
                }, 2000);

                let {userName, userIdCardNumber} = this;
                if (!$fun.valiRealName(userName)) {
                    Toast('请输入真实姓名');
                    return
                }
                if (!$fun.valiIdCard(userIdCardNumber)) {
                    Toast('请输入正确身份证号');
                    return
                }
                let event = ['_trackEvent', '实名认证', 'CLICK', '实名认证页面-点击下一步', '实名认证页面-点击下一步'];
                window._hmt.push(event);
                this.getAccount();
            },
            //提交数据
            getAccount(){

                let {userName, userIdCardNumber, smsCode} = this;
                let data = {
                    userName: userName, userIdCardNumber: userIdCardNumber
                }
                if (this.popup) {
                    data = {
                        userName: userName, userIdCardNumber: userIdCardNumber, smsCode: smsCode
                    }
                }
                if (this.loading) {
                    return false;
                }
                this.loading = true;
                $api.post('/openAccount', data).then(msg => {
                    if (msg.code == 200) {
                        Toast("身份认证成功！");
                        this.popup = false;
                        setTimeout(() => {
                            this.loading = false;
                            this.$store.dispatch('getUserInfo');
                            this.$router.replace('/bind-bank-card');
                        }, 3000);
                    } else if (msg.code == 8003) {
                        this.loading = false;
                        //弹窗
                        this.popup = true;
                        this.smsCode = '';
                        this.btnText = '获取验证码';
                        this.btnActive = true;
                        let event = ['_trackEvent', '实名认证', 'SHOW', '实名认证监测到已在其他商户开户', '实名认证监测到已在其他商户开户'];
                        window._hmt.push(event);
                        this.transmit();
                    } else {
                        Toast(msg.msg)
                    }
                });
            },
            //下发按钮
            transmit(){
                if (this.btnActive) {
                    $api.get('/sendBaofooAuthSMS', {type: 2}).then(msg => {
                        if (msg.code != 200) {
                            Toast(msg.msg);
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
                if (this.smsCode.length >= 4) {
                    this.getAccount();
                } else {
                    Toast('请输入正确验证码！')
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
            }
        }
    }
</script>
