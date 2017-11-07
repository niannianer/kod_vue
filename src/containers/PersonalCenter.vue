<template>
    <div class="personal-center" flex="dir:top">
        <div class="wrap" flex-box="1" style="overflow: auto">
            <div class="top">
                <div flex-box="0" class="switch-mode" @click.stop="switchMode">
                    <img src="../images/login/pwd-show@2x.png" alt="show" v-show="mode">
                    <img src="../images/login/pwd-hide@2x.png" alt="show" v-show="!mode">
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
                        <p class="info" v-if="mode">{{accountTotalAssets | currencyFormat}}元</p>
                        <p class="info" v-else="mode">****元</p>
                        <p class="title">总资产</p>
                    </div>
                    <div flex-box="1">
                        <p class="info" v-if="mode">{{accountCashAmount | currencyFormat}}元</p>
                        <p class="info" v-else="mode">****元</p>
                        <p class="title">可用余额</p>
                    </div>
                    <div flex-box="1">
                        <p class="info" v-if="mode">{{accountTotalInterests | currencyFormat}}元</p>
                        <p class="info" v-else="mode">****元</p>
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
                    <div flex="box:mean" class="ticket-detail" @click.stop="getPath('/ticket-list')">
                        <div flex-box="1" class="rl">
                            <p class="title" :class="{redTip:couponUnreadMessage}">现金劵</p>
                            <p class="info">{{cashCouponCount}}个</p>
                        </div>
                        <div flex-box="1" @click.stop="getPath('/experience-fund')">
                            <p class="title">体验金</p>
                            <p class="info">{{experienceAmount}}元</p>
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
                    <div class="item bl" flex-box="1" flex="cross:center" @click.stop="getPath('/invest-list')">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/financial-fixi.png" alt="financial">
                        </div>
                        <p flex-box="1">定期理财</p>
                        <p flex-box="0">{{investmentAmount | currencyFormat}}</p>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                    <div class="item" flex-box="1" flex="cross:center" @click.stop="getPath('/reserve-list')">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/financial-prif.png" alt="financial">
                        </div>
                        <p flex-box="1">高端理财</p>
                        <p flex-box="0">{{reservationCount}}个</p>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                </div>
                <div class="section seperate" flex="dir:top">
                    <div class="item" flex-box="1" flex="cross:center" @click.stop="getPath('/land-share.html',true)">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/share.png" alt="share">
                        </div>
                        <p flex-box="1">一起赚</p>
                        <div flex-box="0">
                            <img class="arrow" src="../images/arrow-right.png" alt="arrow">
                        </div>
                    </div>
                </div>

                <div class="section seperate" flex="dir:top">
                    <div class="item" flex-box="1" flex="cross:center"
                         @click.stop="getPath('/land-about-us.html',true)">
                        <div flex-box="0">
                            <img class="logo" src="../images/personal-center/about-us.png" alt="financial">
                        </div>
                        <p flex-box="1">关于我们</p>
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
    import '../less/personal-center.less';
    import {submitAuthorization} from '../tools/operation';
    export default {
        name: 'personal-center',
        data(){
            return {
                telNumber,
                mode: true,
                showModal: false,
                orderBillCode: '',
                appUrl,
                couponUnreadMessage:0
            }
        },
        created(){
            this.mode = window.localStorage.getItem('mode') == 'true' ? true : false;
            if ($device.isWeixin) {
                this.getShare();
            }
            this.getUnread();
            let event = ['_trackEvent', '个人中心', 'SHOW', '进入个人中心页面且已登录', '进入已登录个人中心'];
            window._hmt.push(event);
            if (this.$route.query.t) {
                window.sessionStorage.setItem('fromBaoFoo', '1');
                if (window.location.href.indexOf('test') > -1) {
                    window.location.replace('https://static-test.zj-hf.cn/personal-center');
                } else {
                    window.location.replace('https://zj-static.zj-hf.cn/personal-center');
                }
                return false;
            }
            let rechargeOrderBillCode = window.sessionStorage.getItem('rechargeOrderBillCode');
            let fromBaoFoo = window.sessionStorage.getItem('fromBaoFoo');
            if (rechargeOrderBillCode && fromBaoFoo) {
                this.orderBillCode = rechargeOrderBillCode;
                window.sessionStorage.removeItem('rechargeOrderBillCode');
                window.sessionStorage.removeItem('fromBaoFoo');
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
                'relationCount'
            ])
        },
        methods: {
            getUnread(){
                $api.get('/user/unread')
                    .then(resp=>{
                        if(resp.code==200){
                            this.couponUnreadMessage = resp.data.couponUnreadMessage;
                        }
                    })
            },
            getBaofoo(){
                this.$store.dispatch('getAccountBaofoo');
            },
            goStep(){
                let {userVerifyStatus} = this;
                switch (userVerifyStatus) {
                    case 0:
                        //  window.location.href = '/realnameBased.html';
                        this.$router.push('/authentication');
                        break;
                    case 1:
                        // window.location.href = '/baoFoo.html?uid=' + this.$store.state.userId;
                        submitAuthorization(this.$store.state.userId);
                        break;
                    case 2:
                        // window.location.href = '/bindBankCard.html';
                        this.$router.push('/bind-bank-card');
                        break;
                    case 3:
                        //  window.location.href = '/setPayPassword.html';
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
                this.mode = !this.mode
                window.localStorage.setItem('mode', this.mode);
            },
            login(){
                this.$router.replace('/login');
            },
            logout(){
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
                    lable = '个人中心-我的奖励-点击';
                    value = '在个人中心点击我的奖励';
                }
                if (path == '/relation') {
                    lable = '个人中心-我的好友-点击';
                    value = '在个人中心点击我的好友';
                }
                if (path == '/reserve-list') {
                    lable = '个人中心-预约管理-点击';
                    value = '在个人中心点击预约管理';
                }
                if (path == '/invest-list') {
                    lable = '个人中心-我的投资-点击';
                    value = '在个人中心点击我的投资';
                }
                if (path == '/land-about-us.html') {
                    lable = '个人中心-关于我们-点击';
                    value = '在个人中心点击关于我们';
                }
                if (path == '/funds/my-fund') {
                    lable = '个人中心-我的基金-点击';
                    value = '在个人中心点击我的基金';
                }
                if (path == '/land-share.html') {
                    lable = '个人中心-一起赚-点击';
                    value = '在个人中心点击一起赚';
                }

                if (path == '/financial?tab=FIXI' || path == '/financial') {
                    lable = '个人中心-定期理财-点击';
                    value = '在个人中心点击定期理财';
                }
                if (path == '/financial?tab=PRIF') {
                    lable = '个人中心-高端理财-点击';
                    value = '在个人中心点击高端理财';
                }
                if (path == appUrl) {
                    lable = '从个人中心进入app下载页';
                    value = '从个人中心进入app下载页';
                }
                let event = ['_trackEvent', '个人中心', 'CLICK', lable, value];
                window._hmt.push(event);
                if (boolean) {
                    window.location.href = path;
                    return false
                }
                if (path == '/recharge' || path == '/withdraw') {
                    if (this.userVerifyStatus != 9) {
                        this.showModal = true;
                        let event = ['_trackEvent', '个人中心', 'SHOW', '弹出开户弹窗', '弹出开户弹窗'];
                        window._hmt.push(event);
                        return false;
                    }
                    window.sessionStorage.setItem('backUrl', encodeURIComponent(window.location.href.split('?')[0]) + '?t=' + new Date().getTime());
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
        components: {
            Modal
        },
        destroyed(){

        }
    }
</script>
