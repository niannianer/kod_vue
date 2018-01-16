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
            <div class="pig-wrap" flex="dir:top">
                <div class="pig-img"><img src="../images/gold/pig.png" class="img"/></div>
                <div class="link"><router-link to="/golds/gold-detail">金币明细</router-link></div>
            </div>
        </div>
        <div class="advant card">
            <advertise :pagetype="'WDHYY'"></advertise>
        </div>
        <div class="fir-trend card">
            <div class="title">好友动态</div>
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
            <div class="footer" @click.stop="toPath('/golds/activity-list')">
                <span>查看更多</span>
            </div>
        </div>
        <div class="sort card">
            <div class="title">收取排行榜</div>
            <div class="trend-list">
                <div flex="cross:center" class="item" v-for="item,index in friendList" :key="index">
                    <div flex-box="1" flex="cross:center">
                        <div class="num-img">
                            <img src="../images/gold/num-1.png" v-if="index == 0"/>
                            <img src="../images/gold/num-2.png" v-if="index == 1"/>
                            <img src="../images/gold/num-3.png" v-if="index == 2"/>
                            <span v-else>{{index + 1}}</span>
                        </div>
                        <div class="head-img">
                            <img :src="item.headImageUrl"/>
                            <div class="daren" v-if="item.investorType >= 12">
                                <div class="inner">达人</div>
                            </div>
                        </div>
                        <div>{{item.name}}</div>
                    </div>
                    <div flex-box="0" class="time">
                        {{item.coinTotalNum}}
                    </div>
                    <div class="point-msg" v-if="item.userNextValidCoinTime">
                        {{item.userNextValidCoinTime}}
                    </div>
                    <div class="point-msg" v-if="item.userValidCoinAmount"><img src="../images/gold/hand.png" class="hand-img"/></div>
                </div>
                <div class="empty-text">暂时没有排行信息~</div>
            </div>
            <div class="footer" @click.stop="toPath('collect-list')" v-if="friendList.length">
                <span>查看更多</span>
            </div>
        </div>
        <div class="step-wrap" v-if="showGuide" :class="'step_'+step">
            <button class="step-btn" @click.stop="nextGuide"></button>
        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
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
                step: 1,
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
                if(!item.hasActiveGoldCoin){
                    return;
                }
                $api.post('/goldCoin/collect',{
                    gcActiveUuids: item.gcUserGenerateActiveUuids.join(','),
                    gcApplyScene: item.gcApplyScene,
                    gcCreateUserUuid: this.userCoin.gcCreateUserUuid
                }).then(resp => {
                    if(resp.code == 200){
                        this.getGoldCoin();
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
            //收取排行榜
            getFriendList(){
                $api.get('/coin/getFriendList',{
                    startRow: 0,
                    pageSize: 10
                }).then(resp => {
                    if(resp.code == 200){
                        resp.data.list.map(val => {
                            val.name = val.nickName ? val.nickName : val.username ? val.username : val.mobile;
                        });
                        this.friendList = resp.data.list;
                    }
                })
            },
            //用户引导
            nextGuide(){
                if(this.step >= 3){
                    this.showGuide = false;
                }else{
                    this.step ++;
                }
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
