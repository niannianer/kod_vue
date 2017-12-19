<template>
    <div class="gains-list">
        <div class="header">
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
        <div class="body" id="body" ref="body">
            <div class="title-list">
                <div class="bg-content fund-name">
                    <div class="title-item">
                        基金名称
                    </div>
                    <div class="item-info" flex="dir:top cross:center main:center" v-for="(item,index) in list"
                         @click.stop="pathTo(item.fundCode)">
                        <p class="fund-abbr-name">{{item.fundAbbrName}}</p>
                        <p>{{item.fundCode}}</p>
                    </div>
                </div>
            </div>
            <div class="scroll-target" ref="scroll">
                <div class="min-width " :class="{'min-width-bigger':fundType==4}">
                    <div flex>
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
                    <ul>
                        <li flex v-for="(item,index) in list" @click.stop="pathTo(item.fundCode)">
                            <div class="item-info bg-grey" flex="dir:top cross:center main:center"
                                 v-if="fundType==4"
                                 style="width: 6rem;min-width:6rem;">
                                <p v-if="item.unitYield">{{item.unitYield}}<!--万份收益--></p>
                                <p v-if="item.updateTime&&item.unitYield">{{item.updateTime|timeFormater('yyyy-MM-dd')}}</p>
                                <p v-if="!item.unitYield">--</p>
                            </div>
                            <div class="item-info bg-content" flex="cross:center main:center" v-if="fundType==4">
                                <!--七日年化-->
                                <p v-if="!item.yearlyRoe&&item.yearlyRoe!=0">--</p>
                                <p v-else :class="{'green':item.yearlyRoe<=0,'red':item.yearlyRoe>0}">{{item.yearlyRoe|translatePate}}</p>
                            </div>
                            <div class="item-info bg-grey" flex="dir:top cross:center main:center"
                                 v-if="fundType!=4">
                                <p v-if="item.nav"> {{item.nav}}<!--单位净值--></p>
                                <p v-if="item.navDate&&item.nav">{{item.navDate|timeFormater('yyyy-MM-dd')}}</p><!--净值日期-->
                                <p v-if="!item.nav">--</p>
                            </div>
                            <div class="item-info f8 bg-content" flex="cross:center main:center"
                                 v-if="fundType!=4"><!--日涨幅-->
                                <p v-if="!item.dayReturn&&item.dayReturn!=0">--</p>
                                <p v-else :class="{'green':item.dayReturn<=0,'red':item.dayReturn>0}">{{item.dayReturn|translatePate}}</p>
                            </div>
                            <div class="item-info f8 bg-grey" flex="cross:center main:center">
                                <p v-if="!item.oneWeekReturn&&item.oneWeekReturn!=0">--</p><!--周涨幅-->
                                <p v-else :class="{'green':item.oneWeekReturn<=0,'red':item.oneWeekReturn>0}">{{item.oneWeekReturn|translatePate}}</p>
                            </div>
                            <div class="item-info bg-content" flex="cross:center main:center">
                                <p v-if="!item.oneMonthReturn&&item.oneMonthReturn!=0">--</p><!--月涨幅-->
                                <p v-else :class="{'green':item.oneMonthReturn<=0,'red':item.oneMonthReturn>0}">{{item.oneMonthReturn|translatePate}}</p>
                            </div>
                            <div class="item-info bg-grey" flex="cross:center main:center">
                                <p v-if="!item.quarterReturn&&item.quarterReturn!=0">--</p><!--季涨幅-->
                                <p v-else :class="{'green':item.quarterReturn<=0,'red':item.quarterReturn>0}">{{item.quarterReturn|translatePate}}</p>
                            </div>
                            <div class="item-info bg-content" flex="cross:center main:center">
                                <p v-if="!item.oneYearReturn&&item.oneYearReturn!=0">--</p><!--1年涨幅-->
                                <p v-else :class="{'green':item.oneYearReturn<=0,'red':item.oneYearReturn>0}">{{item.oneYearReturn|translatePate}}</p>
                            </div>
                            <div class="item-info bg-grey" flex="cross:center main:center">
                                <p v-if="!item.thisYearReturn&&item.thisYearReturn!=0">--</p><!--今年涨幅-->
                                <p v-else :class="{'green':item.thisYearReturn<=0,'red':item.thisYearReturn>0}">{{item.thisYearReturn|translatePate}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import $api from '../tools/api';
    import Vue from 'vue';
    import {Loadmore, InfiniteScroll, Indicator, Toast} from 'mint-ui';
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
                isDesc: true,
                scrollLeft: 0,
                scrollTop: 0,
                timer: null
            }
        },
        created(){
            this.addHive(1, 'fundsGainsList');
            let event = ['_trackEvent', '基金涨幅榜', 'SHOW', '进入基金涨幅榜页面', '进入基金涨幅榜页面'];
            window._hmt.push(event);
            let fundsDetail = window.sessionStorage.getItem('fundsDetail');
            if (fundsDetail) {
                let {fundType, list, orderBy, isDesc, scrollLeft, scrollTop,currentPage} = JSON.parse(fundsDetail);
                this.fundType = fundType;
                this.list = list;
                this.orderBy = orderBy;
                this.isDesc = isDesc;
                this.scrollLeft = scrollLeft;
                this.loading = false;
                this.scrollTop = scrollTop;
                this.currentPage = currentPage;
                this.$nextTick(() => {
                    let dom = document.querySelector('.scroll-target');
                    dom.scrollLeft = this.scrollLeft;
                    let body = document.querySelector('.body');
                    body.scrollTop = this.scrollTop;
                })
                window.sessionStorage.removeItem('fundsDetail');
                return false
            }
            this.loadData();
        },
        computed: {
            sort(){
                return this.isDesc ? 'DESC' : 'ASC'
            }
        },
        methods: {
            checkOrder(str){
                this.addHive(0, 'fundsGainsList_icon_sort');
                let event = ['_trackEvent', '基金涨幅榜', 'CLICK', '基金涨幅榜-排序', '基金涨幅榜-排序'];
                window._hmt.push(event);
                let dom = document.querySelector('.scroll-target');
                this.scrollLeft = dom.scrollLeft;
                if (str == this.orderBy) {
                    this.isDesc = !this.isDesc;
                }
                this.orderBy = str;
                // this.list = [];
                this.currentPage = 0;
                this.loadData('type')
                    .then(() => {
                        this.$nextTick(() => {
                            dom.scrollLeft = this.scrollLeft;
                        })
                    });
            },
            checkFundType(num){
                this.addHive(0, 'fundsGainsList_tab_checkTab');
                let event = ['_trackEvent', '基金涨幅榜', 'CLICK', '基金涨幅榜-点击tab', '基金涨幅榜-点击tab'];
                window._hmt.push(event);
                this.fundType = num;
                this.list = [];
                this.currentPage = 0;
                this.loadData();
                this.$refs.body.scrollTop = 0;
            },
            loadData(type){
                Indicator.open();
                return $api.get('/fund/info/increase/list', {
                    startRow: this.currentPage * this.pageSize,
                    pageSize: this.pageSize,
                    fundType: this.fundType,//0其他,//1股票型,//2债券型,//3混合型,//4货币型,//5保本型,//6指数型,//7QDII,//8商品型,//9短期理财,256全部
                    sort: this.sort,
                    orderBy: this.orderBy
                })
                    .then(msg => {
                        Indicator.close();
                        if (msg.code == 200) {
                            if (type == 'type') {
                                this.list = (msg.data.list);
                            }
                            else {
                                this.list = this.list.concat(msg.data.list);
                                console.log(this.currentPage * this.pageSize)
                                this.list.map(item => {
                                    //  console.log(item.nav)
                                })
                            }
                            this.currentPage++;
                            if (msg.data.list.length < this.pageSize) {
                                this.loading = true;
                            } else {
                                this.loading = false;
                            }
                        } else {
                            Toast(msg.msg);
                        }
                        return msg
                    })
            },
            domScroll(e){
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                let event = e;
                let w = window.innerWidth;
                let h = window.innerHeight
                let rem = w * 20 / 375;
                let bodyHeight = h - 2.1 * rem
                this.timer = setTimeout(() => {
                    console.log(event);
                    let {target} = event;
                    let {scrollTop} = target;
                    console.log(scrollTop + bodyHeight);
                    let offsetHeight = this.$refs.scroll.offsetHeight;
                    console.log(offsetHeight);
                    if (scrollTop + bodyHeight + 50 >= offsetHeight && scrollTop > this.scrollTop) {
                        this.addHive(0,'fundsGainsList_scroll_loading');
                        this.loadData();
                    }
                    this.scrollTop = scrollTop;
                }, 500);
            },
            pathTo(code){
                this.addHive(0, 'fundsGainsList_item_fundsDetail');

                let event = ['_trackEvent', '基金涨幅榜', 'CLICK', '基金涨幅榜-点击详情', '基金涨幅榜-点击详情'];
                window._hmt.push(event);
                this.scrollTop = document.querySelector('.body').scrollTop;
                window.sessionStorage.setItem('fundsDetail', JSON.stringify(this.$data));
                this.$router.push({
                    path: '/funds/detail',
                    query: {
                        code,
                        type: this.fundType
                    }
                })
            },
        },
        mounted(){
            document.getElementById('body').addEventListener('scroll', this.domScroll);
        },
        destroyed(){
            this.addHive(2, 'fundsGainsList');
        }
    }
</script>
