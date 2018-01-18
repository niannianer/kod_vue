<template>
    <div class="activity-list"
         v-infinite-scroll="loadMore" flex-box="1" infinite-scroll-disabled="loading"
         infinite-scroll-distance="10" ref="scroll">
        <div flex class="item">
            <div flex-box="1">
                <span class="name">金葵花</span>
                偷走2金币
            </div>
            <div flex-box="0" class="time">12-23</div>
        </div>
        <div flex class="item">
            <div flex-box="1">
                <span class="name">金葵花</span>
                偷走2金币
            </div>
            <div flex-box="0" class="time">12-23</div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {InfiniteScroll} from 'mint-ui';
    import $api from '../tools/api';
    Vue.use(InfiniteScroll);
    import '../less/gold/activity-list.less';
    export default {
        name: 'activity-list',
        data(){
            return {

            }
        },
        created(){
        },
        components:{
        },
        computed: {
        },
        methods: {
            loadMore(){

            }
        },
        destroyed(){

        }
    }
</script>
