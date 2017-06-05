<template>
    <div class="recharge" flex="dir:top">
        <div class="body">
            <div class="bank">
                <img class="bank-logo" src="../images/bank/abchina.png"/>
                <span class="bank-name">中信银行（1148）</span>
            </div>
            <div class="bank-info" flex>
                <div flex-box="1" class="time-limit">限额：单笔50000元</div>
                <div flex-box="1" class="day-limit">单日50000元</div>
            </div>

        </div>
        <div class="body" style="margin-top: .5rem">
            <div class="form">
                <div class="form-title">充值金额(元)</div>
                <div class="form-input" flex>
                    <img flex-box="0" class="money-chart" src="../images/money-chart.png"/>
                    <div flex-box="1" class="money-filter">
                        <div class="money-show">{{rechargeMoney}}</div>

                    </div>
                    <input class="money-input" v-model="rechargeMoney"/>
                    <div  flex-box="0" class="form-close">
                        <img class="close" src="../images/close.png"/>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import '../less/recharge.less';
    export default {
        name: 'recharge',
        data(){
            return {
                rechargeMoney:0
            }
        }
    }
</script>
