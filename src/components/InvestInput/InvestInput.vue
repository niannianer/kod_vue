<template>

    <div class="invest-input" flex="dir:top">
        <div flex-box="1"></div>
        <div class="body" flex-box="0">
            <div class="title">{{title}}
                <span class="close" @click.stop="close">×</span>
            </div>
            <div class="account-text">账户余额</div>
            <div class="account-amount">{{cashAmount | currencyFormat}}元</div>
            <div class="min-invest">{{hintText}}</div>
            <div class="input-content" flex>
                <div class="amount" flex-box="1" flex="main:jusitfy">
                    <span flex-box="1">{{amount}} </span>
                    <span flex-box="0">元</span>
                </div>
                <button class="btn-next" :disabled="disabled" @click.stop="nextStep">下一步</button>
            </div>
        </div>


        <div class="keyboad-body" flex-box="0">
            <div class="keyboad-list" flex="dir:left">
                <div flex-box="1" class="keyboad-item" @click.stop="addPassword(keyboad)"
                     v-for="(keyboad,index) in keyboads.slice(0,3)" :key="index">
                    <span class="val">{{keyboad.val}}</span>
                </div>

            </div>
            <div class="keyboad-list" flex="dir:left">
                <div flex-box="1" class="keyboad-item" @click.stop="addPassword(keyboad)"
                     v-for="(keyboad,index) in keyboads.slice(3,6)" :key="index">
                    <span class="val">{{keyboad.val}}</span>
                </div>

            </div>
            <div class="keyboad-list" flex="dir:left">
                <div flex-box="1" class="keyboad-item" @click.stop="addPassword(keyboad)"
                     v-for="(keyboad,index) in keyboads.slice(6,9)" :key="index">
                    <span class="val">{{keyboad.val}}</span>
                </div>

            </div>
            <div class="keyboad-list" flex="dir:left">
                <div class="keyboad-bottom" flex-box="1">
                    <span></span>
                </div>
                <div class="keyboad-bottom" flex-box="1" @click.stop="addPassword({val:0})">
                    <span>0</span>
                </div>
                <div class="keyboad-bottom" flex-box="1" @click.stop="deletePassword">
                    <span></span>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import {Toast, MessageBox, Indicator} from 'mint-ui';
    import {currencyFormat} from '../../filters';
    import $api from '../../tools/api';
    import './invest-input.less';
    export default {
        name: 'invest-input',
        props: ['uid', 'title', 'cashAmount', 'minInvest', 'remainAmount', 'stepValue', 'rate', 'period'],
        data(){
            return {
                passwords: [],
                hintText: '',
                timer: null,
                disabled: true,
                keyboads: [
                    {
                        val: 1,
                        sub: 0
                    },
                    {
                        val: 2,
                        sub: 'ABC'
                    },
                    {
                        val: 3,
                        sub: 'DEF'
                    },
                    {
                        val: 4,
                        sub: 'GHI'
                    },
                    {
                        val: 5,
                        sub: 'JKL'
                    },
                    {
                        val: 6,
                        sub: 'MNO'
                    },
                    {
                        val: 7,
                        sub: 'PQRS'
                    },
                    {
                        val: 8,
                        sub: 'TUV'
                    },
                    {
                        val: 9,
                        sub: 'WXYZ'
                    }
                ]

            }
        },
        created(){
        },
        computed: {
            amount(){
                if (this.passwords.length == 0) {
                    return '请输入金额';
                }
                return this.passwords.join('');
            }
        },
        methods: {
            addPassword(keyboad){
                this.passwords.push(keyboad.val)
                this.setHintText();
            },
            deletePassword(){
                this.passwords.pop();
                this.setHintText();
            },
            setHintText(){
                if (this.timer) {
                    clearTimeout(this.timer);
                }

                this.timer = setTimeout(() => {
                    if (this.amount < this.minInvest) {
                        this.hintText = `起投金额${this.minInvest}元`;
                        this.disabled = true;
                    } else if (this.amount > this.remainAmount) {
                        this.hintText = `投资金额不可大于剩余额度`;
                        this.disabled = true;
                    }
                    else {
                        let dis = this.amount - this.minInvest;
                        if (dis % this.stepValue) {
                            this.hintText = `投资金额需以${this.stepValue}元递增`;
                            this.disabled = true;
                        } else {
                            let shouyi = this.amount * parseFloat(this.rate) / 100 * parseInt(this.period) / 365;
                            shouyi = currencyFormat(shouyi);

                            this.hintText = `预期收益${shouyi}元`;
                            this.disabled = false;
                        }

                    }
                }, 500);
            },
            close(){
                this.$emit('close');
            },
            nextStep(){
                let params = {
                    'productUuid': this.uid,
                    'amount': this.amount
                };
                Indicator.open('提交中...');
                $api.post('/trade/productSubscription', params)
                    .then(data => {
                        Indicator.close();
                        if (data.code == 6001) {
                            MessageBox.alert('抱歉，您的账户目前被禁用,如有问题请联系客服', '提示');
                            return false;
                        }
                        if (data.code == 6008) {
                            Toast('产品目前不能购买');
                            this.$emit('callBack', 0);
                            return false;
                        }
                        if (data.code == 6003) {
                            Toast('产品目前不能购买');
                            setTimeout(() => {
                                this.$router.back();
                            }, 2000);
                            return false;
                        }
                        if (data.code == 6002) {
                            MessageBox.alert('用户身份未认证或者开户未完成', '提示');
                            return false;
                        }
                        if(data.code == 6005){
                            this.hintText = `超出本产品单人投资上限，请重新输入`;
                            return false;
                        }
                        /*余额不足*/
                        if (data.code == 200 || data.code == 6011) {
                            this.$router.push({
                                path: '/product-subscription',
                                query: {
                                    u: this.uid,
                                    a: this.amount,
                                    o: data.data.orderBillCode
                                }
                            })
                            return false;
                        }
                        Toast(data.msg);
                    });
            }
        },
        destroyed(){
            MessageBox.close();
            Indicator.close();
        }

    }
</script>
