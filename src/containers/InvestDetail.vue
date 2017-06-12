<template>
    <div flex="dir:top" flex-box="1" class="invest-detail" v-cloak>
        <div class='body' flex-box="1">
            <div class='items' flex-box="0" v-for="(item,index) in lists" :key="index" flex="dir:top">
                <div class="bl" flex-box="1" flex>
                    <p flex-box="1">{{item.name}}</p>
                    <p flex-box="0">{{item.value}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import '../less/invest-detail.less';
    import $api from '../tools/api';
    import {currencyInput} from '../filters/index.js'

    export default {
        name: 'invest-detail',
        data(){
            return {
                   lists: [
                    {
                        key:'orderBillCode',
                        name:'订单号',
                        value:''
                    },{
                        key:'payedTime',
                        name:'购买时间',
                        value:''
                    },{
                        key:'productAbbrName',
                        name:'产品名称',
                        value:''
                    },{
                        key:'orderAmount',
                        name:'购买金额',
                        value:''
                    },{
                        key:'productAnnualInterestRate',
                        name:'预期年化收益率',
                        value:''
                    },{
                        key:'expectedProfitAmount',
                        name:'预期收益',
                        value:''
                    },{
                        key:'productPeriod',
                        name:'产品期限',
                        value:''
                    },{
                        key:'productInterestDate',
                        name:'起息日',
                        value:''
                    },{
                        key:'productExpiringDate',
                        name:'到期日',
                        value:''
                    },{
                        key:'productPaymentDate',
                        name:'预期收款日',
                        value:''
                    }
                ]
            }
        },
        created(){
            $api.get('/investment/detail',{
                orderBillCode:this.$route.query.orderBillCode
            }).then(msg => {
                    if(msg.code == 200){
                        for (let item of this.lists) {
                            item.value = msg.data[item.key]
                            if(item.key == 'orderAmount'){
                                item.value =   currencyInput(item.value)+"元";
                            }
                        }
                    }
                    return msg
                })
        }
    }
</script>
