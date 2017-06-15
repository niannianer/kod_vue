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
                     @click.stop="refresh" :key="index">
                    <div>
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
                   <!-- <router-link :to="{path:'/invest-detail',query:{orderBillCode:item.orderBillCode,status:1}}">

                    </router-link>-->
                </div>
            </mt-loadmore>
        </div>
        <div class="item-list" v-show="status == 2" flex-box="1">
            <mt-loadmore :top-method="loadTopRight" :bottom-method="loadBottomRight" :bottom-all-loaded="allLoadedRight" ref="loadmoreRight" :auto-fill="autoFill">
                <div class="item" v-for="(item,index) in finished.investmentList" :key="index">
                    <router-link :to="{path:'/invest-detail',query:{orderBillCode:item.orderBillCode,status:2}}">
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
                    </router-link>
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
            refresh(){
                if(this.isRefreshing){
                    return false;
                }
                console.log('refresh');
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
                                if(this.underway.investmentList.length >= this.underway.investmentCount){
                                    //加载完毕
                                    this.allLoadedLeft = true;
                                }
                            }
                        }else if(status == 2){
                            this.finished.investmentCount = msg.data.investmentCount;
                            if(type=='top'){
                                this.finished.investmentList = msg.data.investmentList;
                            }else{
                                console.log(msg.data.investmentList)
                                msg.data.investmentList.map(el => {
                                    this.finished.investmentList.push(el);
                                    console.log(this.finished.investmentList.length)
                                });
                                if(this.finished.investmentList.length >= this.finished.investmentCount){
                                    //加载完毕
                                    this.allLoadedRight = true;
                                }
                            }
                        }
                    }
                });
            },
            lock(){
                this.isRefreshing=true;
                setTimeout(()=>{
                    this.isRefreshing =false;
                },2000);
            },
            loadTopLeft(){
                this.lock();
                this.get(0,0,'top').then(()=>{
                    this.$refs.loadmoreLeft.onTopLoaded();
                });
                this.$refs.loadmoreLeft.onTopLoaded();
                this.allLoadedLeft = false;
            },
            loadBottomLeft(){
                this.lock();
                this.startRowLeft += 20;
                let startRow = this.startRowLeft;
                this.get(1,startRow,'bottom');
                this.$refs.loadmoreLeft.onBottomLoaded();
            },
            loadTopRight(){
                this.lock();
                this.get(0,0,'top');
                this.$refs.loadmoreRight.onTopLoaded();
                this.allLoadedLeft = false;
            },
            loadBottomRight(){
                this.lock();
                this.startRowRight += 20;
                let startRow = this.startRowRight;
                this.get(2,startRow,'bottom');
                this.$refs.loadmoreRight.onBottomLoaded();
            }
        },
        mounted(){
            this.get(1,this.startRowLeft,'top');
            this.get(2,this.startRowRight,'top');
        }
    }
</script>
