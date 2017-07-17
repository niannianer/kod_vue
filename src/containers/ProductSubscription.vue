<template>
    <div class="product-subscription">
        <div class="body">
            <div class="section">
                <div class="item bl" flex="box:first">
                    <p>产品名称</p>
                    <p class="product-name">{{productName}}</p>
                </div>
                <div class="item" flex>
                    <p flex-box="1">预期收益率</p>
                    <p flex-box="0">{{annualInterestRate}}</p>
                </div>
            </div>
            <div class="section seprate">
                <div class="item bl" flex>
                    <p flex-box="1">账户余额</p>
                    <p flex-box="0">{{this.accountCashAmount|currencyFormat}}元</p>
                </div>
                <div class="item" flex>
                    <p flex-box="1">认购金额</p>
                    <p flex-box="0">{{amount | currencyFormat}}元</p>
                </div>
            </div>
            <div class="section lackmoney seprate" v-if="isLack">
                <div class="title">第三方支付扣款</div>
                <div class="bank">
                    <div class="bank-name">
                        <img :src="bankImg" class="bank-logo"/>
                        <span class="name">{{bank_name}}</span>
                        <div class="bank-info">{{bankUserCardNo | bankCardNoFormat}}</div>
                    </div>
                </div>
                <div flex>
                    <p flex-box="1">限额：单笔{{single_limit}}元</p>
                    <p flex-box="0">单日{{perday_limit}}元</p>
                </div>
            </div>
            <div class="section seprate" v-if="isLack">
                <div class="item" flex>
                    <p flex-box="1">待支付金额</p>
                    <input class="rechargeNum" flex-box="1" type="number" v-model="rechargeNum">
                    <p flex-box="0">元</p>
                </div>
            </div>
            <password-input v-show="inputPassword" title="购买产品" @close="inputPassword=false" @callBack="tradeCallback"
            ></password-input>
        </div>
        <div class="bottom seperate">
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
            <div class="btn" :class="{'enable':enable}" disabled flex-box="1" v-if="!isLack" @click="investHandle">投资
            </div>
            <div class="btn" :class="{'enable':enable}" flex-box="1" v-if="isLack" @click="rechargeHandle">立即支付</div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {submitRecharge, currencyInputValidate} from '../tools/operation';
    import {currencyFormat} from '../filters/index';
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
                imgUrls,
                inputPassword: false
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

            let leastPay = Math.round(this.amount *10*10 - currencyFormat(this.accountCashAmount) * 10*10) / 100;
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
                    }
                })
        },
        computed: {
            ...mapState(['accountCashAmount', 'bank_code', 'bankUserCardNo', 'bank_name', 'userId','single_limit','perday_limit']),
            isLack(){
                return this.amount > this.accountCashAmount;
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

                let leastPay = Math.round(this.amount *10*10 - currencyFormat(this.accountCashAmount) * 10*10) / 100;
                if (this.rechargeNum < leastPay) {
                    Toast('输入金额不能小于待支付金额，请重新输入');
                    return false;
                }
                if(this.rechargeNum < 5){
                    Toast('输入金额不能小于5元，请重新输入');
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
