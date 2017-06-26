<template>
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
        <!--遮罩层-->
        <div class="mask">
            <div class="content">
                <h2  style="color:black;">合格投资者登记</h2>
                <div class="main">
                    根据《私募投资基金募集行为管理办法》之规定，金疙瘩只对“具有相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元，且个人资产不低于300万元或者最近三年个人年均 收入不低于50万元”的特定合格投资者宣传、推介相关私募投资基金产品。请您详细阅读本提示并接受此个人资产不低于300万元或者最近三年个人年均 收入不低于50万元”的特定合格投资者宣传、推介相关私募投资基金产品。请您详细阅读本提示并接受此个人资产不低于300万元或者最近三年个人年均 收入不低于50万元”的特定合格投资者宣传、推介相关私募投资基金产品。请您详细阅读本提示并接受此个人资产不低于300万元或者最近三年个人年均 收入不低于50万元”的特定合格投资者宣传、推介相关私募投资基金产品。请您详细阅读本提示并接受此认定，方可获得金疙瘩私募投资基金产品宣传推介服务.
                </div>
                <p class="confirm"><i id='deal'></i>本人承诺符合上述合格投资者条件并完成调查问卷。</p>
                <div class="btn disable" disabled="disabled">确认</div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/financial.less';
    import CicleProgress from '../components/CicleProgress/CicleProgress';
    export default {
        name: 'financial',
        components: {
            CicleProgress
        },
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
        }
    }
</script>
