<template>
    <div class="pension-four" flex="dir:top">
        <div class="title" flex-box="0">
            以下数据仅适用于您的所在城市【<span @click.stop="pickHandle">{{this.cityName}}</span>】
            <select v-model="cityName" @change="changeCity">
                <option v-for="option in cityList" v-bind:value="option.name">
                    {{ option.name }}
                </option>
            </select>
        </div>
        <div class="scroll-enable" flex-box="1" style="overflow: auto" flex="dir:top box:justify">
            <ul class="content">
                <li class="item" flex="box:mean">
                    <p>性别</p>
                    <div class="gender" flex="box:mean">
                        <div flex="main:center cross:center" @click.stop="genderHandle(2)">
                            <i :class="{active:this.gender == 2}"><em></em></i>
                            <span>男</span>
                        </div>
                        <div flex="main:center cross:center" @click.stop="genderHandle(1)">
                            <i :class="{active:this.gender == 1}"><em></em></i>
                            <span>女</span>
                        </div>
                    </div>
                </li>
                <li class="item" flex="box:mean">
                    <p class="info">年龄</p>
                    <p flex>
                        <input type="tel" maxlength="2" flex-box="1" v-model="age" @blur.stop="validate('age')"><span
                        flex-box="0">岁</span>
                    </p>
                </li>
                <li class="item" flex="box:mean">
                    <p class="info">期望退休年龄</p>
                    <p flex>
                        <input type="tel" maxlength="2" flex-box="1" v-model="retirementAge"
                               @blur.stop="validate('retirementAge')"><span flex-box="0">岁</span>
                    </p>
                </li>
                <li class="item" flex="box:mean">
                    <p class="info">预计寿命</p>
                    <p flex>
                        <input type="tel" maxlength="3" flex-box="1" v-model="planAge" @blur.stop="validate('planAge')"><span
                        flex-box="0">岁</span>
                    </p>
                </li>
                <li class="item" flex="box:mean">
                    <p class="info">税后月工资</p>
                    <p flex>
                        <input type="tel" maxlength="6" flex-box="1" v-model="wagesAfterTax"
                               @blur.stop="validate('wagesAfterTax')"><span
                        flex-box="0">元</span>
                    </p>
                </li>
                <li class="item" flex="box:mean">
                    <p class="info">通货膨胀率</p>
                    <p flex>
                        <input type="number" flex-box="1" v-model="inflation" @blur.stop="validate('inflation')"><span
                        flex-box="0">%</span>
                    </p>
                </li>
            </ul>
            <div></div>
            <div class="btm-part" flex="dir:top">
                <div class="round" flex-box="1">
                    <div class="bg">
                        <div class="tip">为满足您退休后保持现有收入水平,<br/>养老金至少需要储备</div>
                        <div class="total">{{ pensionStore | currencyFormatInterger }}元</div>
                        <div class="tip2">（*已除去社保养老金可覆盖部分）</div>
                    </div>
                </div>
                <div class="footer" :class="{enable:clickable}" flex-box="1" @click.stop="nextHandle">查看推荐方案</div>
            </div>
        </div>
        <KingoldPicker :list="list" :title="title" @back="callback" v-if="isPicking"></KingoldPicker>
    </div>
