<template>
    <div class="recharge" flex="dir:top">
        <div class="body">
            <div class="bank">
                <img class="bank-logo" :src="bankImg"/>
                <span class="bank-name">{{bankName}}（{{bankUserCardNo.substr(-4)}}）</span>
            </div>
            <div class="bank-info" flex v-if="singleLimit">
                <div flex-box="1" class="time-limit">限额：单笔{{singleLimit}}元</div>
                <div flex-box="1" class="day-limit">单日{{perdayLimit}}元</div>
            </div>

        </div>
        <div class="body" style="margin-top: .5rem">
            <div class="form">
                <div class="form-title">充值金额(元)</div>
                <div class="form-input" flex>
                    <img flex-box="0" class="money-chart" src="../images/money-chart.png"/>
                    <div flex-box="1" class="money-filter">
                        <input @keyup="myKeyup" type="number" class="money-show" v-model.trim="rechargeMoney"/>
                    </div>

                    <div flex-box="0" class="form-close" @click.stop="clearInput">
                        <img class="close" src="../images/close.png"/>
                    </div>

                </div>
            </div>
        </div>
        <div class="sub-info">
            充值中若遇到问题，请联系客服<br/>
            <a class="span" style="" :href="'tel:'+telNumber">{{telNumber}}</a>（服务时间：工作日9:00—18:00）
        </div>
        <div class="recharge-ensure">
            <button class="btn-primary btn-recharge" :disabled="disabled"
                    @click.stop="postRecharge">确认充值
            </button>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {Toast} from 'mint-ui';
    import $api from '../tools/api';
    import {submitRecharge, currencyInputValidate} from '../tools/operation';
    import {telNumber} from '../tools/config';
    import '../less/recharge.less';
    import * as bank from '../tools/bank';

    let timer = null;
    export default {
        name: 'recharge',
        data(){
            return {
                rechargeMoney: '',
                disabled: true,
                telNumber
            }
        },
        created(){
            let event = ['_trackEvent', '充值', 'SHOW', '进入充值页面', '进入充值页面'];
            window._hmt.push(event);
            this.addHive(1, 'recharge',1031);
        },
        computed: {
            ...mapState([
                'bankUserCardNo',
                'bankCode',
                'bankName',
                'perdayLimit',
                'singleLimit',
                'singleLimitValue',
                'bankUserPhone']),
            bankImg(){
                return bank[this.bankCode]||'';
            }
        },
        methods: {
            clearInput(){
                this.rechargeMoney = '';
            },
            myKeyup(){
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    this.rechargeMoney = currencyInputValidate(this.rechargeMoney);
                    if (this.rechargeMoney) {
                        this.disabled = false;
                    }
                    if (parseFloat(this.rechargeMoney) < 5) {
                        Toast('充值金额不能小于5元，请重新输入');
                        this.disabled = true;
                    }
                    if (this.singleLimit&&parseFloat(this.rechargeMoney) > this.singleLimitValue) {
                        Toast('充值金额不能大于单笔限额，请重新输入');
                        this.disabled = true;
                    }
                }, 500);
            },
            postRecharge(){
                if (!this.rechargeMoney) {
                    Toast('正在等待银行返回结果...');
                    return false;
                }
                this.addHive(0, 'recharge_btn_recharge',103101);
                let event = ['_trackEvent', '充值', 'CLICK', '充值页面点击确认充值', '充值页面点击确认充值'];
                window._hmt.push(event);
                let param = {
                    amount: this.rechargeMoney
                }
                $api.post('/trade/recharge', param)
                    .then(data => {
                        if (data.code == 200) {
                            console.log(data);
                            let params = data.data || {};
                            params.amount = this.rechargeMoney;
                            params.userId = this.$store.state.userId;
                            window.sessionStorage.setItem('rechargeOrderBillCode', params.orderBillCode);
                            submitRecharge(params)
                        } else {
                            Toast(data.msg);
                        }
                    });
            }
        }

    }
</script>
