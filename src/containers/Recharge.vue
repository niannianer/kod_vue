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
            <button class="btn-primary btn-recharge">确认购买</button>
        </div>

    </div>
</template>

<script>
    import {telNumber} from '../tools/config';
    import '../less/recharge.less';
    export default {
        name: 'recharge',
        data(){
            return {
                rechargeMoney: '',
                telNumber
            }
        },
        created(){
        },
        methods: {
            clearInput(){
                this.rechargeMoney = '';
            }
        }
    }
</script>
