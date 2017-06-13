<template>
    <div flex="dir:top" flex-box="1" class="invitation-reward-list">
        <div class="header" flex-box="0">
            <div class="title">
                <p class="right" @click.stop="$router.push('/reward-detail')">奖励细则</p>
            </div>
            <ul flex="main:right">
                <li flex-box="1">
                    <p class='info'>{{sumData.unpaid | currencyFormat}}元</p>
                    <p class='tile'>待结算（税前）</p>
                </li>
                <li flex-box="1">
                    <p class='info'>{{sumData.paidWithTax | currencyFormat}}元</p>
                    <p class='tile'>已结算（税后）</p>
                </li> 
            </ul>
        </div>
        <div class="item-list"  flex-box="1">
            <mt-loadmore :top-method="loadTop" ref="loadmore">
                <div flex="dir:left" class="item" v-for="(item,index) in rewardList"  @click.stop="link(item.rewardBillCode)">
                    <div class="left" flex="dir:top main:center" >
                            <p class='info'>{{item.rewardAmount|currencyFormat}}元</p>
                            <p class='tile'>奖励</p>
                    </div>
                    <div class="right" flex-box="2">
                            <ul>
                                <li flex>
                                     <div flex-box="0">客户：</div>
                                     <div flex-box="0">{{item.userMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</div>
                                </li>
                                <li flex>
                                     <div flex-box="0">投资金额：</div>
                                     <div flex-box="0">{{item.investAmount | currencyFormat}}元</div>
                                </li>
                                <li flex>
                                     <div flex-box="0">奖励比例：</div>
                                     <div flex-box="0" class="width">{{item.rewardFactor}}</div>
                                </li>
                                <li flex class="last">
                                     <div flex-box="0">投资时间：</div>
                                     <div flex-box="0">{{item.createTime|timeFormat}}</div>
                                </li>
                            </ul>
                            <span class="icon" :class='item.rewardStatus == 2 ? "finish" : "cancel"'>
                                <i></i>
                            </span>
                    </div>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import '../less/invitation-reward-list.less';
    import $api from '../tools/api';
    import {Loadmore} from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    export default {
        name: 'invitation-reward-list',
        data(){
            return{
                unpaid:'',
                paidWithTax:'',
                sumData:{},
                rewardList:[],
                allLoaded:false,
            }
        },
        created(){
           this.getRewardList(1,10);
        },
        methods:{
             loadTop(){
                const _this = this;
                this.getRewardList(1,10,function(){
                    _this.$refs.loadmore.onTopLoaded();
                });
            },
            getRewardList(pageNo,pageSize,fn){
                $api.get('/reward/list',{'rewardType':1,pageNo:pageNo|'',pageSize:pageSize|10})
                    .then(msg => {
                            console.log(msg.data);
                        if(msg.code == 200){
                            this.sumData = msg.data.sumData;
                            this.rewardList = msg.data.rewardList;
                            fn&&fn();
                        }
                        return msg 
                    })
            },
            link(rewardBillCode){
                window.location.href='/invitation-reward-detal?rewardBillCode='+rewardBillCode;
            }

        },

    }
    
</script>
