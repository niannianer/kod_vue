<template>
    <div class="gold-index">
        <div class="header card">
            <div class="header-top" flex="main:justify">
                <div class="head-info others-head">
                    <img :src="userCoin.headImageUrl || defaultHead" class="head-img"/>
                </div>
            </div>

            <div class="gold-item" flex="main:center">
                <div class="item itemo" v-for="item,index in userCoinList" :key="index"
                     v-if="item.currCoinStatus > 0"
                     :class="{'bt-1': (index == 0 && userCoinList.length == 2) || (index == 1 && userCoinList.length >= 3),
                     'bt-2': (index == 1 && userCoinList.length == 2) || (index == 0 && userCoinList.length == 1) || (index == 2 && userCoinList.length == 4),
                     'bt-3': index == 2 && userCoinList.length == 3}"
                    @click.stop="coinCollect(item)">
                    <!--未被收取的总数量中的可收取数量-->
                    <div flex-box="1" class="tt-msg" v-if="item.currCoinStatus==2">
                        <div class="msg" :class="{'gray-msg': !canSteal}">{{item.gcUserGenerateSumActiveAmount}}可收</div>
                    </div>
                    <!--未被收取的总数量中的不可收取数量-->
                    <div flex-box="1" class="tt-msg" v-else-if="item.currCoinStatus==1" :class="{'nvisable': !item.showMsg}">
                        <div class="msg">{{item.latestRemainTimeToGet}}</div>
                    </div>
                    <div flex-box="0">
                        <img :src="goldLight" class="gold-img" v-if="item.currCoinStatus==2 && canSteal" />
                        <img :src="goldGray" class="gold-img-gray" v-else @click="showMsg(item)"/>
                        <div>{{sceneText(item.gcApplyScene)}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="advant card" v-show="hasAdvt">
            <advertise pagetype="JBYX"></advertise>
        </div>
        <div class="fir-trend card">
            <div class="title">TA的动态</div>
            <div class="trend-list">
                <div flex class="item" v-for="item,index in friendSteal">
                    <div flex-box="1">
                        <span class="name">{{item.nickName}}</span>
                        偷走{{item.ctAmount}}金币
                    </div>
                    <div flex-box="0" class="time">{{item.updateTime | timeFormater('MM-dd')}}</div>
                </div>
                <div class="empty-text" v-if="!friendStealCount">暂时没有动态~</div>
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
    import EventBus from '../tools/event-bus';
    import {local} from '../tools/store';
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
                hasAdvt: false,
                userCoin: {},
                friendUuid: '',
                userCoinList: [],
                canSteal: false,
                friendSteal: {},
                friendStealCount: 0,
                collecting: false
            }
        },
        created(){
            this.addHive(1,'/golds/others-index',1087);
            this.showGuide = !local.getItem('closeOthersGuide');
            this.friendUuid = this.$route.query.uuid;
            this.getGoldCoin();
            this.getFriendSteal();
        },
        components:{
            Advertise
        },
        computed: {
        },
        methods: {
            showMsg(item){
                this.addHive(0,'/golds/others-index',108701);
                if(!this.canSteal){
                    Toast('你已经偷过TA的金币了，请两小时后再试哦~');
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
                else if(item.currCoinStatus!=2 || this.collecting){
                    return;
                }
                this.collecting = true;
                $api.post('/goldCoin/steal',{
                    gcApplyScene: item.gcApplyScene,
                    gcCreateUserUuid: this.userCoin.gcCreateUserUuid
                }).then(resp => {
                    this.collecting = false;
                    if(resp.code == 200){
                        Toast(`偷到${resp.data.stealAmount}金币`);
                        this.getGoldCoin();
                        this.getFriendSteal();
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
                            if (item.currCoinStatus > 0) {
                                item.showMsg = false;
                                this.userCoinList.push(item);
                            }
                        });
                        this.userCoin = resp.data;
                    }
                })
            },
            //TA的动态
            getFriendSteal(){
                $api.get('/coinTransaction/listFriendStealUser',{
                    startRow: 0,
                    pageSize: 2,
                    friendUuid: this.friendUuid
                }).then(resp => {
                    if(resp.code == 200){
                        this.friendSteal = resp.data.list;
                        this.friendStealCount = resp.data.count;
                    }
                })
            },
            //用户引导
            nextGuide(){
                local.setItem('closeOthersGuide',true);
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
                        out = '每日签到';
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
            EventBus.$on('advertise', (picUrl) => {
                this.hasAdvt = picUrl;
            });
        },
        destroyed(){
            this.addHive(2,'/golds/others-index',1087);
        }
    }
</script>
