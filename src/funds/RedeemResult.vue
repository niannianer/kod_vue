<template>
    <div class="redeem-result">
        <div class="success">
            <div class="header">
                <img src="../images/fund/submit-sucess.png" class="img"/>
                <div class="status-text">提交成功</div>
            </div>
            <div class="content">
                <div flex class="item">
                    <div flex-box="0" class="left">
                        <div class="spot">1</div>
                        <div class="line"></div>
                    </div>
                    <div flex-box="1" class="right">
                        赎回已提交
                        <div class="orange">{{tradeShare}}份</div>
                    </div>
                </div>
                <div flex="cross:bottom" class="item">
                    <div flex-box="0" class="left last">
                        <div class="line"></div>
                        <div class="spot">2</div>
                    </div>
                    <div flex-box="1" class="right">
                        等待基金公司确认
                        <div class="orange">预计到账日期：{{orderConfirmDate}}</div>
                    </div>
                </div>
            </div>
            <button class="buttom" @click.stop="pathTo('/funds/my-fund')">查看我的账户</button>
        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import '../less/fund/redeem-result.less';
    export default {
        name: 'bulletin',
        data(){
            return {
                orderId: '',
                tradeShare: '',
                timer: '',
                orderConfirmDate:''
            }
        },
        created(){
            this.addHive(1, 'fundsRedeemResult');
            let event = ['_trackEvent', '基金赎回结果', 'SHOW', '进入基金赎回结果页面', '进入基金赎回结果页面'];
            window._hmt.push(event);
            this.tradeShare = this.$route.query.s;
            this.orderConfirmDate = this.$route.query.d
        },
        computed: {},
        methods: {
            getStatus(){
                let {orderId} = this;
              /*  $api.get('/fund/redemption/result', {
                    orderId
                }).then((resp) => {
                    if (resp.code == 200) {
                        this.tradeShare = resp.data.tradeShare;
                        this.orderConfirmDate = resp.data.orderConfirmDate;
                    }
                })*/
            },
            pathTo(path){
                this.addHive(0, 'fundsRedeemResult_btn_fundsMyFund');
                this.addHive(2, 'fundsRedeemResult_to_fundsMyFund');
                let event = ['_trackEvent', '基金赎回结果', 'SHOW', '基金赎回结果-点击我的账户', '基金赎回结果-点击我的账户'];
                window._hmt.push(event);
                this.$router.push(path);
            }
        },
        destroyed(){
            clearTimeout(this.timer);
        }
    }
</script>
