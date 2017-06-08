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
        }
    }
</script>
