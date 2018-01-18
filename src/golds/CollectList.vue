<template>
    <div class="collect-list"
         v-infinite-scroll="loadMore" flex-box="1" infinite-scroll-disabled="loading"
         infinite-scroll-distance="10" ref="scroll">
        <div flex="cross:center" class="item" v-for="item,index in collectList" :key="index" @click.stop="toDetail(item)">
            <div flex-box="1" flex="cross:center">
                <div class="num-img">
                    <img src="../images/gold/num-1.png" v-if="index == 0" class="img"/>
                    <img src="../images/gold/num-2.png" v-else-if="index == 1" class="img"/>
                    <img src="../images/gold/num-3.png" v-else-if="index == 2" class="img"/>
                    <span v-else>{{index + 1}}</span>
                </div>
                <div class="head-img">
                    <img :src="item.headImageUrl || defaultHead"/>
                    <div class="daren" v-if="item.investorType >= 12">
                        <div class="inner">达人</div>
                    </div>
                </div>
                <div>{{item.nickName}}</div>
            </div>
            <div flex-box="0" class="time">
                {{item.coinTotalNum}}
            </div>
            <div class="point-msg" v-if="item.userValidCoinAmount">
                <img src="../images/gold/hand.png" class="hand-img"/>
            </div>
            <div class="point-msg" v-else-if="item.userNextValidCoinTime">
                {{item.userNextValidCoinTime | secondToTime}}
            </div>
        </div>
        <div v-if="!collectList.length" class="fmsg">暂无内容~</div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {InfiniteScroll} from 'mint-ui';
    import $api from '../tools/api';
    import '../less/gold/collect-list.less';
    Vue.use(InfiniteScroll);
    const defaultHead = require('../images/gold/default-head.png');
    export default {
        name: 'collect-list',
        data(){
            return {
                defaultHead,
                startRow: 0,
                pageSize: 20,
                loading: true,
                collectList: []
            }
        },
        created(){
            this.getList();
        },
        components:{
        },
        computed: {

        },
        methods: {
            //进入好友金币页
            toDetail(item){
                this.$router.push({
                    path: '/golds/others-index',
                    query: {
                        uuid: item.userUuid
                    }
                })
            },
            loadMore(){
                this.loading = true;
                this.startRow += this.pageSize;
                this.getList();
            },
            getList(){
                $api.get('/coin/getFriendList',{
                    startRow: this.startRow,
                    pageSize: this.pageSize
                }).then(resp => {
                    if(resp.code == 200){
                        this.collectList = this.collectList.concat(resp.data.list || []);
                        if (resp.data.count <= this.collectList.length) {
                            this.loading = true;
                        } else {
                            this.loading = false;
                        }
                    }
                })
            }
        },
        destroyed(){

        }
    }
</script>
