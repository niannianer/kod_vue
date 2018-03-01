<template>
    <div class="detail" flex="dir:top">
        <div class="wrap" flex-box="1" :class="{'blurry': showYmi}">
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
                        <p class="f9">{{fund.yearlyRoe | translatePate}}</p>
                        <p>七日年化</p>
                    </div>
                    <div v-if="Number(fund.fundType)!=4&&fund.oneYearReturn">
                        <p class="f9">{{fund.oneYearReturn | translatePate}}</p>
                        <p>近一年涨幅</p>
                    </div>
                    <div v-if="Number(fund.fundType)!=4&&!fund.oneYearReturn">
                        <p class="f9">{{fund.thisYearReturn | translatePate}}</p>
                        <p>今年以来涨幅</p>
                    </div>
                    <div class="border-left" v-if="Number(fund.fundType)==4">
                        <p class="f9">{{fund.unitYield}}</p>
                        <p>万份收益（{{fund.unitYieldDate | timeFormater('M-d')}}）</p>
                    </div>
                    <div class="border-left" v-else>
                        <p class="f9">{{fund.nav}}</p>
                        <p>最新净值（{{fund.navDate | timeFormater('M-d')}}）</p>
                    </div>
                </div>
            </div>
            <!--货币型基金-->
            <div v-if="fundTypes==4">
                <div class="content-1 f8" flex="box:mean">
                    <p class="check-item" :class="{'active':active==0}" @click.stop="activeCheck(0)">七日年化 </p>
                    <p class="check-item" :class="{'active':active==1}" @click.stop="activeCheck(1)">万份收益 </p>
                </div>
                <div class="content-2 seperate" flex="box:mean">
                    <p class="p p-left" v-if="active==0">七日年化
                        <span class="red span">{{roeRate(yearlyRoeLast.yearlyRoe)}}</span>
                        {{yearlyRoeLast.date}}
                    </p>
                    <p class="p p-left" v-else>万份收益
                        <span class="red span">{{unitYieldLast.unitYield}}元</span>
                        {{unitYieldLast.date}}
                    </p>
                </div>
                <div v-if="!active">
                    <line-chart :data="datas" :options="options" :chart-data="datas"
                                class="chart seperate"></line-chart>
                </div>
                <div v-if="active">
                    <line-chart :data="navDatas" :options="navOptions" :chart-data="navDatas"
                                class="chart seperate"></line-chart>
                </div>
            </div>
            <!--非货币型基金-->
            <div v-else>
                <div class="content-1 f8" flex="box:mean">
                    <p class="check-item" :class="{'active':active==0}" @click.stop="activeCheck(0)">净值增长率 </p>
                    <p class="check-item" :class="{'active':active==1}" @click.stop="activeCheck(1)">净值走势  </p>
                </div>
                <div class="content-2 seperate" flex="box:mean">
                    <p class="p">期间涨跌<span class="red span">{{navDValue}}%</span></p>
                    <p class="p">同类平均<span class="red span">{{navChangeLast}}%</span></p>
                </div>
                <div v-if="!active">
                    <line-chart :data="datas" :options="options" :chart-data="datas"
                                class="chart seperate"></line-chart>
                </div>
                <div v-if="active">
                    <line-chart :data="navDatas" :options="navOptions" :chart-data="navDatas"
                                class="chart seperate"></line-chart>
                </div>
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
                <div flex="cross:center" class="item" :class="{'bl':fund.minAmtIndiFirstPurch}">
                    <p flex-box="1">购买费率</p>
                    <p flex-box="0" v-if="fund.frontEndPurchRate">{{fund.frontEndPurchRate}}%</p>
                    <p flex-box="0" class="btn f6" v-else>免费率</p>
                    <!-- <p flex-box="0" class="line-through">1.50%</p>
                     <p flex-box="0" class="red normal">0.15</p>-->
                </div>
                <div flex="cross:center" class="item" v-if="fund.minAmtIndiFirstPurch">
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
                <div flex="cross:center" class="item bl" @click.stop="pathTo('/manager')" v-if="fund.manager.length">
                    <p flex-box="1">基金经理</p>
                    <p flex-box="0">{{fund.manager.join('、')}}</p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="img">
                </div>
                <div flex="cross:center" class="item bl" v-if="fund.fundCustodian">
                    <p flex-box="1">基金公司</p>
                    <p flex-box="0">{{fund.administrator}}</p>
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
            <p class="p yellow" @click.stop="toRedeem">赎回</p>
            <p class="p red" @click.stop="pathCheck">追加投资</p>
        </div>
        <king-message v-if="showMessage" @confirmBack="toBuy" @cancelBack="againTest"
                      :options="msgOption"></king-message>
        <ymi-message v-if="showYmi" @callBack="enterYmi"></ymi-message>
    </div>
