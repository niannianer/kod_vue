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
                        <div class="item-info" flex="dir:top cross:center main:center" v-for="(item,index) in list" @click.stop="pathTo(item.fundCode)">
                            <p class="fund-abbr-name">{{item.fundAbbrName}}</p>
                            <p>{{item.fundCode}}</p>
                        </div><!--内容溢出怎么办？-->
                    </div>
                </div>
                <div class="title-list" flex-box="1" flex style="overflow-x: auto">
                    <div class="min-width" :class="{'min-width-bigger':fundType==4}">
                        <div flex >
                            <div class="title-item bg-grey" @click.stop="checkOrder('unitYield')"
                                 flex="main:center cross:center" v-if="fundType==4" style="width: 6rem;min-width:6rem;">
                                <p>万份收益（元）</p>
                                <div class="order">
                                    <p class="p desc" :class="{'active':orderBy=='unitYield'&&!isDesc}">▲</p>
                                    <p class="p asc" :class="{'active':orderBy=='unitYield'&&isDesc}">▼</p>
                                </div>
                            </div>
                            <div class="title-item bg-content" @click.stop="checkOrder('yearlyRoe')"
                                 flex="main:center cross:center" v-if="fundType==4">
                                <p>七日年化</p>
                                <div class="order">
                                    <p class="p desc" :class="{'active':orderBy=='yearlyRoe'&&!isDesc}">▲</p>
                                    <p class="p asc" :class="{'active':orderBy=='yearlyRoe'&&isDesc}">▼</p>
                                </div>
                            </div>
                            <div class="title-item bg-grey" @click.stop="checkOrder('nav')"
                                 flex="main:center cross:center" v-if="fundType!=4">
                                <p>单位净值</p>
                                <div class="order">
                                    <p class="p desc" :class="{'active':orderBy=='nav'&&!isDesc}">▲</p>
                                    <p class="p asc" :class="{'active':orderBy=='nav'&&isDesc}">▼</p>
                                </div>
                            </div>
                            <div class="title-item bg-content" @click.stop="checkOrder('dayReturn')"
                                 flex="main:center cross:center" v-if="fundType!=4">
                                <p> 日涨幅</p>
                                <div class="order">
                                    <p class="p desc" :class="{'active':orderBy=='dayReturn'&&!isDesc}">▲</p>
                                    <p class="p asc" :class="{'active':orderBy=='dayReturn'&&isDesc}">▼</p>
                                </div>
                            </div>
                            <div class="title-item bg-grey" @click.stop="checkOrder('oneWeekReturn')"
                                 flex="main:center cross:center">
                                <p>周涨幅</p>
                                <div class="order">
                                    <p class="p desc" :class="{'active':orderBy=='oneWeekReturn'&&!isDesc}">▲</p>
                                    <p class="p asc" :class="{'active':orderBy=='oneWeekReturn'&&isDesc}">▼</p>
                                </div>
                            </div>
                            <div class="title-item bg-content" @click.stop="checkOrder('oneMonthReturn')"
                                 flex="main:center cross:center">
                                <p>月涨幅</p>
                                <div class="order">
                                    <p class="p desc" :class="{'active':orderBy=='oneMonthReturn'&&!isDesc}">▲</p>
                                    <p class="p asc" :class="{'active':orderBy=='oneMonthReturn'&&isDesc}">▼</p>
                                </div>
                            </div>
                            <div class="title-item bg-grey" @click.stop="checkOrder('quarterReturn')"
                                 flex="main:center cross:center">
                                <p>季涨幅</p>
                                <div class="order">
                                    <p class="p desc" :class="{'active':orderBy=='quarterReturn'&&!isDesc}">▲</p>
                                    <p class="p asc" :class="{'active':orderBy=='quarterReturn'&&isDesc}">▼</p>
                                </div>
                            </div>
                            <div class="title-item bg-content" @click.stop="checkOrder('oneYearReturn')"
                                 flex="main:center cross:center">
                                <p> 近一年涨幅</p>
                                <div class="order">
                                    <p class="p desc" :class="{'active':orderBy=='oneYearReturn'&&!isDesc}">▲</p>
                                    <p class="p asc" :class="{'active':orderBy=='oneYearReturn'&&isDesc}">▼</p>
                                </div>
                            </div>
                            <div class="title-item bg-grey" @click.stop="checkOrder('thisYearReturn')"
                                 flex="main:center cross:center">
                                <p> 今年涨幅</p>
                                <div class="order">
                                    <p class="p desc" :class="{'active':orderBy=='thisYearReturn'&&!isDesc}">▲</p>
                                    <p class="p asc" :class="{'active':orderBy=='thisYearReturn'&&isDesc}">▼</p>
                                </div>
                            </div>
                        </div>
                        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                            infinite-scroll-distance="10">
                            <li flex v-for="(item,index) in list" @click.stop="pathTo(item.fundCode)">
                                <div class="item-info bg-grey" flex="dir:top cross:center main:center" v-if="fundType==4"
                                     style="width: 6rem;min-width:6rem;">
                                    <p>{{item.unitYield}}<!--万份收益--></p>
                                    <p v-if="item.updateTime">{{dateFormat(item.updateTime)}}</p>
                                </div>
                                <div class="item-info bg-content" flex="cross:center main:center" v-if="fundType==4">
                                    {{item.yearlyRoe}}<!--七日年化-->
                                    <p v-if="!item.yearlyRoe">--</p>
                                </div>
                                <div class="item-info bg-grey" flex="dir:top cross:center main:center" v-if="fundType!=4">
                                    <p> {{item.nav}}<!--单位净值--></p>
                                    <p v-if="item.navDate">{{dateFormat(item.navDate)}}</p><!--净值日期-->
                                </div>
                                <div class="item-info red f8 bg-content" flex="cross:center main:center"
                                     v-if="fundType!=4">
                                    {{item.dayReturn}}<!--日涨幅-->
                                    <p v-if="!item.dayReturn">--</p>
                                </div>
                                <div class="item-info red f8 bg-grey" flex="cross:center main:center">
                                    {{item.oneWeekReturn}}<!--周-->
                                    <p v-if="!item.oneWeekReturn">--</p>
                                </div>
                                <div class="item-info bg-content" flex="cross:center main:center">
                                    {{item.oneMonthReturn}}<!--月-->
                                    <p v-if="!item.oneMonthReturn">--</p>
                                </div>
                                <div class="item-info bg-grey" flex="cross:center main:center">
                                    {{item.quarterReturn}}<!--季-->
                                    <p v-if="!item.quarterReturn">--</p>
                                </div>
                                <div class="item-info bg-content" flex="cross:center main:center">
                                    {{item.oneYearReturn}}<!--1年-->
                                    <p v-if="!item.oneYearReturn">--</p>
                                </div>
                                <div class="item-info bg-grey" flex="cross:center main:center">
                                    {{item.thisYearReturn}}<!--今年-->
                                    <p v-if="!item.thisYearReturn">--</p>
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
                isDesc: true
            }
        },
        created(){
            this.loadData();
        },
        computed: {
            sort(){
                return this.isDesc ? 'DESC' : 'ASC'
            }
        },
        methods: {
            checkOrder(str){
                if (str == this.orderBy) {
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
                    sort: this.sort,
                    orderBy: this.orderBy
                })
                    .then(msg => {
                        if (msg.code == 200) {
                            msg.data.list.map(item=>{
                                for (let key in item) {
                                    if(key=='yearlyRoe'||key=='dayReturn'||key=='oneWeekReturn'||key=='oneMonthReturn'||key=='quarterReturn'||key=='oneYearReturn'||key=='thisYearReturn'){
                                        item[key] = (item[key]*100).toFixed(2)+'%'
                                    }else{
                                        continue
                                    }
                                }
                            })
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
            },
            dateFormat(timestamp){
                let date = new Date(timestamp);
                let y = date.getFullYear();
                let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : '' + (date.getMonth() + 1);
                let d = date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate();
                return y+'-'+m + '-' + d;
            },
            pathTo(code){
                this.$router.push({
                    path:'/funds/detail',
                    query:{
                        code
                    }
                })
            },
        },
        destroyed(){

        }
    }
</script>
