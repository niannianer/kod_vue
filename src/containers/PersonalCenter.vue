<template>
    <div class="personal-center" flex="dir:top">
        <div class="wrap" flex-box="1" style="overflow: auto">
            <div class="top">
                <div flex-box="0" class="switch-mode" @click.stop="switchMode">
                    <img src="../images/login/pwd-show@2x.png" alt="show" v-show="mode">
                    <img src="../images/login/pwd-hide@2x.png" alt="show" v-show="!mode">
                </div>
                <div class="msg" @click.stop="getPath('/message-center')" :class="{redTip:articleUnreadMessage}">
                    <img src="../images/personal-center/msg.png" alt="" class="img"/>
                </div>
                <div class="user-head">
                    <img v-if="!investorMobile" src="../images/personal-center/user-head.png"/>
                    <img src="../images/personal-center/user-default.png" v-else/>
                </div>
                <div class="user-mobile">
                    <span v-if="investorMobile">{{investorMobile | mobileFormat}}</span>
                    <span v-else @click.stop="login"> 请登录</span>
                </div>
                <div class="fund-center" flex @click.stop="getPath('/my-assets')">
                    <div flex-box="1">
                        <p class="info-text" v-if="mode">{{accountTotalAssets | currencyFormat}}元</p>
                        <p class="info-text" v-else="mode">****元</p>
                        <p class="title">总资产</p>
                    </div>
                    <div flex-box="1">
                        <p class="info-text" v-if="mode">{{accountCashAmount | currencyFormat}}元</p>
                        <p class="info-text" v-else="mode">****元</p>
                        <p class="title">可用余额</p>
                    </div>
                    <div flex-box="1">
                        <p class="info-text" v-if="mode">{{accountTotalInterests | currencyFormat}}元</p>
                        <p class="info-text" v-else="mode">****元</p>
                        <p class="title">累计收益</p>
                    </div>
                </div>
                <div class="ticket-center">
                    <div flex>
                        <div flex-box="1" flex="main:center">
                            <div class="btn-border">
                                <p class="btn" @click.stop="getPath('/recharge')">
                                    充值
                                </p>
                            </div>
                        </div>
                        <div flex-box="1" flex="main:center">
                            <div class="btn-border">
                                <p class="btn" @click.stop="getPath('/withdraw')">
                                    提现
                                </p>
                            </div>
                        </div>
                    </div>
                    <div flex="box:mean" class="ticket-detail">
                        <div flex-box="1" class="rl" @click.stop="getPath('/ticket-list?code=1')">
                            <p class="title" :class="{redTip:couponUnreadMessage}">现金券</p>
                            <p class="info-text">{{cashCouponCount}}个</p>
                        </div>
                        <div flex-box="1" class="rl" @click.stop="getPath('/ticket-list?code=2')">
                            <p class="title" :class="{redTip:interestCouponUnreadMessage}">加息券</p>
                            <p class="info-text">{{interestCouponCount}}个</p>
                        </div>
                        <div flex-box="1" @click.stop="getPath('/experience-funds')">
                            <p class="title">体验金</p>
                            <p class="info-text">{{experienceAmount}}元</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="body">
                <div class="section seperate" flex="cross:center" @click.stop="getPath('/risk-assessment/wechat')"
                     v-if="!investorRiskScore">
                    <p class="assessment" flex-box="1">
                        您未进行风险承受能力评估，为不影响投资请立即评估
                    </p>
                    <div flex-box="0">
                        <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                    </div>
                </div>
                <div class="section seperate" flex="dir:top">
                    <div class="item bl" flex-box="1" flex="cross:center"
                         @click.stop="getPath('/land-share.html',true)">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/share.png" alt="share">
                        </div>
                        <span flex-box="0">一起赚</span>
                        <div flex-box="1">
                            <div class="slide-warp">
                                    <div class="silde-up">
                                        分享即得加息券
                                    </div>

                            </div>

                        </div>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                    <div class="item" flex-box="1" flex="cross:center" @click.stop="getPath('/land-financial-master.html',true)">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/master-icon.png" alt="master">
                        </div>
                        <span flex-box="0">达人特权</span>
                        <div flex-box="1">
                            <div class="slide-warp">
                                <transition name="slide-fade">
                                    <div class="silde-up" v-for="(text ,index) in masterList" v-if="index==currentIndex"
                                         :key="index">
                                        {{text}}
                                    </div>
                                </transition>
                            </div>

                        </div>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                </div>
                <div class="section seperate" flex="dir:top">
                    <div class="item bl" flex-box="1" flex="cross:center" @click.stop="getPath('/invest-list')">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/financial-fixi.png" alt="financial">
                        </div>
                        <span flex-box="1">定期理财</span>
                        <span flex-box="0">{{investmentAmount | currencyFormat}}</span>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                    <div class="item bl" flex-box="1" flex="cross:center" @click.stop="getPath('/reserve-list')">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/financial-prif.png" alt="financial">
                        </div>
                        <span flex-box="1">高端理财</span>
                        <span flex-box="0">{{reservationCount}}个</span>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                    <div class="item" :class="{'bl': hasAdvt}" flex-box="1" flex="cross:center" @click.stop="getPath('/funds/my-fund')">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/fund.png" alt="my-fund">
                        </div>
                        <span flex-box="1">我的基金</span>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                    <div class="item" flex-box="1" flex="dir:top" v-show="hasAdvt">
                        <div flex-box="0" flex="cross:center">
                            <img class="logo" src="../images/personal-center/advertise-icon.png" alt="my-fund">
                            <span>活动</span>
                        </div>
                        <advertise :pagetype="'WDJL'"></advertise>
                    </div>
                </div>


                <div class="section seperate" flex="dir:top">
                    <div class="item" flex-box="1" flex="cross:center"
                         @click.stop="getPath('/land-about-us.html',true)">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/about-us.png" alt="financial">
                        </div>
                        <span flex-box="1">关于我们</span>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                </div>
            </div>
            <div class="cantact-us">
                <a :href="'tel:'+telNumber">
                    联系我们：{{telNumber}}
                </a>
            </div>
            <div class="btn logout" @click.stop="logout()">
                退出登录
            </div>
        </div>
        <div class="nav" flex-box="0" flex="box:mean">
            <div @click.stop="getPath('/financial')">
                <img src="../images/nav/financial.png" alt="financial">
                <p>理财</p>
            </div>
            <div @click.stop="getPath('/relation')">
                <img src="../images/nav/relation.png" alt="relation">
                <p>好友</p>
            </div>
            <div @click.stop="getPath(appUrl,true)">
                <img src="../images/nav/download.png" alt="download">
                <p>下载app</p>
            </div>
        </div>
        <modal v-show="showModal" @callBack="callBack"></modal>
    </div>

