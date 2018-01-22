<template>
    <div class="gold-detail"
         v-infinite-scroll="loadMore" flex-box="1" infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
        <div class="header" flex="main:center cross:center">
            <span class="to-rule" @click.stop="toRule">详细规则</span>
            {{coinCashAmount}}
            <span class="gold"><img src="../images/gold/gold.png"/></span>
        </div>
        <div class="detail-list">
            <div flex="cross:center" class="item" v-for="item,index in detailList">
                <div flex-box="1" flex="dir:top">
                    <div class="name" flex-box="1">
                        {{item.ctRemark}}
                    </div>
                    <div class="time" flex-box="0">
                        {{item.updateTime | timeFormater('yyyy-MM-dd hh:mm')}}
                    </div>
                </div>
                <div flex-box="0" class="add-num" v-if="item.ctType=='0' || item.ctType=='3'">
                    +{{item.ctAmount}}金币
                </div>
                <div flex-box="0" class="reduce-num" v-else>
                    {{item.ctAmount}}金币
                </div>
            </div>
            <div class="fmsg">{{detailList.length ? '已经到底了~' : '暂无内容~'}}</div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {InfiniteScroll} from 'mint-ui';
    import $api from '../tools/api';
    Vue.use(InfiniteScroll);
    import '../less/gold/gold-detail.less';
    export default {
        name: 'collect-list',
        data(){
            return {
                startRow: 0,
                pageSize: 20,
                loading: true,
                detailList: [],
                coinCashAmount: 0
            }
        },
        created(){
            this.addHive(1,'/golds/gold-detail',1083);
            this.getList();
        },
        components:{
        },
        computed: {
        },
        methods: {
            toRule(){
                this.addHive(0,'/golds/gold-detail',108301);
                this.$router.push({
                    path: '/golds/rules'
                })
            },
            loadMore(){
                this.loading = true;
                this.startRow += this.pageSize;
                this.getList();
            },
            //明细列表
            getList(){
                $api.get('/coinTransaction/list',{
                    startRow: this.startRow,
                    pageSize: this.pageSize,
                    coinType: '00'
                }).then(resp => {
                    if(resp.code == 200){
                        this.coinCashAmount = resp.data.coinCashAmount || 0;
                        this.detailList = this.detailList.concat(resp.data.list || []);
                        if (resp.data.count <= this.detailList.length) {
                            this.loading = true;
                        } else {
                            this.loading = false;
                        }
                    }
                })
            }
        },
        destroyed(){
            this.addHive(2,'/golds/gold-detail',1083);
        }
    }
</script>
