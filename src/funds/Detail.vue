<template>
    <div class="detail" flex="dir:top">
        <div class="wrap" flex-box="1">
            <div class="header">
                <p>{{fund.fundAbbrName}}&nbsp&nbsp&nbsp&nbsp{{fund.fundCode}}</p>
                <div flex="box:mean" class="tags">
                    <div flex="main:center">
                        <p class="p f6">{{fund.fundType | fundType}}</p>
                    </div>
                    <div flex="main:center">
                        <p class="p f6">{{fund.riskLevelFundIsoc | riskLevelFundIsoc}}</p>
                    </div>
                </div>
                <div flex="box:mean" class="infos">
                    <div v-if="Number(fund.fundType)==4">
                        <p class="f9">{{toPercentage(fund.yearlyRoe)}}</p>
                        <p>七日年化</p>
                    </div>
                    <div v-if="Number(fund.fundType)!=4&&fund.oneYearReturn">
                        <p class="f9">{{toPercentage(fund.oneYearReturn)}}</p>
                        <p>近一年涨幅</p>
                    </div>
                    <div v-if="Number(fund.fundType)!=4&&!fund.oneYearReturn">
                        <p class="f9">{{toPercentage(fund.thisYearReturn)}}</p>
                        <p>今年以来涨幅</p>
                    </div>
                    <div class="border-left">
                        <p class="f9">{{fund.nav}}</p>
                        <p>最新净值（{{fund.navDate}}）</p>
                    </div>
                </div>
            </div>
            <div class="content-1 f8" flex="box:mean">
                <p class="check-item" :class="{'active':active==0}" @click.stop="activeCheck(0)">净值增长率 </p>
                <p class="check-item" :class="{'active':active==1}" @click.stop="activeCheck(1)">净值走势  </p>
            </div>
            <div class="content-2 seperate" flex="box:mean">
                <p class="p">期间涨跌<span class="red span">{{navDValue}}%</span></p>
                <p class="p">同类平均<span class="red span">{{navChangeLast}}%</span></p>
            </div>
            <div v-if="!active">
                <line-chart :data="datas" :options="options" :chart-data="datas" class="chart seperate"></line-chart>
            </div>
            <div v-if="active">
                <line-chart :data="navDatas" :options="navOptions" :chart-data="navDatas"
                            class="chart seperate"></line-chart>
            </div>
            <div class="content-3">
                <div class="duration-box f6" flex="box:mean">
                    <p class="duration-check border-right" :class="{'active':duration=='1m'}"
                       @click.stop="durationCheck('1m')">一个月</p>
                    <p class="duration-check border-right" :class="{'active':duration=='3m'}"
                       @click.stop="durationCheck('3m')">三个月</p>
                    <p class="duration-check border-right" :class="{'active':duration=='6m'}"
                       @click.stop="durationCheck('6m')">六个月</p>
                    <p class="duration-check border-right" :class="{'active':duration=='1y'}"
                       @click.stop="durationCheck('1y')">一年</p>
                </div>
            </div>
            <div class="content-4 seperate">
                <div class="f8 item bl" flex="cross:center">
                    <p class="title" flex="cross:center">购买信息</p>
                </div>
                <div flex="cross:center" class="item bl">
                    <p flex-box="1">购买费率</p>
                    <p flex-box="0" v-if="fund.frontEndPurchRate">{{fund.frontEndPurchRate}}%</p>
                    <p flex-box="0" v-else class="btn f6">免费率</p>
                    <!-- <p flex-box="0" class="line-through">1.50%</p>
                     <p flex-box="0" class="red normal">0.15</p>-->
                </div>
                <div flex="cross:center" class="item">
                    <p flex-box="1">起投金额</p>
                    <p flex-box="0">{{fund.minAmtIndiFirstPurch}}元</p>
                </div>
            </div>
            <div class="content-4 seperate margin-bottom">
                <div class="f8 item bl" flex="cross:center">
                    <p class="title" flex="cross:center">基金概况</p>
                </div>
                <div flex="cross:center" class="item bl">
                    <p flex-box="1">分红方式</p>
                    <p flex-box="0">{{fund.defaultBonusType == 0 ? '红利资金再投' : '现金分红'}}</p>
                </div>
                <div flex="cross:center" class="item bl" @click.stop="pathTo('/manager')">
                    <p flex-box="1">基金经理</p>
                    <p flex-box="0">{{fund.manager}}</p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="img">
                </div>
                <div flex="cross:center" class="item bl">
                    <p flex-box="1">基金公司</p>
                    <p flex-box="0">{{fund.fundCustodian}}</p>
                </div>
                <div flex="cross:center" class="item bl" @click.stop="pathTo('/related-rate')">
                    <p flex-box="1">相关费率</p>
                    <p flex-box="0"></p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="img">
                </div>
                <div flex="cross:center" class="item bl" @click.stop="pathTo('/bulletin')">
                    <p flex-box="1">基金公告</p>
                    <p flex-box="0">详细</p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="img">
                </div>
                <div flex="cross:center" class="item" @click.stop="pathTo('/position-analysis')">
                    <p flex-box="1">持仓分析 </p>
                    <p flex-box="0">详细</p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="img">
                </div>
            </div>
            <div class="footer">
                <div class="server">
                    基金销售服务由
                    <a class="link" href="https://asset.yingmi.cn/sites/compliance/qualifications-mobile.html">盈米财富</a>提供
                </div>
                <div class="quali">
                    基金销售资格证号：000000378
                    <a class="link" href="https://asset.yingmi.cn/sites/compliance/qualifications-mobile.html">详情</a>
                </div>
            </div>
        </div>

        <div class="bottom f8" flex-box="0" flex="box:mean" v-if="!fund.isPurchFund">
            <!-- <p class="p blue">定投</p>-->
            <p class="p red" @click.stop="pathCheck()">申购</p>
        </div>
        <div class="bottom f8" flex-box="0" flex="box:mean" v-if="fund.isPurchFund">
            <p class="p yellow" @click.stop="pathTo('/redeem')">赎回</p>
            <p class="p red" @click.stop="pathCheck">追加投资</p>
        </div>

        <king-message v-if="showMessage" @confirmBack="againTest" @cancelBack="toBuy"
                      :options="msgOption"></king-message>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    import {MessageBox} from 'mint-ui';
    import KingMessage from '../components/Message/KingMessage.vue';
    import $device from '../tools/device';
    import '../less/fund/detail.less';
    import LineChart from '../components/LineChart/line';
    export default {
        name: 'detail',
        components: {
            LineChart, KingMessage
        },
        data(){
            return {
                active: 0,
                duration: '1m',
                datacollection: null,
                navDValue: 0,
                navChangeLast: 0,
                datas: {},
                navDatas: {},
                options: {
                    tooltips: {
                        mode: 'index'
                    },
                    scales: {
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                beginAtZero: false,
                                callback: function (value, index, values) {
                                    return value.toFixed(2) + '';
                                }
                            },
                            gridLines: {
                                display: true,
                            }
                        }],
                        /*  yAxes: [{
                         id: 'left-y-axis',
                         type: 'linear',
                         position: 'left'
                         }, {
                         id: 'right-y-axis',
                         type: 'linear',
                         position: 'right'
                         }],*/
                        xAxes: [{
                            gridLines: {
                                display: false,
                            }
                        }]
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    responsive: true,
                    maintainAspectRatio: false
                },
                navOptions: {
                    tooltips: {
                        mode: 'index'
                    },
                    scales: {
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                beginAtZero: false,
                                callback: function (value, index, values) {
                                    return value + '%元';
                                }
                            },
                            gridLines: {
                                display: true,
                            }
                        }],
                        /*  yAxes: [{
                         id: 'left-y-axis',
                         type: 'linear',
                         position: 'left'
                         }, {
                         id: 'right-y-axis',
                         type: 'linear',
                         position: 'right'
                         }],*/
                        xAxes: [{
                            gridLines: {
                                display: false,
                            }
                        }]
                    },
                    legend: {
                        display: false,
                        position: 'bottom'
                    },
                    responsive: true,
                    maintainAspectRatio: false
                },
                fund: {},
                timer: 3,
                showMessage: false,
                msgOption: {}
            }
        },
        created(){
            this.getCharts();
            $api.get('/fund/info/detail', {
                fundCode: this.$route.query.code
            })
                .then(resp => {
                    if (resp.code == 200) {
                        this.fund = resp.data;

                        this.setSession('purchRate', resp.data.frontEndPurchRate)
                        /*申购费率*/
                        this.setSession('redRate', resp.data.redRate);
                        /*赎回费率*/
                        this.setSession('managementRate', resp.data.managementRate);
                        /*管理费率*/
                        this.setSession('custodianRate', resp.data.custodianRate);
                        /*基金托管费*/
                        this.setSession('assetAllocation', resp.data.assetAllocation);
                        /*持仓分析*/

                        this.fund.navDate = this.dateFormat(resp.data.navDate)
                        /*最新净值日期*/
                        let minRate = 0;
                        if (resp.data.frontEndPurchRate) {
                            minRate = this.calMinRate(JSON.parse(resp.data.frontEndPurchRate));
                        }
                        this.fund.frontEndPurchRate = minRate;
                        /*购买费率（取数组中最小的）*/
                        if (resp.data.fundManager) {
                            let managerList = JSON.parse(resp.data.fundManager);
                            if (managerList && managerList.length) {
                                this.fund.manager = managerList[0].name;
                            }
                        }
                    }
                })
        },
        computed: {
            ...mapState(
                [
                    'paymentNo',
                    'isSetPayPassword',
                    'accountStatus',
                    'investorRiskScore',
                    'investorRiskType',
                    'isMinRiskLevel'
                ]
            )
        },
        methods: {
            calMinRate(arr){
                let minRate = Infinity;
                if (arr) {
                    arr.map(item => {
                        if (item.feeRatio == null) {
                            return 0
                        }
                        if (minRate > item.feeRatio && item.feeRatio) {
                            minRate = item.feeRatio;
                        }
                    })
                    return minRate;
                }
            },
            activeCheck(num){
                this.active = num;
                this.getCharts();
            },
            durationCheck(str){
                this.duration = str;
                this.getCharts();
            },
            pathTo(path, q){
                if (q) {
                    this.$router.push({
                        path: path,
                        query: q
                    });
                    return;
                }
                this.$router.push({
                    path: '/funds' + path,
                    query: {
                        code: this.$route.query.code
                    }
                });
            },
            pathCheck(){
                //是否开户
                if (this.accountStatus < 1) {
                    this.pathTo('/funds/open-count', {});
                    return false;
                }
                //是否设置初始密码
                else if (this.accountStatus < 2) {
                    this.pathTo('/set-pay-password', {isFund: 1});
                    return false;
                }
                //是否录入适当性管理信息，3：完成
                else if (this.accountStatus < 3) {
                    this.pathTo('/funds/info', {});
                    return false;
                }
                //是否完成风险测评
                if (this.investorRiskScore == 0) {
                    this.pathTo('/risk-assessment/wechat', {});
                    return false;
                }
                //风险评估验证是否匹配
                //风险结果不匹配
                if (Number(this.investorRiskType) < this.fund.riskLevelFundIsoc) {
                    //用户的风险测评为最低
                    if (this.isMinRiskLevel) {
                        let lowMsg = '<div class="center">该产品为高风险产品，投资此产品超过了您的风险承受范围。</div>';
                        this.msgOption = {
                            title: '风险提示',
                            msg: lowMsg,
                            confirmText: '重新测评'
                        };
                        this.showMessage = true;
                        return false;
                    }
                    this.msgOption = {
                        title: '风险提示',
                        msg: '该产品为高风险产品，投资此产品超过了您的风险承受范围。' +
                        '若仍选择投资，则表明在上述情况下，您仍自愿投资该产品，并愿意承担可能由此产生的风险。',
                        closeText: '坚持购买',
                        confirmText: '重新测评',
                        countDown: 3,
                        showCancelButton: true
                    };
                    this.showMessage = true;
                } else {
                    this.toPurchase();
                }
            },
            //进入基金申购页面
            toPurchase(again){
                let minSub = this.fund.isPurchFund == 0 ? this.fund.minAmtIndiFirstPurch : this.fund.minAmtIndiAddPurch;
                let maxSub = this.fund.maxAmtIndiPurch;
                let query = {
                    code: this.$route.query.code,
                    name: this.fund.fundAbbrName,
                    mins: minSub,
                    maxs: maxSub
                };
                if (again == 'isRiskConfirmAgain') {
                    query.again = 1;
                }
                this.$router.push({
                    path: '/funds/purchase',
                    query: query
                });
            },
            //风险匹配结果弹层回调
            againTest(type){
                this.showMessage = false;
                if (type == 'close') {
                    return false;
                }
                this.pathTo('/risk-assessment/wechat', {retest: 1});
            },
            //坚持购买
            toBuy(){
                this.showMessage = false;
                this.toPurchase('isRiskConfirmAgain');
            },
            getCharts(){
                let labels = [];
                let nowData = [];
                let avgData = [];
                let navData = [];
                $api.get('/fund/info/nav/series', {
                    fundCode: this.$route.query.code,
                    period: this.duration
                })
                    .then(resp => {
                        if (resp.code == 200) {
                            if (resp.data.list && resp.data.list.length) {
                                resp.data.list[0].navSeries.map(item => {
                                    labels.push(item.date)
                                    nowData.push(item.change)
                                    avgData.push(item.sameFundChange)
                                    navData.push(item.nav)
                                })
                                let length = resp.data.list[0].navSeries.length;
                                this.navDValue = resp.data.list[0].navSeries[length - 1].nav - resp.data.list[0].navSeries[0].nav;
                                if (!isNaN(this.navDValue)) {
                                    this.navDValue = this.navDValue.toFixed(2);
                                } else {
                                    this.navDValue = 0
                                }
                                this.navChangeLast = resp.data.list[0].navSeries[length - 1].sameFundChange;
                                if (!this.navChangeLast) {
                                    this.navChangeLast = 0;
                                }
                                return resp;
                            }
                        }
                    })
                    .then(resp => {
                        this.datas = {
                            labels,
                            datasets: [
                                {
                                    label: '当前基金',
                                    backgroundColor: '#417505',
                                    data: nowData,
                                    borderColor: '#417505',
                                    fill: false,
                                    borderWidth: 1,
                                    pointBackgroundColor: 'transparent',
                                    pointStyle: 'circle',
                                    hitRadius: 10,
                                    radius: 0
                                }, {
                                    label: '同类均值',
                                    backgroundColor: '#D0021B',
                                    borderColor: '#D0021B',
                                    data: avgData,
                                    fill: false,
                                    borderWidth: 1,
                                    pointBackgroundColor: 'transparent',
                                    pointStyle: 'dash'
                                }
                            ]
                        }
                        this.navDatas = {
                            labels,
                            datasets: [
                                {
                                    backgroundColor: '#417505',
                                    data: navData,
                                    borderColor: '#417505',
                                    fill: false,
                                    borderWidth: 1,
                                    pointBackgroundColor: 'transparent',
                                    pointStyle: 'circle',
                                    hitRadius: 10,
                                    radius: 0
                                }
                            ]
                        }
                        /*console.log(this.datas.labels)
                         console.log(this.datas.datasets[0].data)*/
                    })
            },
            dateFormat(timestamp){
                let date = new Date(timestamp);
                let y = date.getFullYear();
                let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : '' + (date.getMonth() + 1);
                let d = date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate();
                return m + '-' + d;
            },
            setSession(str, data){
                if (data) {
                    window.sessionStorage.setItem(str, data);
                } else {
                    window.sessionStorage.removeItem(str);
                }
            },
            toPercentage(num){
                if (num) {
                    return (num * 100).toFixed(2) + '%'
                }
            }
        },
        destroyed(){

        }
    }
</script>
