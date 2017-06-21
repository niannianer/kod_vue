<template>
    <div v-cloak class="pension-five" flex-box="1" flex="dir:top">
        <div class="wrapp" flex-box="1">
            <div class="header">
                <div class="main">
                    <div class="tabs" flex-box="0" flex>
                        <div flex-box="1" class="tab" @click.stop="changeTab(1)" :class="{'active':tab==1}">
                            <div class="tab-item">方案A</div>
                        </div>
                        <div flex-box="1" class="tab" @click.stop="changeTab(2)" :class="{'active':tab==2}">
                            <div class="tab-item" >方案B</div>

                        </div>
                        <div flex-box="1" class="tab" @click.stop="changeTab(3)" :class="{'active':tab==3}">
                            <div class="tab-item">方案C</div>
                        </div>
                    </div>
                    <div class="content">
                        <p class="h-title">预期组合年化收益率</p>
                        <p class="pate">{{k | translatePate}}</p>
                        <div class="cont-div">首次投资：<i>{{q | currencyInputNo}}元</i></div>
                        <div class="cont-div">单个产品每期续投：<i>{{z | currencyInputNo}}元</i></div>
                    </div>
                </div>
                <div class="box-shadows"></div>
            </div>
            <div class="lists">
                <h6 class="title">配置详情</h6>
                <ul class="items-ul" v-show="tab== 1">
                    <li>
                        <div flex class="item-div">
                            <div class="div-left color ellipsis">{{lists.a.productName}}</div>
                            <div class="div-right">推荐配比{{s1 | translatePateInt}}</div>
                        </div>
                        <div flex class="item-div item-bott">
                            <div class="div-left">产品期限<i>{{lists.a.productPeriod}}</i></div>
                            <div class="div-right">预期年化收益率：<i>{{lists.a.annualInterestRate}}</i></div>
                        </div>
                        <p class="link"><span @click="link(lists.a.productUuid)">查看详情</span></p>
                    </li>
                    <li v-for="(item,index) in data.b" :key="index" v-if="index==0">
                        <div flex class="item-div">
                            <div class="div-left color ellipsis">{{lists.b.productName}}</div>
                            <div class="div-right">推荐配比{{s2 | translatePateInt}}</div>
                        </div>
                        <div flex class="item-div item-bott">
                            <div class="div-left">产品期限<i>{{lists.b.productPeriod}}</i></div>
                            <div class="div-right">预期年化收益率：<i>{{lists.b.annualInterestRate}}</i></div>
                        </div>
                        <p class="link"><span @click="link(lists.b.productUuid)">查看详情</span></p>
                    </li>
                </ul>
                <ul class="items-ul" v-show="tab== 2">
                    <li>
                        <div flex class="item-div">
                            <div class="div-left color ellipsis">{{lists.b.productName}}</div>
                            <div class="div-right">推荐配比{{s1 | translatePateInt}}</div>
                        </div>
                        <div flex class="item-div item-bott">
                            <div class="div-left">产品期限<i>{{lists.b.productPeriod}}</i></div>
                            <div class="div-right">预期年化收益率：<i>{{lists.b.annualInterestRate}}</i></div>
                        </div>
                        <p class="link"><span @click="link(lists.b.productUuid)">查看详情</span></p>
                    </li>
                    <li v-for="(item,index) in data.c" :key="index" v-if="index==0">
                        <div flex class="item-div">
                            <div class="div-left color ellipsis">{{lists.c.productName}}</div>
                            <div class="div-right">推荐配比{{s2 | translatePateInt}}</div>
                        </div>
                        <div flex class="item-div item-bott">
                            <div class="div-left">产品期限<i>{{lists.c.productPeriod}}</i></div>
                            <div class="div-right">预期年化收益率：<i>{{lists.c.annualInterestRate}}</i></div>
                        </div>
                        <p class="link"><span @click="link(lists.c.productUuid)">查看详情</span></p>
                    </li>
                </ul>
                <ul class="items-ul" v-show="tab== 3">
                    <li>
                        <div flex class="item-div">
                            <div class="div-left color ellipsis">{{lists.a.productName}}</div>
                            <div class="div-right">推荐配比{{s1 | translatePateInt}}</div>
                        </div>
                        <div flex class="item-div item-bott" >
                            <div class="div-left">产品期限<i>{{lists.a.productPeriod}}</i></div>
                            <div class="div-right">预期年化收益率：<i>{{lists.a.annualInterestRate}}</i></div>
                        </div>
                        <p class="link"><span @click="link(lists.a.productUuid)">查看详情</span></p>
                    </li>
                    <li v-for="(item,index) in data.c" :key="index" v-if="index==0">
                        <div flex class="item-div">
                            <div class="div-left color">{{lists.c.productName}}</div>
                            <div class="div-right">推荐配比{{s2 | translatePateInt}}</div>
                        </div>
                        <div flex class="item-div item-bott">
                            <div class="div-left">产品期限<i>{{lists.c.productPeriod}}</i></div>
                            <div class="div-right">预期年化收益率：<i>{{lists.c.annualInterestRate}}</i></div>
                        </div>
                        <p class="link"><span @click="link(lists.c.productUuid)">查看详情</span></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="button" flex-box="0">
            <button @click="back">返回修改</button>
        </div>
    </div>
