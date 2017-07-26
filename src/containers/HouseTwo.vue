<template>
    <div class="house-two" flex="dir:top">
        <div class="main" flex-box="1">
            <div class="header">
                <div class="header-main">
                    <div v-show="rotate">
                        <div>如果说婚姻是虚拟的家，那住房就是实体的家</div>
                        <div class="house-price">根据国家统计局数据</div>
                        <div class="house-price">
                            【<span>{{cityName}}</span>】平均房屋总价为<span>{{cityAveragePrice}}</span>元
                            <select v-model="cityName" @change="changeCity">
                                <option v-for="option in citys" v-bind:value="option.name">
                                    {{ option.name }}
                                </option>
                            </select>
                        </div>
                        <div class="div-warp" flex>
                            <label flex-box="1">房产总价</label>
                            <input flex-box="0" type="tel" maxlength="5"
                                   v-model.trim="houseTotal"
                                   @keyup="inputKeyup"/>
                            <span flex-box="0">万元</span>
                        </div>
                        <div flex class="div-warp margin-rem" @click.stop="openYears">
                            <label flex-box="1">预计几年实现买房目标？</label>
                            <span flex-box="1" style="font-size: 1.2rem">{{year}}</span>
                            <span flex-box="0">年</span>
                            <span flex-box="0" class="arrow-right" flex="main:right cross:center">
                            <img src="../images/house/arrow-right.png"/>
                        </span>
                        </div>

                        <div>是否贷款?</div>

                        <div class="box-warp" flex="main:center">
                            <div class="box" :class="{'active':loanFlag==1}" @click.stop="setLoanFlag(1)">
                                <div class="content">是</div>
                            </div>
                            <div class="box" :class="{'active':loanFlag==0}" @click.stop="setLoanFlag(0)">
                                <div class="content">否</div>
                            </div>
                        </div>
                    </div>
                    <div v-show="!rotate" flex="main:center">
                        <div flex-box="1">总价：{{houseTotal}}万</div>
                        <div flex-box="1">{{year}}年实现</div>
                        <div flex-box="1">需贷款</div>
                    </div>

                    <div class="arraw-up" v-show="loanFlag==1" @click.stop="rotate=!rotate">
                        <img :class="{'rotate':rotate}" src="../images/house/arraw-up.png"/>
                    </div>
                </div>
                <div class="box-shadow"></div>
            </div>
            <!--需贷款-->
            <div class="loan" v-show="loanFlag==1">
                <div class="loan-types" flex="main:center">
                    <div flex-box="1" class="type"
                         @click.stop="loanType=1"
                         :class="{'active':loanType==1}">等额本息
                    </div>
                    <div flex-box="1" class="type"
                         @click.stop="loanType=2"
                         :class="{'active':loanType==2}">等额本金
                    </div>
                </div>
                <div class="pay" flex="main:center">
                    <div flex-box="1" class="first-pay">
                        <div>首付金额（元）</div>
                        <div class="price">{{firstPayments}}</div>
                    </div>
                    <div flex-box="1" class="first-pay">
                        <div v-if="loanType==2">首月月供参考（元）</div>
                        <div v-else>每月月供参考（元）</div>
                        <div class="price">{{H | currencyFormat}}</div>
                    </div>
                </div>
                <div class="pay" flex style="margin-top: 0" v-show="loanType==2">
                    <div flex-box="1" class="first-pay">
                        <div>每月递减（元）</div>
                        <div class="price">{{S | currencyFormat}}</div>
                    </div>

                </div>
                <div class="loan-class">
                    <div class="loan-item" flex="main:justify">
                        <div flex-box="1">贷款类型</div>
                        <div flex-box="1" @click.stop="openLoanClass"
                             class="right arrow">{{loanClassDesc}}
                        </div>
                    </div>
                    <div class="loan-item" flex="main:justify" v-if="loanClass==1">
                        <div flex-box="1">贷款金额（万）</div>
                        <div flex-box="1" class="right">
                            <input type="number" v-model.trim="businessLoan" @blur="checkLoan"/>
                        </div>
                    </div>
                    <div class="loan-item" flex="main:justify" v-if="loanClass==2">
                        <div flex-box="1">贷款金额（万）</div>
                        <div flex-box="1" class="right">
                            <input v-model.trim="accumulationFundLoan" @blur="checkLoan" type="number"/>
                        </div>
                    </div>
                    <div class="loan-item" flex="main:justify" v-if="loanClass==3">
                        <div flex-box="1">商业贷款金额（万）</div>
                        <div flex-box="1" class="right">
                            <input v-model.trim="businessLoan" @blur="checkLoan" type="number"/>
                        </div>
                    </div>
                    <div class="loan-item" flex="main:justify" v-if="loanClass==3">
                        <div flex-box="1">公积金贷款金额（万）</div>
                        <div flex-box="1" class="right">
                            <input v-model.trim="accumulationFundLoan" @blur="checkLoan" type="tel"/>
                        </div>
                    </div>
                    <div class="loan-item" flex="main:justify">
                        <div flex-box="1">期限（年）</div>
                        <div flex-box="1" @click.stop="openLoanYears"
                             class="right arrow">{{loanYear}}
                        </div>
                    </div>

                    <div class="loan-item" flex="main:justify" v-if="loanClass==1||loanClass==3">
                        <div flex-box="1">商业贷款基准利率（%）</div>
                        <div flex-box="1" class="right">{{businessRate}}</div>
                    </div>
                    <div class="loan-item" flex="main:justify" v-if="loanClass==1||loanClass==3">
                        <div flex-box="1">商业贷款利率折扣</div>
                        <div flex-box="1" @click.stop="openDiscounts"
                             class="right arrow">{{discountDesc}}
                        </div>
                    </div>
                    <div class="loan-item" flex="main:justify" v-if="loanClass==3||loanClass==2">
                        <div flex-box="1">公积金贷款基准利率（%）</div>
                        <div flex-box="1" class="right">{{fundRate}}</div>
                    </div>
                </div>
            </div>
            <div class="center" flex="main:left cross:center">
                <div>
                    <div>预计每期投入<span>{{R}}元</span></div>
                    <div>即可在{{year}}年后达成买房（首付）的资金需求</div>
                </div>
            </div>


        </div>
        <div class="footer" flex-box="0">
            <button class="btn-overlook" :disabled="disabled" @click.stop="submit">查看推荐方案</button>
        </div>

        <kingold-picker v-if="showPicker" :default-index="0"
                        :title="title" :list="list" @back="pickerBack"></kingold-picker>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import _ from 'lodash/core';
    import KingoldPicker from '../components/KingoldPicker'
    import {getPrice} from '../tools/city-grade';
    import $api from '../tools/api';
    import wx from '../tools/wx';
    import $device from '../tools/device';
    import '../less/house-two.less';
    import requestHybrid from '../tools/hybrid';

    let timer = null;
    const rate1 = 0.06;
    const rate2 = 0.062;
    const loanYears = [{
        name: '5年',
        loanYear: 5
    }, {
        name: '10年',
        loanYear: 10
    }, {
        name: '15年',
        loanYear: 15
    }, {
        name: '20年',
        loanYear: 20
    }, {
        name: '25年',
        loanYear: 25
    }, {
        name: '30年',
        loanYear: 30
    }];
    const discounts = [{
        name: '7折',
        discount: 7
    }, {
        name: '8折',
        discount: 8
    }, {
        name: '8.5折',
        discount: 8.5
    }, {
        name: '9折',
        discount: 9
    }, {
        name: '9.5折',
        discount: 9.5
    }, {
        name: '无',
        discount: 10
    }];
    const loanClasses = [{
        name: '商业贷款',
        loanClass: 1
    }, {
        name: '公积金贷款',
        loanClass: 2
    }, {
        name: '组合贷款',
        loanClass: 3
    }];
    export default {
        name: 'house-two',
        data(){
            return {
                cityName: '北京',
                cityCode: '',
                cityPrice: '',
                cityList:[],
                houseTotal: '',
                planYears: 3,
                loanFlag: 0,
                loanType: 1,
                loanClass: 1,
                investMoney: '',
                accumulationFundLoan: 0,
                businessLoan: 0,
                showPicker: false,
                title: '选择年限',
                loanYear: 5,
                discount: 10,
                list: [],
                rotate: true
            }
        },
        created(){
            if ($device.isWeixin) {
                this.getShare();
            }
            $api.getNode('/assets/getCities')
                .then(data=>{
                    this.cityList =data.data;
                });
            if (window.sessionStorage.getItem('cityName')) {
                this.cityName = window.sessionStorage.getItem('cityName');
                this.houseTotal = Math.ceil(this.cityAveragePrice / 10000);
            }
            if (window.sessionStorage.getItem('houseData')) {
                let houseData = window.sessionStorage.getItem('houseData');
                _.forEach(JSON.parse(houseData), (data, key) => {
                    this[key] = data;
                });
                window.sessionStorage.removeItem('houseData');
            }
            if($device.kingold){
                requestHybrid({
                    tagname: 'title',
                    param: {
                        backtype: 2,// "0 : 后退 1 : 直接关闭 2: 弹对话框",
                        backAndRefresh: 1,
                        title: '住房理财规划',
                        backstr: '退出理财规划将不会保存，确认退出？',
                        keyboard_mode: 0//0 adjustresize 1 adjustpan
                    }
                });
            }
        },
        components: {
            KingoldPicker
        },
        computed: {
            cityAveragePrice(){
                return getPrice(this.cityName);
            },
            year(){
                if (this.planYears) {
                    return this.planYears;
                }
                return '';
            },
            years: () => {
                let array = [];
                for (let i = 1; i <= 10; i++) {
                    array.push({
                        name: `${i} 年`,
                        value: i
                    })
                }
                return array;
            },
            citys(){
                return this.cityList;
            },
            firstPayments(){
                return (this.houseTotal - this.accumulationFundLoan - this.businessLoan) * 10000;
            },
            X1(){
                return rate1 / 12;
            },
            X2(){

                return rate2 / 4;
            },
            T1(){
                return this.year * 12;
            },
            T2(){
                return this.year * 4;
            },
            R(){
                if (!this.houseTotal) {
                    return 0;
                }
                if (!this.year) {
                    return 0
                }
                let p1 = this.X1 * (((this.T1 / this.X1) + (this.T1 * (this.T1 + 1)) / 2));
                let p2 = this.X2 * (((this.T2 / this.X2) + (this.T2 * (this.T2 + 1)) / 2));
                let r = (this.houseTotal - this.accumulationFundLoan - this.businessLoan) * 10000 / (p1 + p2);
                return r.toFixed(0);
            },
            H(){
                let C = this.accumulationFundLoan * 10000;
                let D = this.fundRate / 100;

                let E = this.businessLoan * 10000;
                let F = this.businessRate / 100;

                let G = this.loanYear;
                let N = this.discount * 0.1;
                let h1 = ( C * D / 12) * Math.pow(1 + D / 12, 12 * G);
                let h2 = Math.pow((1 + D / 12), (12 * G)) - 1;
                let h3 = (E * (N * F) / 12) * Math.pow((1 + (N * F) / 12), 12 * G);
                let h4 = Math.pow((1 + (N * F) / 12), (12 * G )) - 1;

                if (this.loanType == 1) {
                    let h = h1 / h2 + h3 / h4;
                    return h;
                } else {
                    let h = C / (12 * G) + C * D / 12 + E / (12 * G) + E * N * F / 12;
                    return h;
                }

            },
            S(){
                if (this.loanType == 1) {
                    return 0;
                }
                let C = this.accumulationFundLoan * 10000;
                let D = this.fundRate / 100;

                let E = this.businessLoan * 10000;
                let F = this.businessRate / 100;

                let G = this.loanYear;
                let N = this.discount * 0.1;

                return C / (12 * G) * (D / 12) + E / (12 * G) * (N * F / 12);
            },
            loanClassDesc(){
                if (this.loanClass == 1) {
                    return '商业贷款';
                }
                if (this.loanClass == 2) {
                    return '公积金贷款';
                }
                if (this.loanClass == 3) {
                    return '组合贷款';
                }
            },
            businessRate(){
                if (this.loanYear == 5) {
                    return 4.75;
                }
                return 4.9
            },
            fundRate(){
                if (this.loanYear == 5) {
                    return 2.75;
                }
                return 3.25;
            },
            discountDesc(){
                if (this.discount == 10) {
                    return '无';
                }
                return `${this.discount}折`;
            },
            disabled(){
                if (this.firstPayments < 0) {
                    return true;
                }
                if (isNaN(this.firstPayments)) {
                    return true;
                }
                return this.R ? false : true;
            }
        },
        methods: {
            getShare(){
                wx.getShare({
                    title:'快看我的购房规划，原来梦想触手可及！',
                    desc:'金疙瘩智能定制理财规划，比心理测验还好玩，你也来试试？'
                });
            },
            changeCity(){
                this.houseTotal = Math.round(this.cityAveragePrice / 10000);
            },
            inputKeyup(){
                if (timer) {
                    clearTimeout(timer);
                }
                let that = this;
                timer = setTimeout(() => {
                    that.houseTotal = that.houseTotal.toString();
                    that.houseTotal = that.houseTotal.replace(/\D/g, '');
                    that.houseTotal = that.houseTotal.substr(0, 5);
                    if(this.loanFlag){
                        this.setLoanFlag(1);
                    }
                }, 200);
            },
            openCitys(){
                this.showPicker = true;
                this.list = this.citys;
                this.title = '选择城市';
            },
            openYears(){
                this.showPicker = true;
                this.list = this.years;
                this.title = '选择年限';
            },
            openLoanClass(){
                this.showPicker = true;
                this.list = loanClasses;
                this.title = '选择贷款类型';
            },
            openLoanYears(){
                this.showPicker = true;
                this.list = loanYears;
                this.title = '选择贷款期限';
            },
            openDiscounts(){
                this.showPicker = true;
                this.list = discounts;
                this.title = '选择折扣率';
            },
            pickerBack(result){
                this.showPicker = false;
                if (result) {
                    if (result.value) {
                        this.planYears = result.value
                    }
                    if (result.zip) {
                        this.cityName = result.name;
                    }
                    if (result.loanClass) {
                        this.loanClass = result.loanClass;
                        switch (this.loanClass) {

                            case 2:
                                this.businessLoan = 0;
                                this.accumulationFundLoan = this.houseTotal / 2;
                                break;

                            case 3:
                                this.businessLoan = this.houseTotal / 4;
                                this.accumulationFundLoan = this.houseTotal / 4;
                                break;
                            default:
                                this.businessLoan = this.houseTotal / 2;
                                this.accumulationFundLoan = 0;
                        }
                    }
                    if (result.discount) {
                        this.discount = result.discount;
                    }
                    if (result.loanYear) {
                        this.loanYear = result.loanYear;
                    }

                }
            },
            setLoanFlag(flag){
                if (flag && !this.houseTotal) {
                    Toast('请请输入房产总价');
                    return false;
                }
                this.loanFlag = flag;
                if (flag) {
                    if (this.loanClass == 1) {
                        this.businessLoan = this.houseTotal / 2;
                    }
                    if (this.loanClass == 2) {
                        this.accumulationFundLoan = this.houseTotal / 2;
                    }
                    if (this.loanClass == 3) {
                        this.businessLoan = this.houseTotal / 4;
                        this.accumulationFundLoan = this.houseTotal / 4;
                    }
                } else {
                    this.businessLoan = 0;
                    this.accumulationFundLoan = 0;

                }
            },
            checkLoan(){
                if (this.firstPayments < 0) {
                    Toast('贷款金额不能超过房产总价');
                    return false;
                }
            },
            submit(){
                let {
                    cityName, houseTotal,
                    planYears, loanFlag, loanType,
                    loanClass, investMoney, firstPayments,
                    accumulationFundLoan, businessLoan
                } = this;
                houseTotal = houseTotal * 10000;
                investMoney = this.R;
                businessLoan = businessLoan * 10000;
                accumulationFundLoan = accumulationFundLoan * 10000;
                let year = this.year;
                $api.postNode('/house/createHousing', {
                    cityName, houseTotal,
                    planYears, loanFlag, loanType,
                    loanClass, investMoney, firstPayments,
                    accumulationFundLoan, businessLoan
                }).then(data => {
                    if (data.code == 200) {
                        window.sessionStorage.setItem('houseData', JSON.stringify(this.$data))
                        this.$router.push({
                            path: '/house-three',
                            query: {
                                payments: firstPayments,
                                year
                            }
                        })
                    }

                });
            }
        },
        destroyed(){

        }
    }
</script>
