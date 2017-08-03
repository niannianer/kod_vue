<template>
    <div class="recharge" flex="dir:top">
        <div class="body">
            <div class="bank">
                <img class="bank-logo" :src="bankImg"/>
                <span class="bank-name">{{bank_name}}（{{bankUserCardNo.substr(-4)}}）</span>
            </div>
            <div class="bank-info" flex>
                <div flex-box="1" class="time-limit">限额：单笔{{single_limit}}元</div>
                <div flex-box="1" class="day-limit">单日{{perday_limit}}元</div>
            </div>

        </div>
        <div class="body" style="margin-top: .5rem">
            <div class="form">
                <div class="form-title">充值金额(元)</div>
                <div class="form-input" flex>
                    <img flex-box="0" class="money-chart" src="../images/money-chart.png"/>
                    <div flex-box="1" class="money-filter">
                        <!-- <div class="money-show">{{rechargeMoney | currencyInput}}</div>-->
                        <input @keyup="myKeyup" type="number" class="money-show" v-model.trim="rechargeMoney"/>
                    </div>

                    <div flex-box="0" class="form-close" @click.stop="clearInput">
                        <img class="close" src="../images/close.png"/>
                    </div>

                </div>
            </div>
        </div>
        <div class="sub-info">
            若充值遇到问题请联系：<span class="span">{{telNumber}}</span>
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
    let imgNames = ['abchina', 'bankcomm', 'bankofshanghai',
        'boc', 'ccb', 'cebbank', 'cgbchina', 'cib', 'cmbc',
        'cmbchina', 'ecitic', 'hxb', 'icbc', 'pingan', 'psbc', 'spdb'];
    let imgUrls = {};
    imgNames.map(url => {
        imgUrls[url] = require(`../images/bank/${url}.png`)
    });
    let timer = null;
    export default {
        name: 'recharge',
        data(){
            return {
                rechargeMoney: '',
                imgUrls,
                disabled: true,
                bankImg: '',
                telNumber
            }
        },
        created(){
            if (this.bank_code) {
                this.bankImg = this.imgUrls[this.bank_code];
            }
        },
        computed: mapState([
            'bankUserCardNo',
            'bank_code',
            'bank_name',
            'perday_limit',
            'single_limit',
            'single_limit_value',
            'bankUserPhone']),
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
                    if (parseFloat(this.rechargeMoney) > this.single_limit_value) {
                        Toast('充值金额不能大于单笔限额，请重新输入');
                        this.disabled = true;
                    }
                }, 500);
            },
            postRecharge(){
                if (!this.rechargeMoney) {
                    Toast('请输入充值金额');
                    return false;
                }
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
                            window.sessionStorage.setItem('rechargeOrderBillCode',params.orderBillCode);
                            submitRecharge(params)
                        } else {
                            Toast(data.msg);
                        }
                    });
            }
        },
        watch: {
            bank_code(){
                console.log(this.bank_code);
                if (this.bank_code) {
                    this.bankImg = this.imgUrls[this.bank_code];
                }

            }
        }

    }
</script>
