<template>
    <div class="gold-index">
        <div class="header card">
            <div class="header-top" flex="main:justify">
                <div class="head-info">
                    <img :src="userCoin.headImageUrl || defaultHead" class="head-img"/>
                    {{userCoin.currentUsableAmount || 0}}金币
                </div>
                <div>
                    <button class="gold-btn" @click.stop="toPath('/golds/task',108102)">金币任务</button>
                </div>
            </div>

            <div class="gold-item" flex="main:center">
                <div class="item" v-for="item,index in userCoinList" :key="index"
                     v-if="item.hasActiveGoldCoin || item.residueAmount"
                     :class="{'bt-1': (index == 0 && userCoinList.length == 2) || (index == 1 && userCoinList.length >= 3),
                     'bt-2': (index == 1 && userCoinList.length == 2) || (index == 0 && userCoinList.length == 1) || (index == 2 && userCoinList.length == 4),
                     'bt-3': index == 2 && userCoinList.length == 3}"
                    @click.stop="coinCollect(item,$event,index)">

                    <!--未被收取的总数量中的可收取数量-->
                    <div flex-box="1" class="tt-msg" v-if="item.hasActiveGoldCoin">
                        <div class="msg">{{item.gcUserGenerateSumActiveAmount}}可收</div>
                    </div>
                    <!--未被收取的总数量中的不可收取数量-->
                    <div flex-box="1" class="tt-msg" v-else-if="item.residueAmount" :class="{'nvisable': !item.showMsg}">
                        <div class="msg">{{item.latestRemainTimeToGet}}</div>
                    </div>
                    <div flex-box="0">
                        <img :src="goldLight" class="gold-img" v-if="item.hasActiveGoldCoin" :class="{'rotate': item.hasGot}"/>
                        <img :src="goldGray" class="gold-img" v-else @click="showMsg(item)" :class="{'rotate': item.hasGot}"/>
                        <div class="fly-box" :style="{left: item.position.left+'px',bottom:item.position.bottom+'px',opacity: 0}" v-if="item.hasGot">
                            <img :src="goldLight" class="fly-gold" v-for="n in 5"/>
                        </div>
                        <div>{{sceneText(item.gcApplyScene)}}</div>
                    </div>
                </div>
            </div>
            <div class="pig-wrap" flex="dir:top" id="test">
                <div class="pig-img"><img src="../images/gold/pig.png" class="img"/></div>
                <div class="link" @click.stop="toPath('/golds/gold-detail',108101)">金币明细</div>
            </div>
        </div>
        <div class="advant card" v-show="hasAdvt">
            <advertise pagetype="JBYX"></advertise>
        </div>
        <div class="fir-trend card">
            <div class="title">好友动态</div>
            <div class="trend-list">
                <div flex class="item" v-for="item,index in friendSteal">
                    <div flex-box="1">
                        <span class="name" @click.stop="toDetail(item)">{{item.nickName}}</span>
                        偷走{{item.ctAmount}}金币
                    </div>
                    <div flex-box="0" class="time">{{item.updateTime | timeFormater('MM-dd')}}</div>
                </div>
                <div class="empty-text" v-if="!friendStealCount">暂时没有好友动态~</div>
            </div>
            <div class="footer" @click.stop="toPath('/golds/activity-list',108104)" v-if="friendStealCount > 2">
                <span>查看更多</span>
            </div>
        </div>
        <div class="sort card">
            <div class="title">收取排行榜</div>
            <div class="trend-list">
                <div flex="cross:center" class="item" v-for="item,index in friendList" :key="index" @click.stop="toDetail(item)">
                    <div flex-box="1" flex="cross:center">
                        <div class="num-img">
                            <img src="../images/gold/num-1.png" v-if="index == 0" class="img"/>
                            <img src="../images/gold/num-2.png" v-else-if="index == 1" class="img"/>
                            <img src="../images/gold/num-3.png" v-else-if="index == 2" class="img"/>
                            <span v-else>{{index + 1}}</span>
                        </div>
                        <div class="head-img">
                            <img :src="item.headImageUrl || defaultHead" alt="头像" class="img"/>
                            <div class="daren" v-if="item.investorType >= 12">
                                <div class="inner">达人</div>
                            </div>
                        </div>
                        <div v-if="userUuid == item.userUuid">我</div>
                        <div v-else>{{item.nickName}}</div>
                    </div>
                    <div flex-box="0" class="time">
                        {{item.coinTotalNum || 0}}
                    </div>
                    <div class="point-msg" v-if="item.userValidCoinAmount && !item.isStealFreezingTime">
                        <img src="../images/gold/hand.png" class="hand-img"/>
                    </div>
                    <div class="point-msg" v-else-if="item.userNextValidCoinTime && !item.isStealFreezingTime">
                        {{item.userNextValidCoinTime | secondToTime}}
                    </div>
                </div>
                <div class="empty-text" v-if="!friendList.length">暂时没有排行信息~</div>
            </div>
            <div class="footer" @click.stop="toPath('collect-list',108103)" v-if="friendCount > 10">
                <span>查看更多</span>
            </div>
        </div>
        <div class="step-wrap" v-if="showGuide">
            <div :class="'step_'+step">
                <button class="step-btn" @click.stop="nextGuide"></button>
            </div>
        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import '../less/gold/index.less';
    import Advertise from '../components/Advertise';
    import EventBus from '../tools/event-bus';
    import {mapState} from 'vuex';
    import {Toast} from 'mint-ui';
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
                step: 1,
                userCoin: {},
                userCoinList: [],
                hasAdvt: false,
                friendCount: 0,
                friendList: [],
                friendSteal: [],
                friendStealCount: 0,
                timer: null
            }
        },
        created(){
            this.addHive(1,'/golds/index',1081);
            this.showGuide = !window.localStorage.getItem('closeIndexGuide');
            this.getGoldCoin();
            this.getFriendList();
            this.getFriendSteal();
        },
        components:{
            Advertise
        },
        computed: {
            ...mapState(['userUuid']),
        },
        methods: {
            //收金币
            coinCollect(item,e,index){
                if(!item.hasActiveGoldCoin){
                    return;
                }
                this.addHive(0,'/golds/index',108106);
                $api.post('/goldCoin/collect',{
                    gcActiveUuids: item.gcUserGenerateActiveUuids.join(','),
                    gcApplyScene: item.gcApplyScene,
                    gcCreateUserUuid: this.userCoin.gcCreateUserUuid
                }).then(resp => {
                    if(resp.code == 200){
                        Toast('收取金币成功');
                        this.enterPig(item,e,index);
                        if(this.timer) clearTimeout(this.timer);
                        this.timer = setTimeout(()=>{
                            item.hasActiveGoldCoin = false;
                            this.userCoin.currentUsableAmount = (this.userCoin.currentUsableAmount || 0) + resp.data.collectTotalAmount;
                            for(let i = 0;i < this.friendList.length;i++){
                                let val = this.friendList[i];
                                if(val.userUuid == this.userUuid){
                                    val.hasActiveGoldCoin = false;
                                    val.isStealFreezingTime = true;
                                    val.userValidCoinAmount += resp.data.collectTotalAmount;
                                    break;
                                }
                            }
                            //this.getGoldCoin();
                            //this.getFriendList();
                        },1700);
                    }else{
                        Toast(resp.msg);
                    }
                })
            },
            //进入好友金币页面
            toDetail(item,trend){
                if(trend){
                    this.addHive(0,'/golds/index',108105);
                }
                if(item.userUuid == this.userUuid){
                    return;
                }
                this.$router.push({
                    path: '/golds/others-index',
                    query: {
                        uuid: item.userUuid
                    }
                })
            },
            toPath(path,code){
                this.addHive(0,'/golds/index',code);
                this.$router.push({
                    path: path
                })
            },
            //不可收金币显示隐藏可收时间
            showMsg(item){
                //item.hasGot = true;
                item.showMsg = !item.showMsg;
            },
            //获取用户总信息
            getGoldCoin(){
                $api.get('/goldCoin/getTotalInfo').then(resp => {
                    this.userCoinList = [];
                    if(resp.code == 200){
                        resp.data.list.map(item => {
                            //好友投资
                            item.residueAmount = item.gcUserGenerateSumAmount - item.gcUserGenerateSumActiveAmount;
                            if (item.hasActiveGoldCoin || item.residueAmount) {
                                item.showMsg = false;
                                item.hasGot = false;
                                item.position = {};
                                if(item.hasActiveGoldCoin || item.residueAmount){
                                    this.userCoinList.push(item);
                                }
                            }
                        });
                        this.userCoin = resp.data;
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
                        this.friendList = resp.data.list;
                        this.friendCount = resp.data.count;
                    }
                })
            },
            //好友动态
            getFriendSteal(){
                $api.get('/coinTransaction/listFriendStealUser',{
                    startRow: 0,
                    pageSize: 2
                }).then(resp => {
                    if(resp.code == 200){
                        this.friendSteal = resp.data.list;
                        this.friendStealCount = resp.data.count;
                    }
                })
            },
            //用户引导
            nextGuide(){
                if(this.step >= 3){
                    this.showGuide = false;
                    window.localStorage.setItem('closeIndexGuide', true);
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
            },
            enterPig(item,e,index){
                let rect = e.target.getBoundingClientRect();
                let x = rect.left;
                let y = rect.top;
                item.hasGot = true;
                this.$set(this.userCoinList,index,item);
                let height = document.getElementsByClassName('header')[0].offsetHeight;
                item.position = {left: x+38,top: y, bottom: height - y -50};
                setTimeout(()=>{
                    document.getElementsByClassName('fly-box')[0].animate([
                        {opacity: 1,left: item.position.left+'px',bottom:item.position.bottom+'px',width: '80px'},
                        {opacity: 1,left: 224+'px',bottom:143+'px',width: '35px'},
                    ], {
                        duration: 500,
                        iteration: 4,
                        delay: 100,
                        fill: "forwards"
                    });
                },800);
            }
        },
        mounted(){
            EventBus.$on('advertise', (picUrl) => {
                this.hasAdvt = picUrl;
            });
        },
        destroyed(){
            this.addHive(2,'/golds/index',1081);
        }
    }
</script>
