<template>
    <div class="activity-list"
         v-infinite-scroll="loadMore" flex-box="1" infinite-scroll-disabled="loading"
         infinite-scroll-distance="10" ref="scroll">
        <div flex class="item" v-for="item,index in friendSteal">
            <div flex-box="1">
                <span class="name" @click.stop="toDetail(item)">{{item.nickName}}</span>
                偷走{{item.ctAmount}}金币
            </div>
            <div flex-box="0" class="time">{{item.updateTime | timeFormater('MM-dd')}}</div>
        </div>
        <div class="empty-text">{{friendSteal.length ? '已经到底了~' : '暂无内容~'}}</div>
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
                friendSteal: [],
                loading: true,
                startRow: 0,
                pageSize: 20
            }
        },
        created(){
            this.getFriendSteal();
        },
        components:{
        },
        computed: {
        },
        methods: {
            loadMore(){
                this.loading = true;
                this.startRow += this.pageSize;
                this.getFriendSteal();
            },
            //好友动态
            getFriendSteal(){
                $api.get('/coinTransaction/listFriendStealUser',{
                    startRow: 0,
                    pageSize: 20
                }).then(resp => {
                    if(resp.code == 200){
                        this.friendSteal = this.friendSteal.concat(resp.data.list || []);
                        if (resp.data.count <= this.friendSteal.length) {
                            this.loading = true;
                        } else {
                            this.loading = false;
                        }
                    }
                })
            },
            toDetail(item){
                this.$router.push({
                    path: '/golds/others-index',
                    query: {
                        uuid: item.userUuid
                    }
                })
            }
        },
        destroyed(){

        }
    }
</script>
