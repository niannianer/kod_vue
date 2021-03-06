<template>
    <div class="bind-bank-card" flex-box="1">
        <div class="card-text">为了保障您的账户安全，请绑定与您实名信息一致的银行卡</div>
        <div class="steps" flex="box:mean">
            <div class="item" flex="main:center">
                <span class="round active" :class="{'app':isApp}">1</span>
                <div class="line-right active" :class="{'app':isApp}"></div>
            </div>
            <div class="item" flex="main:center">
                <span class="round active" :class="{'app':isApp}">2</span>
                <div class="line-left active" :class="{'app':isApp}"></div>
                <div class="line-right active" :class="{'app':isApp}"></div>
            </div>
            <div class="item" flex="main:center">
                <span class="round">3</span>
                <div class="line-left"></div>
            </div>

        </div>
        <div class="bind-head">
            <dl flex class="person">
                <dt style="width: 3.5rem" flex-box="0">持卡人:</dt>
                <dd flex-box="0">{{investorRealName}}</dd>
                <div @click.stop="getBankList" flex-box="1" flex="cross:center main:right" class="bank-icon">
                    <img class="icon" src="../images/bank/bank-icon-all.png"/>
                    <span>支持银行及限额</span>
                </div>
            </dl>
            <dl flex class="bank-card" :style="cardStyle">
                <dt>储蓄卡卡号</dt>
                <dd>
                    <input type="tel" placeholder="请输入银行卡号" @blur="getCardInfo"   v-model="bankCard"
                           maxlength="24">
                </dd>
            </dl>
        </div>
        <div class="bind-box">
            <div class="bind-lint" v-show="bankHint">
                <div class="lint-l" flex="main:justify cross:center">
                    <span v-html="html"></span>
                    <span>单笔限额{{singleLimit}}元，每日限额{{perdayLimit}}元</span>
                </div>
            </div>
            <dl class="bind-mobile" flex="cross:center">
                <div class="virtur-border" v-show="!isDiff"></div>
                <dt flex-box="0">银行预留手机号</dt>
                <dd flex-box="1">
                    <input type="tel" placeholder="请输入银行预留手机号" maxlength="11" v-model="bankUserPhone">
                </dd>
                <img flex-box="0" src="../images/bank-tel-icon.png" style="width: 1rem;height: 1rem"
                     @click="showCardTel">
            </dl>
            <p class="p-lint" v-show="isDiff">
                <span>验证码已发送到注册手机{{investorMobile | mobileFormat}}</span>
            </p>
            <ul flex="main:justify">
                <li class="ul-l">验证码</li>
                <li class="ul-c" flex-box="1"><input type="text" placeholder="输入验证码" maxlength="6" v-model="verifyCode">
                </li>
                <li class="ul-r">
                    <button :class="{'active':btnActive,'app':isApp}" @click.stop="transmit">{{btnText}}</button>
                </li>
            </ul>
        </div>
        <div class="bind-foot">
            <div class="p-agreement" flex>
                <span class="icon" @click.stop="agreement = !agreement" :class="{active:agreement}"></span>
                <span>我已阅读并同意<a @click.stop.prevent="linkTo">《支付服务协议》</a></span>
            </div>
            <div class="bind-btn" flex="main:center">
                <button :class="{active:agreement,'app':isApp}" @click.stop="submit">下一步</button>
            </div>
            <div class="deatil">
                <p>注：以上信息仅用于银行验证</p>
                <p>绑卡验证服务由央行许可支付牌照的宝付支付为您提供</p>
            </div>
        </div>
        <div flex="dir:right">
            <div class="customer-service" @click.stop="callService"></div>
        </div>
    </div>
</template>

