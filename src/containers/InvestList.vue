<template>
    <div v-cloak class="invest-list" id="invest-list" flex-box="1" flex="dir:top">
        <div class="tabs" flex flex-box="0">
            <div flex-box="1" class="tab" :class="{'active':status==1}" @click.stop="changeTab(1)">
                <div class="tab-item">进行中（{{underway.investmentCount}}）</div>
            </div>
            <div flex-box="1" class="tab" :class="{'active':status==2}" @click.stop="changeTab(2)">
                <div class="tab-item">已结束（{{finished.investmentCount}}）</div>

            </div>
        </div>
        <div class="item-list" v-show="status == 1" flex-box="1">
            <mt-loadmore :top-method="loadTopLeft" :bottom-method="loadBottomLeft" :bottom-all-loaded="allLoadedLeft" ref="loadmoreLeft" :auto-fill="autoFill">
                <div class="item" v-for="(item,index) in underway.investmentList"
                    @click.stop="link(1,item.orderBillCode)" :key="index">
                    <ul class="item-ul">
                        <li flex>
                            <div>产品名称：</div>
                            <div class="width">{{item.productAbbrName}}</div>
                        </li>
                        <li flex>
                            <div>购买金额：</div>
                            <div>{{item.orderAmount}}元</div>
                        </li>
                        <li flex>
                            <div>预期年化收益率：</div>
                            <div>{{item.productAnnualInterestRate}}</div>
                        </li>
                        <li flex>
                            <div>到期日：</div>
                            <div>{{item.productExpiringDate}}</div>
                        </li>
                        <li flex>
                            <div>购买时间：</div>
                            <div>{{item.payedTime}}</div>
                        </li>
                    </ul>
                    <div class="icon"></div>
                </div>
            </mt-loadmore>
        </div>
        <div class="item-list" v-show="status == 2" flex-box="1">
            <mt-loadmore :top-method="loadTopRight" :bottom-method="loadBottomRight" :bottom-all-loaded="allLoadedRight" ref="loadmoreRight" :auto-fill="autoFill">
                <div class="item" v-for="(item,index) in finished.investmentList" 
                    @click.stop="link(2,item.orderBillCode)" :key="index">
                    <ul class="item-ul">
                        <li flex>
                            <div>产品名称：</div>
                            <div class="width">{{item.productAbbrName}}</div>
                        </li>
                        <li flex>
                            <div>购买金额：</div>
                            <div>{{item.orderAmount}}元</div>
                        </li>
                        <li flex>
                            <div>预期年化收益率：</div>
                            <div>{{item.productAnnualInterestRate}}</div>
                        </li>
                        <li flex>
                            <div>到期日：</div>
                            <div>{{item.productExpiringDate}}</div>
                        </li>
                        <li flex>
                            <div>购买时间：</div>
                            <div>{{item.payedTime}}</div>
                        </li>
                    </ul>
                    <div class="icon"></div>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
    import '../less/invest-list.less';
    import Vue from 'vue';
    import $api from '../tools/api';
    import {Loadmore } from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    export default {
        name: 'invest-list',
        data(){
            return {
                status: 1,
                underway:{
                    investmentCount:0,
                    investmentList:[]
                },
                finished:{
                    investmentCount:0,
                    investmentList:[]
                },
                autoFill:false,
                allLoadedLeft:false,
                allLoadedRight:false,
                startRowLeft:0,
                startRowRight:0,
                pageSize:20,
                isRefreshing:false,
            }
        },
        methods: {
            link(status,orderBillCode){
                if(this.isRefreshing){
                    return false;
                }
                this.$router.push('/invest-detail?status='+status+'&orderBillCode='+orderBillCode);
            },
            changeTab(status){
                this.status = status;
            },
            get(status,startRow,type){
               return $api.get('/investment/list',{status:status,startRow:startRow,pageSize:this.pageSize}).then(msg => {
                    if(msg.code == 200){
                        if(status == 1){
                            this.underway.investmentCount = msg.data.investmentCount;
                            if(type=='top'){
                                this.underway.investmentList = msg.data.investmentList;
                            }else{
                                msg.data.investmentList.map(el => {
                                    this.underway.investmentList.push(el);
                                });
                            }
                        }else if(status == 2){
                            this.finished.investmentCount = msg.data.investmentCount;
                            if(type=='top'){
                                this.finished.investmentList = msg.data.investmentList;
                            }else{
                                msg.data.investmentList.map(el => {
                                    this.finished.investmentList.push(el);
                                });
                            }
                        }
                    }
                });
            },
            lock(){
                this.isRefreshing = true;
                setTimeout(()=>{
                    this.isRefreshing =false;
                },2000);
            },
            loadTopLeft(){
                this.lock();
                this.get(0,0,'top').then(()=>{
                    this.$refs.loadmoreLeft.onTopLoaded();
                });
                this.allLoadedLeft = false;
            },
            loadBottomLeft(){
                this.lock();
                if(this.underway.investmentList.length >= this.underway.investmentCount){
                    this.allLoadedLeft = true;
                    this.$refs.loadmoreLeft.onBottomLoaded();
                }else{
                    this.startRowLeft += this.pageSize;
                    this.get(1,this.startRowLeft,'bottom').then(()=>{
                        this.$refs.loadmoreLeft.onBottomLoaded();
                    });
                }
            },
            loadTopRight(){
                this.lock();
                this.get(0,0,'top').then(()=>{
                    this.$refs.loadmoreRight.onTopLoaded();
                });
                this.allLoadedLeft = false;
            },
            loadBottomRight(){
                this.lock();
                if(this.finished.investmentList.length >= this.finished.investmentCount){
                    this.allLoadedRight = true;
                    this.$refs.loadmoreRight.onBottomLoaded();
                }else{
                    this.startRowRight += this.pageSize;
                    this.get(2,this.startRowRight,'bottom').then(()=>{
                        this.$refs.loadmoreRight.onBottomLoaded();
                    });
                }
            }
        },
        mounted(){
            this.get(1,this.startRowLeft,'top');
            this.get(2,this.startRowRight,'top');
        }
    }
</script>
