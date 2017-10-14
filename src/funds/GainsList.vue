<template>
    <div class="gains-list" flex="dir:top">
        <div class="header" flex-box="0">
            <div class="check-list" flex="box:mean">
                <div class="check-item" :class="{'active':fundType==256}" @click.stop="checkFundType(256)">
                    全部
                </div>
                <div class="check-item" :class="{'active':fundType==1}" @click.stop="checkFundType(1)">
                    股票型
                </div>
                <div class="check-item" :class="{'active':fundType==2}" @click.stop="checkFundType(2)">
                    债券型
                </div>
                <div class="check-item" :class="{'active':fundType==3}" @click.stop="checkFundType(3)">
                    混合型
                </div>
                <div class="check-item" :class="{'active':fundType==4}" @click.stop="checkFundType(4)">
                    货币型
                </div>
                <div class="check-item" :class="{'active':fundType==7}" @click.stop="checkFundType(7)">
                    QDII
                </div>
            </div>
        </div>
        <div class="body" flex-box="1">
            <div flex>
                <div flex-box="0" class="title-list">
                    <div class="bg-content fund-name" flex-box="0">
                        <div class="title-item">
                            基金名称
                        </div>
                        <div class="item-info" flex="cross:center main:center" v-for="(item,index) in list">
                            {{item.fundAbbrName}}
                        </div><!--内容溢出怎么办？-->
                    </div>
                </div>
                <div class="title-list" flex-box="1" flex style="overflow-x: auto">
                    <div>
                        <div flex>
                            <div class="title-item bg-grey" @click.stop="checkOrder('unitYield')" flex="main:center cross:center" v-if="fundType==4" style="width: 6rem">
                                <p>万份收益（元）</p>
                                <img src="../images/area.png" alt="" class="area">
                            </div>
                            <div class="title-item bg-content" @click.stop="checkOrder('yearlyRoe')" flex="main:center cross:center" v-if="fundType==4">
                                <p>七日年化</p>
                                <img src="../images/area.png" alt="" class="area">
                            </div>
                            <div class="title-item bg-grey" @click.stop="checkOrder('nav')" flex="main:center cross:center" v-if="fundType!=4">
                                <p>单位净值</p>
                                <img src="../images/area.png" alt="" class="area">
                            </div>
                            <div class="title-item bg-content" @click.stop="checkOrder('dayReturn')" flex="main:center cross:center" v-if="fundType!=4">
                               <p> 日涨幅</p>
                                <img src="../images/area.png" alt="" class="area">
                            </div>
                            <div class="title-item bg-grey" @click.stop="checkOrder('oneWeekReturn')" flex="main:center cross:center">
                                <p>周涨幅</p>
                                <img src="../images/area.png" alt="" class="area">
                            </div>
                            <div class="title-item bg-content" @click.stop="checkOrder('oneMonthReturn')" flex="main:center cross:center">
                                <p>月涨幅</p>
                                <img src="../images/area.png" alt="" class="area">
                            </div>
                            <div class="title-item bg-grey" @click.stop="checkOrder('quarterReturn')" flex="main:center cross:center">
                                <p>季涨幅</p>
                                <img src="../images/area.png" alt="" class="area">
                            </div>
                            <div class="title-item bg-content" @click.stop="checkOrder('oneYearReturn')" flex="main:center cross:center">
                               <p> 近一年涨幅</p>
                                <img src="../images/area.png" alt="" class="area">
                            </div>
                            <div class="title-item bg-grey" @click.stop="checkOrder('thisYearReturn')" flex="main:center cross:center">
                               <p> 今年涨幅</p>
                                <img src="../images/area.png" alt="" class="area">
                            </div>
                        </div>
                        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                            infinite-scroll-distance="10">
                            <li flex v-for="(item,index) in list">
                                <div class="item-info bg-grey" flex="cross:center main:center" v-if="fundType==4" style="width: 6rem">
                                    {{item.unitYield}}<!--万份收益-->
                                </div>
                                <div class="item-info bg-content" flex="cross:center main:center" v-if="fundType==4">
                                    {{item.yearlyRoe}}<!--七日年化-->
                                </div>
                                <div class="item-info bg-grey" flex="cross:center main:center" v-if="fundType!=4">
                                    {{item.nav}}<!--单位净值-->
                                </div>
                                <div class="item-info red f8 bg-content" flex="cross:center main:center" v-if="fundType!=4">
                                    {{item.dayReturn}}<!--日涨幅-->
                                </div>
                                <div class="item-info red f8 bg-grey" flex="cross:center main:center">
                                    {{item.oneWeekReturn}}<!--周-->
                                </div>
                                <div class="item-info bg-content" flex="cross:center main:center">
                                    {{item.oneMonthReturn}}<!--月-->
                                </div>
                                <div class="item-info bg-grey" flex="cross:center main:center">
                                    {{item.quarterReturn}}<!--季-->
                                </div>
                                <div class="item-info bg-content" flex="cross:center main:center">
                                    {{item.oneYearReturn}}<!--1年-->
                                </div>
                                <div class="item-info bg-grey" flex="cross:center main:center">
                                    {{item.thisYearReturn}}<!--今年-->
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import Vue from 'vue';
    import {Loadmore, InfiniteScroll} from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    Vue.use(InfiniteScroll);
    import '../less/fund/gains-list.less';
    export default {
        name: 'gains-list',
        data(){
            return {
                fundType: 256,
                list: [],
                autoFill: false,
                currentPage: 0,
                pageSize: 10,
                loading: true,
                orderBy: 'nav',
                isDesc:true
            }
        },
        created(){
            this.loadData();
        },
        computed: {
            sort(){
                return this.isDesc?'DESC':'ASC'
            }
        },
        methods: {
            checkOrder(str){
                if(str == this.orderBy){
                    this.isDesc = !this.isDesc;
                }
                this.orderBy = str;
                this.list = [];
                this.currentPage = 0;
                this.loadData();
            },
            checkFundType(num){
                this.fundType = num;
                this.list = [];
                this.currentPage = 0;
                this.loadData();
            },
            loadTop(){
                this.lists = [];
                this.currentPage = 0;
                this.loadData().then(() => {
                    this.$refs.loadmore.onTopLoaded();
                });
            },
            loadData(){
                return $api.get('/fund/info/increase/list', {
                    startRow: this.currentPage * this.pageSize,
                    pageSize: this.pageSize,
                    fundType: this.fundType,//0其他,//1股票型,//2债券型,//3混合型,//4货币型,//5保本型,//6指数型,//7QDII,//8商品型,//9短期理财,256全部
                    sort:this.sort,
                    orderBy: this.orderBy
                })
                    .then(msg => {
                        if (msg.code == 200) {
                            this.list = this.list.concat(msg.data.list);
                            if (msg.data.list.length < this.pageSize) {
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
        },
        destroyed(){

        }
    }
</script>
