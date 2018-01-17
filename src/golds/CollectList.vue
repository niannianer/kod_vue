<template>
    <div class="collect-list"
         v-infinite-scroll="loadMore" flex-box="1" infinite-scroll-disabled="loading"
         infinite-scroll-distance="10" ref="scroll">
        <div flex="cross:center" class="item" v-for="item,index in collectList" :key="index">
            <div flex-box="1" flex="cross:center">
                <div class="num-img">
                    <img src="../images/gold/num-1.png" v-if="index == 0"/>
                    <img src="../images/gold/num-2.png" v-if="index == 1"/>
                    <img src="../images/gold/num-3.png" v-if="index == 2"/>
                    <span v-else>{{index + 1}}</span>
                </div>
                <div class="head-img">
                    <img :src="item.headImageUrl"/>
                    <div class="daren" v-if="item.investorType >= 12">
                        <div class="inner">达人</div>
                    </div>
                </div>
                <div>{{item.name}}</div>
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
    import {InfiniteScroll} from 'mint-ui';
    import $api from '../tools/api';
    import '../less/gold/collect-list.less';
    export default {
        name: 'collect-list',
        data(){
            return {
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
                        resp.data.list.map(val => {
                            val.name = val.nickName ? val.nickName : val.username ? val.username : val.mobile;
                        });
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
