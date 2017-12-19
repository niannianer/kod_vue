<template>
    <div flex="dir:top" flex-box="1" class="reward-list">
        <div class="section">
            <div class='item border' flex @click="toDetail(0)">
                <p flex-box="1">邀请奖励细则</p>
                <div flex-box="0">
                    <img src="../images/arrow-right.png" alt="arrow" class="arrow">
                </div>
            </div>
        </div>
        <div class="section">
            <div @click="toDetail(1)" class='item' flex>
                <p flex-box="1">达人奖励细则</p>
                <div flex-box="0">
                    <img src="../images/arrow-right.png" alt="arrow" class="arrow">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/reward-list.less';
    export default {
        name: 'reward-list',
        data(){
            return {}
        },
        created(){
            this.addHive(1, 'rewardList');
            let event = ['_trackEvent', '奖励细则', 'SHOW', '进入奖励细则页面', '进入奖励细则页面'];
            window._hmt.push(event);
        },
        computed: {},
        components: {},
        methods: {
            toDetail(type){

                let oper = type == 0 ? 'rewardShare' : 'rewardMaster'
                let oper2 = type == 0 ? '邀请奖励细则' : '达人奖励细则'
                this.addHive(0, 'rewardList_link_' + oper);
                this.addHive(2, 'rewardList_to_rewardDetail' + type);
                let event = ['_trackEvent', '奖励细则', 'CLICK', '奖励细则点击'+oper2, '奖励细则点击'+oper2];
                window._hmt.push(event);
                this.$router.push({
                    path: 'reward-detail',
                    query: {
                        type: type
                    }
                })
            }
        }
    }
</script>
