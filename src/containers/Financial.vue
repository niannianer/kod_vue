<template>
    <div v-cloak class="financail" flex-box="1" flex="dir:top">
        <div flex="dir:top" flex-box="1">
            <div class="tabs" flex flex-box="0">
                <div flex-box="1" class="tab" @click.stop="changeTab(2)">
                    <div class="tab-item" :class="{'active':tab==2}">定期理财</div>
                </div>
                <div flex-box="1" class="tab" @click.stop="changeTab(1)">
                    <div class="tab-item" :class="{'active':tab==1}">高端理财</div>
                </div>
            </div>
            <div class="item-list" flex-box="1" v-if="tab==1">
                <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="autoFill"
                             :bottomPullText="bottomLoadingText" :bottomLoadingText="bottomLoadingText"
                             :bottomAllLoaded="!(loading &&hasMore)">
                    <div class="infinite-scroll"
                         v-infinite-scroll="loadMore"
                         infinite-scroll-disabled="disLoad"
                         infinite-scroll-distance="70">
                        <div class="item" v-for="(item,index) in lists" :key="index"
                             @click.stop="getDetail(item,'/goods-detail-prif')">
                            <div>
                                <div class="fund-name ellipsis">{{item.productName}}</div>
                                <div flex="dir:left" class="fund-middle">
                                    <div class="rate" flex-box="1">
                                        <div>{{item.annualInterestRate}}</div>
                                        <div class="sub-text">业绩比较基准</div>
                                    </div>
                                    <div class="cycle" flex-box="1">
                                        <div flex="main:center">{{item.productPeriod}}</div>
                                        <div class="sub-text" flex="main:center">期限</div>
                                    </div>
                                    <div class="progress" flex-box="0">
                                        <cicle-progress :width-size="50"
                                                        :progress="item.productProgress"></cicle-progress>
                                    </div>
                                </div>
                                <div class="status-code"
                                     :class="{'hot':item.productStatusCode==1,
                    'raise':item.productStatusCode==2,
                    'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}">
                                    {{item.productStatus}}
                                </div>
                            </div>
                        </div>
                        <p v-if="loading" class="loading" style="text-align: center;padding: .5rem 0 4rem 0;">
                            没有更多...</p>
                    </div>
                </mt-loadmore>
            </div>
            <!--固收-->
            <div class="item-list" flex-box="1" v-else>
                <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="autoFill"
                             :bottomPullText="bottomLoadingText" :bottomLoadingText="bottomLoadingText"
                             :bottomAllLoaded="!(loading &&hasMore)">
                    <div class="infinite-scroll"
                         v-infinite-scroll="loadMore"
                         infinite-scroll-disabled="disLoad"
                         infinite-scroll-distance="70">

                        <div class="item" v-for="(item,index) in lists"
                             @click.stop="getDetail(item,'/fixi-goods-detail')"
                             :class="{'stat': item.productStatus =='已告罄','novice-label':item.isNoviceLabelProduct  }">
                            <!--新手标-->
                            <div v-if="item.isNoviceLabelProduct">
                                <div flex="cross:center" class="title-part">
                                    <div class="fund-name ellipsis" flex-box="1">{{item.productName}}</div>
                                    <div class="ticket-wrap" v-if="item.productLabel" flex flex-box="0">
                                        <div class="ticket-item" style="margin:0 0 0 .4rem"
                                             v-if="index==0"
                                             :class="{'disable':(item.productStatusCode!=1&&item.productStatusCode!=2)}"
                                             v-for="(ticketItem,index) in item.productLabel">{{ticketItem}}
                                        </div>
                                    </div>
                                </div>
                                <div class="rate-part">
                                    <p class="rate">{{item.annualInterestRate}}</p>
                                    <p>{{item.productPeriod}}限期</p>
                                    <div class="progress-part">
                                        <div class="progress-line">
                                            <div class="done" :style="'width:' + item. productProgress+ '%'"
                                                 :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}"></div>
                                            <div class="round" :style="'left:' +( item. productProgress-1) + '%'"
                                                 :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}">
                                                <div
                                                    :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}"></div>
                                            </div>
                                        </div>
                                        <div class="progress-num" style="font-size:.7rem">{{item.productProgress}}%
                                        </div>
                                    </div>
                                </div>

                                <div class="m-part" flex>
                                    <p flex-box="1">{{item.productMinInvestment}}</p>
                                    <p flex-box="0" v-if="item.productMaxInvestment">
                                        每人限投{{item.productMaxInvestment}}</p>
                                </div>

                            </div>
                            <div v-else><!--非新手标-->
                                <div class="fund-name ellipsis">{{item.productName}}</div>
                                <div class="ticket-wrap" v-if="item.productLabel" flex>
                                    <div class="ticket-item"
                                         :class="{'disable':(item.productStatusCode!=1&&item.productStatusCode!=2)}"
                                         v-for="(ticketItem,index) in item.productLabel">{{ticketItem}}
                                    </div>
                                </div>
                                <div flex="dir:left" class="fund-middle-fix"
                                     :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2),'padding-top':item.couponMaxProfit}"
                                     >
                                    <div class="rate" flex-box="1"
                                         :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}">
                                        <div flex>
                                            <span>
                                                {{item.annualInterestRate}}
                                            </span>
                                            <span v-if="item.couponMaxProfit" class="max-profit">
                                                +{{item.couponMaxProfit}}
                                            </span>
                                        </div>
                                        <div class="sub-text">预计年化收益率</div>
                                        <div class="float-tip" v-if="item.couponMaxProfit">
                                            现金劵最大加息
                                            <img src="../images/tri.png" alt="" class="tri">
                                        </div>
                                    </div>
                                    <div class="cycle" flex-box="3"
                                         :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}">
                                        <div flex="main:center">{{item.productPeriod}}</div>
                                        <div class="sub-text" flex="main:center">期限</div>
                                    </div>
                                    <div class="status" flex-box="0" flex="cross:center"
                                         :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}">
                            <span :class="{'hot':item.productStatusCode==1,
                    'raise':item.productStatusCode==2,
                    'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}"
                            >{{item.productStatus}}</span>
                                    </div>
                                </div>
                                <div class="progress-part">
                                    <div class="progress-line">
                                        <div class="done" :style="'width:' + item. productProgress+ '%'"
                                             :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}"></div>
                                        <div class="round" :style="'left:' +( item. productProgress-1) + '%'"
                                             :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}">
                                            <div
                                                :class="{'sell-out':(item.productStatusCode!=1&&item.productStatusCode!=2)}"></div>
                                        </div>
                                    </div>
                                    <div class="progress-num">{{item.productProgress}}%</div>
                                </div>
                                <div class="buttom">{{item.productMinInvestment}}</div>
                            </div>

                        </div>
                        <p v-if="loading" class="loading" style="text-align: center;padding: .5rem 0 4rem 0;">
                            没有更多...</p>
                    </div>
                </mt-loadmore>
            </div>
            <!--遮罩层-->
            <div class="mask" v-show="show">
                <div class="content">
                    <h2 style="color:black;">合格投资者登记</h2>
                    <div class="main">
                        根据《私募投资基金监督管理暂行办法》第四章第十四条规定："私募基金管理人、私募基金销售机构不得向合格投资者之外的单位和个人募集资金，不得通过报刊、电台、电视、互联网等公众传播媒体或者讲座、报告会、分析会和布告、传单、手机短信、微信、博客和电子邮件等方式，向不特定对象宣传推介。"<br>
                        本平台谨遵《私募投资基金监督管理暂行办法》之规定，只向特定的合格投资者宣传推介相关私募投资基金产品。<br>
                        阁下如有意进行私募投资基金投资且满足《私募投资基金监督管理暂行办法》关于"合规投资者"标准之规定，即具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100 万元，且个人金融类资产不低于300万元或者最近三年个人年均收入不低于50万元人民币。请阁下详细阅读本提示，方可获得私募投资基金产品宣传推介服务。
                    </div>
                    <p class="confirm" @click.stop="check=!check"><i :class="{'active':check==true}"></i>本人承诺符合上述合格投资者条件并完成调查问卷。
                    </p>
                    <button class="btn" :disabled="!check" @click.stop="updateUserInfo">确认</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Vue from 'vue';
    import {mapState} from 'vuex';
    import {Loadmore, InfiniteScroll} from 'mint-ui';
    import {logout} from '../tools/operation';
    Vue.component(Loadmore.name, Loadmore);
    Vue.use(InfiniteScroll);
    import wx from '../tools/wx';
    import $device from '../tools/device';
    import '../less/financial.less';
    import CicleProgress from '../components/CicleProgress/CicleProgress';
    import $api from '../tools/api';
    export default {
        name: 'financial',
        components: {
            CicleProgress
        },
        data(){
            return {
                check: false,
                loading: true,
                hasMore: false,
                tab: 2,
                startRow: 0,
                pageSize: 10,
                lists: [],
                autoFill: false,
                bottomLoadingText: '加载中...',
                bottomPullText: '上拉加载更多',
                scrollTop: 0,
                settings: {}

            };
        },
        created(){

            let goodsDetail = window.sessionStorage.getItem('goodsDetail');
            if (goodsDetail) {
                let {tab, lists, scrollTop, startRow, pageSize, hasMore} = JSON.parse(goodsDetail);
                this.tab = tab;
                this.lists = lists;
                this.scrollTop = scrollTop;
                this.startRow = startRow;
                this.pageSize = pageSize;
                this.hasMore = hasMore;
                this.loading = false;
                this.$nextTick(() => {
                    let dom = document.querySelector('.item-list');
                    dom.scrollTop = this.scrollTop;
                });


                window.sessionStorage.removeItem('goodsDetail');
                return false;
            }
            // 私募
            if (this.$route.query.tab == 'PRIF') {

                let event = ['_trackEvent', '产品列表', 'SHOW', '进入高端理财列表页', '进入高端理财列表页'];
                window._hmt.push(event);
                this.tab = 1;
                this.settings.title = '优质稀缺大类资产，就在金疙瘩。';
                this.getListWithLogin();

            } else {
                let event = ['_trackEvent', '产品列表', 'SHOW', '进入定期理财列表页', '进入定期理财列表页'];
                window._hmt.push(event);
                this.settings.title = '金疙瘩系列定期产品——闲散资金定制理财';
                this.getGoodsList()
            }
            if ($device.isWeixin) {
                this.getShare();
            }
        },
        computed: {
            ...mapState([
                'isEligibleInvestor',
                'userId'
            ]),
            disLoad(){
                return this.loading || (!this.hasMore);
            },
            show(){
                return (this.isEligibleInvestor == 0) && (this.tab == 1) && this.userId;
            }
        },
        methods: {
            loadBottom(){
                if (!(this.loading && this.hasMore)) {
                    this.allLoaded = true;
                }// 若数据已全部获取完毕
                this.$refs.loadmore.onBottomLoaded();
            },
            changeTab(tab){
                this.tab = tab;
                this.startRow = 0;
                this.$nextTick(() => {
                    let dom = document.querySelector('.item-list');
                    dom.scrollTop = 0;
                });
                if (this.tab == 1) {
                    let event = ['_trackEvent', '产品列表', 'CLICK', '定期理财列表页点击高端理财tab', '定期理财列表页-点击高端理财tab'];
                    window._hmt.push(event);
                    this.getListWithLogin();
                } else {
                    let event = ['_trackEvent', '产品列表', 'CLICK', '高端理财列表页点击定期理财tab', '高端理财列表页-点击定期理财tab'];
                    window._hmt.push(event);
                    this.getGoodsList('refresh');
                }
            },
            getListWithLogin(){
                if (this.userId) {
                    this.getGoodsList('refresh');
                } else {
                    this.$store.dispatch('getAccountBaofoo')
                        .then(data => {
                            if (data.code == '401') {
                                logout();
                            } else {
                                this.getGoodsList('refresh');
                            }
                        })
                }
            },
            loadMore(){
                this.loading = true;
                this.startRow = this.lists.length;
                this.getGoodsList();
            },
            getGoodsList(flag){
                let params = {
                    pageSize: this.pageSize,
                    startRow: this.startRow
                };
                if (this.tab == 1) {
                    params.productType = "PRIF"
                }
                else if (this.tab == 2) {
                    params.productType = "FIXI"
                }
                $api.get('/product/getList', params).then(msg => {
                    console.log(msg);
                    if (msg.code == 200) {
                        let {productList} = msg.data;
                        if (productList.length >= this.pageSize) {
                            this.loading = false;
                            this.hasMore = true;
                        }
                        else {
                            this.loading = true;
                            this.hasMore = false;
                        }
                        if (flag == 'refresh') {
                            this.lists = msg.data.productList;
                        } else {
                            this.lists = this.lists.concat(msg.data.productList);
                        }
                    }


                });
            },
            updateUserInfo(){
                $api.post('/updateUserInfo', {isEligibleInvestor: 1})
                    .then(() => {
                        this.$store.dispatch('setEligibleInvestor', 1);
                    });

            },
            getDetail(item, url){
                let dom = document.querySelector('.item-list');
                this.scrollTop = dom.scrollTop;
                if (url.indexOf('fixi') > -1) {
                    let event = ['_trackEvent', '产品列表', 'CLICK', '在定期理财列表页点击查看详情', '定期理财列表页-点击详情'];
                    window._hmt.push(event);
                } else {
                    let event = ['_trackEvent', '产品列表', 'CLICK', '在高端理财列表页点击查看详情', '高端理财列表页-点击详情'];
                    window._hmt.push(event);
                }
                window.sessionStorage.setItem('goodsDetail', JSON.stringify(this.$data));
                this.$router.push({
                    path: url,
                    query: {
                        productUuid: item.productUuid
                    }
                })
            },
            getShare(){
                wx.getShare(this.settings);
            },
            pathTo(path, boolean){
                if (boolean) {
                    window.location.href = path;
                    return false;
                }
                this.$router.push(path);
            }
        },
        mounted(){

        }
    }
</script>
