<template>
    <div flex="dir:top" flex-box="1" class="account-detail">
        <div class="header" flex flex-box="0">
            <div class="header-item" flex-box="1" @click="rotateTriangle">
                类型
                <span class="triangle" :class="{'rotate':isRotate}"></span>
            </div>
            <div class="header-item" flex-box="1">金额(元)</div>
            <div class="header-item" flex-box="1">时间</div>
        </div>
        <div class="filter-warp" v-show="isRotate">
            <div class="filter-body">
                <div class="filter-header" :class="{'toggle':toggleAll}" @click.stop="selectAll">
                    全部
                </div>
                <div class="filter-items" flex="main:justify">
                    <div class="item" :class="{'active':item.active||toggleAll}" @click.stop="selectItem(index)"
                         v-for="(item,index) in items.slice(0,4)">{{item.name}}
                    </div>
                </div>
                <div class="filter-items" flex="main:justify">
                    <div class="item" :class="{'active':item.active||toggleAll}" @click.stop="selectItem(index+4)"
                         v-for="(item,index) in items.slice(4,8)">{{item.name}}
                    </div>
                </div>
                <div class="btn-warp">
                    <button class="btn-primary btn-ensure" @click.stop="getByType">确定</button>
                </div>
            </div>
        </div>
        <div class="body" flex-box="1">

            <ul class="infinite-scroll"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="disLoad"
                infinite-scroll-distance="70">
                <li class="excharge" v-for="(excharge,index) in excharges" flex :key="index">
                    <span class="first" flex-box="0">{{excharge.tradeTypeDesc}}</span>
                    <span class="second positive" flex-box="1"
                          v-if="excharge.transactionAmount>=0">+{{excharge.transactionAmount | currencyFormat}}</span>
                    <span v-else="" class="second nagetive"
                          flex-box="1">{{excharge.transactionAmount | currencyFormat}}</span>
                    <span class="third" flex-box="0">{{excharge.transactionTime | transactionTime}}</span>
                </li>
                <p v-show="loading&&hasMore" class="loading">加载更多...</p>
            </ul>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue';
    import {InfiniteScroll, Toast} from 'mint-ui';

    Vue.use(InfiniteScroll);
    import $api from '../tools/api';
    import '../less/account-detail.less';

    export default {
        name: 'account-detail',
        data(){
            return {
                isRotate: false,
                toggleAll: false,
                loading: true,
                hasMore: false,
                types: ['全部'],
                startRow: 0,
                pageSize: 20,
                items: [
                    {
                        type: 'RCX',
                        active: false,
                        name: '充值'
                    },
                    {
                        type: 'WDX',
                        active: false,
                        name: '提现'
                    },
                    {
                        type: 'INX',
                        active: false,
                        name: '购买'
                    },
                    {
                        type: 'RPX',
                        active: false,
                        name: '本金返还'
                    },
                    {
                        type: 'IPX',
                        active: false,
                        name: '收益'
                    },
                    {
                        type: 'CPO',
                        active: false,
                        name: '奖励'
                    },
                    {
                        type: 'RFX',
                        active: false,
                        name: '退款'
                    },
                    {
                        type: 'WFA',
                        active: false,
                        name: '手续费'
                    }
                ],
                excharges: []
            }
        },
        created(){
            this.getAccountTransactionList('refresh');

        },
        computed: {
            disLoad(){
                return this.loading || (!this.hasMore);
            }
        },
        methods: {
            rotateTriangle(){
                this.isRotate = !this.isRotate
            },
            loadMore(){
                console.log('loading');
                this.loading = true;
                this.getAccountTransactionList('loadMore');
            },
            selectAll(){
                this.toggleAll = true;
            },
            selectItem(index){
                if (this.toggleAll) {
                    this.toggleAll = false;
                    this.items.map(item => {
                        item.active = false;
                    });
                    this.items[index].active = true;
                } else {
                    this.items[index].active = !this.items[index].active;
                }
            },
            getByType(){
                this.isRotate = false;
                if (this.toggleAll) {

                    this.types = ['全部'];
                    this.getAccountTransactionList('refresh');
                    return false;
                }
                let types = [];
                this.items.map(item => {
                    if(item.active){
                        types.push(item.name);
                    }

                });
                if (types.length) {
                    this.types = types;
                    this.getAccountTransactionList('refresh');
                    return false;
                }

            },
            getAccountTransactionList(type){
                let tradeTypeDescs = this.types.join('$$');
                let {startRow, pageSize} = this;
                if (type == 'loadMore') {
                    startRow = this.excharges.length;
                    console.log(startRow)
                }
                $api.get('/getAccountTransactionList', {
                    tradeTypeDescs,
                    startRow,
                    pageSize,
                    desc: 'defaultName',
                    properties: 'accountUuid$$transactionTime$$tradeType$$transactionAmount'
                })
                    .then(data => {
                        if (data.code == 200) {
                            console.log(data.data);
                            let len = data.data.count;
                            if (type == 'refresh') {
                                this.excharges = data.data.transactionList;
                            } else {
                                data.data.transactionList.map(el => {
                                    this.excharges.push(el)
                                });
                            }
                            if (this.excharges.length < len) {
                                this.loading = false;
                                this.hasMore = true;

                            } else {
                                this.loading = true;
                                this.hasMore = false;
                            }
                        } else {
                            Toast('获取数据失败');
                            this.loading = true;
                            this.hasMore = false;
                        }
                    });
            }
        },
        destroyed(){

        }
    }
</script>
