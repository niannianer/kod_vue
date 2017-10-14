<template>
    <div class="withdraw" flex="dir:top">
        <div class="body">
            <div class="bank" flex>
                <div flex-box="1">提现至银行卡</div>
                <div flex-box="1" class="right">
                    <img class="bank-logo" :src="bankImg"/>
                    <span class="bank-name">{{bankName}}({{bankUserCardNo.substr(-4)}})</span>
                </div>
            </div>
        </div>
        <div class="body">

            <div class="withdraw-count" flex>
                <span flex-box="1" class="left">可提现金额(元)</span>
                <span flex-box="1" class="right">{{accountCashAmount | currencyFormat}}</span>
            </div>
            <div class="withdraw-form" flex>
                <div flex-box="1" class="left">提现(元)</div>
                <div class="right" flex-box="0" flex>
                    <img flex-box="0" class="money-chart" src="../images/money-chart.png"/>
                    <input type="number" v-model.trim="withdrawMount" class="input" flex-box="1" @keyup="myKeyup"
                           placeholder="请输入提现金额"/>
                </div>
            </div>
            <div class="withdraw-count last-item" flex>
                <span flex-box="1" class="left">单笔可提现金额:50万</span>
                <span flex-box="1" class="withdraw-all right" @click.stop="withdrawAll">全部提现</span>
            </div>

        </div>

        <div class="bottom">
            <div v-if="overHint" class="over-hint">提现金额不能大于可提现金额，请重新输入</div>
            <div class="withdraw-ensure">
                <button class="btn-primary btn-withdraw"
                        @click.stop="getWithdraw"
                        :disabled="btnDisabled">立即提现
                </button>
            </div>
            <div class="hint">
                <div class="title">温馨提示</div>
                <div class="subtitle">
                    1.提现当月前三次免费，之后2元/笔。<br>
                    <br>
                    2.客户提交提现申请后的T+1个工作日内到账（周末、节假日顺延）
                    <br>
                    <br>
                    提现过程中有疑问，请联系客服<a href="tel:400-640-3606" style="text-decoration: none">400-640-3606</a>（工作时间：工作日 9:00—18:00）
                </div>
            </div>
        </div>


        <password-input v-show="inputPassword" title="提现" @close="inputPassword=false"
                        @callBack="callBack"></password-input>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import EventBus from  '../tools/event-bus';
    import $api from '../tools/api';
    import {telNumber} from '../tools/config';
    import {currencyInputValidate} from '../tools/operation';
    import {Toast, MessageBox, Indicator} from 'mint-ui';
    import PasswordInput from '../components/PasswordInput';
    import '../less/withdraw.less';
    import * as bank from '../tools/bank';
    let timer = null;
    export default {
        name: 'withdraw',
        data(){
            return {
                withdrawMount: '',
                telNumber,
                btnDisabled: true,
                overHint: false,
                inputPassword: false,
                singleLimitValue: 500000,
            }
        },
        components: {
            PasswordInput
        },
        created(){
            let event = ['_trackEvent', '提现', 'SHOW', '进入提现页面', '进入提现页面'];
            window._hmt.push(event);
        },
        computed: {
            ...mapState([
                'bankUserCardNo',
                'bankCode',
                'bankName',
                'accountCashAmount',
                'bankUserPhone']),
            bankImg(){
                return bank[this.bankCode]||'';
            }
        },
        methods: {
            myKeyup(){
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    this.withdrawMount = currencyInputValidate(this.withdrawMount);
                    if (this.withdrawMount && this.withdrawMount > this.singleLimitValue) {
                        Toast({
                            position: 'top',
                            message: '提现金额超出单笔限制，请重新输入'
                        });
                        return false;
                    }
                    if (this.withdrawMount && this.withdrawMount > this.accountCashAmount) {
                        this.btnDisabled = true;
                        this.overHint = true;
                        return false;
                    } else {
                        this.overHint = false;
                    }
                    if (this.withdrawMount && this.withdrawMount <= this.accountCashAmount) {
                        this.btnDisabled = false;
                        return false;
                    } else {
                        this.btnDisabled = true;
                    }
                }, 200);
            },
            // 手续费
            getTradeFeeType(){

                let amount = this.withdrawMount;
                return $api.get('/tradeFeeType', {amount});

            },
            // 提现
            getWithdraw(){
                this.getTradeFeeType()
                    .then(data => {
                        if (data.code == 200) {
                            console.log(data);
                            let {amount, feeType} = data.data;
                            if (feeType == 2) {
                                let amountAll = parseFloat(amount) + parseFloat(this.withdrawMount);
                                if (this.accountCashAmount < amountAll) {
                                    Toast('您当前的账户余额不足支付手续费，无法提现');

                                } else {
                                    let vm = this;
                                    MessageBox.confirm(`本次提现需收取${amount}元手续费，请确认是否继续？`, '提示').then(action => {
                                        vm.confirmFun(action);
                                    });

                                }
                                return false;
                            }
                            this.inputPassword = true;

                        } else {
                            Toast(data.msg)

                        }
                    })
            },
            // 全部提取
            withdrawAll(){
                this.withdrawMount = this.accountCashAmount;
                this.myKeyup();
                let event = ['_trackEvent', '提现', 'CLICK', '提现页面点击全部提现', '提现页面点击全部提现'];
                window._hmt.push(event);
            },
            confirmFun(result){
                if (result) {
                    this.inputPassword = true;
                    let event = ['_trackEvent', '提现', 'CLICK', '提现页面点击立即提现', '提现页面点击立即提现'];
                    window._hmt.push(event);
                }
            },
            callBack(password){
                this.tradeWithdraw(password);
            },
            tradeWithdraw(password){
                let rechargeAmount = this.withdrawMount;
                let userPayPassword = password;
                $api.post('/trade/withdraw', {rechargeAmount, userPayPassword})
                    .then(data => {
                        Indicator.close();
                        if (data.code == 200) {
                            Toast('提现申请成功');
                            history.back();
                            this.$store.dispatch('getAccountBaofoo');
                        } else {
                            Toast(data.msg);
                            if (data.code == 1108) {
                                EventBus.$emit('clearInput');
                            }
                        }
                    });
                Indicator.open('提交中...');
            }
        },
        destroyed(){
            Indicator.close();
            MessageBox.close();
        }
    }
</script>
