<template>
    <div class="my-fund">
        <div class="header">
            <div flex="box:justify cross:center">
                <div>
                    <p class="border" v-if="!investorRiskScore" @click.stop="pathTo('/risk-assessment/wechat')">去测评</p>
                    <p class="border" v-else @click.stop="pathTo('/assessment-result')">{{investorRiskTypeDesc}}</p>
                </div>
                <p class="f9">昨日收益（元）</p>
                <div>
                    <p class="border" @click.stop="pathTo('/funds/info')">用户信息</p>
                </div>
            </div>
            <p class="date">07-25(后台差一个参数)</p>
            <p class="rate">{{fundAssets.previousProfit | currencyFormat}}</p>
            <div flex="box:mean" class="info-box">
                <div>
                    <p>总市值（元)</p>
                    <p class="data">{{fundAssets.totalShareAsset | currencyFormat}}</p>
                </div>
                <div>
                    <p>累计盈亏（元）</p>
                    <p class="data">{{fundAssets.accumulatedProfit | currencyFormat}}</p>
                </div>
                <div>
                    <p>在途资金（元）</p>
                    <p class="data">{{fundAssets.fundsTransit | currencyFormat}}</p>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="title-box f8" flex="box:mean">
                <p class="p" :class="{'active':listNum == 0}" @click.stop="checkFund(0)">我持有的基金</p>
                <p class="p" :class="{'active':listNum == 3}" @click.stop="checkFund(3)">进行中</p>
                <p class="p" :class="{'active':listNum == 5}" @click.stop="checkFund(5)">已完成</p>
            </div>
            <mt-loadmore :top-method="loadTop" ref="loadmore" :auto-fill="autoFill">
                <ul class="list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                    infinite-scroll-distance="10">
                    <li class="list-item" v-for="(item,index) in list"
                        @click.stop="pathTo('/funds/detail',item.fundCode)">
                        <div flex class="item-title">
                            <p flex-box="1">
                                {{item.fundFullName}}
                            </p>
                            <p flex-box="0">
                                {{fundType[item.fundType]}}
                            </p>
                        </div>
                        <div flex="box:mean" class="item-info" v-if="listNum == 0">
                            <div>
                                <p class="f8 green bold">
                                    {{item.previousProfit | currencyFormat}}
                                </p>
                                <p class="info">
                                    最新收益（元）
                                </p>
                            </div>
                            <div>
                                <p class="f8 red bold">
                                    {{item.accumulatedProfit | currencyFormat}}
                                </p>
                                <p class="info">
                                    累计盈亏（元）
                                </p>
                            </div>
                            <div>
                                <p class="f8 bold">
                                    {{item.totalShareAsset | currencyFormat}}
                                </p>
                                <p class="info"> 市值（元）</p>
                            </div>
                        </div>
                        <div flex="box:mean" class="item-info" v-if="listNum == 3">
                            <div>
                                <p class="f8 green bold">
                                    {{item.tradeAmount | currencyFormat}}
                                </p>
                                <p class="info">
                                    申购（元）
                                </p>
                            </div>
                            <div>
                                <p class="f8 red bold">
                                    {{dateFormat(item.orderOonfirmDate)}}
                                </p>
                                <p class="info">
                                    申购日期
                                </p>
                            </div>
                            <div>
                                <p class="f8 bold">
                                    找后台要字段
                                </p>
                                <p class="info"> 预计确认日期</p>
                            </div>
                        </div>
                        <div flex="box:mean" class="item-info" v-if="listNum == 5">
                            <div>
                                <p class="f8 green bold">
                                    {{item.tradeAmount | currencyFormat}}
                                </p>
                                <p class="info">
                                    申购（元）
                                </p>
                            </div>
                            <div>
                                <p class="f8 red bold">
                                    {{dateFormat(item.orderOonfirmDate)}}
                                </p>
                                <p class="info">
                                    申购日期
                                </p>
                            </div>
                            <div flex="cross:center main:center">
                                <p class="f8 bold" v-if="!item.shareBonus">
                                    {{item.confirm ? '成功' : '失败'}}
                                </p>
                                <p class="f8 bold" v-if="item.shareBonus">
                                    {{item.defaultBonusType ? '红利资金再投' : '现金分红'}}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Loadmore, InfiniteScroll} from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    Vue.use(InfiniteScroll);
    import $api from '../tools/api';
    import '../less/fund/my-fund.less';
    import {mapState} from 'vuex';
    export default {
        name: 'my-fund',
        data(){
            return {
                listNum: 0,
                fundAssets: {},
                list: [],
                fundType: ['其他类型', '股票型', '债券型', '混合型', '货币型', '保本型', '指数型', 'QDII', '商品型', '短期理财'],
                currentPage: 0,
                autoFill: false,
                pageSize:10,
                loading:true
            }
        },
        created(){
            this.getAssetes();
            this.loadData();
        },
        computed: {
            ...mapState(['investorRiskScore', 'investorRiskTypeDesc']),
        },
        methods: {
            loadTop(){
                this.list = [];
                this.currentPage = 0;
                this.loadData().then(() => {
                    this.$refs.loadmore.onTopLoaded();
                });
            },
            loadData(){
                if (this.listNum == 0) {
                    return $api.get('/fund/purch/my/share')
                        .then(resp => {
                            if (resp.code == 200) {
                                this.list =resp.data.list;
                                this.loading = true;
                            }
                            return resp
                        })
                }
                else {
                    return $api.get('/fund/purch/my/buy', {
                        buyStatus: this.listNum, /*3进行中  5已完成*/
                        startRow: this.currentPage * this.pageSize,
                        pageSize: this.pageSize
                    })
                        .then(resp => {
                            if (resp.code == 200) {
                                this.list = this.list.concat(resp.data.list);
                                if (resp.data.list.length < this.pageSize) {
                                    this.loading = true;
                                } else {
                                    this.loading = false;
                                }
                            }
                            return resp
                        })
                }

            },
            loadMore(){
                this.loading = true;
                this.currentPage++;
                this.loadData();
            },
            pathTo(path, code){
                if (code) {
                    this.$router.push({
                        path,
                        query: {
                            code
                        }
                    });
                } else {
                    this.$router.push(path);
                }
            },
            dateFormat(timestamp){
                let date = new Date(timestamp);
                let y = date.getFullYear();
                let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : '' + (date.getMonth() + 1);
                let d = date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate();
                return m + '-' + d;
            },
            getAssetes(){
                $api.get('/fund/account/asset')
                    .then(resp => {
                        console.log(resp)
                        this.fundAssets = resp.data;
                    })
            },
            checkFund(num){
                this.listNum = num;
                this.currentPage = 0;
                this.list = [];
                this.loadData();
            }
        },
        destroyed(){

        }
    }
</script>
