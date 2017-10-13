<template>
    <div class="detail" flex="dir:top">
        <div class="wrap" flex-box="1">
            <div class="header">
                <p>{{fund.fundAbbrName}}&nbsp&nbsp&nbsp&nbsp{{fund.fundCode}}</p>
                <div flex="box:mean" class="tags">
                    <div flex="main:center">
                        <p class="p f6">{{fundType[Number(fund.fundType)]}}</p>
                    </div>
                    <div flex="main:center">
                        <p class="p f6">{{riskLevel[Number(fund.riskLevel)]}}</p>
                    </div>
                </div>
                <div flex="box:mean" class="infos">
                    <div v-if="Number(fund.fundType)==4">
                        <p class="f9">{{fund.yearlyRoe}}</p>
                        <p>七日年化</p>
                    </div>
                    <div v-if="Number(fund.fundType)!=4&&fund.oneYearReturn">
                        <p class="f9">{{fund.oneYearReturn}}</p>
                        <p>近一年涨幅</p>
                    </div>
                    <div v-if="Number(fund.fundType)!=4&&!fund.oneYearReturn">
                        <p class="f9">{{fund.thisYearReturn}}</p>
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
                <p class="p">期间涨跌<span class="red span">0.71%</span></p>
                <p class="p">同类平均<span class="red span">0.71%</span></p>
            </div>
            <div v-if="!active">
                <line-chart :data="datas" :options="options" :chart-data="datas" class="chart seperate"></line-chart>
            </div>
            <div v-if="active">
                <line-chart :data="navDatas" :options="navOptions" :chart-data="navDatas" class="chart seperate"></line-chart>
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
                    <p flex-box="0">{{fund.frontEndPurchRate}}%</p>
                    <!-- <p flex-box="0" class="line-through">1.50%</p>
                     <p flex-box="0" class="red normal">0.15</p>
                     <p flex-box="0" class="btn f6">1折</p>-->
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
        </div>
        <div class="bottom f8" flex-box="0" flex="box:mean">
          <!--  <p class="p yellow">+自选</p>
            <p class="p blue">定投</p>-->
            <p class="p red" @click.stop="pathCheck()">申购（1折）</p>
        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    import { MessageBox } from 'mint-ui';
    import '../less/fund/detail.less';
    import LineChart from '../components/LineChart/line';
    export default {
        name: 'detail',
        components: {
            LineChart
        },
        data(){
            return {
                active: 0,
                duration: '1m',
                datacollection: null,
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
                fundType: ['其他类型', '股票型', '债券型', '混合型', '货币型', '保本型', '指数型', 'QDII', '商品型', '短期理财'],
                riskLevel: ['未评估过', '保守型', '稳健型', '进取型']
            }
        },
        created(){
            this.getCharts();
            this.$store.dispatch('getAccountInfo');
            $api.get('/fund/info/detail', {
                fundCode: this.$route.query.code
            })
                .then(resp => {
                    if (resp.code == 200) {
                        this.fund = resp.data;
                        window.sessionStorage.setItem('purchRate',resp.data.frontEndPurchRate);/*申购费率*/
                        window.sessionStorage.setItem('redRate',resp.data.redRate);/*赎回费率*/
                        window.sessionStorage.setItem('managementRate',resp.data.managementRate);/*管理费率*/
                        window.sessionStorage.setItem('custodianRate',resp.data.custodianRate);/*基金托管费*/
                        window.sessionStorage.setItem('assetAllocation',resp.data.assetAllocation);/*持仓分析*/
                        let date = new Date(resp.data.navDate);
                        let month = (date.getMonth()+1) > 9 ? '' + (date.getMonth()+1) : '0' + (date.getMonth()+1);
                        let day = date.getDate() > 10 ? '' + date.getDate() : '0' + date.getDate();
                        this.fund.navDate = month + '-' + day;/*最新净值日期*/
                        let minRate = Infinity;
                        if(resp.data.frontEndPurchRate){
                            let purchRate = JSON.parse(resp.data.frontEndPurchRate);
                            purchRate.map(item => {
                                if (minRate > item.feeRatio && item.feeRatio) {
                                    minRate = item.feeRatio;
                                }
                            })
                        }
                        this.fund.frontEndPurchRate = minRate;/*购买费率（取数组中最小的）*/
                        if(resp.data.fundManager){
                            let managerList = JSON.parse(resp.data.fundManager);
                            if(managerList&&managerList.length){
                                this.fund.manager = managerList[0].name;
                            }
                        }
                    }
                })
        },
        computed: {
            ...mapState(
                ['bank_no','isSetPayPassword','accountStatus']
            )
        },
        methods: {
            activeCheck(num){
                this.active = num;
                this.getCharts();
            },
            durationCheck(str){
                this.duration = str;
                this.getCharts();
            },
            pathTo(path, noq){
                if(noq){
                    this.$router.push({
                        path: path
                    });
                    return;
                }
                this.$router.push({
                    path:'/funds' + path,
                    query:{
                        code: this.$route.query.code,
                    }
                });
            },
            pathCheck(){
                //是否开户
                if(!this.bank_no){
                    this.pathTo('/funds/open-count',true);
                    return false;
                }
                //是否设置初始密码
                if(!this.isSetPayPassword){
                    this.pathTo('/set-pay-password',true);
                    return false;
                }
                //是否录入适当性管理信息，3：完成
                if(this.accountStatus != 3){
                    this.pathTo('/funds/info',true);
                    return false;
                }
                //是否完成风险测评
                if(this.investorRiskScore == 0){
                    this.pathTo('/risk-assessment/wechat',true);
                    return false;
                }
                //风险评估验证是否匹配
                $api.get('/fund/account/risk',{terminalInfo:this.$route.query.code}).then((resp)=>{
                    if(resp.code == 200){
                        if(this.investorRiskType == 0){
                            this.lowRiskMsg();
                            return false;
                        }
                        if(!resp.data.minRiskGrade){
                            //this.lowRiskMsg();
                            this.message(resp.data.riskGrade5Desc);
                        }else{
                            this.toPurchase();
                        }
                    }
                });

            },
            //进入基金申购页面
            toPurchase(){
                let minSub = this.fund.isPurchFund == 1 ? this.fund.minAmtIndiFirstPurch : this.fund.minAmtIndiAddPurch;
                let maxSub = this.fund.maxAmtIndiPurch;
                this.$router.push({
                    path:'/funds/purchase',
                    query:{
                        code:this.$route.query.code,
                        name: this.fund.fundAbbrName,
                        mins: minSub,
                        maxs: maxSub
                    }
                });
            },
            //低风险弹层
            lowRiskMsg(){
                let lowMsg = `<div class="risk-msg center">该产品为高风险产品，投资此产品超过了您的风险承受范围。`;
                let options = {
                    confirmButtonText: '重新测评',
                    confirmButtonClass: 'again-risk',
                };
                MessageBox.alert(lowMsg, '风险提示',options)
                    .then(action => {
                        this.pathTo('/risk-assessment/wechat',true);
                    });
            },
            //风险匹配结果弹层
            message(msg){
                let options = {
                    confirmButtonText:`坚持购买（3）`,
                    confirmButtonClass: 'submit-risk',
                    cancelButtonText: '重新测评',
                    cancelButtonClass: 'again-risk',
                };
                MessageBox.confirm(`<div class="risk-msg">${msg}</div>`,'风险提示',options)
                    .then(action => {
                        alert()
                    })
                    .catch(err => {
                        if (err == 'cancel') {
                            this.pathTo('/risk-assessment/wechat',true);
                        }
                    });
                let timer = 3;
                let timeout;
                timeout = setInterval(()=>{
                    let $ele = document.getElementsByClassName('submit-risk')[0];
                    if(timer > 0){
                        timer = timer - 1;
                        $ele.innerText = `坚持购买（${timer}）`;
                        if(timer == 0){
                            $ele.className = $ele.className + ' enabled';
                            $ele.innerText = '坚持购买';
                            clearTimeout(timeout);
                            return;
                        }
                        $ele.innerText = `坚持购买（${timer}）`;
                    }
                },1000);
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
            }
        },
        destroyed(){

        }
    }
</script>
