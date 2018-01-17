<template>
    <div class="gold-index">
        <div class="header card">
            <div class="header-top" flex="main:justify">
                <div class="head-info">
                    <img :src="userCoin.headImageUrl" class="head-img"/>
                    {{userCoin.currentUsableAmount}}金币
                </div>
                <div>
                    <button class="gold-btn" @click.stop="toPath('/golds/task')">金币任务</button>
                </div>
            </div>

            <div class="gold-item" flex="main:center">
                <div class="item" v-for="item,index in userCoin.list" :key="index"
                     v-if="item.hasActiveGoldCoin || item.residueAmount"
                    @click.stop="coinCollect(item)">
                    <!--未被收取的总数量中的可收取数量-->
                    <div flex-box="1" class="tt-msg" v-if="item.hasActiveGoldCoin">
                        <div class="msg">{{item.gcUserGenerateSumActiveAmount}}可收</div>
                    </div>
                    <!--未被收取的总数量中的不可收取数量-->
                    <div flex-box="1" class="tt-msg" v-if="item.residueAmount">
                        <div class="msg">{{item.latestRemainTimeToGet}}</div>
                    </div>
                    <div flex-box="0">
                        <img :src="item.hasActiveGoldCoin ? goldLight : goldGray" class="gold-img"/>
                        <div>{{sceneText(item.gcApplyScene)}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="advant card">
            <advertise :pagetype="'WDHYY'"></advertise>
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
        <div class="step-wrap step-4" v-if="showGuide" >
            <button class="step-btn" @click.stop="nextGuide"></button>
        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import {Toast} from 'mint-ui';
    import '../less/gold/index.less';
    import Advertise from '../components/Advertise';
    const goldLight = require('../images/gold/gold.png');
    const goldGray = require('../images/gold/gold-gray.png');
    export default {
        name: 'gold-index',
        data(){
            return {
                goldLight,
                goldGray,
                showGuide: false,
                userCoin: {},
                friendList: [],
                friendUuid: ''
            }
        },
        created(){
            this.friendUuid = this.$query.uuid;
            this.getGoldCoin();
            this.getFriendList();
        },
        components:{
            Advertise
        },
        computed: {
        },
        methods: {
            //收金币
            coinCollect(item){
                $api.post('/goldCoin/collect',{
                    gcActiveUuids: item.gcUserGenerateActiveUuids.join(','),
                    gcApplyScene: item.gcApplyScene,
                    gcCreateUserUuid: this.userCoin.gcCreateUserUuid
                }).then(resp => {
                    if(resp.code == 200){
                        this.getGoldCoin();
                    }else{
                        Toast('你已经偷过TA的金币了，请两小时后再试哦~');
                    }
                })
            },
            toPath(path){
                this.$router.push({
                    path: path
                })
            },
            //获取用户总信息
            getGoldCoin(){
                $api.get('/goldCoin/getTotalInfo',{
                    friendUuid: this.friendUuid
                }).then(resp => {
                    if(resp.code == 200){
                        resp.data.list.map(item => {
                            //好友投资
                            if (item.gcApplyScene == 13 || item.gcApplyScene == 14) {
                                item.residueAmount = item.gcUserGenerateSumAmount - item.gcUserGenerateSumActiveAmount;
                            }
                        });
                        this.userCoin = resp.data;
                        sessionStorage.setItem('currentAmount', this.userCoin.currentUsableAmount);
                    }
                })
            },
            //用户引导
            nextGuide(){
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
        destroyed(){

        }
    }
</script>
