<template>
    <div class="gains-list">
        <div class="header">
            <div class="check-list" flex="box:mean">
                <div class="check-item" :class="{'active':fundType==256}" @click.stop="fundType=256">
                    全部
                </div>
                <div class="check-item" :class="{'active':fundType==1}" @click.stop="fundType=1">
                    股票型
                </div>
                <div class="check-item" :class="{'active':fundType==2}" @click.stop="fundType=2">
                    债券型
                </div>
                <div class="check-item" :class="{'active':fundType==3}" @click.stop="fundType=3">
                    混合型
                </div>
                <div class="check-item" :class="{'active':fundType==4}" @click.stop="fundType=4">
                    货币型
                </div>
                <div class="check-item" :class="{'active':fundType==5}" @click.stop="fundType=5">
                    QDII
                </div>
            </div>
        </div>
        <div class="body" flex>
            <div class="title-list" flex-box="0" v-for="(item,index) in list" :key="index">
                <div class="bg-content fund-name" flex-box="0">
                    <div class="title-item" v-if="index == 0">
                        基金名称
                    </div>
                    <div class="item-info" flex="cross:center main:center" >
                        循环元素1
                    </div><!--内容溢出怎么办？-->
                </div>

            </div>
            <div>
                <div class="overflow" flex>
                    <div class="item-wrap bg-grey" flex-box="0">
                        <div class="title-item">
                            单位净值
                        </div>
                        <div class="item-info" flex="cross:center main:center">
                            循环元素1
                        </div>
                    </div>
                    <div class="item-wrap bg-content" flex-box="0">
                        <div class="title-item">
                            日涨幅
                        </div>
                        <div class="item-info red f8" flex="cross:center main:center">
                            循环元素1
                        </div>
                    </div>
                    <div class="item-wrap bg-grey" flex-box="0">
                        <div class="title-item">
                            周涨幅
                        </div>
                        <div class="item-info red f8" flex="cross:center main:center">
                            循环元素1
                        </div>
                    </div>
                    <div class="item-wrap bg-content" flex-box="0">
                        <div class="title-item">
                            月涨幅
                        </div>
                        <div class="item-info" flex="cross:center main:center">
                            循环元素1
                        </div>
                    </div>
                    <div class="item-wrap bg-grey" flex-box="0">
                        <div class="title-item">
                            季涨幅
                        </div>
                        <div class="item-info" flex="cross:center main:center">
                            循环元素1
                        </div>
                    </div>
                    <div class="item-wrap bg-content" flex-box="0">
                        <div class="title-item">
                            近一年涨幅
                        </div>
                        <div class="item-info" flex="cross:center main:center">
                            循环元素1
                        </div>
                    </div>
                    <div class="item-wrap bg-grey" flex-box="0">
                        <div class="title-item">
                            今年涨幅
                        </div>
                        <div class="item-info" flex="cross:center main:center">
                            循环元素1
                        </div>
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
                orderBy:'nav'
            }
        },
        created(){
            $api.get('/fund/info/increase/list',{
                startRow: this.currentPage * this.pageSize,
                pageSize: this.pageSize,
                fundType:this.fundType,//0其他,//1股票型,//2债券型,//3混合型,//4货币型,//5保本型,//6指数型,//7QDII,//8商品型,//9短期理财,256全部
                sort:'ASC',///DESC
                orderBy:this.orderBy
            })
                .then(resp => {
                    this.list = resp.data.list
                    console.log(this.list)
                })
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
