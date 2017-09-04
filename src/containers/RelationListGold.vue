<template>
    <div class="relation-list-gold">
        <div class="header">
            <div class="tabs" flex flex-box="0" >
                <div flex-box="1" class="tab" @click.stop="tab(order,0)">
                    <div class="tab-item" :class="{'active':isInvest==0}">全部</div>
                </div>
                <div flex-box="1" class="tab" @click.stop="tab(order,2)">
                    <div class="tab-item" :class="{'active':isInvest==2}">未投资</div>
                </div>
                <div flex-box="1" class="tab" @click.stop="tab(order,1)">
                    <div class="tab-item" :class="{'active':isInvest==1}">已投资</div>
                </div>
            </div>
            <div flex-box="1" flex>
                <ul flex>
                    <li :class="{'left':true,'active':order==1}" flex-box="1" @click.stop="tab(1,isInvest)">
                        按绑定时间排序
                    </li>
                    <li :class="{'right':true,'active':order==2}" flex-box="1" @click.stop="tab(2,isInvest)">
                        按贡献奖励排序
                    </li>
                </ul>
            </div>
        </div>
        <div class="body">
            <div v-if="!hasValue" style="text-align: center">
                暂无内容
            </div>
            <mt-loadmore :top-method="loadTop" ref="loadmore" :auto-fill="autoFill">
                <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="stopLoad" infinite-scroll-distance="10">
                    <li class="list-item" flex v-for="(item,index) in list">
                        <div class="user-logo" flex-box="0">
                            <img src="../images/personal-center/user-default.png" alt="avatar" class="avatar">
                            <p class="name" v-if="item.investorRealName">{{item.investorRealName}}</p>
                        </div>
                        <div flex-box="1">
                            <a :href="'tel:'+item.investorMobile" class="relation-phone">{{item.investorMobile}}</a>
                            <div flex class="relation-detail">
                                <p flex-box="1">绑定日期</p>
                                <p flex-box="1">{{item.registerTime}}</p>
                            </div>
                            <div flex class="relation-detail" v-if="item.rewardTotal">
                                <div flex-box="1" flex="cross:center">
                                    <p>贡献奖励</p>
                                    <img src="../images/tip.png" alt="tip" class="tip" @click.stop="showTip">
                                </div>
                                <p flex-box="1">{{item.rewardTotal}}元</p>
                            </div>
                        </div>
                        <div class="verify-status" v-if="item.userVerifyStatus>=3">已绑卡</div>
                    </li>
                </ul>
            </mt-loadmore>

        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import '../less/relation-list-gold.less';
    import Vue from 'vue';
    import {Loadmore, InfiniteScroll,MessageBox,Toast} from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    Vue.use(InfiniteScroll);
    export default {
        name: 'relation-list-gold',
        data(){
            return {
                list: [],
                pageSize:10,
                currentPage:0,
                isInvest:0,
                order:1,
                stopLoad:true,
                autoFill:false,
            }
        },
        created(){
            this.loadData();
        },
        computed: {
            hasValue(){
                return this.list.length
            }
        },
        methods: {
            showTip(){
                MessageBox({
                    title: '提示',
                    message: '贡献奖励=好友为你带来的未结算邀请奖励、已结算邀请奖励之和<br/>在我的奖励中可以查看明细',
                    confirmButtonText: '知道了'
                })
            },
            tab(order,isInvest){
                this.order = order;
                this.isInvest = isInvest;
                this.stopLoad = true;
              /*  this.tabMenu = string;
                this.titleRate = this.tabMenu == 'FIXI' ? '(年化)' : ''*/
                this.list = [];
                this.currentPage = 0;
                this.loadData();
            },
            loadTop(){
                this.list = [];
                this.currentPage = 0;
                this.loadData().then(() => {
                    this.$refs.loadmore.onTopLoaded();
                });
            },
            loadData(){
                return  $api.get('/relation/gold/list', {
                    isInvest: this.isInvest,
                    order: this.order,
                    startRow: this.currentPage * this.pageSize,
                    pageSize: this.pageSize
                })
                    .then(resp => {
                        if (resp.code == 200) {
                            this.list = this.list.concat(resp.data.list);
                            if (resp.data.list.length < this.pageSize) {
                                this.stopLoad = true;/*没有更多。*/
                            } else {
                                this.stopLoad = false;
                            }
                        }
                        return resp
                    })
            },
            loadMore(){
                this.stopLoad = true;
                this.currentPage++;
                this.loadData();
            }
        },
        destroyed(){

        }
    }
</script>
