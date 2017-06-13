<template>
    <div flex="dir:top" flex-box="1" class="invitation-allowance-list">
        <div class="header" flex-box="0">
            <div class="title">
                <p class="right"  @click="show=true">说明</p>
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
        <div class="item-list" flex-box='1'>
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
                            <div flex-box="0">{{item.createTime |timeFormat}}</div>
                        </li>
                    </ul>
                    <span class="icon" :class='item.rewardStatus == 2 ? "finish" : "cancel"'>
                            <i></i>
                        </span>
                </div>
            </div>
        </div>
        <div flex="dir:top" flex-box="1" class="shade"  v-show="show">
            <div class="cancel" flex='main:right' flex-box='1'  @click="show=false">关闭</div>
            <div class="content"flex-box='4'>
                <div>
                    <p>您的直接理财师好友推荐客户购买平台产品后， 您将获得直接邀请津贴。</p>
                    <p>奖励金额=好友奖励*奖励系数</p>
                </div>
                <div>
                    <p>您的间接理财师好友推荐客户购买平台产品后， 您将获得间接邀请奖励。</p>
                    <p>奖励金额=好友奖励*奖励系数</p>
                </div>
                <div>
                    <p>注：直接邀请奖励系数为16%</p>
                    <p>间接邀请奖励系数为4%</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import '../less/invitation-allowance-list.less';
    import $api from '../tools/api';
    import {Loadmore} from 'mint-ui';
    export default {
        name: 'invitation-allowance-list',
        data(){
            return {
                tab: 1,
                pageSize: 10,
                pageNo1: 1,
                pageNo2: 1,
                loading1: false,
                loading2: false,
                sumData: {},
                tabList: [],
                show:false

            }
        },
        created(){
            this.getRewardList();

        },
        computed: {
            count(){
                return this.$store.state.count
            },
        },
        methods: {
            changeTab(tab){
                this.tab = tab;
                this.getRewardList()

            },
            getRewardList(){
                let params = {
                    pageSize: 10
                };
                if (this.tab == 1) {
                    params.pageNo = this.pageNo1;
                    params.rewardType = 2;
                } else {
                    params.pageNo = this.pageNo2;
                    params.rewardType = 3;
                }

                $api.get('/reward/list', params)
                    .then(data => {
                        console.log(data);
                        if (data.code == 200) {
                            this.tabList = [];
                            this.$set(this.sumData, 'unpaid', data.data.sumData.unpaid);
                            this.$set(this.sumData, 'paidWithTax', data.data.sumData.paidWithTax);
                            data.data.rewardList.map(el => {
                                this.tabList.push(el)
                            });

                        }

                    })
            }

        }
    }

</script>
