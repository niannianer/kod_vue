<template>
    <div class="ticket-list">
        <div class="header" flex="dir:top">
         <!--   <div flex-box="1" class="tab bl" flex>
                <ul flex>
                    <li :class="{'left':true,'active':isActive}" flex-box="1" @click="ticketTab('cash')">
                        现金券
                    </li>
                    <li :class="{'right':true,'active':!isActive}" flex-box="1" @click="ticketTab('rate')">
                        加息券
                    </li>
                </ul>
            </div>-->
        </div>
        <div class="body">
            <div class="nothing" v-if="!lists.length">暂无内容</div>
            <ul v-else
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="stop"
                infinite-scroll-distance="10">
                <li class="item" flex v-for="(item,index) in lists">
                    <div class="item-l" :class="{'rate':!isActive,'disabled':false}" flex flex-box="0">
                        <div flex-box="1" flex="dir:top cross:center">
                            <div flex-box="1" class="title" flex="cross:center">
                                <p>{{item.couponType ==1?'现金券':'加息券'}}</p>
                            </div>
                            <p flex-box="1" class="info">￥{{item.couponFaceValue}}</p>
                        </div>
                    </div>
                    <div class="item-r" flex-box="1">
                        <p v-if="item.ccRemark1">{{item.ccRemark1}}</p>
                        <p v-if="item.ccRemark2">{{item.ccRemark2}}</p>
                        <p v-if="item.ccRemark3">{{item.ccRemark3}}</p>
                        <div flex class="expired-time">
                            <p flex-box="1">{{item.expiredDate}}</p>
                            <p flex-box="0" class="btn" v-if="item.couponStatus==1" @click.stop="useTicket(item.ccCode)">{{item.couponStatusText}}</p>
                            <p flex-box="0" class="btn disabled" v-else>{{item.couponStatusText}}</p>
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
    import { InfiniteScroll } from 'mint-ui';
    import {Toast} from 'mint-ui';
    Vue.use(InfiniteScroll);
    export default {
        name: 'ticket-list',
        data(){
            return {
                isActive:true,
                couponType:1,
                lists:[],
                currentPage:0,
                pageSize:10,
                stop:true
            }
        },
        created(){
            this.loadData();
        },
        computed: {},
        methods: {
            ticketTab(string){
                this.isActive = 'cash' == string ? true : false;
                this.couponType = 'cash' == string ? 1 : 2;
                this.lists = [];
                this.loadData();
            },
            loadMore(){
                this.stop = true;
                this.currentPage++;
                this.loadData();
            },
            loadData(){
                return $api.get('/cashCoupon/list', {
                    couponType:this.couponType,
                    startRow: this.currentPage * this.pageSize,
                    pageSize: this.pageSize
                })
                    .then(resp => {
                        if (resp.code == 200) {
                            resp.data.couponList.map(item=>{
                                switch (item.couponStatus){
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
                                item.expiredDate = this.remainTime(item.validEndTime,item.serverTime);
                            })
                            this.lists = this.lists.concat(resp.data.couponList);
                            if (this.lists.length < resp.data.couponCount) {
                                this.stop = false;
                            } else {
                                this.stop = true;
                            }
                        }
                        return resp
                    })
            },
            remainTime(end,now){
                let remainTime = (end-now)/1000;
                if(remainTime<0||isNaN(remainTime)){
                    return ''
                }
                let day = Math.floor(remainTime/3600/24);
                if(day>0){
                    return '还有'+day+'天过期'
                }
                let hours = Math.floor(remainTime/60/60);
                if(hours>0){
                    return '还有'+hours+'时过期'
                }
                let minutes = Math.floor(remainTime/60);
                if((remainTime/60)<1){
                    return '还有1分过期'
                }
                if(minutes>0){
                    return '还有'+minutes+'分过期'
                }
                return ''
            },
            useTicket(ccCode){
                $api.get('/adaptProduct/list',{
                    ccCode
                })
                    .then(resp=>{
                        if(resp.code==200){
                            if(resp.data.list.length){
                                this.$router.push({
                                    path:'/usable-financial',
                                    query:{
                                        ccCode
                                    }
                                })
                                return false;
                            }
                            Toast('现金券可用产品已售罄，请选择其他现金券');
                        }else{
                            Toast(resp.msg);
                        }
                    })
            }

        },
        destroyed(){

        }
    }
</script>
