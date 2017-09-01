<template>
    <div class="product-subscription" flex="dir:top">
        <div class="body" flex-box="1" style="overflow-y: auto">
            <div class="product-info">
                <p class="title">{{productName}}</p>
                <div flex class="info-center">
                    <div flex-box="1">
                        <p class="info">{{annualInterestRate}}</p>
                        <p class="title">预期年化收益率</p>
                    </div>
                    <div flex-box="1">
                        <p class="info">{{productPeriod}}</p>
                        <p class="title">期限</p>
                    </div>
                </div>
            </div>
            <div class="fund-info">
                <div class="bg-outer">
                    <div class="bg-middle">
                        <div class="bg-inner"></div>
                    </div>
                </div>
                <div class="fund-center" flex="dir:top">
                    <p flex-box="1" class="fund-title">认购金额</p>
                    <div flex-box="1" flex class="fund-chart">
                        <img src="../images/money-chart-reverse.png" alt="money">
                        <p>{{amount | currencyFormat}}元</p>
                    </div>
                    <div class="fund-detail" flex-box="1" flex>
                        <div flex-box="1">
                            <p class="info">{{expectEarn | currencyFormat}}元</p>
                            <p class="title">预计收益</p>
                        </div>
                        <div flex-box="1">
                            <p class="info">{{this.accountCashAmount}}元</p>
                            <p class="title">账户余额</p>
                        </div>
                    </div>
                    <div class="ticket-bar" flex-box="0" flex="cross:center" @click.stop="showTicketList">
                        <p flex-box="1">优惠券</p>
                        <img flex-box="0" src="../images/arrow-down-double.png" alt="arrow" v-if="ticketList.length">
                        <p flex-box="1" style="text-align: right" v-if="ticketList.length">{{faceValueText}}</p>
                        <p flex-box="1" style="text-align: right" v-else>暂无可用</p>
                    </div>
                </div>
            </div>
            <transition-group name="list-complete" tag="div">
                <div class="list-complete-item" v-show="ticketListBoolean" v-bind:key="0">
                    <div flex-box="1" class="ticket-list" ref="ticketList">
                        <div class="ticket-item" flex v-for="item in ticketList" @click.stop="chooseCode(item)"
                             :class="{'active':couponExtendCode==item.couponExtendCode}">
                            <p flex-box="1">满{{item.applyTradeAmount}}元减{{item.faceValue}}元</p>
                            <p flex-box="1">{{item.leftText}}</p>
                            <div flex-box="0" class="check-box">
                                <div class="box-inner"></div>
                            </div>
                        </div>
                        <div class="ticket-item default" flex @click.stop="chooseCode()"
                             :class="{'active':!couponExtendCode}">
                            <p flex-box="1">暂不使用优惠券</p>
                            <div flex-box="0" class="check-box">
                                <div class="box-inner"></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="list-complete-item" v-bind:key="1">
                    <div v-if="isLack" class="tip">
                        <p>银行卡限额：单笔{{single_limit}}元，单日{{perday_limit}}元</p>
                    </div>
                    <div class="recharge-info" v-if="isLack">
                        <div class="item" flex>
                            <p flex-box="1">待支付金额</p>
                            <input class="rechargeNum" flex-box="1" type="number" v-model="rechargeNum">
                            <p flex-box="0" class="yuan">元</p>
                        </div>
                    </div>
                    <div class="deal" flex="box:first">
                        <div class="chec" :class="{'active':enable}" @click="agreeDeal"></div>
                        <div v-if="!isLack" style="margin-top: 1px">
                            我已阅读并同意
                            <span @click.stop="agreement(0)" class="agreement">《产品认购相关协议》</span>，
                            <span @click.stop="agreement(1)" class="agreement">《入会申请及承诺》</span>
                        </div>
                        <div v-if="isLack" style="margin-top: 1px">
                            我已同意<span class="agreement" @click.stop="agreement(2)">《宝付科技电子支付账户协议》</span>
                        </div>
                    </div>
                </div>
            </transition-group>
            <password-input v-show="inputPassword" title="购买产品" @close="inputPassword=false" @callBack="tradeCallback"
            ></password-input>

        </div>
        <div class="btn" flex-box="0" @click.stop="rechargeHandle()" v-if="isLack">
            立即充值
        </div>
        <div class="btn" flex-box="0" @click.stop="investHandle()" v-else>
            确认认购
        </div>

    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import _ from 'lodash/core';
    import {numAdd, numMulti} from '../filters';
    import {submitRecharge, currencyInputValidate, remainTime, logout} from '../tools/operation';
    import {currencyFormat} from '../filters/index';
    import '../less/product-subscription.less';
    import $api from '../tools/api';
    import EventBus from  '../tools/event-bus';
    import {Toast, Indicator, MessageBox} from 'mint-ui';
    import PasswordInput from '../components/PasswordInput';
    let times = 0;
    let timeLine = new Date().getTime();
    export default {
        name: 'product-subscription',
        data(){
            return {
                enable: false,
                productUuid: '',
                amount: '',
                productName: '',
                annualInterestRate: '',
                rechargeNum: '',
                productPeriod: '',
                inputPassword: false,
                ticketList: [],
                ticketListBoolean: false,
                couponExtendCode: '',
                leastPay: 0,
                item: {},
                orderBillCode: '',
                faceValueText: '暂不使用'
            }
        },
        components: {
            PasswordInput
        },
        created(){

            /*获取账户余额并选择默认优惠券*/
            this.getBaofoo();
            /*充值回来*/
            if (window.sessionStorage.getItem('investDetail')) {
                let investDetail = window.sessionStorage.getItem('investDetail');
                investDetail = JSON.parse(investDetail)
                _.forEach(investDetail, (value, key) => {
                    this[key] = value
                });
                this.leastPay = 0;
                //点击宝付方‘返回商户’跳回本页面
                if (this.$route.query.t) {
                    this.getTradeRecharge();
                }
                window.sessionStorage.removeItem('investDetail');
                this.eventTracking();
                return false;
            }


            this.productUuid = this.$route.query.u;
            this.amount = this.$route.query.a;
            this.leastPay = numAdd(this.amount, -this.accountCashAmount);
            this.rechargeNum = this.leastPay;
            this.getDetail();
            this.getAvailableCoupon();
            this.eventTracking();

        },
        computed: {
            ...mapState(['accountCashAmount', 'bank_code', 'bankUserCardNo', 'bank_name', 'userId', 'single_limit', 'perday_limit', 'single_limit_value']),
            isLack(){
                return this.leastPay > 0;
            },
            expectEarn(){
                return this.amount * parseFloat(this.expcRate) * parseInt(this.productPeriod) / 365;
            }
        },
        watch: {},
        methods: {
            getBaofoo(){
                return this.$store.dispatch('getAccountBaofoo')
                    .then(() => {
                        let item = this.item;
                        this.chooseCode(item);
                    });
            },
            /* 查询订单状态*/
            getTradeRecharge(){
                Indicator.open('正在等待银行返回结果...');
                let rechargeBillCode = this.orderBillCode;
                $api.get('/getTradeRecharge', {rechargeBillCode})
                    .then(res => {
                        if (res.code == 200) {
                            let {data} = res;
                            /*充值信息等待*/
                            if (data.rechargeStatus === 0) {
                                let timer = setTimeout(() => {
                                    times++;
                                    if (times <= 5) {
                                        this.getTradeRecharge();
                                    } else {
                                        clearTimeout(timer);
                                        Indicator.close();
                                        MessageBox.alert(`银行充值返回较慢，请耐心等待，如有问题，请联系客服！`, '提示')
                                            .then(() => {
                                                this.getBaofoo();
                                            });
                                    }
                                }, 2000);
                            }
                            /*充值成功*/
                            if (data.rechargeStatus === 1) {
                                this.getBaofoo();
                                Indicator.close();
                            }
                            /*充值失败*/
                            if (data.rechargeStatus === 2) {
                                this.getBaofoo();
                                Indicator.close();
                                Toast('充值失败')
                            }
                        }

                    });
            },
            getAvailableCoupon(){

                let orderAmount = this.amount;
                let productUuid = this.productUuid
                $api.get('/availableCoupon/list', {orderAmount, productUuid})
                    .then(res => {
                        if (res.code == 200) {
                            res.data.couponList.map(cou => {
                                cou.leftText = remainTime(cou.validEndTime, cou.serverTime)
                            })
                            this.ticketList = res.data.couponList;
                            if (this.ticketList.length) {
                                this.ticketList.sort((a, b) => {
                                    return b.faceValue - a.faceValue;
                                });
                                /*默认选择优惠券列表面值最大一张*/
                                this.chooseCode(this.ticketList[0]);
                                /*默认优惠券列表不展开*/
                                //this.ticketListBoolean = true;
                            }

                        }
                        if (res.code == 401) {
                            logout();
                        }
                    })
            },
            getDetail(){
                $api.get('/product/getDetail', {
                    'productUuid': this.productUuid,
                    'productType': 'FIXI'
                }).then((msg) => {
                    if (msg.code == 200) {
                        this.productName = msg.data.productName;
                        this.annualInterestRate = msg.data.annualInterestRate;
                        this.expcRate = msg.data.annualInterestRateValue;
                        if (msg.data.increaseInterestRateValue) {
                            this.expcRate = numAdd(msg.data.increaseInterestRateValue, this.expcRate);
                        }
                        this.productPeriod = msg.data.productPeriod;
                    }
                })
            },
            chooseCode(item){
                if (item && item.couponExtendCode) {
                    this.item = item;
                    this.couponExtendCode = item.couponExtendCode;
                    this.leastPay = numAdd(this.amount, -this.accountCashAmount);
                    this.rechargeNum = numAdd(this.leastPay, -(item.faceValue));
                    this.leastPay = this.rechargeNum;
                    this.faceValueText = -item.faceValue + '元'
                } else {
                    this.item = {};
                    this.couponExtendCode = '';
                    this.leastPay = numAdd(this.amount, -this.accountCashAmount);
                    this.rechargeNum = this.leastPay;
                    this.faceValueText = '暂不使用';
                }
            },
            showTicketList(){
                /*优惠券列表toggle*/
                if (this.ticketList.length) {
                    this.ticketListBoolean = !this.ticketListBoolean;
                }
            },
            agreement(num){
                if (num == 0) {
                    window.location.href = '/product-subscription-agreement.html'
                }
                if (num == 1) {
                    window.location.href = '/application-commitment.html';
                }
                if (num == 2) {
                    window.location.href = '/baofoo-certification.html';
                }
            },
            agreeDeal(){
                this.enable = !this.enable;
            },
            rechargeHandle(){
                if (!this.enable) {
                    Toast('请勾选同意《宝付科技电子支付账户协议》');
                    return false;
                }
                this.rechargeNum = this.checkRechargeNum(this.rechargeNum);
                if (!this.rechargeNum) {
                    Toast('请输入正确待支付金额');
                    return false;
                }
                if (this.rechargeNum < this.leastPay) {
                    Toast('输入金额不能小于待支付金额，请重新输入');
                    return false;
                }
                if (Number(this.rechargeNum) > Number(this.single_limit_value)) {
                    Toast('输入金额不能大于银行单笔限额，请重新输入');
                    return false;
                }
                $api.post('/trade/recharge', {
                    amount: this.rechargeNum
                }).then(data => {
                    let event = ['_trackEvent', '认购信息确认页', 'CLICK', '认购信息页面进行充值', '认购信息页-点击立即支付'];
                    window._hmt.push(event);
                    if (data.code == 200) {
                        window.sessionStorage.setItem('backUrl', encodeURIComponent(window.location.href + '&t=' + new Date().getTime()));
                        let params = data.data || {};
                        this.orderBillCode = params.orderBillCode;
                        params.amount = this.rechargeNum;
                        params.userId = this.userId;
                        window.sessionStorage.setItem('investDetail', JSON.stringify(this.$data));
                        submitRecharge(params);
                    } else {
                        Toast(data.msg);
                    }
                });
            },
            tradeCallback(password){
                this.doInvest(password);
            },
            doInvest(password){
                Indicator.open('提交中...');
                $api.post('/trade/invest', {
                    'productUuid': this.productUuid,
                    orderAmount: this.amount,
                    couponExtendCode: this.couponExtendCode,
                    'userPayPassword': password,
                    uniqueIdentifier: timeLine
                })
                    .then((msg) => {
                        Indicator.close();
                        timeLine = new Date().getTime();
                        if (msg.code == 200) {
                            window.sessionStorage.setItem('investInfo', encodeURIComponent(JSON.stringify(msg.data)));
                            this.$router.replace('invest-succ');
                        } else if (msg.code == 1108 || msg.code == 1119) {
                            EventBus.$emit('clearInput');
                            Toast(msg.msg);
                            return false;
                        } else if (msg.code == 1504) {
                            Toast(msg.msg);
                            this.getAvailableCoupon();
                        }
                        else if (6003 <= msg.code && msg.code <= 6010) {
                            /*认购金额不满足要求*/
                            Toast(msg.msg);
                            setTimeout(() => {
                                this.$router.back();
                            }, 1000);
                        }
                        else {
                            /*余额不足*/
                            if (msg.code == 6011) {
                                this.$store.dispatch('getAccountBaofoo')
                            }
                            Toast(msg.msg);
                        }
                        EventBus.$emit('clearInput');
                        this.inputPassword = false;
                    })
            },
            investHandle(){
                if (!this.enable) {
                    Toast('请勾选同意《产品认购相关协议》和《入会申请及承诺》');
                    return false;
                }
                let event = ['_trackEvent', '认购信息确认页', 'SHOW', '认购信息页面直接购买', '认购信息页-点击立即购买'];
                window._hmt.push(event);
                event = ['_trackEvent', '认购信息确认页', 'SHOW', '弹出支付密码弹框', '弹出支付密码弹框'];
                window._hmt.push(event);
                this.inputPassword = true;
            },
            checkRechargeNum(input) {
                if (!input) {
                    return '';
                }
                let t = input.toString();
                if (isNaN(input)) {
                    return ''
                }
                return t.replace(/\.\d{3,}/, (match) => {
                    return match.substring(0, 3);
                })
            },
            eventTracking(){
                if (this.isLack) {
                    let event = ['_trackEvent', '认购信息确认页', 'SHOW', '进入认购信息确认页面，但余额不足需要充值', '进入认购信息确认页-余额不足'];
                    window._hmt.push(event);
                } else {
                    let event = ['_trackEvent', '认购信息确认页', 'SHOW', '进入认购信息确认页面，且余额足够可以直接购买', '进入认购信息确认页-余额足'];
                    window._hmt.push(event);
                }
            }
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