</template>
<script>
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    import KingMessage from '../components/Message/KingMessage';
    import $device from '../tools/device';
    import '../less/fund/detail.less';
    import LineChart from '../components/LineChart/line';
    import YmiMessage from '../components/YmiMessage/YmiMessage';
    import {logout} from '../tools/operation';
    export default {
        name: 'detail',
        components: {
            LineChart, KingMessage, YmiMessage
        },
        data(){
            return {
                active: 0,
                duration: '1m',
                datacollection: null,
                navDValue: 0,
                navChangeLast: 0,
                yearlyRoeLast: {},
                unitYieldLast: {},
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
                                    return value+'元';
                                }
                            },
                            gridLines: {
                                display: true,
                            }
                        }],
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
                fund: {
                    manager: []
                },
                timer: 3,
                showMessage: false,
                msgOption: {},
                showYmi: false,
                enterPath: '',
                isRiskConfirmAgain: false
            }
        },
        created(){
            this.addHive(1, 'fundsDetail',1050);
            let event = ['_trackEvent', '基金详情', 'SHOW', '进入基金详情页面', '进入基金详情页面'];
            window._hmt.push(event);
            this.fundTypes = this.$route.query.type;
            if (this.fundTypes == 4) {
                this.options.legend.display = false;
            }
            this.getCharts();
            this.loadData();
        },
        computed: {
            ...mapState(
                [
                    'paymentNo',
                    'isSetPayPassword',
                    'accountStatus',
                    'investorRiskScore',
                    'investorRiskType',
                    'isMinRiskLevel',
                    'investorRiskVersion'
                ]
            )
        },
        methods: {
            loadData(){
                $api.get('/fund/info/detail', {
                    fundCode: this.$route.query.code
                })
                    .then(resp => {
                        if (resp.code == 200) {
                            this.fund = resp.data;
                            this.fundTypes = this.fund.fundType;
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
                            this.fund.navDate = resp.data.navDate
                            /*最新净值日期*/
                            let maxRate = 0;
                            if (resp.data.frontEndPurchRate) {
                                maxRate = this.calMaxRate(JSON.parse(resp.data.frontEndPurchRate));
                            }
                            this.fund.frontEndPurchRate = maxRate;
                            /*购买费率（取数组中最大的）*/
                            this.fund.manager = [];
                            if (resp.data.fundManager) {
                                let managerList = JSON.parse(resp.data.fundManager);
                                managerList.map((val) => {
                                    this.fund.manager.push(val.name);
                                });
                                this.fund.manager = this.fund.manager.slice(0, 3);
                            }
                        }
                    })
            },
            calMaxRate(arr){
                let maxRate = -Infinity;
                if (arr) {
                    arr.map(item => {
                        if ((!item.feeRatio || item.feeRatio == null) && maxRate < 0) {
                            maxRate = 0
                        }
                        if (maxRate < item.feeRatio && item.feeRatio) {
                            maxRate = item.feeRatio;
                        }
                    })
                    return maxRate;
                }
            },
            activeCheck(num){
                this.addHive(0, 'fundsDetail_tab_checkTab',105001);
                let event = ['_trackEvent', '基金详情', 'CLICK', '基金详情-点击tab', '基金详情-点击tab'];
                window._hmt.push(event);
                this.active = num;
                this.getCharts();
            },
            durationCheck(str){
                this.addHive(0, 'fundsDetail_tab_checkDurationTab',105002);
                let event = ['_trackEvent', '基金详情', 'CLICK', '基金详情-点击时间tab', '基金详情-点击时间tab'];
                window._hmt.push(event);
                this.duration = str;
                this.getCharts();
            },
            pathTo(path, q){
                let oper = '';
                let pathname = path.replace('/', '').replace(/[-|//](\w)/g, ($1, $2) => {
                    return $2.toUpperCase();
                });
                if (path == '/manager') {
                    oper = '基金经理';
                }
                if (path == '/related-rate') {
                    oper = '相关费率';
                }
                if (path == '/bulletin') {
                    oper = '基金公告';
                }
                if (path == '/position-analysis') {
                    oper = '持仓分析';
                }
                if(oper){/*页面点击*/
                    this.addHive(0, 'fundsDetail_link_' + pathname,105003);
                    let event = ['_trackEvent', '基金详情', 'CLICK', '基金详情-点击' + oper, '基金详情-点击' + oper];
                    window._hmt.push(event);
                }
                /*页面内逻辑调用*/
                this.addHive(2, 'fundsDetail_to_' + pathname,1050);
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

                this.$store.dispatch('getAccountBaofoo').then(data => {
                    if (data.code == '401') {
                        logout();
                    } else {
                        this.purseNext();
                    }
                });
            },
            purseNext(){
                //是否开户
                if (this.accountStatus < 1) {
                    //显示即将进入盈米弹层
                    this.enterPath = 'openCount';
                    this.showYmi = true;
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
                //未完成风险测评
                if (this.investorRiskScore == 0) {
                    this.pathTo('/risk-assessment/wechat', {});
                    return false;
                } else if (this.investorRiskVersion == 1) {
                    this.pathTo('/risk-assessment/wechat', {retest: 1});
                    return false;
                }
                //风险评估验证是否匹配
                //风险结果不匹配
                if (Number(this.investorRiskType) < this.fund.riskLevelFundIsoc) {
                    //用户的风险测评为最低
                    if (this.isMinRiskLevel) {
                        let lowMsg = '该产品为高风险产品，投资此产品超过了您的风险承受范围。';
                        this.msgOption = {
                            title: '风险提示',
                            msg: lowMsg,
                            closeText: '重新测评',
                            closeClass: 'blue',
                            showConfirmButton: false,
                            showCancelButton: true
                        };
                        this.showMessage = true;
                        return false;
                    }
                    //坚持购买
                    this.msgOption = {
                        title: '风险提示',
                        msg: '<div class="left">该产品为高风险产品，投资此产品超过了您的风险承受范围。' +
                        '若仍选择投资，则表明在上述情况下，您仍自愿投资该产品，并愿意承担可能由此产生的风险。</div>',
                        closeText: '重新测评',
                        closeClass: 'blue',
                        confirmText: '坚持购买',
                        confirmClass: 'gray',
                        countDown: 3,
                        showCancelButton: true
                    };
                    this.showMessage = true;
                    this.isRiskConfirmAgain = true;
                } else {
                    this.isRiskConfirmAgain = false;
                    this.toBuy();
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
                if (again) {
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
            //坚持购买、购买
            toBuy(){
                this.showMessage = false;
                this.showYmi = true;
                this.enterPath = 'purchase';
            },
            //赎回
            toRedeem(){
                this.showYmi = true;
                this.enterPath = 'redeem';
            },
            //进入盈米
            enterYmi(result){
                if (result == 0) {
                    this.showYmi = false;
                    return;
                }
                switch (this.enterPath) {
                    case 'purchase':
                        this.toPurchase(this.isRiskConfirmAgain);
                        break;
                    case 'redeem':
                        this.pathTo('/funds/redeem', {name: this.fund.fundAbbrName, code: this.fund.fundCode});
                        break;
                    case 'openCount':
                        this.pathTo('/funds/open-count', {});
                        break;
                    default:
                        break;
                }
            },
            getCharts(){
                let result = {};
                $api.get('/fund/info/nav/series', {
                    fundCode: this.$route.query.code,
                    period: this.duration
                })
                    .then(resp => {
                        if (resp.code == 200) {
                            if (resp.data.list && resp.data.list.length) {
                                result = this.formatData(resp.data.list);
                                return resp;
                            }
                        }
                    })
                    .then(resp => {
                        this.lineData(result);
                    })
            },
            formatData(list){
                let labels = [];
                let nowData = [];
                let avgData = [];
                let navData = [];
                let unitYieldData = [];//万分收益
                let yearlyRoeData = [];//七日年华
                list[0].navSeries.map(item => {
                    labels.push(item.date)
                    if (this.fundTypes == 4) {
                        unitYieldData.push(item.unitYield);
                        yearlyRoeData.push(item.yearlyRoe);
                    } else {
                        nowData.push(item.change);
                        avgData.push(item.sameFundChange);
                        navData.push(item.nav);
                    }
                });
                let length = list[0].navSeries.length;
                //货币型基金
                if (this.fundTypes == 4) {
                    this.unitYieldLast = list[0].navSeries[length - 1];
                    this.yearlyRoeLast = list[0].navSeries[length - 1];
                    this.unitYieldLast.date = (this.unitYieldLast.date).split('-').join('.');
                    this.yearlyRoeLast.date = (this.yearlyRoeLast.date).split('-').join('.');
                } else {
                    //非货币型基金
                    this.navDValue = list[0].navSeries[length - 1].nav - list[0].navSeries[0].nav;
                    if (!isNaN(this.navDValue)) {
                        this.navDValue = this.navDValue.toFixed(2);
                    } else {
                        this.navDValue = 0
                    }
                    this.navChangeLast = list[0].navSeries[length - 1].sameFundChange;
                    if (!this.navChangeLast) {
                        this.navChangeLast = 0;
                    }
                }
                return {labels, nowData, avgData, navData, yearlyRoeData, unitYieldData}
            },
            lineData(result){
                let {labels, nowData, avgData, navData, yearlyRoeData, unitYieldData} = result;
                if (this.fundTypes == 4) {
                    this.datas = {
                        labels,
                        datasets: [
                            {
                                label: '七日年化',
                                backgroundColor: '#417505',
                                data: yearlyRoeData,
                                borderColor: '#417505',
                                fill: false,
                                borderWidth: 1,
                                pointBackgroundColor: 'transparent',
                                pointStyle: 'circle',
                                hitRadius: 10,
                                radius: 0
                            }
                        ]
                    };
                    this.navDatas = {
                        labels,
                        datasets: [
                            {
                                backgroundColor: '#417505',
                                data: unitYieldData,
                                borderColor: '#417505',
                                fill: false,
                                borderWidth: 1,
                                pointBackgroundColor: 'transparent',
                                pointStyle: 'circle',
                                hitRadius: 10,
                                radius: 0
                            }
                        ]
                    };
                    return;
                }
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
            },
            setSession(str, data){
                if (data) {
                    window.sessionStorage.setItem(str, data);
                } else {
                    window.sessionStorage.removeItem(str);
                }
            },
            roeRate(num1 = 0){
                let num2 = 100;
                let m = 0, s1 = num1.toString(), s2 = num2.toString();
                if (s1.split(".")[1]) {
                    m += s1.split(".")[1].length
                }
                if (s2.split(".")[1]) {
                    m += s2.split(".")[1].length
                }
                return (Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)) + '%';
            },
        },
        destroyed(){
            this.addHive(2, 'fundsDetail',1050);
        }
    }
</script>
