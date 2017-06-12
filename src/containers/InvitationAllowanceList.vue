<template>
    <div flex="dir:top" flex-box="1" class="invitation-allowance-list">
        <div class="header" flex-box="0">
            <div class="title">
                <p class="right">说明</p>
            </div>
            <div class="tabs" flex='main:center'>
                <div flex-box="1" class="tab" :class="{'tab-active':tab==1}" @click.stop="changeTab(1)">
                    <div class="tab-item">直接邀请津贴</div>
                </div>
                <div flex-box="1" class="tab" :class="{'tab-active':tab==2}" @click.stop="changeTab(2)">
                    <div class="tab-item">间接邀请津贴</div>
                </div>
            </div>
            <ul flex="main:center">
                <li flex-box="1">
                    <p class='info'>{{sumData.unpaid | currencyFormat}}元</p>
                    <p class='tile'>待结算（税前）</p>
                </li>
                <li flex-box="1">
                    <p class='info'>{{sumData.paidWithTax | currencyFormat}}元</p>
                    <p class='tile'>已结算（税后）</p>
                </li>
            </ul>
        </div>
        <div class="item-list" flex-box='1'
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="disLoad"
             infinite-scroll-distance="70">
            <div flex="dir:left" class="item" v-for="(item,index) in tabList">
                <div class="left" flex-box="1">
                    <p class='info'>{{item.rewardAmount | currencyFormat}}元</p>
                    <p class='tile'>奖励</p>
                </div>
                <div class="right" flex-box="2">
                    <ul>
                        <li flex>
                            <div flex-box="0">理财师好友：</div>
                            <div flex-box="0">{{item.userMobile | mobileFormat}}</div>
                        </li>
                        <li flex class="last">
                            <div flex-box="0">投资时间：</div>
                            <div flex-box="0">{{item.createTime | timeFormat}}</div>
                        </li>
                    </ul>
                    <span class="icon" :class='item.rewardStatus == 2 ? "finish" : "cancel"'>
                            <i></i>
                        </span>
                </div>
            </div>
            <p v-show="loading&&hasMore" class="loading">加载更多...</p>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import '../less/invitation-allowance-list.less';
    import $api from '../tools/api';
    import {InfiniteScroll, Toast} from 'mint-ui';
    Vue.use(InfiniteScroll);
    export default {
        name: 'invitation-allowance-list',
        data(){
            return {
                tab: 1,
                pageSize: 10,
                pageNo: 1,
                hasMore: false,
                loading: false,
                sumData: {},
                tabList: []

            }
        },
        created(){
            this.getRewardList('refresh');

        },
        computed: {
            disLoad(){
                return this.loading || (!this.hasMore);
            }
        },
        methods: {
            changeTab(tab){
                this.tab = tab;
                this.pageNo=1;
                this.getRewardList('refresh')

            },
            loadMore(){
                if (this.loading) {
                    return false;
                }
                this.pageNo++;
                this.getRewardList();
            },
            getRewardList(type){
                let params = {
                    pageSize: 10,
                    pageNo: this.pageNo
                };
                if (this.tab == 1) {
                    params.rewardType = 2;
                } else {
                    params.rewardType = 3;
                }
                this.loading = true;
                $api.get('/reward/list', params)
                    .then(data => {
                        this.loading = false;
                        if (data.code == 200) {
                            if (type == 'refresh') {
                                this.tabList = [];
                                this.$set(this.sumData, 'unpaid', data.data.sumData.unpaid);
                                this.$set(this.sumData, 'paidWithTax', data.data.sumData.paidWithTax);
                            }
                            data.data.rewardList.map(el => {
                                this.tabList.push(el)
                            });
                            if (this.tabList.length >= data.data.count) {
                                this.hasMore = false;
                            } else {
                                this.hasMore = true;
                            }

                        } else {
                            this.hasMore = false;
                            Toast(data.msg);
                        }

                    })
            }

        }
    }

</script>
