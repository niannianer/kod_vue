<template>
    <div flex="dir:top" flex-box="1" class="invitation-allowance-list">
        <div class="header" flex-box="0">
            <div class="title">
                <p class="right" >说明</p>
            </div>
            <div class="tabs" flex='main:center'>
                <div flex-box="1" class="tab" :class="{'tab-active':tab==0}"  @click.stop="changeTab(0)">
                        <div class="tab-item">直接邀请津贴</div>
                </div>
                <div flex-box="1" class="tab" :class="{'tab-active':tab==1}" @click.stop="changeTab(1)">
                        <div class="tab-item">间接邀请津贴</div>
                </div>
            </div>
            <ul flex="main:center">
                <li flex-box="1">
                    <p class='info'>{{lists[tab].unpaid | currencyFormat}}元</p>
                    <p class='tile'>待结算（税前）</p>
                </li>
                <li flex-box="1">
                    <p class='info'>{{lists[tab].paid | currencyFormat}}元</p>
                    <p class='tile'>已结算（税后）</p>
                </li>
            </ul>
        </div>
        <div class="item-list"  flex-box='1'>
            <div flex="dir:left" class="item" v-for="(item,index) in lists[tab].rewardList">
                <div class="left" flex-box="1">
                        <p class='info'>{{item.rewardAmount | currencyFormat}}元</p>
                        <p class='tile'>奖励</p>
                </div>
                <div class="right" flex-box="2">
                        <ul>
                            <li flex>
                                 <div flex-box="0">理财师好友：</div>
                                 <div flex-box="0">{{item.userMobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</div>
                            </li>
                            <li flex class="last">
                                 <div flex-box="0">投资时间：</div>
                                 <div flex-box="0">{{item.createTime}}</div>
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
    import '../less/invitation-allowance-list.less';
    import $api from '../tools/api';
    import {Loadmore} from 'mint-ui';
    export default {
        name: 'invitation-allowance-list',
        data(){
            return{
                tab: 0,
                lists:{
                    0:{
                        'unpaid':'1000',
                        'paid':'100',
                        'rewardList':[
                            {
                                rewardStatus:'0',
                                rewardAmount: '100',
                                userMobile:'18510603824',
                                createTime:'2014-03-22 18:00:00'
                            },
                            {
                                rewardStatus:'1',
                                rewardAmount: '100',
                                userMobile:'18510608596',
                                createTime:'2014-03-22 18:00:00'
                            },
                            {
                                rewardStatus:'2',
                                rewardAmount: '100',
                                userMobile:'18510609632',
                                createTime:'2014-03-22 18:00:00'
                            },
                            {
                                rewardStatus:'2',
                                rewardAmount: '100',
                                userMobile:'18510608521',
                                createTime:'2014-03-22 18:00:00'
                            },
                            {
                                rewardStatus:'2',
                                rewardAmount: '100',
                                userMobile:'18510608521',
                                createTime:'2014-03-22 18:00:00'
                            },
                            {
                                rewardStatus:'0',
                                rewardAmount: '100',
                                userMobile:'18510608521',
                                createTime:'2014-03-22 18:00:00'
                            }
                        ]
                    },
                    1:{
                        'unpaid':'10',
                        'paid':'1',
                        'rewardList':[
                            {
                                rewardStatus:'0',
                                rewardAmount: '100',
                                userMobile:'18510603824',
                                createTime:'2014-03-22 18:00:00'
                            },
                            {
                                rewardStatus:'1',
                                rewardAmount: '100',
                                userMobile:'18510608596',
                                createTime:'2014-03-22 18:00:00'
                            },
                            {
                                rewardStatus:'2',
                                rewardAmount: '100',
                                userMobile:'18510609632',
                                createTime:'2014-03-22 18:00:00'
                            },
                            {
                                rewardStatus:'2',
                                rewardAmount: '100',
                                userMobile:'18510608521',
                                createTime:'2014-03-22 18:00:00'
                            }
                        ]
                    }
                }
            }
        },
        computed:{
            count(){
                return this.$store.state.count
            },
        },
        methods:{
            changeTab(tab){
                this.tab = tab
            }

        }
    }

</script>
