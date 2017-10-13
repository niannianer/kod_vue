<template>
    <div class="purchase" flex="dir:top">
        <div class="wrap"  flex-box="1">
            <div class="content">
                <div class="item f8" flex="cross:center">
                    宏德优选000001
                </div>
            </div>
            <div class="content seperate">
                <div class="item f8" flex="cross:center">
                    <p class="item-title">支付</p>
                    <p class="blue">{{payment.name}} ({{paymentNoShort}})</p>
                </div>
            </div>
            <p class="tip">单笔限额<span class="blue">5万元</span>，单日限额<span class="blue">100万元</span></p>
            <div class="content seperate">
                <div class="item f8" flex="cross:center">
                    <p class="item-title">申购金额</p>
                    <input type="text" placeholder="最低1000元，投资上限100万" v-model="tradeAmount">
                </div>
            </div>
            <p class="tip">费率：<span class="blue">0.12%</span>（估算费用0.12元，省1.07元）</p>
            <p class="tip">手续费及申购时间以基金公司确认结果为准</p>
            <div class="deal" flex="cross:center">
                <img src="../images/tip.png" alt="" class="img">
                <p class="deal-info">点击确认购买代表您同意《委托支付协议》</p>
            </div>
        </div>
        <button class="bottom f8" flex-box="0" :disabled="!tradeAmount">
          确认购买
        </button>

    </div>
</template>

<script>
    import $api from '../tools/api';
    import '../less/fund/purchase.less';
    export default {
        name: 'purchase',
        data(){
            return {
                payment: {},
                paymentNoShort: '',
                tradeAmount: ''
            }
        },
        components: {},
        created(){
            this.getPayment();
        },
        computed: {},
        methods: {
            getPayment(){
                $api.get('/fund/account/payment').then((resp) => {
                    this.payment = resp.data;
                    this.payment = {
                        "userUuid": "123456789012345678901234567890A2",
                        "paymentType": "bank:002",
                        "name": "工商银行",
                        "paymentNo": "6222020903001483079",
                        "accountName": "田思聪"
                    }
                    let payNo = this.payment.paymentNo;
                    this.paymentNoShort = payNo.substr(payNo.length-4,4);
                })
            }
        },
        mounted(){
        },
        destroyed(){

        }
    }
</script>
