<template>
    <div flex="dir:top" flex-box="1" class="reward-detail">
        <div class="header bl" flex-box="0" flex>
            <ul flex>
                <li  :class="{'left':true,'active':true}" flex-box="1">定期理财</li>
                <li  :class="{'right':true,'active':false}" flex-box="1">高端理财</li>
            </ul>
        </div>
        <div class="body">
            <div class="title bl" flex="box:mean">
                <p>产品名称</p>
                <p>投资金额（万元）</p>
                <p>奖励比列（年化）</p>
            </div>
            <div class="item bl" flex="box:mean">
                <p flex="dir:top main:center" class="product-name">北斗一号</p>
                <ul flex="dir:top main:center">
                    <li>100-200</li>
                    <li>100-200</li>
                    <li>100-200</li>
                </ul>
                <ul flex="dir:top main:center">
                    <li>23%</li>
                    <li>23%</li>
                    <li>23%</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import{mapState} from 'vuex';
    import '../less/reward-detail.less';
    import $api from '../tools/api';
    export default {
        name: 'reward',
        data(){
            return {
               paidWithTax:'',
               unpaid:'',
               paid:''
            }
        },
        computed:mapState(['userUuid']),
        watch:{
            userUuid(){
                if (this.userUuid) {
                    console.log(this.userUuid);
                }
            }
        },
        created(){
            $api.get('/reward/list')
                .then(msg => {
                    if(msg.code != 401){
                        this.paidWithTax = msg.data.paidWithTax;
                        this.unpaid = msg.data.unpaid;
                        this.paid = msg.data.paid;
                    }
                    return msg
                })
        }
    }
</script>
