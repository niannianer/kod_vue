<template>
    <div class="financail" flex="dir:top">

        <div class="item-list" flex-box="1">
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
                        <!--非新手标-->
                        <div v-else><!--非新手标-->
                            <div flex-box="1" flex>
                                <div class="fund-name ellipsis">{{item.productName}}</div>
                                <div class="daren" v-if="item.vipFlag == 1"><img src="../images/daren.png"/></div>
                            </div>
                            <div class="time-text" v-if="item.vipFlag == 1 && item.productStatusCode == 1">{{item.buttonText}}</div>
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
                                    <div flex style="position: relative">
                                            <span>
                                                {{item.annualInterestRate}}
                                            </span>
                                        <span v-if="item.couponMaxProfit" class="max-profit">
                                                +{{item.couponMaxProfit}}
                                            </span>
                                        <div class="float-tip" v-if="item.increaseInterestRateDescribe">
                                            {{item.increaseInterestRateDescribe}}
                                            <img src="../images/tri.png" alt="" class="tri">
                                        </div>
                                    </div>
                                    <div class="sub-text">预计年化收益率</div>

                                </div>
                                <div class="cycle" flex-box="0"
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
                            <div class="buttom" flex="main:justify">
                                <span>{{item.productMinInvestment}}</span>
                                <span v-if="item.talentAwardMaxRate">达人奖励系数{{item.talentAwardMaxRate}}</span>
                            </div>
                        </div>

                    </div>
                    <p v-if="loading" class="loading" style="text-align: center;padding: .5rem 0 4rem 0;">
                        没有更多...</p>
                </div>
            </mt-loadmore>
        </div>
        <div class="download-app" flex-box="0">
            <a href="/land-download.html">查看更多理财，请下载app</a>
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
        name: 'fixi-finacial',
        data(){
            return {
                loading: true,
                hasMore: false,
                startRow: 0,
                pageSize: 10,
                lists: [],
                autoFill: false,
                bottomLoadingText: '加载中...',
                bottomPullText: '上拉加载更多',
                scrollTop: 0,
                settings: {}
            }
        },
        components: {},
        created(){
            this.addHive(1, 'fixi-finacial',1012);
            let goodsDetail = window.sessionStorage.getItem('goodsDetail');
            this.settings.title = '金疙瘩系列定期产品——闲散资金定制理财';
            if ($device.isWeixin) {
                this.getShare();
            }
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
            this.getGoodsList();
        },
        computed: {
            disLoad(){
                return this.loading || (!this.hasMore);
            }
        },
        methods: {
            loadBottom(){
                if (!(this.loading && this.hasMore)) {
                    this.allLoaded = true;
                }// 若数据已全部获取完毕
                this.$refs.loadmore.onBottomLoaded();
            },
            loadMore(){
                this.addHive(0, 'fixiFinacial_scroll_loading',101201);
                this.loading = true;
                this.startRow = this.lists.length;
                this.getGoodsList();
            },
            getGoodsList(flag){
                let params = {
                    pageSize: this.pageSize,
                    startRow: this.startRow
                };
                params.productType = "FIXI"
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
            getDetail(item, url){
                this.addHive(0, 'fixiFinacial_list_fixi',101202);
                let dom = document.querySelector('.item-list');
                this.scrollTop = dom.scrollTop;
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
                this.addHive(0, 'fixiFinacial_link_' + path.replace('/', ''),101203);
                if (boolean) {
                    window.location.href = path;
                    return false;
                }
                this.$router.push(path);
            }
        },
        mounted(){
        },
        destroyed(){
            this.addHive(2, 'fixi-finacial',1012);
        }
    }
</script>
