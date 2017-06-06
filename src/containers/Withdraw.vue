<template>
    <div class="withdraw" flex="dir:top">
        <div class="body">
            <div class="bank">
                <img class="bank-logo" src="../images/bank/abchina.png"/>
                <span class="bank-name">中信银行（1148）</span>
            </div>
        </div>
        <div class="body">
            <div class="withdraw-count" flex>
                <span flex-box="1" class="left">当前可提(元)</span>
                <span flex-box="1" class="right">100,000,00</span>
            </div>
            <div class="withdraw-form" flex>
                <div flex-box="1" class="left">提现金额</div>
                <div class="right" flex-box="0" flex>
                    <img flex-box="0" class="money-chart" src="../images/money-chart.png"/>
                    <input class="input" flex-box="1" placeholder="请输入提现金额"/>
                </div>
            </div>
        </div>
        <div class="sub-info">
            <span class="span">持卡人需与投保人一致</span>
            若有问题请联系：
            <span class="span">{{telNumber}}</span>
        </div>

        <div class="withdraw-ensure">
            <button class="btn-primary btn-withdraw">立即提现</button>
        </div>
    </div>
</template>

<script>
    import {telNumber} from '../tools/config';
    import '../less/withdraw.less';
    export default {
        name: 'recharge',
        data(){
            return {
                rechargeMoney: 0,
                telNumber
            }
        }
    }
</script>