<script>
    import requestHybrid from '../tools/hybrid';
    import $device from '../tools/device';
    import '../less/bind-bank-card.less';
    import $api from '../tools/api';
    import {refreshApp} from '../tools/operation';
    import {mapState} from 'vuex';
    import _ from 'lodash/core';
    import {checkPhone} from '../tools/fun';
    import {Toast, MessageBox} from 'mint-ui';
    import * as imgUrls from '../tools/bank';
    import {telNumber} from '../tools/config';
    export default {
        name: 'bind-bank-card',
        data(){
            return {
                bankUserPhone: '',//预留手机号
                verifyCode: '',//验证码
                bankHint: false,
                bankCard: '',
                html: '储蓄卡卡号',
                bankName: '',
                singleLimit: '',
                perdayLimit: '',
                btnActive: true,
                btnText: '获取验证码',
                flag: true,
                pShow: false,
                agreement: true,
                imgUrls,
                loading: false,
                isDiff: false,
                timeLeft: 0
            };
        },
        computed: {
            ... mapState([
                    'investorMobile',
                    'investorRealName',
                    'userId',
                    'accountStatus',
                   'isSetPayPassword'
                ]
            ),
            cardStyle(){
                if (this.bankHint) {
                    return {};
                }
                return {
                    'border-bottom': '1px solid #d8d8d8'
                }
            },
            isApp(){
                return true;
            }
        },
        created(){
            refreshApp();
            let event = ['_trackEvent', '绑定银行卡', 'SHOW', '进入绑定银行卡页面', '进入绑定银行卡页面'];
            window._hmt.push(event);
            this.addHive(1, 'bind-bank-card',1007);
            if (window.sessionStorage.getItem('bind-card-info')) {
                let bank = JSON.parse(window.sessionStorage.getItem('bind-card-info'));
                _.forEach(bank, (val, key) => {
                    this[key] = val;
                });
                window.sessionStorage.removeItem('bind-card-info');
            }
        },
        methods: {
            getCardInfo(){
                let card = this.bankCard.replace(/[^\d]/g, '');
                if (!card) {
                    return false;
                }
                return $api.get('/getBankInfo', {bankNo: card}).then(msg => {
                    if (msg.code == 200) {
                        this.bankHint = true;
                        this.singleLimit = msg.data.singleLimit;
                        this.perdayLimit = msg.data.perdayLimit;
                        if (msg.data.bankCode && msg.data.bankName)
                            this.html = `<span class="bank-inner" style="background-image:url(${this.imgUrls[msg.data.bankCode]})">${msg.data.bankName}</span>`;
                    } else {
                        // Toast(msg.msg)   //bug2728 查询不到银行卡不提示。
                    }
                });
            },
            change(){

                this.bankCard = this.bankCard.replace(/\D/g, '').replace(/....(?!$)/g, '$& ');
                this.bankHint = false;
                this.html = '储蓄卡卡号';
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
                            this.btnText = '已发送' + time + 's';
                            timer = setTimeout(recursion, 1000);
                        }
                    } else {
                        clearTimeout(timer);
                    }
                };
                recursion();
            },
            transmit(){
                this.addHive(0, 'bindBankCard_btn_sms',100701);
                if (this.btnActive) {
                    $api.get('/sendBaofooAuthSMS', {type: 1}).then(msg => {
                        if (msg.code == 200) {
                            if (this.bankUserPhone != this.investorMobile) {
                                this.isDiff = true
                            }
                            //显示提示
                            //this.pShow = true;
                        } else {
                            Toast({
                                message: msg.msg,
                                duration: 5000
                            });
                            this.btnText = '重新获取';
                            this.btnActive = true;
                            this.flag = false;
                        }
                    });
                    //下发验证码
                    this.timeLeft = 120;
                    this.send(this.timeLeft);
                }
            },
            submit(){
                this.addHive(0, 'bindBankCard_btn_submit',100702);
                if (!this.agreement) {
                    Toast({
                        message: '请勾选相关协议',
                        duration: 5000
                    });
                    return;
                }
                let {investorRealName, bankCard, bankUserPhone, verifyCode} = this;
                let bankUserCardNo = bankCard.replace(/[^\d]/g, '');
                if (bankUserCardNo.length < 6) {
                    Toast({
                        message: '请输入正确银行卡号',
                        duration: 5000
                    });
                    return
                }
                if (!checkPhone(bankUserPhone)) {
                    Toast({
                        message: '手机号输入有误',
                        duration: 5000
                    });
                    return
                }
                if (verifyCode.length < 4) {
                    Toast({
                        message: '请输入正确验证码',
                        duration: 5000
                    });
                    return
                }
                if (this.loading) {
                    return false;
                }
                this.loading = true;

                let event = ['_trackEvent', '绑定银行卡', 'CLICK', '绑定银行卡页面-点击完成', '绑定银行卡页面-点击完成'];
                window._hmt.push(event);
                $api.post('/bindBankCard', {
                    userName: investorRealName,
                    bankUserCardNo: bankUserCardNo,
                    bankUserPhone: bankUserPhone,
                    verifyCode: verifyCode
                }).then(msg => {
                    if (msg.code == 200) {
                        Toast({
                            message: '绑卡成功',
                            duration: 5000
                        });
                        let event = ['_trackEvent', '绑卡成功', 'SHOW', '绑卡请求成功', '绑卡请求成功'];
                        this.addHive(0,'bindBankCard_fetch_succ',100703);
                        window._hmt.push(event);
                        setTimeout(() => {
                            this.loading = false;
                            this.$store.dispatch('getBankInfo');
                            this.$store.dispatch('getUserInfo');
                            if (this.isSetPayPassword) {
                                this.$router.replace({
                                    path: '/account-complete'
                                });
                            } else {
                                this.$router.replace('/set-pay-password')
                            }
                        }, 1000)
                    } else {
                        this.loading = false;
                        Toast({
                            message: msg.msg,
                            duration: 5000
                        });
                    }
                });
            },
            getBankList(){
                this.addHive(0,'bindBankCard_link_bankList',100704)
                window.sessionStorage.setItem('bind-card-info', JSON.stringify(this.$data));
                this.$router.push('/bank-list');
            },
            linkTo(){
                this.addHive(0, 'bindBankCard_link_cardInfo');
                window.sessionStorage.setItem('bind-card-info', JSON.stringify(this.$data));
                window.location.href = '/baofoo-certification.html';
            },
            showCardTel(){
                this.addHive(5, 'bindBankCard_modal_mobile',100791);
                MessageBox({
                    title: '银行预留手机号说明',
                    message: '银行预留手机号是您办理银行卡时所填的手机号码。如忘记手机号请联系银行客服进行处理。',
                    confirmButtonText: '我知道了'
                })
            },
            callService(){
                this.addHive(0, 'bindBankCard_btn_call',100705);
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
        },
        destroyed(){
            MessageBox.close();
            this.addHive(2, 'bind-bank-card',1007);
        }
    }
</script>
