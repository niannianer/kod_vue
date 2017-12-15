<template>
    <div flex="dir:top" flex-box="1" class="invitation-reward-list">
        <div class="header">
            <div class="header-info">
                <div class="right" @click.stop="$router.push('/reward-detail')">奖励细则</div>
                <ul flex class="ul">
                    <li flex-box="1">
                        <p class='tile'>待结算（税前）</p>
                        <p class='info'>
                            <span class="num">{{sumData.unpaid | currencyFormat}}</span>
                            元
                        </p>
                    </li>
                    <li flex-box="1">
                        <p class='tile'>已结算（税后）</p>
                        <p class='info'>
                            <span class="num">{{sumData.paidWithTax | currencyFormat}}</span>
                            元
                        </p>
                    </li>
                </ul>
            </div>
            <div class="bottom"></div>
        </div>
        <div class="item-list" flex-box="1" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="disLoad"
             infinite-scroll-distance="70">
            <div flex="dir:left" class="item" :key="index" v-for="(item,index) in rewardList"
                 @click.stop="link(item.rewardBillCode)">
                <div class="left" flex="dir:top main:center">
                    <p class='info' :class='item.rewardStatus == 2 ? "blue" : "orange"'>
                            <span class="num">
                                {{item.rewardStatus == 2 ? item.payAmount : item.rewardAmount | currencyFormat}}
                            </span>元
                    </p>
                    <p class='tile'>奖励</p>
                </div>
                <div class="right" flex-box="2">
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
                            <div flex-box="0">{{item.createTime|timeFormat('minute')}}</div>
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
    import '../less/invitation-reward-list.less';
    import $api from '../tools/api';
    import {InfiniteScroll, Toast} from 'mint-ui';
    Vue.use(InfiniteScroll);
    export default {
        name: 'invitation-reward-list',
        data(){
            return {
                unpaid: '',
                paidWithTax: '',
                sumData: {},
                rewardList: [],
                pageNo: 1,
                isRefreshing: false,
                loading: false,
                hasMore: false
            }
        },
        created(){
            this.addHive(1, 'invitation-reward-list');
            this.getRewardList();
        },
        computed: {
            disLoad(){
                return this.loading || (!this.hasMore);
            }
        },
        methods: {
            loadMore(){
                this.addHive(0, 'invitationRewardList_scroll_loading');
                if (this.loading) {
                    return false;
                }
                this.pageNo++;
                this.getRewardList();
            },
            getRewardList(type){
                let param = {
                    pageNo: this.pageNo,
                    pageSize: 10,
                    rewardType: 1
                }
                this.loading = true;
                $api.get('/reward/list', param)
                    .then(msg => {
                        this.loading = false;
                        if (msg.code == 200) {
                            this.sumData = msg.data.sumData;
//                            console.log(msg)
                            if (type == 'refresh') {
                                this.rewardList = msg.data.rewardList;
                            }
                            msg.data.rewardList.map(el => {
                                this.rewardList.push(el);
                            });
                            if (this.rewardList.length >= msg.data.count) {
                                this.hasMore = false;
                            } else {
                                this.hasMore = true;
                            }
                        }
                        else {
                            this.hasMore = false;
                            Toast(msg.msg);
                        }
                    })
            },
            link(rewardBillCode){
              this.addHive(0,'invitationRewardList_link_invitationRewardDetail');
                if (this.isRefreshing) {
                    return false;
                }
                this.$router.push({
                    path: '/invitation-reward-detal',
                    query: {
                        rewardBillCode
                    }
                })
            }

        },

    }

</script>
