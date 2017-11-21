<template>
    <div class="hot-list">
        <mt-loadmore :top-method="loadTop" ref="loadmore" :auto-fill="autoFill">
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <li class="item" v-for="(item,index) in lists" @click.stop="pathTo(item.fundCode, item.fundType)">
                    <div class="float left"></div>
                    <div class="float right"></div>
                    <div class="title-part" flex="cross:center">
                       <!-- <p flex-box="0" class="tip">免费率</p>-->
                        <p flex-box="1">{{item.fundAbbrName}}</p>
                        <p flex-box="0">{{item.fundCode}}</p>
                    </div>
                    <div class="info-part" flex="box:mean">
                        <div class="info-box" v-if="Number(item.fundType)==4">
                            <p class="orange f9">{{item.yearlyRoe|translatePate}}</p>
                            <p class="info-title">七日年化</p>
                        </div>
                        <div class="info-box" v-if="Number(item.fundType)!=4&&item.oneYearReturn">
                            <p class="orange f9">{{item.oneYearReturn|translatePate}}</p>
                            <p class="info-title">近一年涨幅</p>
                        </div>
                        <div class="info-box" v-if="Number(item.fundType)!=4&&!item.oneYearReturn">
                            <p class="orange f9 min-height">{{item.thisYearReturn|translatePate}}</p>
                            <p class="info-title">今年以来涨幅</p>
                        </div>
                        <div class="info-box">
                            <p class="f9 min-height">{{item.minAmtIndiFirstPurch|currencyFormat}}</p>
                            <p class="info-title">起投金额</p>
                        </div>
                        <div class="info-box">
                            <p class="f9">{{fundType[Number(item.fundType)]}}</p>
                            <p class="info-title">基金类型</p>
                        </div>
                    </div>
                </li>
            </ul>
        </mt-loadmore>
        <div class="footer">
            <div class="server">
                基金销售服务由<a class="link" href="https://asset.yingmi.cn/sites/compliance/qualifications-mobile.html">盈米财富</a>提供
            </div>
            <div class="quali">
                基金销售资格证号：000000378<a class="link" href="https://asset.yingmi.cn/sites/compliance/qualifications-mobile.html">详情</a>
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
    import '../less/fund/hot-list.less';
    export default {
        name: 'hot-list',
        data(){
            return {
                lists: [],
                autoFill: false,
                currentPage: 0,
                pageSize: 10,
                loading: true,
                fundType: ['其他类型', '股票型', '债券型', '混合型', '货币型', '保本型', '指数型', 'QDII', '商品型', '短期理财'],
            }
        },
        created(){
            this.loadData();
        },
        computed: {},
        methods: {
            pathTo(code, type){
                this.$router.push({
                    path:'/funds/detail',
                    query:{
                        code,
                        type
                    }
                })
            },
            loadTop(){
                this.lists = [];
                this.currentPage = 0;
                this.loadData().then(() => {
                    this.$refs.loadmore.onTopLoaded();
                });
            },
            loadData(){
                return $api.get('/fund/info/host/list', {
                    startRow: this.currentPage * this.pageSize,
                    pageSize: this.pageSize
                })
                    .then(msg => {
                        if (msg.code == 200) {
                            this.lists = this.lists.concat(msg.data.list);
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
