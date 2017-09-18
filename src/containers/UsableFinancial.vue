<template>
    <div class="usable-financial">
        <div class="body">
            <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="stop"
                infinite-scroll-distance="10">
                <li class="item" v-for="(item,index) in lists" @click.stop="toDetail(item.productUuid)">
                    <p class="title">{{item.productAbbrName}}</p>
                    <div flex class="info">
                        <div class="float-tip" v-if="item.couponMaxProfit">
                            现金劵最大加息
                            <img src="../images/tri.png" alt="" class="tri">
                        </div>
                        <div flex-box="1" flex>
                            <p>预期年化收益率{{item.annualInterestRate}}%</p>
                            <p v-if="item.couponMaxProfit" class="max-profit">
                                +{{item.couponMaxProfit}}
                            </p>
                        </div>
                        <p flex-box="0">期限{{item.productPeriod}}天</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {InfiniteScroll} from 'mint-ui';
    import $api from '../tools/api';
    import {numMulti} from '../filters';
    import '../less/usable-financial.less';
    Vue.use(InfiniteScroll);
    export default {
        name: 'usable-financial',
        data(){
            return {
                lists: [],
                currentPage: 0,
                pageSize: 10,
                stop: true
            }
        },
        created(){
            this.loadData();
        },
        computed: {},
        methods: {
            toDetail(productUuid){
                this.$router.push({
                    path: '/fixi-goods-detail',
                    query: {
                        productUuid
                    }
                })
            },
            loadMore(){
                this.stop = true;
                this.currentPage++;
                this.loadData();
            },
            loadData(){
                $api.get('/adaptProduct/list', {
                    ccCode: this.$route.query.ccCode,
                    startRow: this.currentPage * this.pageSize,
                    pageSize: this.pageSize
                })
                    .then(resp => {
                        if (resp.code == 200) {
                            resp.data.list.map(item => {
                                item.annualInterestRate = numMulti(item.annualInterestRate, 100)
                            })
                            this.lists = this.lists.concat(resp.data.list);
                            if (this.lists.length < resp.data.count && resp.data.list.length) {
                                this.stop = false;
                            } else {
                                this.stop = true;
                            }
                        }
                    })
            }
        },
        destroyed(){

        }
    }
</script>
