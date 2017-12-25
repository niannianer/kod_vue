<template>
    <div class="purchase-result">
        <div class="success" v-if="order.result">
            <div class="header">
                <img src="../images/fund/submit-sucess.png" class="img"/>
                <div class="status-text">提交成功</div>
            </div>
            <div class="content" >
                <div flex class="item">
                    <div flex-box="0" class="left">
                        <div class="spot">1</div>
                        <div class="line"></div>
                    </div>
                    <div flex-box="1" class="right">
                        成功申购{{order.fundFullName}}
                        <div class="orange">{{order.tradeAmount}}元</div>
                    </div>
                </div>
                <div flex="cross:bottom" class="item">
                    <div flex-box="0" class="left last">
                        <div class="line"></div>
                        <div class="spot">2</div>
                    </div>
                    <div flex-box="1" class="right">
                        等待基金公司确认
                        <div class="orange">预计确认时间：{{order.orderConfirmDate|timeFormat('day')}}</div>
                    </div>
                </div>
            </div>
            <button class="buttom" @click.stop="toMine">查看我的账户</button>
        </div>
        <div class="wait" v-else>
            <div class="header">
                <img src="../images/fund/waiting.png" class="img"/>
                <div class="status-text">正在处理中</div>
            </div>
            <div class="content">
                温馨提示：<br/>
                银行正在处理中，如果10分钟内没有收到银行扣款通知，可能扣款失败，可重新申购。
            </div>
            <button class="buttom" @click.stop="toMine">查看我的账户</button>
        </div>

    </div>
</template>

<script>
    import $api from '../tools/api';
    import '../less/fund/purchase-result.less';
    export default {
        name: 'bulletin',
        data(){
            return {
                orderId: '',
                order: {},
                timer: ''
            }
        },
        created(){
            this.addHive(1, 'fundsPurchaseResult',1061);
            let event = ['_trackEvent', '基金申购结果', 'SHOW', '进入基金申购结果页面', '进入基金申购结果页面'];
            window._hmt.push(event);
            this.orderId = this.$route.query.id;
            this.getStatus();
            this.timeout();
        },
        computed: {},
        methods: {
            timeout(){
                this.timer = setTimeout(()=>{
                    this.getStatus();
                    this.timeout();
                },3000);
            },
            getStatus(){
                let {orderId} = this;
                $api.get('/fund/purch/result',{
                    orderId
                }).then((resp) => {
                    if(resp.code == 200){
                        this.order = resp.data;
                        if(this.order.result){
                            clearTimeout(this.timer);
                        }
                    }
                })
            },
            toMine(){
                this.addHive(0, 'fundsPurchaseResult_btn_fundsMyFund',106101);
                let event = ['_trackEvent', '基金申购结果', 'SHOW', '基金申购结果-点击我的账户', '基金申购结果-点击我的账户'];
                window._hmt.push(event);
                this.$router.push({
                    path: '/funds/my-fund'
                });
            }
        },
        destroyed(){
            clearTimeout(this.timer);
            this.addHive(2, 'fundsPurchaseResult',1061);
        }
    }
</script>
