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
                     v-if="item.currCoinStatus > 0"
                     :class="{'bt-1': (index == 0 && userCoinList.length == 2) || (index == 1 && userCoinList.length >= 3),
                     'bt-2': (index == 1 && userCoinList.length == 2) || (index == 0 && userCoinList.length == 1) || (index == 2 && userCoinList.length == 4),
                     'bt-3': index == 2 && userCoinList.length == 3}"
                    @click.stop="coinCollect(item,$event,index)">

                    <!--未被收取的总数量中的可收取数量-->
                    <div flex-box="1" class="tt-msg" v-if="item.currCoinStatus==2">
                        <div class="msg">{{item.gcUserGenerateSumActiveAmount}}可收</div>
                    </div>
                    <!--未被收取的总数量中的不可收取数量-->
                    <div flex-box="1" class="tt-msg" v-else-if="item.currCoinStatus==1" :class="{'nvisable': !item.showMsg}">
                        <div class="msg">{{item.latestRemainTimeToGet}}</div>
                    </div>
                    <div flex-box="0">
                        <img :src="goldLight" class="gold-img" v-if="item.currCoinStatus==2"
                             :class="{'rotate': item.hasGot}"/>
                        <img :src="goldGray" class="gold-img" v-else
                             :class="{'rotate': item.hasGot}"/>
                        <div class="fly-box"
                             :style="{left: item.position.left+'px',bottom:item.position.bottom+'px',opacity: 0}"
                             >
                            <img :src="goldLight" class="fly-gold" v-for="n in 5"/>
                        </div>
                        <div>{{sceneText(item.gcApplyScene)}}</div>
                    </div>
                </div>
            </div>
            <div class="pig-wrap" flex="dir:top" id="test">
                <div class="pig-img"><img src="../images/gold/pig.png" class="img"/></div>
                <span class="link" @click.stop="toPath('/golds/gold-detail',108101)">金币明细</span>
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
                <div flex="cross:center" class="item" v-for="item,index in friendList" :key="index"
                     @click.stop="toDetail(item)">
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
                        {{item.gameStatus ? item.coinTotalNum || 0 : '未开启'}}
                    </div>
                    <div v-if="userUuid && userUuid != item.userUuid">
                        <div class="point-msg" v-if="item.coinStatus == 2">
                            <img src="../images/gold/hand.png" class="hand-img"/>
                        </div>
                        <div class="point-msg" v-else-if="item.coinStatus == 1">
                            {{item.latestRemainTimeToGet}}
                        </div>
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
    import {Toast} from 'mint-ui';
    import {mapState} from 'vuex';
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
                step: 1,
                userCoin: {},
                userCoinList: [],
                hasAdvt: false,
                friendCount: 0,
                friendList: [],
                friendSteal: [],
                friendStealCount: 0,
                timer: null,
                userUuid: '',
                collecting: false
            }
        },
        created(){
            this.addHive(1, '/golds/index', 1081);
            this.showGuide = !local.getItem('closeIndexGuide');
            this.getGoldCoin();
            this.getFriendList();
            this.getFriendSteal();
            this.$store.dispatch('getOauth');
        },
        components:{
            Advertise
        },
        computed: {
            ...mapState(['headImageUrl', 'nickName']),
        },
        methods: {
            //收金币
            coinCollect(item, e, index){
                //不可收金币显示隐藏可收时间 currCoinStatus = 1: 有代收时间未到金币 2：有时间已到可收金币 0：没有金币
                if(item.currCoinStatus==1){
                    item.showMsg = !item.showMsg;
                }
                if (item.currCoinStatus!=2 || this.collecting) {
                    return;
                }
                this.collecting = true;
                this.addHive(0, '/golds/index', 108106);
                $api.post('/goldCoin/collect', {
                    gcApplyScene: item.gcApplyScene,
                    gcCreateUserUuid: this.userCoin.gcCreateUserUuid
                }).then(resp => {
                    this.collecting = false;
                    if (resp.code == 200) {
                        Toast('收取金币成功');
                        //this.enterPig(item,e,index);
                        item.hasGot = true;
                        this.$set(this.userCoinList, index, item);
                        if (this.timer) clearTimeout(this.timer);
                        this.timer = setTimeout(() => {
                            this.getGoldCoin(item.gcApplyScene);
                            this.getFriendList();
                        }, 1700);
                    } else {
                        Toast(resp.msg);
                    }
                })
            },
            //进入好友金币页面
            toDetail(item, trend){
                if (trend) {
                    this.addHive(0, '/golds/index', 108105);
                }
                if (item.userUuid == this.userUuid || !item.gameStatus) {
                    return;
                }
                this.$router.push({
                    path: '/golds/others-index',
                    query: {
                        uuid: item.userUuid
                    }
                })
            },
            toPath(path, code){
                this.addHive(0, '/golds/index', code);
                this.$router.push({
                    path: path
                })
            },
            //获取用户总信息
            getGoldCoin(gcApplyScene){
                $api.get('/goldCoin/getTotalInfo').then(resp => {
                    this.userCoinList = [];
                    if (resp.code == 200) {
                        this.userUuid = resp.data.gcCreateUserUuid;
                        resp.data.list.map(item => {
                            //好友投资
                            if (item.currCoinStatus > 0 ) {
                                item.showMsg = false;
                                item.hasGot = false;
                                //收取金币后，还有未到时间的金币，不反转
                                if(item.gcApplyScene == gcApplyScene){
                                    item.hasGot = true;
                                }
                                item.position = {};
                                this.userCoinList.push(item);
                            }
                        });
                        this.userCoin = resp.data;
                    }
                })
            },
            //收取排行榜
            getFriendList(){
                $api.get('/coin/getFriendList', {
                    startRow: 0,
                    pageSize: 10
                }).then(resp => {
                    if (resp.code == 200) {
                        this.friendList = resp.data.list;
                        this.friendCount = resp.data.count;
                    }
                })
            },
            //好友动态
            getFriendSteal(){
                $api.get('/coinTransaction/listFriendStealUser', {
                    startRow: 0,
                    pageSize: 2
                }).then(resp => {
                    if (resp.code == 200) {
                        this.friendSteal = resp.data.list;
                        this.friendStealCount = resp.data.count;
                    }
                })
            },
            //用户引导
            nextGuide(){
                if (this.step >= 3) {
                    this.showGuide = false;
                    local.setItem('closeIndexGuide', true);
                } else {
                    this.step++;
                }
            },
            sceneText(scene){
                let out = '';
                switch (scene) {
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
            enterPig(item, e, index){
                let rect = e.target.getBoundingClientRect();
                let x = rect.left;
                let y = rect.top;
                item.hasGot = true;
                this.$set(this.userCoinList, index, item);
                let height = document.getElementsByClassName('header')[0].offsetHeight;
                let clientWidth = document.documentElement.clientWidth;
                item.position = {left: x + 38, top: y, bottom: height - y - 50};
                console.log(clientWidth)
                let left = clientWidth * 0.5;
                setTimeout(() => {
                    document.getElementsByClassName('fly-box')[0].animate([
                        {
                            opacity: 1,
                            left: item.position.left + 'px',
                            bottom: item.position.bottom + 'px',
                            width: '80px'
                        },
                        {opacity: 1, left: left + 'px', bottom: 143 + 'px', width: '35px'},
                    ], {
                        duration: 500,
                        iteration: 4,
                        delay: 100,
                        fill: "forwards"
                    });
                }, 800);
            }
        },
        mounted(){
            EventBus.$on('advertise', (picUrl) => {
                this.hasAdvt = picUrl;
            });
        },
        destroyed(){
            this.addHive(2, '/golds/index', 1081);
        }
    }
</script>
