<template>
    <div class="gold-index">
        <div class="header card">
            <div class="header-top" flex="main:justify">
                <div class="head-info">
                    <img :src="userCoin.headImageUrl || defaultHead" class="head-img"/>
                    {{userCoin.nickName}}
                </div>
            </div>

            <div class="gold-item" flex="main:center">
                <div class="item itemo" v-for="item,index in userCoinList" :key="index"
                     v-if="item.hasActiveGoldCoin || item.residueAmount"
                     :class="{'bt-1': (index == 0 && userCoinList.length == 2) || (index == 1 && userCoinList.length >= 3),
                     'bt-2': (index == 1 && userCoinList.length == 2) || (index == 0 && userCoinList.length == 1) || (index == 2 && userCoinList.length == 4),
                     'bt-3': index == 2 && userCoinList.length == 3}"
                    @click.stop="coinCollect(item)">
                    <!--未被收取的总数量中的可收取数量-->
                    <div flex-box="1" class="tt-msg" v-if="item.hasActiveGoldCoin && !item.isStealFreezingTime">
                        <div class="msg" :class="{'gray-msg': !canSteal}">{{item.gcUserGenerateSumActiveAmount}}可收</div>
                    </div>
                    <!--未被收取的总数量中的不可收取数量-->
                    <div flex-box="1" class="tt-msg" v-else-if="item.residueAmount" :class="{'nvisable': !item.showMsg}">
                        <div class="msg">{{item.latestRemainTimeToGet}}</div>
                    </div>
                    <div flex-box="0">
                        <img :src="goldLight" class="gold-img" v-if="item.hasActiveGoldCoin && canSteal" />
                        <img :src="goldGray" class="gold-img-gray" v-else @click="showMsg(item)"/>
                        <div>{{sceneText(item.gcApplyScene)}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="advant card">
            <advertise pagetype="JBYX"></advertise>
        </div>
        <div class="fir-trend card">
            <div class="title">TA的动态</div>
            <div class="trend-list">
                <div flex class="item">
                    <div flex-box="1">
                        <span class="name">金葵花</span>
                        偷走2金币
                    </div>
                    <div flex-box="0" class="time">12-23</div>
                </div>
                <div flex class="item">
                    <div flex-box="1">
                        <span class="name">金葵花</span>
                        偷走2金币
                    </div>
                    <div flex-box="0" class="time">12-23</div>
                </div>
            </div>
        </div>
        <div class="step-wrap" v-if="showGuide" >
            <div class="step_4">
                <button class="step-btn" @click.stop="nextGuide"></button>
            </div>
        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import {Toast} from 'mint-ui';
    import '../less/gold/index.less';
    import Advertise from '../components/Advertise';
    import {setTitle} from '../tools/operation';
    const goldLight = require('../images/gold/gold.png');
    const goldGray = require('../images/gold/gold-gray.png');
    const defaultHead = require('../images/gold/default-head.png');
    export default {
        name: 'gold-index',
        data(){
            return {
                defaultHead,
                goldLight,
                goldGray,
                showGuide: false,
                userCoin: {},
                friendUuid: '',
                userCoinList: [],
                canSteal: false
            }
        },
        created(){
            this.showGuide = !window.localStorage.getItem('closeOthersGuide');
            this.friendUuid = this.$route.query.uuid;
            this.getGoldCoin();
        },
        components:{
            Advertise
        },
        computed: {
        },
        methods: {
            showMsg(item){
                if(!this.canSteal){
                    return;
                }
                item.showMsg = !item.showMsg;
            },
            //偷金币
            coinCollect(item){
                if(!this.canSteal){
                    Toast('你已经偷过TA的金币了，请两小时后再试哦~');
                    return;
                }
                $api.post('/goldCoin/steal',{
                    gcActiveUuids: item.gcUserGenerateActiveUuids.join(','),
                    gcApplyScene: item.gcApplyScene,
                    gcCreateUserUuid: this.userCoin.gcCreateUserUuid
                }).then(resp => {
                    if(resp.code == 200){
                        Toast(`偷到${resp.data.stealAmount}金币`);
                        this.getGoldCoin();
                    }else{
                        Toast(resp.msg);
                    }
                })
            },
            //获取用户总信息
            getGoldCoin(){
                $api.get('/goldCoin/getTotalInfo',{
                    friendUuid: this.friendUuid
                }).then(resp => {
                    this.userCoinList = [];
                    if(resp.code == 200){
                        setTitle(`${resp.data.nickName || '好友'}的小金库`);
                        this.canSteal = resp.data.canSteal;
                        resp.data.list.map(item => {
                            //好友投资
                            item.residueAmount = item.gcUserGenerateSumAmount - item.gcUserGenerateSumActiveAmount;
                            if (item.hasActiveGoldCoin || item.residueAmount) {
                                item.showMsg = false;
                                if(item.hasActiveGoldCoin || item.residueAmount){
                                    this.userCoinList.push(item);
                                }
                            }
                        });
                        this.userCoin = resp.data;
                    }
                })
            },
            //用户引导
            nextGuide(){
                window.localStorage.setItem('closeOthersGuide',true);
                this.showGuide = false;
            },
            sceneText(scene){
                let out = '';
                switch (scene){
                    case 8:
                        out = '好友注册';
                        break;
                    case 9:
                        out = '分享';
                        break;
                    case 10:
                        out = '签到';
                        break;
                    case 13:
                        out = '好友投资';
                        break;
                    case 14:
                        out = '投资';
                        break;
                    default:
                        break;
                }
                return out;
            }
        },
        mounted(){

        },
        destroyed(){

        }
    }
</script>
