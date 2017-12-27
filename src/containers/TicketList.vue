<template>
    <div class="ticket-list" flex="dir:top" style="height: 100%">
        <div class="header" flex-box="0">
            <div flex-box="1" class="tab bl" flex>
                <ul flex>
                    <li :class="{'left':true,'active':isActive}" flex-box="1" @click="ticketTab('cash')">
                        现金券
                    </li>
                    <li :class="{'right':true,'active':!isActive}" flex-box="1" @click="ticketTab('rate')">
                        加息券
                    </li>
                </ul>
            </div>
        </div>
        <div class="body" flex-box="1" style="overflow-y: auto">
            <div class="nothing" v-if="!lists.length">暂无内容</div>
            <ul v-show="lists.length"
                ref="infiniteScroll"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="stop"
                infinite-scroll-distance="70">
                <li class="item" flex v-for="(item,index) in lists">
                    <div class="item-l" :class="{'rate':!isActive,'disabled':item.couponStatus!=1}" flex flex-box="0">
                        <div flex-box="1" flex="dir:top cross:center">
                            <div flex-box="1" class="title" flex="cross:center">
                                <p>{{item.couponType == 1 ? '现金券' : '加息券'}}</p>
                            </div>
                            <p flex-box="1" class="info" v-if="item.couponType ==1">￥{{item.couponFaceValue}}</p>
                            <p flex-box="1" class="info" v-else>{{item.couponInterestYieldRate}}</p>
                        </div>
                    </div>
                    <div class="item-r" flex-box="1">
                        <p v-if="item.ccRemark1">{{item.ccRemark1}}</p>
                        <p v-if="item.ccRemark2">{{item.ccRemark2}}</p>
                        <p v-if="item.ccRemark3">{{item.ccRemark3}}</p>
                        <div flex class="expired-time">
                            <p flex-box="1" v-if="item.couponStatus==1">{{item.expiredDate}}</p>
                            <p flex-box="1" v-else></p>
                            <p flex-box="0" class="btn" v-if="item.couponStatus==1"
                               @click.stop="useTicket(item.ccCode)">{{item.couponStatusText}}</p>
                            <img src="../images/experience-fund/used.png" alt="used" v-if="item.couponStatus==2"
                                 class="img">
                            <img src="../images/experience-fund/expired.png" alt="expired" v-if="item.couponStatus==3"
                                 class="img">
                        </div>
                    </div>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import '../less/ticket-list.less';
    import $api from '../tools/api';
    import {InfiniteScroll} from 'mint-ui';
    import {Toast, Indicator} from 'mint-ui';
    Vue.use(InfiniteScroll);
    import axios from 'axios';

    export default {
        name: 'ticket-list',
        data(){
            return {
                hasUnread: 1,
                couponType: 1,
                lists: [],
                currentPage: 0,
                pageSize: 10,
                stop: true,
                source: {},
                msgCode: 1 //default jiaxijuan
            }
        },
        created(){
            this.addHive(1, 'ticketList');
            let event = ['_trackEvent', '我的优惠券', 'SHOW', '进入我的优惠券页面', '进入我的优惠券页面'];
            window._hmt.push(event);
            this.msgCode = this.$route.query.code || 1;
            if (this.msgCode == 2) {
                this.couponType = 2;
            }
            this.loadData();
        },
        computed: {
            isActive(){
                return this.msgCode == 1;
            }
        },
        methods: {
            ticketTab(string){
                this.addHive(0, 'ticketList_tab_checkTab');
                let event = ['_trackEvent', '我的优惠券', 'CLICK', '我的优惠券-点击tab', '我的优惠券-点击tab'];
                window._hmt.push(event);
                this.couponType = 'cash' == string ? 1 : 2;
                this.msgCode = this.couponType;
                this.currentPage = 0;
                this.lists = [];
                this.source.cancel();
                this.loadData();
            },
            loadMore(){
                this.stop = true;
                this.currentPage++;
                this.loadData();
            },
            loadData(){
                Indicator.open();
                let CancelToken = axios.CancelToken;
                this.source = CancelToken.source();
                return $api.get('/cashCoupon/list', {
                    couponType: this.couponType,
                    startRow: this.currentPage * this.pageSize,
                    pageSize: this.pageSize
                }, this.source).then(resp => {
                    if (resp.code == 200) {
                        if (this.hasUnread) {
                            this.delUnread();
                        }
                        resp.data.couponList.map(item => {
                            switch (item.couponStatus) {
                                case 1:
                                    item.couponStatusText = '去使用';
                                    break;
                                case 2:
                                    item.couponStatusText = '已使用';
                                    break;
                                case 3:
                                    item.couponStatusText = '已过期';
                                    break;
                                case 4:
                                    item.couponStatusText = '已作废';
                                    break;
                            }
                            item.expiredDate = this.remainTime(item.validEndTime, item.serverTime);
                        })
                        this.lists = this.lists.concat(resp.data.couponList);

                        this.$nextTick(() => {
                            if (this.lists.length < resp.data.couponCount && resp.data.couponList.length) {
                                this.stop = false;
                            } else {
                                this.stop = true;
                            }
                        })

                    }
                    Indicator.close();
                    return resp
                })
            },
            delUnread(){
                let {msgCode} = this;
                $api.post('/user/destroy/unread', {msgCode})
                    .then(resp => {
                        if (resp.code == 200) {
                            this.hasUnread = 0;
                        }
                    })
            },
            remainTime(end, now){
                let remainTime = (end - now) / 1000;
                if (isNaN(remainTime)) {
                    return ''
                }
                if (remainTime < 0) {
                    return '还有1分钟过期'
                }
                let day = Math.floor(remainTime / 3600 / 24);
                if (day > 0) {
                    return '还有' + day + '天过期'
                }
                let hours = Math.floor(remainTime / 60 / 60);
                if (hours > 0) {
                    return '还有' + hours + '小时过期'
                }
                let minutes = Math.floor(remainTime / 60);
                if ((remainTime / 60) < 1) {
                    return '还有1分钟过期'
                }
                if (minutes > 0) {
                    return '还有' + minutes + '分钟过期'
                }
                return ''
            },
            useTicket(ccCode){
                this.addHive(0, 'ticketList_item_useTicket');
                let event = ['_trackEvent', '我的优惠券', 'CLICK', '我的优惠券-点击使用', '我的优惠券-点击使用'];
                window._hmt.push(event);
                /*有可用产品时跳转。只需取1条即可知是否跳转*/
                $api.get('/adaptProduct/list', {
                    ccCode,
                    startRow: 0,
                    pageSize: 1
                })
                    .then(resp => {
                        if (resp.code == 200) {
                            if (resp.data.list && resp.data.list.length) {
                                this.addHive(2, 'ticketList_item_usableFinancial');
                                this.$router.push({
                                    path: '/usable-financial',
                                    query: {
                                        ccCode
                                    }
                                })
                                return false;
                            }
                            let text = '加息券';
                            if (this.msgCode == 1) {
                                text = '现金券';
                            }
                            Toast(text + '可用产品已售罄，请选择其他' + text);
                        } else {
                            Toast(resp.msg);
                        }
                    })
            }

        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
