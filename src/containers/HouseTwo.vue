<template>
    <div class="house-two" flex="dir:top">
        <div class="main" flex-box="1">
            <div class="header">
                <div class="header-main">
                    <div>如果说婚姻是虚拟的家，那住房就是实体的家</div>
                    <div class="house-price">根据国家统计局数据，【<span @click.stop="openCitys">{{cityName}}</span>】平均房价为<span>{{cityAveragePrice}}</span>元
                    </div>
                    <div class="div-warp" flex>
                        <label flex-box="1">房产总价</label>
                        <input flex-box="0" type="tel" maxlength="5"
                               v-model.trim="cityPrice"
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
                <div class="box-shadow"></div>
            </div>
            <!--需贷款-->
            <div class="loan">
                <div class="loan-types" flex="main:center">
                    <div flex-box="1" class="type active">等额本息</div>
                    <div flex-box="1" class="type">等额本金</div>
                </div>
                <div class="pay" flex="main:center">
                    <div flex-box="1" class="first-pay">
                        <div>首付金额（元）</div>
                        <div class="price">100，000</div>
                    </div>
                    <div flex-box="1" class="first-pay">
                        <div>每月月供参考（元）</div>
                        <div class="price">100，000</div>
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
                            <input v-model.trim="businessLoan"/>
                        </div>
                    </div>
                    <div class="loan-item" flex="main:justify" v-if="loanClass==2">
                        <div flex-box="1">贷款金额（万）</div>
                        <div flex-box="1" class="right">
                            <input v-model.trim="accumulationFundLoan" type="tel"/>
                        </div>
                    </div>
                    <div class="loan-item" flex="main:justify" v-if="loanClass==3">
                        <div flex-box="1">商业贷款金额（万）</div>
                        <div flex-box="1" class="right">
                            <input v-model.trim="businessLoan" type="tel"/>
                        </div>
                    </div>
                    <div class="loan-item" flex="main:justify" v-if="loanClass==3">
                        <div flex-box="1">公积金贷款金额（万）</div>
                        <div flex-box="1" class="right">
                            <input v-model.trim="accumulationFundLoan" type="tel"/>
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
                             class="right arrow">{{discount}}
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
            <button class="btn-overlook" :disabled="disabled">查看推荐方案</button>
        </div>

        <kingold-picker v-if="showPicker" :default-index="0"
                        :title="title" :list="list" @back="pickerBack"></kingold-picker>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import KingoldPicker from '../components/KingoldPicker'
    import {getPrice} from '../tools/city-grade';
    import cityList from '../tools/citys';
    import '../less/house-two.less';
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
                houseTotal: '',
                planYears: 3,
                loanFlag: 0,
                loanType: 1,
                loanClass: 1,
                investMoney: '',
                firstPayments: 0,
                accumulationFundLoan: 0,
                businessLoan: 0,
                showPicker: false,
                title: '选择年限',
                loanYear: 5,
                discount: 10,
                list: []
            }
        },
        created(){

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
            citys: () => {
                return cityList;
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
                if (!this.cityPrice) {
                    return 0;
                }
                if (!this.year) {
                    return 0
                }
                let p1 = this.X1 * ((this.T1 / this.X1) + (this.T1 * (this.T1 + 1)) / 2);
                let p2 = this.X2 * ((this.T2 / this.X2) + (this.T2 * (this.T2 + 1)) / 2);
                let r = this.cityPrice * 10000 / (p1 + p2);
                return r.toFixed(0);
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
                return this.R ? false : true;
            }
        },
        methods: {
            inputKeyup(){
                if (timer) {
                    clearTimeout(timer);
                }
                let that = this;
                timer = setTimeout(() => {
                    that.cityPrice = that.cityPrice.toString();
                    that.cityPrice = that.cityPrice.replace(/\D/g, '');
                    that.cityPrice = that.cityPrice.substr(0, 5);
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
                if (flag && !this.cityPrice) {
                    Toast('请请输入房产总价');
                    return false;
                }


            }
        },
        destroyed(){

        }
    }
</script>
