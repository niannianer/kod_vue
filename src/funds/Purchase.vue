<template>
    <div class="purchase" flex="dir:top">
        <div class="wrap"  flex-box="1">
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
            <p class="tip">单笔限额<span class="blue">{{minSub||0}}万元</span>，单日限额<span class="blue">{{maxSub||0}}万元</span></p>
            <div class="content seperate">
                <div class="item f8" flex="cross:center">
                    <p class="item-title">申购金额</p>
                    <input type="text" placeholder="最低1000元，投资上限100万" v-model="orderAmt" @keyup.stop="getFee">
                </div>
            </div>
            <p class="tip" v-if="orderAmt && buy.discount">费率：
                <span class="blue">{{buy.discount}}%</span>
                （估算费用{{buy.fee||0}}元）
            </p>
            <p class="tip">手续费及申购时间以基金公司确认结果为准</p>
            <div class="deal" flex="cross:center">
                <img src="../images/tip.png" alt="" class="img">
                <p class="deal-info">点击确认购买代表您同意《委托支付协议》</p>
            </div>
        </div>
        <button class="bottom f8" flex-box="0" :disabled="!orderAmt" @click.stop="toBuy">
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
                timer: ''
            }
        },
        components: {PasswordInput},
        created(){
            this.fundAbbrName = this.$route.query.name;
            this.fundCode = this.$route.query.code;
            this.minSub = this.$route.query.mins/10000;
            this.maxSub = this.$route.query.maxs/10000;
        },
        computed: {
            ...mapState(
                ['name','paymentNo']
            ),
            paymentBank(){
                let bank_n = this.paymentNo;
                return bank_n.substr(bank_n.length-4,4);
            }
        },
        methods: {
            getFee(){
                if(this.timer){
                    clearTimeout(this.timer);
                }
                if(!this.orderAmt){
                    this.buy = {};
                    return false;
                }
                if(this.orderAmt < 1000 || this.orderAmt > 1000000){
                    return false;
                }
                this.timer = setTimeout(()=>{
                    let {fundCode, orderAmt} = this;
                    $api.get('/fund/purch/fee',{
                        fundCode,
                        orderAmt
                    }).then((resp) => {
                        if(resp.code == 200){
                            this.buy = resp.data;
                        }
                    });
                },500);
            },
            callBack(password){
                this.tradePurch(password);
            },
            toBuy(){
                if(this.orderAmt < 1000){
                    Toast('申购金额最低1000！');
                    return false;
                }
                if(this.orderAmt > 1000000){
                    Toast('申购金额最高100万！');
                    return false;
                }
                this.inputPassword = true;
            },
            tradePurch(password){
                let {fundCode, orderAmt} = this;
                this.terminalInfo = $device.os + '-' + $device.osVersion;
                $api.post('/fund/purch',{
                    fundCode,
                    tradeAmount:orderAmt,
                    userPayPassword: password
                }).then((resp) => {
                    if(resp.code == 200){
                        this.inputPassword = false;
                        this.$router.push({
                            path: '/funds/purchase-result',
                            query: {
                                id: resp.data
                            }
                        })
                    }else{
                        Toast(resp.msg);
                        if (resp.code == 1108) {
                            EventBus.$emit('clearInput');
                        }
                    }
                });
            }
        },
        mounted(){
        },
        destroyed(){

        }
    }
</script>
