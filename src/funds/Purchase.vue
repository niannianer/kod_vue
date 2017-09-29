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
                    <p class="blue">中信银行 (1148)</p>
                </div>
            </div>
            <p class="tip">单笔限额5万元，单日限额100万元</p>
            <div class="content seperate">
                <div class="item f8" flex="cross:center">
                    <p class="item-title">申购金额</p>
                    <input type="text" placeholder="最低1000元，投资上限100万">
                </div>
            </div>
            <p class="tip">费率：<span class="blue">0.12%</span>（估算费用0.12元，省1.07元）</p>
            <p class="tip">手续费及申购时间以基金公司确认结果为准</p>
            <div class="deal" flex="cross:center">
                <img src="../images/tip.png" alt="" class="img">
                <p class="deal-info">点击确认购买代表您同意《委托支付协议》</p>
            </div>
        </div>
        <div class="bottom f8" flex-box="0">
          <p>确认购买</p>
        </div>

    </div>
</template>

<script>
    import '../less/fund/purchase.less';
    export default {
        name: 'purchase',
        data(){
            return {}
        },
        components: {},
        created(){
        },
        computed: {},
        methods: {},
        mounted(){
        },
        destroyed(){

        }
    }
</script>
