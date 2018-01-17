<template>
    <div class="receive-rank">
        <div class="items"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="disLoad"
             infinite-scroll-distance="70">
            <div class="item" v-for="(item ,index) in items" flex="cross:center">
                <span flex="cross:center" flex-box="0" class="number" v-if="index==0"></span>
                <span flex="cross:center" flex-box="0" class="number" v-else-if="index==1"></span>
                <span flex="cross:center" flex-box="0" class="number" v-else-if="index==2"></span>
                <span flex="main:center cross:center" flex-box="0" class="number" v-else>{{index+1}}</span>
                <img flex="cross:center" flex-box="0" class="img " src="../images/share-icon.png" alt="">
                <span flex="cross:center" flex-box="1" class="nick-name">{{item.nickName}}</span>
                <span flex="cross:center" flex-box="0" class="coin">{{item.coinTotalNum||0}}</span>
            </div>
        </div>

    </div>
</template>

<script>
    import {InfiniteScroll, Toast} from 'mint-ui';
    import Vue from 'vue';
    Vue.use(InfiniteScroll);
    import $api from '../tools/api';
    export default {
        name: 'receive-rank',
        data(){
            return {
                pageNo: 0,
                pageSize: 20,
                loading: true,
                hasMore: false, //还有下一页
                items: []
            }
        },
        components: {
            disLoad(){
                return this.loading || (!this.hasMore);
            }
        },
        created(){
            this.getRank();
        },
        computed: {},
        methods: {
            // 下拉加载更多
            loadMore(){
                if (this.loading) {
                    return false;
                }
                this.pageNo++;
                this.loading = true;
                this.getRank()
            },
            getRank(){
                let params = {
                    startRow: this.pageNo * this.pageSize,
                    pageSize: this.pageSize
                }
                return $api.get('/coin/getFriendList', params)
                    .then(res => {
                        this.loading = false;
                        if (res.code == 200) {
                            let {data} = res;
                            let {count} = data;
                            // loadmore
                            if (this.pageNo) {
                                this.items = this.items.concat(data.list)
                            } else {
                                this.items = data.list;
                            }
                            if (this.items.length < count && data.list.length >= this.pageSize) {
                                this.hasMore = true;
                            } else {
                                this.hasMore = false;
                            }

                            return false;
                        }
                        Toast(res.msg);
                        this.hasMore = false;
                    })
            }
        },
        mounted(){
        },
        destroyed(){

        }
    }
</script>
<style lang="less" scoped>
    .receive-rank {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fff;
        overflow-y: auto;
        .items {
            position: relative;
            padding-left: .8rem;
            .item {
                padding: .5rem 0;
                border-bottom: 1px solid #D0D0D0;
                .number {
                    width: 2rem;
                    font-size: .9rem;
                    color: #757575;
                }
                .img {
                    width: 2.1rem;
                    height: 2rem;
                    border-radius: .3rem;
                }
                .nick-name {
                    margin-left: .5rem;
                    font-size: .8rem;
                    color: #666;
                }
                .coin {
                    width: 4rem;
                    text-align: right;
                    font-size: .8rem;
                    color: #666;
                }
            }
        }
    }
</style>
