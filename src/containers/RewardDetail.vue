<template>
    <div class="reward-detail">
        <div class="header" flex="dir:top">
            <div flex-box="1" class="tab bl" flex>
                <ul flex>
                    <li :class="{'left':true,'active':isActive,'app':isApp}" flex-box="1" @click="rewardTab('FIXI')">
                        定期理财
                    </li>
                    <li :class="{'right':true,'active':!isActive,'app':isApp}" flex-box="1" @click="rewardTab('PRIF')">
                        高端理财
                    </li>
                </ul>
            </div>
            <div class="title bl" flex="box:mean" flex-box="0">
                <p>产品名称</p>
                <p>投资金额（元）</p>
                <p>奖励比例{{titleRate}}</p>
            </div>
        </div>
        <div class="body">
            <div style="height: 100%;overflow: auto">
                <mt-loadmore :top-method="loadTop" ref="loadmore" :auto-fill="autoFill">
                    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                        <li class="item bl" flex="box:mean" v-for="(item,index) in lists" :key="index">
                            <p flex="dir:top main:center"
                               :class="{'app':isApp}"
                               class="product-name">{{item.productAbbrName}}</p>
                            <ul flex="dir:top main:center">
                                <li v-for="(itemRange,indexRange) in item.award" :key="indexRange">
                                    {{itemRange.range}}
                                </li>
                            </ul>
                            <ul flex="dir:top main:center">
                                <li v-for="(itemRate,indexRate) in item.award" :key="indexRate">
                                    {{itemRate.rate}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>
<script>
    import $device from '../tools/device';
    import Vue from 'vue';
    import '../less/reward-detail.less';
    import $api from '../tools/api';
    import requestHybrid from '../tools/hybrid';
    import {Loadmore, InfiniteScroll} from 'mint-ui';
    import {setTitle} from '../tools/operation';
    Vue.component(Loadmore.name, Loadmore);
    Vue.use(InfiniteScroll);
    export default {
        name: 'reward',
        data(){
            return {
                lists: [],
                isActive: true,
                tabMenu: 'FIXI',
                autoFill: false,
                currentPage: 0,
                pageSize: 10,
                loading: true,
                titleRate: '(年化)',
                isApp: false,
                type: 0
            }
        },
        created(){
            this.type = this.$route.query.type;
            let title = this.type == 1 ? '达人奖励细则' : '邀请奖励细则';
            setTitle(title);
            this.loadData();
            if ($device.kingold) {
                this.isApp = true;
                requestHybrid({
                    tagname: 'title',
                    param: {
                        backtype: 0,// "0 : 后退 1 : 直接关闭 2: 弹对话框",
                        backAndRefresh: 1,
                        title:'奖励细则',
                        keyboard_mode: 0//0 adjustresize 1 adjustpan
                    }
                })
            }
        },
        methods: {
            loadTop(){
                this.lists = [];
                this.currentPage = 0;
                this.loadData().then(() => {
                    this.$refs.loadmore.onTopLoaded();
                });
            },
            rewardTab(string){
                this.isActive = 'FIXI' == string ? true : false;
                this.tabMenu = string;
                this.titleRate = this.tabMenu == 'FIXI' ? '(年化)' : '';
                this.lists = [];
                this.currentPage = 0;
                this.loadData();
            },
            loadData(){
                let url = this.type == 1 ? '/product/talent/reward/list' : '/product/reward/list';
                return $api.get(url, {
                    productType: this.tabMenu,
                    startRow: this.currentPage * this.pageSize,
                    pageSize: this.pageSize
                })
                    .then(msg => {
                        if (msg.code == 200) {
                            let list = this.type == 1 ? msg.data.talentRewardList : msg.data.rewardList;
                            list.map((val) => {
                                val.award = this.type == 1 ? val.productTalentAward : val.productAward;
                            });
                            this.lists = this.lists.concat(list);
                            if (list.length < this.pageSize) {
                                this.loading = true;
                            } else {
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
