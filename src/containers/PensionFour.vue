<template>
    <div class="pension-four" flex="dir:top">
        <div class="title" flex-box="0">
            以下数据仅适用于您的所在城市【<span @click.stop="pickHandle">{{this.cityName}}</span>】
        </div>
        <ul class="content" flex-box="1">
            <li class="item" flex="box:mean">
                <p>性别</p>
                <div class="gender" flex="box:mean " >
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
                    <input type="number" maxlength="2" flex-box="1" v-model="age" required><span flex-box="0">岁</span>
                </p>
            </li>
            <li class="item" flex="box:mean">
                <p class="info">期望退休年龄</p>
                <p flex>
                    <input type="number" maxlength="2" flex-box="1" v-model="retirementAge" required><span flex-box="0">岁</span>
                </p>
            </li>
            <li class="item" flex="box:mean">
                <p class="info">预计寿命</p>
                <p flex>
                    <input type="number" maxlength="3" flex-box="1" v-model="planAge" required><span flex-box="0">岁</span>
                </p>
            </li>
            <li class="item" flex="box:mean">
                <p class="info">税后月工资</p>
                <p flex>
                    <input type="number" maxlength="6" flex-box="1" v-model="wagesAfterTax" required><span flex-box="0">元</span>
                </p>
            </li>
            <li class="item" flex="box:mean">
                <p class="info">通货膨胀率</p>
                <p flex>
                    <input type="number" flex-box="1" v-model="inflation" required><span flex-box="0">%</span>
                </p>
            </li>
        </ul>
        <div class="round" flex-box="0">
            <div class="bg">
                <div class="tip">为满足您退休后保持现有收入水平,<br/>养老金至少需要储备</div>
                <div class="total">{{this.pensionStore}}元</div>
                <div class="tip2">（*已除去社保养老金可覆盖部分）</div>
            </div>
        </div>
        <div class="footer" flex-box="0" :class="{enable:this.clickable}" @click.stop="nextHandle">查看推荐方案</div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import "../less/pension-four.less"
    import citys from '../tools/citys'
    import {Toast} from 'mint-ui'
    import {currencyFormatInterger} from '../filters/index'
    import {getValueD,getValueE,getValueG} from "../tools/city-grade"
    export default{
        data(){
            return {
                cityName:'',
                age:'',
                gender:window.sessionStorage.getItem('gender')||2,
                planAge:'85',
                clickable:'false',
                inflation:''
            }
        },
        computed:{
            pensionStore(){
                let A = this.age;
                let B = this.retirementAge;
                let C = this.planAge;
                let D = this.wagesAfterTax;
                let E = getValueE(this.cityName);//当地月平均养老金
                let F =E/D;
                let G=this.inflation/100;/*通货膨胀率*/
                let N = Math.pow((1+G),(B-A))*D*(1-F);
                let L =  12*N*(1+G)*(-1+Math.pow((1+G),(C-B)))/G;
                let pension  = Math.floor(L);
                console.log(B,C)
                return currencyFormatInterger(pension)
            }
        },
        created(){
            window.sessionStorage.setItem('gender',1)
            window.sessionStorage.setItem('age',23)
        /*    citys.map((city)=>{
                this.slots[0].values.push(city.name)
            });*/
            this.cityName = window.sessionStorage.getItem('cityName')||'北京';
            /*this.gender = window.sessionStorage.getItem('gender')||2;*/
            this.age = window.sessionStorage.getItem('age')||30;
            this.wagesAfterTax = window.sessionStorage.getItem('wagesAfterTax')||getValueD(this.cityName);
            this.retirementAge = this.gender == 1?'55':'60';
            this.inflation = getValueG(this.cityName);//通货膨胀率
        },
        mounted(){
        },
        methods:{
            genderHandle(num){
                this.gender = num;
                this.retirementAge = this.gender == 1?'55':'60'
            },
            pickHandle(){

            },
            nextHandle(){
                console.log(this.age,'sss')
                if(this.age >= this.retirementAge){
                    Toast('年龄不能大于或等于预计退休年龄')
                }else if(this.planAge<=this.age||this.planAge<=this.retirementAge){
                    Toast('预计寿命不能小于或等于年龄且不能小于或等于期望退休年龄')
                }
            }
        }
    }
</script>
