<template>
    <div flex="dir:top" flex-box="1" class="reward-detail">
        <div class="header bl" flex-box="0" flex>
            <ul flex>
                <li  :class="{'left':true,'active':isActive}" flex-box="1" @click="rewardTab('FIXI')">定期理财</li>
                <li  :class="{'right':true,'active':!isActive}" flex-box="1" @click="rewardTab('PRIF')">高端理财</li>
            </ul>
            <div class="title bl" flex="box:mean"  >
                <p>产品名称</p>
                <p>投资金额（万元）</p>
                <p>奖励比列（年化）</p>
            </div>
        </div>
        <div class="body" style="height: 400px">
            <div style="height: 100%;overflow: auto">
                <mt-loadmore :top-method="loadTop"  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" >
                    <ul>
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
<!--    <div class="reward-detail">
        <div class="header bl" flex-box="0" flex>
            <ul flex>
                <li  :class="{'left':true,'active':isActive}" flex-box="1" @click="rewardTab('FIXI')">定期理财</li>
                <li  :class="{'right':true,'active':!isActive}" flex-box="1" @click="rewardTab('PRIF')">高端理财</li>
            </ul>
        </div>
        <div class="title bl" flex="box:mean"  >
            <p>产品名称</p>
            <p>投资金额（万元）</p>
            <p>奖励比列（年化）</p>
        </div>
        <ul>
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
    </div>-->

</template>

<script>
    import Vue from 'vue';
    import '../less/reward-detail.less';
    import $api from '../tools/api';
    import { Loadmore } from 'mint-ui';

    Vue.component(Loadmore.name, Loadmore);
    export default {
        name: 'reward',
        data(){
            return {
                lists:[],
                isActive:true,
                tabMenu:'FIXI',
                allLoaded:false
            }
        },
        created(){
                    $api.get('/product/reward/list',{
                        'productType':this.tabMenu/*,
                        startRow:'1',
                        pageSize:'4'*/
                    })
                        .then(msg => {
                            if(msg.code != 401){
                               this.lists = msg.data.rewardList
                            }
                            return msg
                        })
        },
        methods:{
            loadTop(){
                this.$refs.loadmore.onTopLoaded();
            },
            rewardTab(string){
                this.isActive = 'FIXI'== string?true:false;
                this.tabMenu = string;
            },
            loadBottom(){
                console.log('loadBottom');
            }
        }

    }
</script>
