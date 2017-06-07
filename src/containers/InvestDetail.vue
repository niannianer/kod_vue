<template>
    <div flex="dir:top" flex-box="1" class="invest-detail" v-cloak>
        <div class='body' flex-box="1">
            <div class='items' flex-box="0" v-for="(item,index) in lists" :key="index" flex="dir:top">
                <div :class="{'bl':index!=lists.length-1}" flex-box="1" flex>
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
    export default {
        name: 'invest-detail',
        data(){
            return {
               lists: [
                {
                    key:'orderBillCode',
                    name:'订单号',
                    value:'03911201929'
                },
                {
                    key:'payedTime',
                    name:'购买时间',
                    value:'2017-03-02 18:00:00'
                },
                {
                    key:'productAbbrName',
                    name:'产品名称',
                    value:'北斗一号'
                },
                {
                    key:'orderAmount',
                    name:'购买金额',
                    value:'100，000元'
                },
                {
                    key:'productAnnualInterestRate',
                    name:'预期年化收益率',
                    value:'4.5%'
                },
                {
                    key:'expectedProfitAmount',
                    name:'预期收益',
                    value:'100.00元'
                },
                {
                    key:'productPeriod',
                    name:'产品期限',
                    value:'270天'
                },
                {
                    key:'productInterestDate',
                    name:'起息日',
                    value:'2017-03-21'
                },
                {
                    key:'productExpiringDate',
                    name:'到期日',
                    value:'2017-04-12'
                },
                {
                    key:'productPaymentDate',
                    name:'预期收款日',
                    value:'2017-04-12'
                }
            ]
            }
        },
        created(){
            $api.get('/investment/detail',{
                orderBillCode:this.$route.query.orderBillCode
            }).then(msg => {
                console.log()
                    if(msg.code != 401){
                        console.log(msg.data)
                        for (var item of this.lists) {
                            item.value = msg.data[item.key]
                            if(item.key == 'orderAmount'){
                                item.value = (Math.floor(item.value*100)/100).toFixed(2);
                                const re=/\d{1,3}(?=(\d{3})+$)/g;//?为匹配零次或一次
                                item.value =item.value.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){
                                    return s1.replace(re,"$&,")+s2;
                                })
                            }
                        }
                    }
                    return msg
                })
        }
    }
</script>
