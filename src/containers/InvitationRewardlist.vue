<template>
    <div flex="dir:top" flex-box="1" class="InvitationRewardlist">
        <div class="header" flex-box="0">
            <div class="title">
                <p class="right">奖励细则</p>
            </div>
            <ul flex="main:right">
                <li flex-box="1">
                    <p class='info'>{{unpaid}}元</p>
                    <p class='tile'>待结算（税前）</p>
                </li>
                <li flex-box="1">
                    <p class='info'>{{paid}}元</p>
                    <p class='tile'>已结算（税后）</p>
                </li> 
            </ul>
        </div>
        <div class="item-list" v-for="(item,index) in rewardList">
            <div flex="dir:left" class="item">
                <div class="left" flex-box="1">
                        <p class='info'>{{rewardList.rewardAmount}}元</p>
                        <p class='tile'>奖励</p>
                </div>
                <div class="right" flex-box="2">
                        <ul>
                            <li flex>
                                 <div flex-box="0">客户：</div>
                                 <div flex-box="0">{{rewardList.userMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</div>
                            </li>
                            <li flex>
                                 <div flex-box="0">投资金额：</div>
                                 <div flex-box="0">{{rewardList.investAmount}}</div>
                            </li>
                            <li flex>
                                 <div flex-box="0">奖励比例：</div>
                                 <div flex-box="0" class="width">{{rewardList.rewardFactor}}%</div>
                            </li>
                            <li flex class="last">
                                 <div flex-box="0">投资时间：</div>
                                 <div flex-box="0">2014-03-22 18:00:00</div>
                                 <!-- 时间要采取倒叙，-->
                            </li>
                        </ul>
                        <span class="icon" :class='item.rewardStatus == 2 ? "finish" : "cancel"'>
                            <i></i>
                        </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/invitation-reward-list.less';
    import $api from '../tools/api';
    export default {
        name: 'invitation-reward-list',
        data(){
            return{
                unpaid:'',
                paid:'',
                rewardList:[]
            }
        },
        created(){
           

                } 

        }
    
</script>
