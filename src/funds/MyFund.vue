<template>
    <div class="my-fund">
        <div :class="{'blurry':showYmi}">
            <div class="header">
                <div flex="box:justify cross:center">
                    <div>
                        <p class="border" v-if="!investorRiskScore" @click.stop="pathTo('/risk-assessment/wechat')">去测评</p>
                        <p class="border" v-else @click.stop="pathTo('/assessment-result')">{{investorRiskTypeDesc}}</p>
                    </div>
                    <p class="f9">昨日收益（元）</p>
                    <div>
                        <p class="border" @click.stop="fundAccountStep">用户信息</p>
                    </div>
                </div>
                <p class="date" v-if="fundAssets.previousProfitTradeDate">{{dateFormat(fundAssets.previousProfitTradeDate)}}</p>
                <p class="rate">{{fundAssets.previousProfit | currencyFormat}}</p>
                <div flex="box:mean" class="info-box">
                    <div>
                        <p>总市值（元）</p>
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
                <div v-if="!this.list.length" style="text-align: center;padding-top: .5rem;">暂无内容</div>
                <mt-loadmore :top-method="loadTop" ref="loadmore" :auto-fill="autoFill">
                    <ul class="list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                        infinite-scroll-distance="10">
                        <li class="list-item" v-for="(item,index) in list"
                            @click.stop="pathTo('/funds/detail',{code:item.fundCode,type:item.fundType})">
                            <div flex class="item-title">
                                <p flex-box="1" class="name">
                                    {{item.fundAbbrName}}
                                </p>
                                <p flex-box="0">
                                    {{fundType[item.fundType]}}
                                </p>
                            </div>
                            <div flex="box:mean" class="item-info" v-if="listNum == 0">
                                <div>
                                    <p class="f8 green">
                                        {{item.previousProfit | currencyFormat}}
                                    </p>
                                    <p class="info">
                                        最新收益（元）
                                    </p>
                                </div>
                                <div>
                                    <p class="f8 red">
                                        {{item.accumulatedProfit | currencyFormat}}
                                    </p>
                                    <p class="info">
                                        累计盈亏（元）
                                    </p>
                                </div>
                                <div>
                                    <p class="f8">
                                        {{item.totalShareAsset | currencyFormat}}
                                    </p>
                                    <p class="info"> 市值（元）</p>
                                </div>
                            </div>
                            <div flex="box:mean" class="item-info" v-if="listNum == 3">
                                <!--申购-->
                                <div v-if="item.bizCode == '022'">
                                    <p class="f8 bold">{{item.tradeAmount | currencyFormat}}</p>
                                    <p class="info">申购（元）</p>
                                </div>
                                <!--赎回-->
                                <div v-if="item.bizCode == '024'">
                                    <p class="f8 bold">{{item.tradeShare | currencyFormat}}</p>
                                    <p class="info">赎回（份）</p>
                                </div>
                                <!--设置分红方式-->
                                <div v-if="item.bizCode == '029'">
                                    <p class="f8 bold">{{item.setdividendMethod == 1 ? '现金分红' : '红利资金再投'}}</p>
                                    <p class="info">修改分红方式</p>
                                </div>
                                <div>
                                    <p class="f8 bold" v-if="item.bizCode == '022' || item.bizCode == '024'">
                                        {{dateFormat(item.orderTradeDate)}}
                                    </p>
                                    <p class="f8 bold" v-if="item.bizCode == '029'">
                                        {{dateFormat(item.createTime)}}
                                    </p>
                                    <p class="info" v-if="item.bizCode == '022'">申购日期</p>
                                    <p class="info" v-if="item.bizCode == '024'">赎回日期</p>
                                    <p class="info" v-if="item.bizCode == '029'">操作日期</p>
                                </div>
                                <div>
                                    <p class="f8 bold">{{dateFormat(item.orderConfirmDate)}}</p>
                                    <p class="info"> 预计确认日期</p>
                                </div>

                            </div>
                            <div flex="box:mean" class="item-info" v-if="listNum == 5">
                                <!--金额开始-->
                                <!--申购-->
                                <div v-if="item.bizCode == '022'">
                                    <p class="f8 bold">{{item.tradeAmount | currencyFormat}}</p>
                                    <p class="info">申购（元）</p>
                                </div>
                                <!--赎回-->
                                <div v-if="item.bizCode == '024'">
                                    <p class="f8 bold">{{item.tradeShare | currencyFormat}}</p>
                                    <p class="info">赎回（份）</p>
                                </div>
                                <!--设置分红方式-->
                                <div v-if="item.bizCode == '029'">
                                    <p class="f8 bold">{{item.setdividendMethod == 1 ? '现金分红' : '红利资金再投'}}</p>
                                    <p class="info">修改分红方式</p>
                                </div>
                                <!--分红：红利再投-->
                                <div v-if="item.bizCode == '043' && item.shareBonus">
                                    <p class="f8 bold">{{item.tradeShare | currencyFormat}}</p>
                                    <p class="info">份额（份）</p>
                                </div>
                                <!--分红：现金分红-->
                                <div v-if="item.bizCode == '043' && !item.shareBonus">
                                    <p class="f8 bold">{{item.tradeAmount | currencyFormat}}</p>
                                    <p class="info">金额（元）</p>
                                </div>
                                <!--强行调增、调减、赎回订单-->
                                <div v-if="item.bizCode == '144' || item.bizCode == '145'||item.bizCode == '142'">
                                    <p class="f8 bold">{{item.tradeShare | currencyFormat}}</p>
                                    <p class="info">份额（份）</p>
                                </div>
                                <!--金额结束-->

                                <!--日期时间开始-->
                                <div>
                                    <p class="f8 red bold" v-if="item.bizCode == '144' || item.bizCode == '145'||item.bizCode == '142'">
                                        {{dateFormat(item.orderConfirmDate)}}
                                    </p>
                                    <p class="f8 red bold" v-if="item.bizCode == '022' || item.bizCode == '024'||item.bizCode == '043'" >
                                        {{dateFormat(item.orderTradeDate)}}
                                    </p>
                                    <p class="f8 red bold" v-if="item.bizCode == '029'" >
                                        {{dateFormat(item.createTime)}}
                                    </p>
                                    <p class="info" v-if="item.bizCode == '022'">申购日期</p>
                                    <p class="info" v-if="item.bizCode == '024'">赎回日期</p>
                                    <p class="info" v-if="item.bizCode == '029'">操作日期</p>
                                    <p class="info" v-if="item.bizCode == '043' || item.bizCode == '144' || item.bizCode == '145'||item.bizCode == '142'">
                                        日期
                                    </p>
                                </div>
                                <!--日期时间结束-->

                                <!--结果-->
                                <div flex="cross:center main:center">
                                    <!--分红-->
                                    <p class="f8" v-if="item.bizCode == '043'">
                                        {{item.shareBonus ? '红利再投' : '现金分红'}}
                                    </p>
                                    <!--成功、失败、已撤销、强制调增、强制调减、强制赎回-->
                                    <p class="f8" v-else :class="{'red': item.tradeStatus==4||item.tradeStatus==6}">
                                        {{tradeStatus(item.tradeStatus,item.bizCode)}}
                                    </p>
                                </div>
                            </div>
                            <div class="item-footer">
                                <div flex  v-if="listNum == 0" class="btn-item bonus" @click.stop="bonusType(item)">
                                    <div flex-box="0">分红方式</div>
                                    <div flex-box="1" class="footer-right" v-if="item.setDividendMethodStatus">
                                        (变更中)
                                        {{item.setDividendMethod == 1 ? '现金红包' : '红利资金再投'}}
                                        <img src="../images/fund/red-right.png" class="img" v-if="item.allowUpdateDividendMethod"/>
                                    </div>
                                    <div flex-box="1" class="footer-right" v-else >
                                        {{item.dividendMethod == 1 ? '现金红包' : '红利资金再投'}}
                                        <img src="../images/fund/red-right.png" class="img" v-if="item.allowUpdateDividendMethod"/>
                                    </div>
                                </div>
                                <div v-if="listNum == 3 && (item.enableCancel == 1) && item.bizCode!='029'"
                                     class="btn-item revoked" @click.stop="toRevoked(item)">
                                    撤销
                                </div>
                                <div v-if="listNum == 5 && item.stringMessage" class="btn-item f6">
                                    {{item.stringMessage}}
                                </div>
                            </div>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
        </div>
        <password-input v-show="inputPassword" :title="revoked.fundAbbrName" header="撤销订单" @close="inputPassword=false"
                        @callBack="submitRevoked"></password-input>
        <king-message v-if="showMessage" @confirmBack="showMessage = false"
                      :options="options"></king-message>
        <ymi-message v-if="showYmi" @callBack="enterYmi"></ymi-message>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Loadmore, InfiniteScroll, Toast} from 'mint-ui';
    import PasswordInput from '../components/PasswordInput';
    import KingMessage from '../components/Message/KingMessage.vue';
    Vue.component(Loadmore.name, Loadmore);
    Vue.use(InfiniteScroll);
    import EventBus from  '../tools/event-bus';
    import YmiMessage from '../components/YmiMessage/YmiMessage';
    import $api from '../tools/api';
    import '../less/fund/my-fund.less';
    import {mapState} from 'vuex';
    import successImg from '../images/fund/submit-success.png';
    export default {
        name: 'my-fund',
        data(){
            return {
                successImg,
                listNum: 0,
                fundAssets: {},
                list: [],
                fundType: ['其他类型', '股票型', '债券型', '混合型', '货币型', '保本型', '指数型', 'QDII', '商品型', '短期理财'],
                currentPage: 0,
                autoFill: false,
                pageSize:10,
                loading:true,
                inputPassword: false,
                revoked: {},
                showMessage: false,
                options: {},
                timer: '',
                showYmi: false
            }
        },
        components: {PasswordInput, KingMessage, YmiMessage},
        created(){
            this.listNum = this.$route.query.t || 0;
            this.getAssetes();
            this.loadData();
        },
        computed: {
            ...mapState(['investorRiskScore', 'investorRiskTypeDesc','accountStatus','userUuid']),
        },
        methods: {
            /*撤单*/
            submitRevoked(userPayPassword){
                let {userUuid} = this;
                $api.post('/fund/purch/cancelFundOrder',{
                    orderId: this.revoked.orderId,
                    userUuid,
                    userPayPassword
                },'正在等待交易结果').then((resp) => {
                    EventBus.$emit('clearInput');
                    if(resp.code == 200){
                        this.showMessage = true;
                        this.inputPassword = false;
                        this.options = {
                            title: '撤销订单成功',
                            msg: `<img src="${successImg}" style="width: 1.6rem;"/>`,
                            confirmText: '确定'
                        };
                        this.list = [];
                        this.loadData();
                        this.getAssetes();
                    }else{
                        if(resp.code == 1108){
                            Toast(resp.msg);
                            return;
                        }
                        this.showMessage = true;
                        this.inputPassword = false;
                        this.options = {
                            title: '撤销订单失败',
                            msg: resp.msg,
                            confirmText: '确定'
                        };
                    }
                });
            },
            toRevoked(item){
                this.inputPassword = true;
                this.revoked = item;
            },
            enterYmi(result){
              if(result == 0){
                  this.showYmi = false;
                  return;
              }
                this.$router.push({
                    path:'/funds/open-count'
                })
            },
            tradeStatus(val,bizCode){
                let out = '';
                if(bizCode == '144'){
                    out = '强行调增';
                }else if(bizCode == '145'){
                    out = '强行调减';
                }else if(bizCode == '142'){
                    out = '强制赎回';
                }else{
                    switch (val){
                        case 5:
                            out = '成功';
                            break;
                        case 9:
                            out = '已撤销';
                            break;
                        case 4:
                        case 6:
                            out = '失败';
                            break;
                        default:
                            break;
                    }
                }
                return out;
            },
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
                    return $api.get('/fund/purch/my/trade', {
                        buyStatus: this.listNum, /*3进行中  5已完成*/
                        startRow: this.currentPage * this.pageSize,
                        pageSize: this.pageSize
                    })
                        .then(resp => {
                            if (resp.code == 200) {
                                let lists = resp.data.list || [];
                                this.list = this.list.concat(lists);
                                if(lists.length < this.pageSize) {
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
            fundAccountStep(){
                if(this.accountStatus<1){
                    //显示即将进入盈米弹层
                    this.showYmi = true;
                }else if(this.accountStatus<2){
                    this.$router.push({
                        path:'/set-pay-password',
                        query:{
                            isFund:1
                        }
                    })
                }else{
                    this.$router.push('/funds/info')
                }
            },
            pathTo(path, q){
                if (q) {
                    this.$router.push({
                        path,
                        query: q
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
                this.$router.replace({
                    path: '/funds/my-fund',
                    query: {
                        t: this.listNum
                    }
                });
                this.currentPage = 0;
                this.list = [];
                this.loadData();
            },
            bonusType(item){
                if(!item.allowUpdateDividendMethod){
                    return;
                }
                this.$router.push({
                    path: '/funds/bonus-type',
                    query: {
                        bonus: item.dividendMethod,
                        fundCode: item.fundCode
                    }
                });
            }
        },
        destroyed(){

        }
    }
</script>
