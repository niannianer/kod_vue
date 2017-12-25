<template>
    <div flex="dir:top" flex-box="1" class="master-list">
        <div class="header">
            <ul class="tabs" flex="mean:center" >
                <li flex-box="1" :class="{'active': rewardType == 11,'br': rewardType == 12}" @click.stop="toTab(11)">一级奖励</li>
                <li flex-box="1" :class="{'active': rewardType == 12,'bl': rewardType == 11,'br': rewardType == 13}" @click.stop="toTab(12)">二级奖励</li>
                <li flex-box="1" :class="{'active': rewardType == 13,'bl': rewardType == 12}" @click.stop="toTab(13)">三级奖励</li>
            </ul>
        </div>
        <div class="count-info" v-if="investorType == 12">
            <div class="header-info">
                <div class="right" @click.stop="$router.push('/reward-list')">奖励细则</div>
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
        <div class="item-list"  flex-box="1"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="stopLoad"
             infinite-scroll-distance="70"
             v-if="investorType == 12">
                <div flex="dir:left" flex-box="0" class="item" :key="index"
                     v-for="(item,index) in rewardList"
                     :class="{'short': rewardType == 12||rewardType == 13}">
                    <div class="left" flex="dir:top main:center" >
                        <p class='info' :class='item.rewardStatus == 2 ? "blue" : "orange"' >
                            <span class="num">
                                {{item.rewardStatus == 2 ? item.payAmount : item.rewardAmount | currencyFormat}}
                            </span>元
                        </p>
                        <p class='tile'>奖励</p>
                    </div>
                    <div class="right" flex-box="1">
                        <ul class="ul" flex="dir:top cross: center">
                            <li class="li black" flex-box="1">
                                 <div>好友：{{item.beInvitedMobile|mobileFormat}}</div>
                            </li>
                            <li class="li" flex-box="1" v-if="rewardType == 11">
                                 <div>投资金额：{{item.investAmount | currencyFormat}}元</div>
                            </li>
                            <li class="li" flex-box="1" v-if="rewardType == 11">
                                 <div>奖励比例：{{item.rewardFactor}}</div>
                            </li>
                            <li class="li" flex-box="1">
                                 投资时间：{{item.createTime|timeFormat('minute')}}
                            </li>
                        </ul>
                        <span class="icon" :class='item.rewardStatus == 2 ? "finish" : "cancel"'></span>
                    </div>
                </div>
            <p v-show="loading&&!noMore" class="loading">加载更多...</p>
        </div>
        <div class="remind-msg" v-if="investorType != 12">
            <img src="../images/reward/cry.png" class="img"/>
            <div>您还没有开启理财达人特权</div>
            <div>开启才能获得奖励哦</div>
            <button class="btn open-btn" @click.stop="toPath('/land-financial-master.html')">去开启特权</button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import '../less/master-list.less';
    import {mapState} from 'vuex';
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
                loading: false,
                noMore: true,
                rewardType: 11,
                initing: true
            }
        },
        created(){
            this.addHive(1,'master-list',1025);
           this.getList('refresh');
        },
        computed: {
            ...mapState(['investorType'])
        },
        methods:{
            toTab(rewardType){
                this.addHive(0,'masterList_tab_type',102501);
                this.rewardType = rewardType;
                this.rewardList = [];
                this.pageNo = 1;
                this.initing = true;
                this.getList('refresh');
            },
            loadMore(){
                this.addHive(0,'masterList_scroll_loading',102502);
                if (this.loading || this.noMore) {
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
                                this.rewardList = [];
                                this.initing = false;
                            }
                            msg.data.rewardList.map(el => {
                                this.rewardList.push(el);
                            });
                            if(this.rewardList.length >= msg.data.count){
                                this.noMore = true;
                            }else{
                                this.noMore = false;
                            }
                        }
                        else{
                            this.noMore = true;
                            Toast(msg.msg);
                        }
                    })
            },
            link(rewardBillCode){
                this.addHive(0,'masterList_link_detail',102503);
                if(this.isRefreshing){
                    return false;
                }
                this.$router.push({
                    path:'/invitation-reward-detal',
                    query:{
                        rewardBillCode
                    }
                })
            },
            toPath(path){
                this.addHive(0,'masterList_link_path',102504);
                window.location.href = path;
            }
        },

    }

</script>
