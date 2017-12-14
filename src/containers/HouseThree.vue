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
                        <p class="pate">{{u | translatePate}}</p>
                        <div class="cont-div">首次投资：<i>{{q | currencyInputNo}}元</i></div>
                        <div class="cont-div">单个产品每期续投：<i>{{z | currencyInputNo}}元</i></div>
                    </div>
                </div>
                <div class="box-shadows"></div>
            </div>
            <div class="lists">
                <h6 class="title">配置详情</h6>
                <ul class="items-ul" v-show="tab== 1">
                    <li v-if="JSON.stringify(lists.a) != '{}'">
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
                    <li v-if="JSON.stringify(lists.b) != '{}'">
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
                    <li v-if="JSON.stringify(lists.b) != '{}'">
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
                    <li v-if="JSON.stringify(lists.c) != '{}'">
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
                    <li v-if="JSON.stringify(lists.a) != '{}'">
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
                    <li v-if="JSON.stringify(lists.c) != '{}'">
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
    import $device from '../tools/device';
    import wx from '../tools/wx';
    import requestHybrid from '../tools/hybrid';
    import {Toast} from 'mint-ui';
    export default {
        name: 'pension-five',
        components:{},
        data(){
            return {
                u:0,//预期组合年化收益率
                k1:0,
                k2:0,
                a:this.$route.query.payments,//房产总价
                m:this.$route.query.year,//预计几年后买房
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
                productUuid:''
            };
        },
        computed: {//养老金覆盖比例
            m1:function(){//方案1 的产品几个月
                if(this.tab == 1){
                    if(JSON.stringify(this.lists.a) == '{}'){
                        return 0;
                    }
                    if(this.isLast.a){
                        return 12
                    }
                    return 1
                }else if(this.tab == 2){
                    if(JSON.stringify(this.lists.b) == '{}'){
                        return 0;
                    }
                    if(this.isLast.b){
                        return 12
                    }
                    return 3
                }else if(this.tab == 3){
                    if(JSON.stringify(this.lists.a) == '{}'){
                        return 0;
                    }
                    if(this.isLast.a){
                        return 12
                    }
                    return 1
                }
            },
            m2:function(){//方案2 的产品几个月
                if(this.tab == 1){
                    if(JSON.stringify(this.lists.b) == '{}'){
                        return 0;
                    }
                    if(this.isLast.b){
                        return 12
                    }
                    return 3
                }else if(this.tab == 2){
                    if(JSON.stringify(this.lists.c) == '{}'){
                        return 0;
                    }
                    if(this.isLast.c){
                        return 12
                    }
                    return 6
                }else if(this.tab == 3){
                    if(JSON.stringify(this.lists.c) == '{}'){
                        return 0;
                    }
                    if(this.isLast.c){
                        return 12
                    }
                    return 6
                }
            },
            s1:function(){//产品1所占比例
                let s = this.setT(this.m1)/(this.setT(this.m1)+this.setT(this.m2));
                s = s.toFixed(2);
                return s
            },
            s2:function(){//产品2所占比例
                let s = this.setT(this.m2)/(this.setT(this.m1)+this.setT(this.m2));
                s = s.toFixed(2);
                return s
            },
            factor:function(){//X1[T1/X1+T1(T1+1)/2]+X2[T2/X2+T2(T2+1)/2]
                let fa1 = this.setX(this.m1,this.k1)*(this.setT(this.m1)/this.setX(this.m1,this.k1)+this.setT(this.m1)*(this.setT(this.m1)+1)/2),
                    fa2 = this.setX(this.m2,this.k2)*(this.setT(this.m2)/this.setX(this.m2,this.k2)+this.setT(this.m2)*(this.setT(this.m2)+1)/2);
                if(this.m1 == 0){
                    return fa2;
                }else if(this.m2 == 0){
                    return fa1;
                }else if((this.m2 == 0) && (this.m1 == 0)){
                    return 0
                }
                return (fa1 + fa2)
                //return this.setX(this.m1,this.k1)*(this.setT(this.m1)/this.setX(this.m1,this.k1)+this.setT(this.m1)*(this.setT(this.m1)+1)/2)+this.setX(this.m2,this.k2)*(this.setT(this.m2)/this.setX(this.m2,this.k2)+this.setT(this.m2)*(this.setT(this.m2)+1)/2)
            },
            r:function(){//每期需投数
                return this.a/this.factor
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
                rmb = (this.a-parm*this.r*(1+this.m*this.u))/this.factor;
                rmb < 0 ? rmb = 0 : '';
                return parseInt(rmb)
            },
            q:function(){//首投
                let rmb;
                if(this.tab == 1){
                    rmb = 4*this.r+2*this.z;
                }else if(this.tab == 2){
                    rmb = 8*this.r+this.z;
                }else if(this.tab == 3){
                    rmb = 10*this.r+this.z;
                }
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
            }
        },
        methods: {
            getShare(){
                wx.getShare({
                    title:'快看我的购房规划，原来梦想触手可及！',
                    desc:'金疙瘩智能定制理财规划，让人生目标近在眼前，你也来试试？'
                });
            },
            setX(m,k){
                return k*m/12
            },
            setT(m){
                if(m == 0){
                    return 0
                }
                return parseInt(12/m*this.m)
            },
            changeTab(tab){
                this.tab = tab;
                this.calculate()
            },
            get(){
                let period ;
                $api.get('/product/getList',{startRow:this.length,pageSize:this.pageSize,productType:'FIXI'}).then(msg => {
                    if(msg.code == 200){
                        msg.data.productList.map(el => {
                            period = parseInt(el.productPeriod);
                            if(period <= 31){
                                this.data.a.push(el)
                            }else if(period <= 93){
                                this.data.b.push(el)
                            }else if(period <= 186){
                                this.data.c.push(el)
                            }else if((period <= 366) && (period > 276)){
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
                            this.lists.a = this.data.a[0] || {};
                            this.lists.b = this.data.b[0] || {};
                            this.lists.c = this.data.c[0] || {};
                            this.calculate();
                        }
                    }else{
                        Toast(msg.msg);
                    }
                });
            },
            calculate(){
                let x,y,z;
                if(this.tab == 1){
                    //A方案
                    this.k1 = x = this.fun(this.lists.a.annualInterestRate);
                    this.k2 = y = this.fun(this.lists.b.annualInterestRate);
                    z = this.accMul(x,this.s1) + this.accMul(y,this.s2);
                    this.u = z;
                }else if(this.tab == 2){
                    //B方案
                    this.k1 = x = this.fun(this.lists.b.annualInterestRate);
                    this.k2 = y = this.fun(this.lists.c.annualInterestRate);
                    z = this.accMul(x,this.s1) + this.accMul(y,this.s2);
                    this.u = z;
                }else if(this.tab == 3){
                    //C方案
                    this.k1 = x = this.fun(this.lists.a.annualInterestRate);
                    this.k2 = y = this.fun(this.lists.c.annualInterestRate);
                    z = this.accMul(x,this.s1) + this.accMul(y,this.s2);
                    this.u = z;
                }
            },
            fun(a){
                let x = 0
                if(a){
                    x = Number(eval(a.replace(/%/g,"")))/100;
                }
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
                if (this.productType == 'PRIF') {
                    if ($device.kingold) {
                        requestHybrid({
                            tagname: 'forward',
                            param: {
                                target: 'productPRIF',
                                targetUrl: (window.location.origin + '/goods-detail-prif?productUuid=' + productUuid),
                                aid: 0,
                                astr: productUuid,
                                extra: 'PRIF'
                            }
                        });
                        return;
                    }
                    this.$router.push({
                        path: '/goods-detail-prif',
                        query: {
                            productUuid
                        }
                    });
                } else {
                    if ($device.kingold) {
                        requestHybrid({
                            tagname: 'forward',
                            param: {
                                target: 'productFIXI',
                                targetUrl: (window.location.origin + '/fixi-goods-detail?productUuid=' + productUuid),
                                aid: 0,
                                astr: productUuid,
                                extra: 'FIXI'
                            }
                        });
                        return;
                    }
                    this.$router.push({
                        path: '/fixi-goods-detail',
                        query: {
                            productUuid
                        }
                    });

                }
            },
            back(){
                this.$router.go(-1)
            }
        },
        created(){
            if ($device.isWeixin) {
                this.getShare();
            }
            this.addHive(1, 'house-three');
            this.get();
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
        }
    }
</script>