</template>
<script>
    import Vue from 'vue';
    import _ from 'lodash/core';
    import "../less/pension-four.less";
    import {Toast} from 'mint-ui';
    import $api from '../tools/api';
    import KingoldPicker from '../components/KingoldPicker'
    import Modal from '../components/Modal'
    import {getValueD, getValueE, getValueG} from "../tools/city-grade";
    import requestHybrid from '../tools/hybrid';
    export default{
        data(){
            return {
                cityName: '',
                age: '',
                gender: 2,
                planAge: '80',
                retirementAge: '',
                wagesAfterTax: '',
                inflation: '',
                title: "请选择城市",
                isPicking: false,
                citys:[]
            }
        },
        components: {
            KingoldPicker
        },
        computed: {
            cityList(){
                return this.citys
            },
            pensionStore(){
                if (!this.clickable) {
                    return 0;
                }
                this.replaceStr();
                let A = this.age;
                let B = this.retirementAge;
                let C = this.planAge;
                let D = this.wagesAfterTax;
                let E = getValueE(this.cityName);//当地月平均养老金
                let Dfix = getValueD(this.cityName);
                let F = E / Dfix;
                let G = this.inflation / 100;
                /*通货膨胀率*/
                let N = Math.pow((1 + G), (B - A)) * D * (1 - F);
                let L = 12 * N * (1 + G) * (-1 + Math.pow((1 + G), (C - B))) / G;
                let pension = Math.floor(L);
                if (isNaN(pension) || pension <= 0) {
                    return 0;
                }
                return pension;
            },
            list(){
                return this.citys;
            },
            clickable(){
                if (!this.inflationUseful) {
                    return false;
                }
                if (!this.age || !this.retirementAge || !this.planAge || !this.wagesAfterTax || !this.inflation) {
                    return false
                }
                if (!(this.age < this.retirementAge)) {//不能等于或大于预计退休年龄
                    return false;
                }
                if (!(this.age < this.planAge)) {
                    return false;
                }
                if (!(this.retirementAge < this.planAge)) {
                    return false;
                }
                return true;
            },
            inflationUseful(){
                return /(^\d$)|(^\d\.\d$)/g.test(this.inflation);
            }
        },
        created(){
            this.cityName = window.sessionStorage.getItem('cityName') || '北京';
            this.gender = window.sessionStorage.getItem('gender') || 2;
            this.age = window.sessionStorage.getItem('age') || 30;
            this.wagesAfterTax = window.sessionStorage.getItem('wagesAfterTax') || getValueD(this.cityName);
            this.retirementAge = this.gender == 1 ? '55' : '60';
            if (window.sessionStorage.getItem('pension')) {
                let pension = window.sessionStorage.getItem('pension');
                _.forEach(JSON.parse(pension), (data, key) => {
                    this[key] = data;
                });
            }
            this.inflation = getValueG(this.cityName);//通货膨胀率
            $api.getNode('/assets/getCities')
                .then(data=>{
                    this.citys =data.data;
                });
        },
        mounted(){
            /* console.log(this.$refs.kpicker.result,'33333');*/
            requestHybrid({
                tagname: 'title',
                param: {
                    backtype: 2,// "0 : 后退 1 : 直接关闭 2: 弹对话框",
                    backAndRefresh: 1,
                    title: '养老理财规划',
                    backstr: '退出理财规划将不会保存，确认退出？',
                    keyboard_mode: 0//0 adjustresize 1 adjustpan
                }
            });
        },
        methods: {
            genderHandle(num){
                this.gender = num;
                this.retirementAge = this.gender == 1 ? '55' : '60';
                this.planAge = this.gender == 1?'85' : '80';
            },
            pickHandle(){
                this.isPicking = true;
            },
            nextHandle(){
                if (this.clickable) {
                    window.sessionStorage.setItem('pension', JSON.stringify(this.$data));
                    $api.postNode('/pension/createPension', {
                        age: this.age,
                        cityName: this.cityName,
                        gender: this.gender,
                        planAge: this.planAge,
                        retirementAge: this.retirementAge,
                        wagesAfterTax: this.wagesAfterTax,
                        inflation: this.inflation,
                        pensionStore: this.pensionStore,
                    })
                    this.$router.push('/pension-five');
                }
            },
            replaceStr(){
                this.age = (this.age + "").replace(/[^\d]/g, '');
                this.retirementAge = (this.retirementAge + "").replace(/[^\d]/g, '');
                this.planAge = (this.planAge + "").replace(/[^\d]/g, '');
                this.wagesAfterTax = (this.wagesAfterTax + "").replace(/[^\d]/g, '');
            },
            validate(str){
                this.replaceStr();
                if (str == 'age') {
                    if (this.age == '') {
                        Toast('请输入年龄');
                    } else if (!(this.age < this.retirementAge)) {
                        Toast('年龄不能大于或等于期望退休年龄')
                    } else if (parseInt(this.age) <= 0) {
                        Toast('请输入正确的年龄');
                    }
                    return false;
                }
                if (str == 'retirementAge') {
                    if (this.retirementAge == '') {
                        Toast('请输入期望退休年龄');
                    } else if (!(this.age < this.retirementAge)) {
                        Toast('年龄不能大于或等于期望退休年龄')
                    }
                    return false;
                }
                if (str == 'planAge') {
                    if (this.planAge == '') {
                        Toast('请输入预计寿命');
                    } else if (!(this.age < this.planAge)) {
                        Toast('年龄不能大于或等于预计寿命')
                    } else if (!(this.retirementAge < this.planAge)) {
                        Toast('预计寿命不能小于或等于期望退休年龄')
                    }
                    return false;
                }
                if (str == 'wagesAfterTax') {
                    if (this.wagesAfterTax == '') {
                        Toast('请输入税后月工资');
                    }
                    return false;
                }
                if (str == 'inflation') {
                    if (this.inflation == '') {
                        Toast('请输入通货膨胀率');
                    } else if (!this.inflationUseful) {
                        Toast('请输入正确的通货膨胀率');
                    }
                    return false;
                }
            },
            callback(result){
                if (result) {
                    this.cityName = result.name;
                }
                this.isPicking = false;
            },
            changeCity(){
                this.inflation = getValueG(this.cityName);//通货膨胀率
                this.wagesAfterTax =  getValueD(this.cityName);
            }
        }
    }
</script>
