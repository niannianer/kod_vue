<template>
    <div flex="dir:top" flex-box="1" class="reward-list">
        <div class="section">
            <div class='item border' flex  @click="toDetail(0)">
                <p flex-box="1">邀请奖励细则</p>
                <div flex-box="0" >
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
        },
        computed: {},
        components:{
        },
        methods: {
            toDetail(type){
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
