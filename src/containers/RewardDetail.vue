<template>
    <div  class="reward-detail">
        <div class="header" flex="dir:top">
            <div flex-box="1" class="tab bl" flex>
                <ul flex>
                    <li  :class="{'left':true,'active':isActive}" flex-box="1" @click="rewardTab('FIXI')">定期理财</li>
                    <li  :class="{'right':true,'active':!isActive}" flex-box="1" @click="rewardTab('PRIF')">高端理财</li>
                </ul>
            </div>
            <div class="title bl" flex="box:mean"  flex-box="0">
                <p>产品名称</p>
                <p>投资金额（元）</p>
                <p>奖励比列（年化）</p>
            </div>
        </div>
        <div class="body"  >
            <div style="height: 100%;overflow: auto">
                <mt-loadmore :top-method="loadTop"  ref="loadmore" :auto-fill="autoFill">
                    <ul v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading"  infinite-scroll-distance="10">
                        <li class="item bl" flex="box:mean" v-for="(item,index) in lists" :key="index" >
                            <p flex="dir:top main:center" class="product-name">{{item.productAbbrName}}</p>
                            <ul flex="dir:top main:center">
                                <li v-for="(itemRange,indexRange) in item.productAward" :key="indexRange">{{itemRange.range}}</li>
                            </ul>
                            <ul flex="dir:top main:center">
                                <li v-for="(itemRate,indexRate) in item.productAward" :key="indexRate">{{itemRate.rate}}</li>
                            </ul>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import '../less/reward-detail.less';
    import $api from '../tools/api';
    import {Loadmore,InfiniteScroll } from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    Vue.use(InfiniteScroll);
    export default {
        name: 'reward',
        data(){
            return {
                lists:[],
                isActive:true,
                tabMenu:'FIXI',
                autoFill:false,
                currentPage:0,
                pageSize:10,
                loading:false,
                loadMoreFlag:true
            }
        },
        methods:{
            loadTop(){
                this.lists = [];
                this.currentPage = 0;
                this.loadData().then(() =>{
                    this.$refs.loadmore.onTopLoaded();
                });
            },
            rewardTab(string){
                this.isActive = 'FIXI'== string?true:false;
                this.tabMenu = string;
                this.lists = [];
                this.currentPage = 0;
                this.loadData();
            },
            loadData(){
                return $api.get('/product/reward/list',{
                    'productType':this.tabMenu,
                    startRow:this.currentPage*this.pageSize,
                    pageSize:this.pageSize
                })
                    .then(msg => {
                        if(msg.code == 200){
                            this.lists = this.lists.concat(msg.data.rewardList);
                            if(msg.data.rewardList.length<this.pageSize){
                                this.loading = true;
                            }else{
                                this.loading = false;
                            }
                        }
                        return msg
                    })
            },
            loadMore(){
                this.loading = true;
                this.currentPage++;
                this.loadData();
            }
        }
    }
</script>
