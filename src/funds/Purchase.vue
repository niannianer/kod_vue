<template>
    <div class="purchase" flex="dir:top" ref="purchase">
        <div class="wrap" flex-box="1">
            <div class="content">
                <div class="item f8 name" flex="cross:center">
                    {{fundAbbrName}}{{fundCode}}
                </div>
            </div>
            <div class="content seperate">
                <div class="item f8" flex="cross:center">
                    <p class="item-title">支付</p>
                    <p class="blue">{{name}} ({{paymentBank}})</p>
                </div>
            </div>
            <div class="tip" flex>
                <p v-if="!maxRapidPayAmountPerTxn">单笔限额无限制</p>
                <p v-else>单笔限额<span class="blue">{{maxRapidPayAmountPerTxn / 10000}}万元</span></p>
                <p v-if="!maxRapidPayAmountPerDay">，单日限额无限制</p>
                <p v-else>
                    ，单日限额
                    <span class="blue">{{maxRapidPayAmountPerDay / 10000}}万元</span>
                </p>
            </div>

            <div class="content seperate">
                <div class="item f8" flex="cross:center">
                    <p class="item-title">申购金额</p>
                    <input class="fee-input" v-bind:placeholder="placeholder" type="number" v-model.trim="orderAmt"
                           @keyup.stop="getFee">
                </div>
            </div>
            <p class="tip" v-if="orderAmt && buy.fee">费率：
                <span class="blue">{{buy.pate}}%</span>
                （估算费用{{buy.fee || 0}}元）
            </p>
            <p class="tip blue" v-if="buy.fee == 0">免费率</p>
            <p class="tip">手续费及申购时间以基金公司确认结果为准</p>
            <div class="deal" flex="cross:center">
                <img src="../images/tip.png" alt="" class="img">
                <p class="deal-info">点击确认购买代表您同意
                    <router-link class="link" to="/funds/pay-agreement">《委托支付协议》</router-link>
                </p>
            </div>
        </div>
        <div class="footer" flex-box="0">
            <div class="server">
                基金销售服务由<a class="link"
                          href="https://asset.yingmi.cn/sites/compliance/qualifications-mobile.html">盈米财富</a>提供
            </div>
            <div class="quali">
                基金销售资格证号：000000378<a class="link"
                                     href="https://asset.yingmi.cn/sites/compliance/qualifications-mobile.html">详情</a>
            </div>
        </div>
        <button class="bottom f8" :disabled="btnDisabled" @click.stop="toBuy">
            确认购买
        </button>

        <password-input v-show="inputPassword" title="支付金额" @close="inputPassword=false"
                        @callBack="callBack"></password-input>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    import PasswordInput from '../components/PasswordInput';
    import $device from '../tools/device';
    import {Toast} from 'mint-ui';
    import EventBus from  '../tools/event-bus';
    import {currencyInputValidate} from '../tools/operation';
    import '../less/fund/purchase.less';
    export default {
        name: 'purchase',
        data(){
            return {
                fundAbbrName: '',
                fundCode: '',
                orderAmt: '',
                minSub: '',
                maxSub: '',
                buy: {},
                discount: 0,
                terminalInfo: '',
                inputPassword: false,
                timer: '',
                placeholder: '',
                btnDisabled: true
            }
        },
        components: {PasswordInput},
        created(){
            this.addHive(1, 'fundsPurchase',1060);
            let event = ['_trackEvent', '基金申购', 'SHOW', '进入基金申购页面', '进入基金申购页面'];
            window._hmt.push(event);
            this.fundAbbrName = this.$route.query.name;
            this.fundCode = this.$route.query.code;
            let min = this.$route.query.mins;
            let max = this.$route.query.maxs;
            this.minSub = min || 0;
            this.maxSub = (max || 0) / 10000;
            this.isRiskConfirmAgain = this.$route.query.again;
            if (min && !max) {
                this.placeholder = `最低${this.minSub}元`;
            }
            else if (!min && max) {
                this.placeholder = `投资上限${this.maxSub}万`;
            }
            else if (min && max) {
                this.placeholder = `最低${this.minSub}元，投资上限${this.maxSub}万`
            }
        },
        computed: {
            ...mapState(
                ['name', 'paymentNo', 'maxRapidPayAmountPerTxn', 'maxRapidPayAmountPerDay']
            ),
            paymentBank(){
                let bank_n = this.paymentNo;
                return bank_n.substr(bank_n.length - 4, 4);
            }
        },
        methods: {
            getFee(){
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    this.orderAmt = currencyInputValidate(this.orderAmt);
                    if (!this.orderAmt || this.orderAmt == 0) {
                        this.btnDisabled = true;
                        this.buy = {};
                        return false;
                    }
                    this.btnDisabled = false;
                    let {fundCode, orderAmt} = this;
                    $api.get('/fund/purch/fee', {
                        fundCode,
                        orderAmt
                    }).then((resp) => {
                        if (resp.code == 200) {
                            this.buy = resp.data || {};
                            this.buy.pate = this.buy.buyFeeRatio ? (this.buy.buyFeeRatio * this.buy.discount).toFixed(2) : '0';
                        } else {
                            this.buy = {};
                        }
                    });
                }, 500);
            },
            callBack(password){
                this.tradePurch(password);
            },
            toBuy(){
                /*if(this.orderAmt < this.minSub){
                 Toast(`申购金额最低${this.minSub}元！`);
                 return false;
                 }
                 if(this.orderAmt > this.$route.query.maxs){
                 Toast(`申购金额最高${this.maxSub}万元！`);
                 return false;
                 }
                 if(this.orderAmt > this.maxRapidPayAmountPerTxn){
                 Toast(`申购单笔限额${this.maxRapidPayAmountPerTxn/10000}万元！`);
                 return false;
                 }*/
                this.addHive(0, 'fundsPurchase_btn_submit',106001);
                let event = ['_trackEvent', '基金申购', 'CLICK', '基金申购-点击确认购买', '基金申购-点击确认购买'];
                window._hmt.push(event);
                this.addHive(5, 'fundsPurchase_modal_paypass',106091);
                event = ['_trackEvent', '基金申购', 'SHOW', '基金申购-交易密码弹窗弹起', '基金申购-交易密码弹窗弹起'];
                window._hmt.push(event);
                this.inputPassword = true;
            },
            tradePurch(password){
                this.terminalInfo = $device.os + '-' + $device.osVersion;
                let {fundCode, orderAmt, terminalInfo, isRiskConfirmAgain} = this;
                let param = {
                    fundCode,
                    tradeAmount: orderAmt,
                    userPayPassword: password,
                    terminalInfo
                };
                if (isRiskConfirmAgain) {
                    param.isRiskConfirmAgain = 1;
                }
                $api.post('/fund/purch', param).then((resp) => {
                    if (resp.code == 200) {
                        this.inputPassword = false;
                        this.addHive(2, 'fundsPurchase_to_purchaseResult',1060);
                        this.$router.push({
                            path: '/funds/purchase-result',
                            query: {
                                id: resp.data.orderId
                            }
                        })
                    } else {
                        Toast(resp.msg);
                        EventBus.$emit('clearInput');
                    }
                });
            }
        },
        mounted(){
            this.$refs.purchase.style.minHeight = window.innerHeight + 'px';
        },
        destroyed(){
            this.addHive(2, 'fundsPurchase',1060);
        }
    }
</script>
