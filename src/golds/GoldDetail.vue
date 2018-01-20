<template>
    <div class="gold-detail"
         v-infinite-scroll="loadMore" flex-box="1" infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
        <div class="header" flex="main:center cross:center">
            <router-link class="to-rule" to="/golds/rules">详细规则</router-link>
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
            this.getList();
        },
        components:{
        },
        computed: {
        },
        methods: {
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
                        this.coinCashAmount = resp.data.coinCashAmount;
                        this.detailList = this.detailList.concat(resp.data.list || []);
                        if (resp.data.count <= this.detailList.length) {
                            this.loading = true;
                        } else {
                            this.loading = false;
                        }
                    }
                })
            },
            //收入场景名称
            sceneText(scene){
                let out = '';
                switch (scene){
                    case 1:
                        out = '注册';
                        break;
                    case 2:
                        out = '实名';
                        break;
                    case 3:
                        out = '首次绑卡';
                        break;
                    case 4:
                        out = '首次充值';
                        break;
                    case 5:
                        out = '首次投资';
                        break;
                    case 6:
                        out = '邀请好友首次投资';
                        break;
                    case 7:
                        out = '复投';
                        break;
                    case 8:
                        out = '邀请好友注册';
                        break;
                    default:
                        break;
                }
                return out;
            }
        },
        destroyed(){

        }
    }
</script>
