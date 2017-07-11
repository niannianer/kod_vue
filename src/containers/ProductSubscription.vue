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
                            <p class="info">{{expectEarn|currencyFormat}}元</p>
                            <p class="title">预计收益</p>
                        </div>
                        <div flex-box="1">
                            <p class="info">{{this.accountCashAmount}}元</p>
                            <p class="title">账户余额</p>
                        </div>
                    </div>
                    <div class="ticket-bar" flex-box="0" flex @click.stop="showTicketList">
                        <p flex-box="1">现金券</p>
                        <img flex-box="0" src="../images/arrow-down-double.png" alt="arrow">
                        <p flex-box="1" style="text-align: right">-50元</p>
                    </div>
                </div>
            </div>
            <transition-group name="list-complete" tag="div">
            <div class="list-complete-item" v-show="ticketListBoolean" v-bind:key="0">
                <div flex-box="1" class="ticket-list"  ref="ticketList">
                    <div class="ticket-item" flex>
                        <p flex-box="1">满3000元减100元</p>
                        <p flex-box="1">1天过期</p>
                        <div flex-box="0" class="check-box">
                            <div class="box-inner"></div>
                        </div>
                    </div>
                    <div class="ticket-item active" flex>
                        <p flex-box="1">满3000元减100元</p>
                        <p flex-box="1">1天过期</p>
                        <div flex-box="0" class="check-box">
                            <div class="box-inner"></div>
                        </div>
                    </div>
                    <div class="ticket-item default" flex>
                        <p flex-box="1">暂不使用现金券</p>
                        <div flex-box="0" class="check-box">
                            <div class="box-inner"></div>
                        </div>
                    </div>
                </div >

            </div>
            <div class="list-complete-item" v-bind:key="1">
                <div v-if="isLack" class="tip">
                    <p>银行卡限额：单笔{{single_limit}}万元，单日{{perday_limit}}元</p>
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
                    <div v-if="!isLack">
                        我已仔细阅读《产品说明书》和《风险提示函》，并同意《认购协议》和
                        <span @click.stop="agreement(0)" class="agreement">《金疙瘩平台免责声明》</span>
                    </div>
                    <div v-if="isLack">
                        我已同意<span class="agreement" @click.stop="agreement(1)">《宝付科技电子支付账户协议》</span>
                    </div>
                </div>
            </div>
            </transition-group>
            <password-input v-show="inputPassword" title="购买产品" @close="inputPassword=false" @callBack="tradeCallback"
            ></password-input>

        </div>

        <div class="btn" flex-box="0">
            确认认购
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {submitRecharge, currencyInputValidate} from '../tools/operation';
    import '../less/product-subscription.less';
    import $api from '../tools/api';
    import EventBus from  '../tools/event-bus';
    import {Toast, Indicator} from 'mint-ui';
    import PasswordInput from '../components/PasswordInput';
    let imgNames = ['abchina', 'bankcomm', 'bankofshanghai',
        'boc', 'ccb', 'cebbank', 'cgbchina', 'cib', 'cmbc',
        'cmbchina', 'ecitic', 'hxb', 'icbc', 'pingan', 'psbc', 'spdb'];
    let imgUrls = {};
    imgNames.map(url => {
        imgUrls[url] = require(`../images/bank/${url}.png`)
    });
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
                bankImg: '',
                productPeriod:'',
                imgUrls,
                inputPassword: false,
                ticketListBoolean:true
            }
        },
        components: {
            PasswordInput
        },
        created(){
            if (this.bank_code) {
                this.bankImg = this.imgUrls[this.bank_code];
            }
            this.productUuid = this.$route.query.u;
            this.amount = this.$route.query.a;
            this.orderBillCode = this.$route.query.o;

            let leastPay = (this.amount * 100 - this.accountCashAmount * 100) / 100;
            this.rechargeNum = leastPay < 1 ? '1' : leastPay;
            $api.get('/product/getDetail', {
                'productUuid': this.productUuid,
                'productType': 'FIXI'
            })
                .then((msg) => {
                    console.log(msg);
                    if (msg.code == 200) {
                        this.productName = msg.data.productName;
                        this.annualInterestRate = msg.data.annualInterestRate;
                        this.productPeriod = msg.data.productPeriod;
                    }
                })
        },
        computed: {
            ...mapState(['accountCashAmount', 'bank_code', 'bankUserCardNo', 'bank_name', 'userId','single_limit','perday_limit']),
            isLack(){
                return this.amount > this.accountCashAmount;
            },
            expectEarn(){
                return this.amount * parseFloat(this.annualInterestRate) / 100 * parseInt(this.productPeriod) / 365;
            }
        },
        watch: {
            /*  accountCashAmount(){
             if(this.accountCashAmount){
             console.log('444')
             this.rechargeNum = this.amount - this.accountCashAmount;
             console.log(this.rechargeNum)
             }
             },*/
            bank_code(){
                if (this.bank_code) {
                    this.bankImg = this.imgUrls[this.bank_code];
                }
            }
        },
        methods: {
            showTicketList(){
                this.ticketListBoolean = !this.ticketListBoolean;
            },
            agreement(num){
                if (num == 0) {
                    window.location.href = '/platform-disclaimer.html';
                } else {
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
                this.rechargeNum = currencyInputValidate(this.rechargeNum);
                if (!this.rechargeNum) {
                    Toast('请输入正确待支付金额');
                    return false;
                }
                let leastPay = (this.amount * 100 - this.accountCashAmount * 100) / 100;
                if (this.rechargeNum < leastPay) {
                    Toast('输入金额不能小于待支付金额，请重新输入');
                    return false;
                }
                $api.post('/trade/recharge', {
                    amount: this.rechargeNum
                })
                    .then(data => {
                        if (data.code == 200) {
                            window.sessionStorage.setItem('backUrl', encodeURIComponent(window.location.href));
                            let params = data.data || {};
                            params.amount = this.rechargeNum;
                            params.userId = this.userId;
                            submitRecharge(params);
                        } else {
                            Toast(data.msg);
                        }
                    });

            },
            tradeCallback(password){
                this.inputPassword = false;
                if (this.orderBillCode) {
                    this.doInvest(password);
                } else {
                    this.getOrderBillCode()
                        .then(data => {
                            if (data.code == 200) {
                                this.doInvest(password);
                            }
                        });
                }
            },
            doInvest(password){
                Indicator.open('提交中...');
                $api.post('/trade/invest', {
                    'orderBillCode': this.orderBillCode,
                    'userPayPassword': password
                })
                    .then((msg) => {
                        Indicator.close();
                        if (msg.code == 200) {
                            window.sessionStorage.setItem('investInfo', encodeURIComponent(JSON.stringify(msg.data)));
                            this.$router.replace('invest-succ');
                        } else if (msg.code == 1108 || msg.code == 1119) {
                            EventBus.$emit('clearInput');
                            Toast(msg.msg);
                            return false;
                        } else {
                            Toast(msg.msg);
                        }
                        EventBus.$emit('clearInput');
                        this.inputPassword = false;
                    })
            },
            investHandle(){
                if (!this.enable) {
                    Toast('请勾选同意《认购协议》和《金疙瘩平台免责声明》');
                    return false;
                }
                this.inputPassword = true;
            },
            getOrderBillCode(){
                return $api.post('/trade/productSubscription', {
                    'productUuid': this.productUuid,
                    'amount': this.amount
                }).then((msg) => {
                    if (msg.code == 200) {
                        this.orderBillCode = msg.data.orderBillCode;
                    } else {
                        Toast(msg.msg);
                    }
                    return msg;
                })
            }
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