</template>
<script>
    import '../less/pension-five.less';
    import $api from '../tools/api';
    import {Toast,MessageBox} from 'mint-ui';
    import {getValueE} from "../tools/city-grade"
    export default {
        name: 'pension-five',
        components:{},
        data(){
            return {
                k:0,//预期组合年化收益率
                tab:1,
                pageSize:80,
                length:0,
                productType:'FIXI',
                data:{
                    'a':[],
                    'b':[],
                    'c':[],
                    'd':[]
                },
                lists:{
                    a:{},
                    b:{},
                    c:{}
                },
                isLast:{
                    a:false,
                    b:false,
                    c:false
                },
                productUuid:'',
                isBack:false
            };
        },
        computed: {//养老金覆盖比例
            a:function(){//实际年龄
                return this.pension.age
            },
            b:function(){//退休年龄
                return this.pension.retirementAge
            },
            c:function(){//预计寿命
                return this.pension.planAge
            },
            d:function(){//税后月工资
                return this.pension.wagesAfterTax
            },
            e:function(){//月平均养老金
                return getValueE(this.pension.cityName)
            },
            g:function(){//当地通货膨胀率
                return this.pension.inflation/100
            },
            f:function(){
                return this.e/this.d
            },
            n:function(){
                return parseInt(this.d*(1-this.f)*Math.pow(1+this.g,(this.b-this.a))*100)/100
            },
            l:function(){//预计养老金
                return parseInt(12*this.n*(1+this.g)*[-1+Math.pow(1+this.g,this.c-this.b)]/this.g*100)/100
            },
            m1:function(){
                if(this.tab == 1){
                    if(this.isLast.a){
                        return 12
                    }
                    return 1
                }else if(this.tab == 2){
                    if(this.isLast.b){
                        return 12
                    }
                    return 3
                }else if(this.tab == 3){
                    if(this.isLast.a){
                        return 12
                    }
                    return 1
                }
            },
            m2:function(){
                if(this.tab == 1){
                    if(this.isLast.b){
                        return 12
                    }
                    return 3
                }else if(this.tab == 2){
                    if(this.isLast.c){
                        return 12
                    }
                    return 6
                }else if(this.tab == 3){
                    if(this.isLast.c){
                        return 12
                    }
                    return 6
                }
            },
            s1:function(){
                let s = this.setT(this.m1)/(this.setT(this.m1)+this.setT(this.m2));
                s = s.toFixed(2);
                return s
            },
            s2:function(){
                let s = this.setT(this.m2)/(this.setT(this.m1)+this.setT(this.m2));
                s = s.toFixed(2);
                return s
            },
            factor:function(){//X1[T1/X1+T1(T1+1)/2]+X2[T2/X2+T2(T2+1)/2]
                return this.setX(this.m1)*(this.setT(this.m1)/this.setX(this.m1)+this.setT(this.m1)*(this.setT(this.m1)+1)/2)+this.setX(this.m2)*(this.setT(this.m2)/this.setX(this.m2)+this.setT(this.m2)*(this.setT(this.m2)+1)/2)
            },
            r:function(){//每期需投数
                return this.l/this.factor
            },
            z:function(){//每期投资
                let parm,rmb;
                if(this.tab == 1){
                    parm = 4;
                }else if(this.tab == 2){
                    parm = 8;
                }else if(this.tab == 3){
                    parm = 10;
                }
                rmb = (this.l-parm*this.r*(1+(this.b-this.a)*this.k))/this.factor;
                rmb < 0 ? rmb = 0 : '';
                return parseInt(rmb)
            },
            q:function(){//首投
                let parm,rmb;
                if(this.tab == 1){
                    parm = 4;
                }else if(this.tab == 2){
                    parm = 8;
                }else if(this.tab == 3){
                    parm = 10;
                }
                rmb = parm*this.r+2*this.z*2;
                rmb < 0 ? rmb = 0 : '';
                if(rmb >= 10000){
                    rmb = parseInt(rmb/1000)*1000;
                }else if(rmb >= 1000){
                    rmb = parseInt(rmb/100)*100;
                }else if(rmb >= 100){
                    rmb = parseInt(rmb/10)*10;
                }else{
                    rmb = parseInt(rmb);
                }
                return rmb
            },
            pension:function(){
                return JSON.parse(window.sessionStorage.getItem('pension'))
            }
        },
        methods: {
            setX(m){
                return this.k*m/12
            },
            setT(m){
                return parseInt(12/m*this.b-this.a)
            },
            changeTab(tab){
                this.tab = tab;
                this.calculate()
            },
            get(){
                $api.get('/product/getList',{startRow:this.length,pageSize:this.pageSize,productType:'FIXI'}).then(msg => {
                    if(msg.code == 200){
                        msg.data.productList.map(el => {
                            if(el.productPeriod == '30天'){
                                this.data.a.push(el)
                                //test delet
                                this.data.d.push(el)
                            }else if(el.productPeriod == '90天'){
                                this.data.b.push(el)
                            }else if(el.roductPeriod == '180天'){
                                this.data.c.push(el)
                            }else if(el.roductPeriod == '360天'){
                                this.data.d.push(el)
                            }
                        });
                        this.length += msg.data.productList.length;
                        if(this.length < msg.data.productCount){
                            this.get();
                        }else{
                            if(this.data.a.length < 1){
                                this.data.a = this.data.d;
                                this.isLast.a = true;
                            }
                            if(this.data.b.length < 1){
                                this.data.b = this.data.d;
                                this.isLast.b = true;
                            }
                            if(this.data.c.length < 1){
                                this.data.c = this.data.d;
                                this.isLast.c = true;
                            }
                            this.lists.a = this.data.a[0];
                            this.lists.b = this.data.b[0];
                            this.lists.c = this.data.c[0];
                            this.calculate();
                        }
                    }else{
                        Toast(msg.msg);
                    }
                });
            },
            calculate(){
                let x,y,z,o;
                if(this.tab == 1){
                    //A方案
                    x = this.lists.a.annualInterestRate;
                    y = this.lists.b.annualInterestRate;
                    z = this.accMul(this.fun(x),this.s1) + this.accMul(this.fun(y),this.s2);
                    this.k = z;
                }else if(this.tab == 2){
                    //B方案
                    x = this.lists.b.annualInterestRate;
                    y = this.lists.c.annualInterestRate;
                    z = this.accMul(this.fun(x),this.s1) + this.accMul(this.fun(y),this.s2);
                    this.k = z;
                }else if(this.tab == 3){
                    //C方案
                    x = this.lists.a.annualInterestRate;
                    y = this.lists.c.annualInterestRate;
                    z = this.accMul(this.fun(x),this.s1) + this.accMul(this.fun(y),this.s2);
                    this.k = z;
                }
            },
            fun(a){
                let x = Number(a.replace("%",""))/100;
                return x;
            },
            //乘法
            accMul(arg1,arg2){
                let m=0,s1=arg1.toString(),s2=arg2.toString();
                if(s1.split(".")[1]){
                    m+=s1.split(".")[1].length;
                }
                if(s2.split(".")[1]){
                    m+=s2.split(".")[1].length;
                }
                return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
            },
            link(productUuid){
                if(this.productType == 'PRIF'){
                    window.location.href='/goodsDetailPRIF.html?u='+productUuid+'&t='+this.productType;
                }else{
                    window.location.href='/goodsDetail.html?u='+productUuid+'&t='+this.productType;
                }
            },
            back(){
                this.isBack = true;
                this.$router.go(-1)
            }
        },
        created(){
            this.get();
        },
        beforeRouteLeave (to, from, next){
            if(this.isBack){
                next(()=>{
                    this.$router.go(-1)
                })
            }else{
                MessageBox.confirm('退出理财规划将不会保存，确认退出？').then(action => {
                    next(()=>{
                        this.$router.push('/pension-four');
                    })
                },cancel =>{

                })
                next(false)
            }
        }
    }
</script>