</template>

<script>
    let times = 0;
    import {appUrl} from '../tools/config';
    import {mapState} from 'vuex';
    import Modal from '../components/Modal';
    import {Toast, Indicator, MessageBox} from 'mint-ui';
    import {telNumber} from '../tools/config';
    import $api from '../tools/api';
    import wx from '../tools/wx';
    import $device from '../tools/device';
    import Advertise from '../components/Advertise';
    import EventBus from '../tools/event-bus';
    import '../less/personal-center.less';
    import {submitAuthorization} from '../tools/operation';
    let timer = null;
    export default {
        name: 'personal-center',
        data(){
            return {
                telNumber,
                mode: true,
                showModal: false,
                orderBillCode: '',
                appUrl,
                couponUnreadMessage: 0,
                interestCouponUnreadMessage: 0,
                articleUnreadMessage: 0,
                relationInvest: 0,//投资好友人数,
                currentIndex: 0, //达人当前展示文案
                hasAdvt: false
            }
        },
        created(){
            this.addHive(1,'personal-center',1070);
            this.mode = window.localStorage.getItem('mode') == 'true' ? true : false;
            if ($device.isWeixin) {
                this.getShare();
            }
            timer = setInterval(() => {
                let len = this.masterList.length;
                this.currentIndex = (this.currentIndex + 1) % len;
            }, 4000);
            // 获取未读
            this.getUnread();
            // 获取投资好友人数
            this.getMaster();
            let event = ['_trackEvent', '个人中心', 'SHOW', '进入个人中心页面且已登录', '进入已登录个人中心'];
            window._hmt.push(event);
            // 是否是充值回来
            let rechargeOrderBillCode = window.sessionStorage.getItem('rechargeOrderBillCode');
            if (rechargeOrderBillCode) {
                this.orderBillCode = rechargeOrderBillCode;
                window.sessionStorage.removeItem('rechargeOrderBillCode');
                this.getTradeRecharge();
            }

        },
        computed: {
            ...mapState([
                'investorMobile',
                'accountCashAmount',
                'accountTotalInterests',
                'accountTotalAssets',
                'experienceAmount',
                'cashCouponCount',
                'investorRiskScore',
                'userVerifyStatus',
                'reservationCount',
                'investmentAmount',
                'rewardSum',
                'relationCount',
                'interestCouponCount',
            ]),
            masterList(){
                // 投资好友大于10人
                if (this.relationInvest >= 5) {
                    return ['理财达人，长期奖励', '额外奖励   收益加速']
                }
                return ['理财达人，长期奖励', `还需${5 - this.relationInvest}个投资好友`, '额外奖励   收益加速']
            }
        },
        components:{
            Modal, Advertise
        },
        methods: {
            getMaster(){
                return $api.get('/user/achievement')
                    .then(res => {
                        if (res.code == 200) {
                            //
                            this.relationInvest = res.data.relationInvestCount;
                        }
                    })
            },
            getUnread(){
                $api.get('/user/unread')
                    .then(resp => {
                        if (resp.code == 200) {
                            this.couponUnreadMessage = resp.data.couponUnreadMessage;
                            this.interestCouponUnreadMessage = resp.data.interestCouponUnreadMessage;
                            this.articleUnreadMessage = resp.data.articleUnreadMessage;
                        }
                    })
            },
            getBaofoo(){
                this.$store.dispatch('getAccountBaofoo');
            },
            // 开户流程
            goStep(){
                let {userVerifyStatus} = this;
                this.addHive(0,'personal-center',107001);
                switch (userVerifyStatus) {
                    case 0:
                        this.$router.push('/authentication');
                        break;
                    case 1:
                        submitAuthorization(this.$store.state.userId);
                        break;
                    case 2:
                        this.$router.push('/bind-bank-card');
                        break;
                    case 3:
                        this.$router.push('/set-pay-password');
                        break;
                    default:
                }
            },
            callBack(result){
                this.showModal = false;
                if (result) {
                    this.goStep();
                }
            },
            switchMode(){
                this.addHive(0,'personal-center',107015);
                this.mode = !this.mode
                window.localStorage.setItem('mode', this.mode);
            },
            login(){
                this.$router.replace('/login');
            },
            logout(){
                this.addHive(0,'personal-center',107002);
                let event = ['_trackEvent', '个人中心', 'CLICK', '个人中心-退出登录-点击', '在个人中心点击退出登录'];
                window._hmt.push(event);
                $api.post('/logout')
                    .then(data => {
                        if (data.code == 200) {
                            window.location.replace('/login');
                        } else {
                            Toast('退出登录失败');
                        }

                    })
            },
            getPath(path, boolean){
                let lable = '个人中心-我的资产-点击';
                let value = '在个人中心点击我的资产';
                if (path == '/reward') {
                    this.addHive(0,'personal-center',107003);
                    lable = '个人中心-我的奖励-点击';
                    value = '在个人中心点击我的奖励';
                }
                if (path == '/relation') {
                    this.addHive(0,'personal-center',107004);
                    lable = '个人中心-我的好友-点击';
                    value = '在个人中心点击我的好友';
                }
                if (path == '/reserve-list') {
                    lable = '个人中心-预约管理-点击';
                    value = '在个人中心点击预约管理';
                    this.addHive(0,'personal-center',107007);
                }
                if (path == '/invest-list') {
                    this.addHive(0,'personal-center',107005);
                    lable = '个人中心-我的投资-点击';
                    value = '在个人中心点击我的投资';
                }
                if (path == '/land-about-us.html') {
                    this.addHive(0,'personal-center',107006);
                    lable = '个人中心-关于我们-点击';
                    value = '在个人中心点击关于我们';
                }
                if (path == '/funds/my-fund') {
                    lable = '个人中心-我的基金-点击';
                    value = '在个人中心点击我的基金';
                    this.addHive(0,'personal-center',107008);
                }
                if (path == '/land-share.html') {
                    lable = '个人中心-一起赚-点击';
                    value = '在个人中心点击一起赚';
                    this.addHive(0,'personal-center',107009);
                }

                if (path == '/financial?tab=FIXI' || path == '/financial') {
                    lable = '个人中心-定期理财-点击';
                    value = '在个人中心点击定期理财';
                    this.addHive(0,'personal-center',107010);
                }
                if (path == '/financial?tab=PRIF') {
                    lable = '个人中心-高端理财-点击';
                    value = '在个人中心点击高端理财';
                }
                if (path == appUrl) {
                    lable = '从个人中心进入app下载页';
                    value = '从个人中心进入app下载页';
                    this.addHive(0,'personal-center',107011);
                }
                let event = ['_trackEvent', '个人中心', 'CLICK', lable, value];
                window._hmt.push(event);
                if (boolean) {
                    window.location.href = path;
                    return false
                }
                if (path == '/recharge' || path == '/withdraw') {
                    if(path == '/recharge'){
                        this.addHive(0,'personal-center',107012);
                    }
                    else {
                        this.addHive(0,'personal-center',107013);
                    }

                    if (this.userVerifyStatus != 9) {
                        this.showModal = true;
                        this.addHive(5,'personal-center',1070);
                        let event = ['_trackEvent', '个人中心', 'SHOW', '弹出开户弹窗', '弹出开户弹窗'];
                        window._hmt.push(event);
                        return false;
                    }
                    window.sessionStorage.setItem('backUrl', encodeURIComponent(window.location.href));
                }
                this.$router.push(path);

            },
            getShare(){
                wx.getShare({
                    title: '金疙瘩——个人中心'
                });
            },
            getTradeRecharge(){
                if (!this.orderBillCode) {
                    return false;
                }
                Indicator.open('正在等待银行返回结果...');
                let rechargeBillCode = this.orderBillCode;
                $api.get('/getTradeRecharge', {rechargeBillCode})
                    .then(res => {
                        if (res.code == 200) {
                            let {data} = res;
                            if (data.rechargeStatus === 0) {
                                let timer = setTimeout(() => {
                                    times++;
                                    if (times <= 5) {
                                        this.getTradeRecharge();
                                    } else {
                                        clearTimeout(timer);
                                        Indicator.close();
                                        MessageBox.alert(`银行充值返回较慢，请耐心等待，如有问题，请联系客服！`, '提示');
                                    }
                                }, 2000);
                            }
                            if (data.rechargeStatus === 1) {
                                this.getBaofoo();
                                Indicator.close();
                            }
                            if (data.rechargeStatus === 2) {
                                this.getBaofoo();
                                Indicator.close();
                                Toast('充值失败')
                            }
                        }

                    });
            }
        },
        mounted(){
            EventBus.$on('advertise', (picUrl) => {
                this.hasAdvt = picUrl;
            });
        },
        destroyed(){
            this.addHive(2,'personal-center',1070);
            clearInterval(timer)
        }
    }
</script>
