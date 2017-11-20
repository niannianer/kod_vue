<template>
    <div flex="dir:top" flex-box="1" class="master-list">
        <div class="header">
            <ul class="tabs" flex="mean:center" >
                <li flex-box="1" :class="{'active': rewardType == 11}" @click.stop="toTab(11)">一级奖励</li>
                <li flex-box="1" :class="{'active': rewardType == 12}" class="tab2" @click.stop="toTab(12)">二级奖励</li>
                <li flex-box="1" :class="{'active': rewardType == 13}" @click.stop="toTab(13)">三级奖励</li>
            </ul>
            <div class="header-info">
                <ul flex class="ul">
                    <li flex-box="1">
                        <p class='tile'>待结算（税前）</p>
                        <p class='info'>
                            <span class="num">{{sumData.unpaid}}</span>
                            元
                        </p>
                    </li>
                    <li flex-box="1">
                        <p class='tile'>已结算（税后）</p>
                        <p class='info'>
                            <span class="num">{{sumData.paidWithTax}}</span>
                            元
                        </p>
                    </li>
                </ul>
            </div>
            <div class="bottom"></div>
        </div>

        <div class="item-list"  flex-box="1" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="disLoad"
             infinite-scroll-distance="70">
                <div flex="dir:left" flex-box="0" class="item" :key="index" v-for="(item,index) in rewardList"  @click.stop="link(item.rewardBillCode)">
                    <div class="left" flex="dir:top main:center" >
                        <p class='info' :class='item.rewardStatus == 2 ? "blue" : "orange"' >
                            <span class="num">
                                {{item.rewardStatus == 2 ? item.payAmount : item.rewardAmount | currencyFormat}}
                            </span>元
                        </p>
                        <p class='tile'>奖励</p>
                    </div>
                    <div class="right" flex-box="1">
                        <ul>
                            <li flex class="black">
                                 <div flex-box="0">好友：</div>
                                 <div flex-box="0">{{item.beInvitedMobile|mobileFormat}}</div>
                            </li>
                            <li flex>
                                 <div flex-box="0">投资金额：</div>
                                 <div flex-box="0">{{item.investAmount | currencyFormat}}元</div>
                            </li>
                            <li flex>
                                 <div flex-box="0">奖励比例：</div>
                                 <div flex-box="0" class="width">{{item.rewardFactor}}</div>
                            </li>
                            <li flex class="last">
                                 <div flex-box="0">投资时间：</div>
                                 <div flex-box="0">{{item.createTime|timeFormat}}</div>
                            </li>
                        </ul>
                        <span class="icon" :class='item.rewardStatus == 2 ? "finish" : "cancel"'></span>
                    </div>
                </div>
            <p v-show="loading&&hasMore" class="loading">加载更多...</p>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import '../less/master-list.less';
    import $api from '../tools/api';
    import {InfiniteScroll, Toast} from 'mint-ui';
    Vue.use(InfiniteScroll);
    export default {
        name: 'master-list',
        data(){
            return{
                unpaid:'',
                paidWithTax:'',
                sumData:{},
                rewardList:[],
                pageNo:1,
                isRefreshing:false,
                loading:false,
                hasMore:false,
                rewardType: 11
            }
        },
        created(){
           this.getList(this.rewardType);
        },
        computed: {
            disLoad(){
                return this.loading || (!this.hasMore);
            }
        },
        methods:{
            toTab(rewardType){
                this.rewardType = rewardType;
            },
            loadMore(){
                if (this.loading) {
                    return false;
                }
                this.pageNo++;
                this.getList();
            },
            getList(type){
                let param= {
                    pageNo:this.pageNo,
                    pageSize:10,
                    rewardType:this.rewardType
                };
                this.loading = true;
                $api.get('/reward/list',param)
                    .then(msg => {
                        this.loading = false;
                        if(msg.code == 200){
                            this.sumData = msg.data.sumData;
                            if(type == 'refresh'){
                                this.rewardList = msg.data.rewardList;
                            }
                            msg.data.rewardList.map(el => {
                                this.rewardList.push(el);
                            });
                            if(this.rewardList.length >= msg.data.count){
                                this.hasMore = false;
                                }else{
                                this.hasMore = true;
                                }
                        }
                        else{
                            this.hasMore = false;
                            Toast(msg.msg);
                        }
                    })
            },
            link(rewardBillCode){
                if(this.isRefreshing){
                    return false;
                }
                this.$router.push({
                    path:'/invitation-reward-detal',
                    query:{
                        rewardBillCode
                    }
                })
            }

        },

    }

</script>
