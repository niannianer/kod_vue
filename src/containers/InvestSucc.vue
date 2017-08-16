<template>
    <div class="invest-succ">
        <div class="body">
            <div class="section">
                <div class="item bl" flex>
                    <p flex-box="1">订单号</p>
                    <p flex-box="0">{{orderBillCode}}</p>
                </div>
                <div class="item" flex>
                    <p flex-box="1">购买时间</p>
                    <p flex-box="0">{{orderPayTime}}</p>
                </div>
            </div>
            <div class="section seperate">
                <div class="item bl" flex="box:first">
                    <p>产品名称</p>
                    <p class="product-name">{{productName}}</p>
                </div>

                <div class="item" flex>
                    <p flex-box="1">预期年化收益率</p>
                    <p flex-box="0">{{annualInterestRate}}</p>
                </div>
            </div>
            <div class="section seperate">
                <div class="item bl" flex>
                    <p flex-box="1">起息日</p>
                    <p flex-box="0">{{productInterestDate}}</p>
                </div>
                <div class="item" flex>
                    <p flex-box="1">到期日</p>
                    <p flex-box="0">{{productExpiringDate}}</p>
                </div>
            </div>
            <div class="section seperate">
                <div class="item bl" flex>
                    <p flex-box="1">购买金额</p>
                    <p flex-box="0">{{orderAmount}}</p>
                </div>
                <div class="item bl" flex v-if="marketingAmount">
                    <p flex-box="1">现金券金额</p>
                    <p flex-box="0">{{marketingAmount}}</p>
                </div>
                <div class="item" flex>
                    <p flex-box="1">实付金额</p>
                    <p flex-box="0">{{paidAmount}}</p>
                </div>
            </div>
        </div>
        <div class="bottom">
            <p class="btn" @click.stop="pathTo('/invest-list')">查看我的定期理财</p>
        </div>
    </div>
</template>

<script>
    import '../less/invest-succ.less'
    export default {
        name: 'invest-succ',
        data(){
            return {
                orderBillCode:'',
                orderPayTime:'',
                productName:'',
                orderAmount:'',
                annualInterestRate:'',
                productInterestDate:'',
                productExpiringDate:'',
                marketingAmount:'',
                paidAmount:''
            }
        },
        created(){
            let invsetInfo = JSON.parse(decodeURIComponent(window.sessionStorage.getItem('investInfo')));
            this.orderBillCode = invsetInfo.orderBillCode;
            this.orderPayTime = invsetInfo.orderPayTime;
            this.productName = invsetInfo.productName;
            this.orderAmount = invsetInfo.orderAmount;
            this.marketingAmount = invsetInfo.marketingAmount;
            this.paidAmount = invsetInfo.paidAmount;
            this.annualInterestRate = invsetInfo.annualInterestRate;
            this.productInterestDate = invsetInfo.productInterestDate;
            this.productExpiringDate = invsetInfo.productExpiringDate;
        },
        computed: {},
        methods: {
            pathTo(path){
                this.$router.push(path);
            }
        },
        destroyed(){
        }
    }
</script>
