<template>
    <div flex="dir:top" flex-box="1" class="invitation-allowance-list">
        <div class="header" flex-box="0">
            <ul class="tabs" flex="mean:center">
                <li flex-box="1" :class="{'active': tab == 1,'br': tab == 2}" @click.stop="changeTab(1)">直接邀请津贴</li>
                <li flex-box="1" :class="{'active': tab == 2,'bl': tab == 1}" @click.stop="changeTab(2)">间接邀请津贴</li>
            </ul>
            <div class="header-info">
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
        <div class="item-list" flex-box='1'
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="disLoad"
             infinite-scroll-distance="70">
            <div flex="dir:left" class="item" v-for="(item,index) in tabList">
                <div class="left" flex-box="1" flex="dir:top main:center">
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
                            <div flex-box="0">{{item.beInvitedMobile | mobileFormat}}</div>
                        </li>
                        <li flex>
                            <div flex-box="0">投资时间：</div>
                            <div flex-box="0">{{item.createTime | timeFormat}}</div>
                        </li>
                    </ul>
                    <span class="icon" :class='item.rewardStatus == 2 ? "finish" : "cancel"'></span>
                </div>
            </div>
            <p v-show="loading&&hasMore" class="loading">加载更多...</p>
        </div>
        <!--<div flex="dir:top" flex-box="1" class="shade"  v-show="show">-->
        <!--<div class="cancel" flex='main:right' flex-box='1'  @click="show=false">关闭</div>-->
        <!--<div class="content"flex-box='4'>-->
        <!--<div>-->
        <!--<p>您的直接理财师好友推荐客户购买平台产品后， 您将获得直接邀请津贴。</p>-->
        <!--<p>奖励金额=好友奖励*奖励系数</p>-->
        <!--</div>-->
        <!--<div>-->
        <!--<p>您的间接理财师好友推荐客户购买平台产品后， 您将获得间接邀请奖励。</p>-->
        <!--<p>奖励金额=好友奖励*奖励系数</p>-->
        <!--</div>-->
        <!--<div>-->
        <!--<p>注：直接邀请奖励系数为16%</p>-->
        <!--<p>间接邀请奖励系数为4%</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
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
                tab: this.$route.query.rewardType - 1,
                pageSize: 10,
                pageNo: 1,
                hasMore: false,
                loading: false,
                sumData: {},
                tabList: [],
                show: false

            }
        },
        created(){
            this.addHive(1, 'invitation-allowance-list', 1020);
            this.getRewardList('refresh');

        },
        computed: {
            disLoad(){
                return this.loading || (!this.hasMore);
            }
        },
        methods: {
            changeTab(tab){
                this.addHive(0, 'invitationAllowanceList_tab_status', 102001);
                this.tab = tab;
                this.pageNo = 1;
                this.getRewardList('refresh')

            },
            loadMore(){
                this.addHive(0, 'invitationAllowanceList_scroll_loading', 102002);
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
//                         console.log(data)
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
