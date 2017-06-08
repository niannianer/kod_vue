<template>
<<<<<<< HEAD
    <div v-cloak class="financail" flex-box="1" flex="dir:top">
        <div class="tabs" flex flex-box="0">
            <div flex-box="1" class="tab" @click.stop="changeTab('high')">
                <div class="tab-item" :class="{'active':tab=='high'}">高端理财</div>
            </div>
            <div flex-box="1" class="tab" @click.stop="changeTab('regular')">
                <div class="tab-item" :class="{'active':tab=='regular'}">定期理财</div>

            </div>
        </div>
        <div class="item-list" flex-box="1">
            <div class="item" v-for="(item,index) in lists" :key="index">
                <div class="fund-name">{{item.name}}</div>
                <div flex="dir:left" class="fund-middle">
                    <div class="rate" flex-box="1">
                        <div>{{item.rate}}</div>
                        <div class="sub-text">业绩基准</div>
                    </div>
                    <div class="cycle" flex-box="1">
                        <div>{{item.cycle}}</div>
                        <div class="sub-text">期限</div>
                    </div>
                    <div class="progress" flex-box="0">
                        <cicle-progress :width-size="50" :progress="item.progress"></cicle-progress>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import '../less/financial.less';
    export default {
        name: 'financial',
        data(){
            return {
                tab: 'high',
                lists: [
                    {
                        name: '泰发基金汇通一号',
                        rate: '8.15',
                        cycle: '6个月',
                        progress: 65,
                        type: '1'
                    },
                    {
                        name: '泰发基金汇通二号',
                        rate: '9.15',
                        cycle: '12个月',
                        progress: 30,
                        type: '2'
                    },
                    {
                        name: '泰发基金汇通二号',
                        rate: '9.15',
                        cycle: '12个月',
                        progress: 0,
                        type: '2'
                    },
                    {
                        name: '泰发基金汇通二号',
                        rate: '9.15',
                        cycle: '12个月',
                        progress: 100,
                        type: '2'
                    }
                    ,
                    {
                        name: '泰发基金汇通二号',
                        rate: '9.15',
                        cycle: '12个月',
                        progress: 0,
                        type: '2'
                    },
                    {
                        name: '泰发基金汇通二号',
                        rate: '9.15',
                        cycle: '12个月',
                        progress: 100,
                        type: '2'
                    }
                ]
            };
        },
        computed: {
            count(){
                return this.$store.state.count
            }
        },
        methods: {
            changeTab(tab){
                this.tab = tab;
                this.$router.push('/index?callSystemID=1001&orderBillCode=POX201705181716328850524');
            }
=======
    <div flex="dir:top" flex-box="1" class="invest-detail" v-cloak>
        <div class='body' flex-box="1">
            <div class='items' flex-box="0" v-for="(item,index) in lists|productType('FIXI')" :key="index" flex="dir:top">
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
                    },{
                        key:'payedTime',
                        name:'购买时间',
                        value:'2017-03-02 18:00:00'
                    },{
                        key:'productAbbrName',
                        name:'产品名称',
                        value:'北斗一号'
                    },{
                        key:'orderAmount',
                        name:'购买金额',
                        value:'100，000元'
                    },{
                        key:'productAnnualInterestRate',
                        name:'预期年化收益率',
                        value:'4.5%'
                    },{
                        key:'expectedProfitAmount',
                        name:'预期收益',
                        value:'100.00元'
                    },{
                        key:'productPeriod',
                        name:'产品期限',
                        value:'270天'
                    },{
                        key:'productInterestDate',
                        name:'起息日',
                        value:'2017-03-21'
                    },{
                        key:'productExpiringDate',
                        name:'到期日',
                        value:'2017-04-12'
                    },{
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
                    if(msg.code != 401){
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
>>>>>>> 70f3e0ddbe3020f4de85719637f671b45667f6dc
        }
    }
</script>
