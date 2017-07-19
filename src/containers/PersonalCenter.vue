<template>
    <div class="personal-center">

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
            <div class="fund-center" flex  @click.stop="getPath('/my-assets')">
                <div flex-box="1">
                    <p class="info" v-if="mode">{{accountTotalAssets|currencyFormat}}元</p>
                    <p class="info" v-else="mode">****元</p>
                    <p class="title">总资产</p>
                </div>
                <div flex-box="1">
                    <p class="info" v-if="mode">{{accountCashAmount|currencyFormat}}元</p>
                    <p class="info" v-else="mode">****元</p>
                    <p class="title">可用余额</p>
                </div>
                <div flex-box="1">
                    <p class="info" v-if="mode">{{accountTotalInterests|currencyFormat}}元</p>
                    <p class="info" v-else="mode">****元</p>
                    <p class="title">累计收益</p>
                </div>
            </div>
            <div class="ticket-center">
                <div flex>
                    <div flex-box="1" flex="main:center">
                        <p class="btn" @click.stop="getPath('/recharge')">
                            充值
                        </p>
                    </div>
                    <div flex-box="1" flex="main:center">
                        <p class="btn" @click.stop="getPath('/withdraw')">
                            提现
                        </p>
                    </div>
                </div>
                <div flex class="ticket-detail" @click.stop="getPath('/ticket-list')">
                    <div flex-box="1" class="rl">
                        <p class="title">现金劵</p>
                        <p class="info">{{cashCouponCount}}个</p>
                    </div>
                  <!--  <div flex-box="1" class="rl">
                        <p class="title">加息卷</p>
                        <p class="info">5个</p>
                    </div>-->
                    <div flex-box="1" @click.stop="getPath('/experience-fund')">
                        <p class="title">体验金</p>
                        <p class="info">{{experienceAmount}}元</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="section seperate" flex="cross:center" @click.stop="getPath('/risk-assessment/wechat')" v-if="!investorRiskScore">
                <p class="assessment" flex-box="1" >
                    您未进行风险承受能力评估，为不影响投资请立即评估
                </p>
                <div flex-box="0">
                    <img class="arrow" src="../images/arrow-right.png" alt="arrow" >
                </div>
            </div>
            <div class="section seperate" flex="dir:top">
                <div  class="item bl" flex-box="1" flex="cross:center" @click.stop="getPath('/invest-list')">
                    <div flex-box="0">
                        <img  class="logo" src="../images/personal-center/financial-fixi.png" alt="financial" >
                    </div>
                    <p flex-box="1">定期理财</p>
                    <p flex-box="0">{{investmentAmount|currencyFormat}}</p>
                    <div flex-box="0">
                        <img class="arrow" src="../images/arrow-right.png" alt="arrow" >
                    </div>
                </div>
                <div  class="item" flex-box="1" flex="cross:center" @click.stop="getPath('/reserve-list')">
                    <div flex-box="0">
                        <img  class="logo" src="../images/personal-center/financial-prif.png" alt="financial" >
                    </div>
                    <p flex-box="1">高端理财</p>
                    <p flex-box="0">{{reservationCount}}个</p>
                    <div flex-box="0">
                        <img class="arrow" src="../images/arrow-right.png" alt="arrow" >
                    </div>
                </div>
            </div>
            <div class="section seperate" flex="dir:top">
                <div  class="item bl" flex-box="1" flex="cross:center" @click.stop="getPath('/reward')">
                    <div flex-box="0">
                        <img  class="logo" src="../images/personal-center/reward.png" alt="financial" >
                    </div>
                    <p flex-box="1">我的奖励</p>
                    <p flex-box="0">{{rewardSum|currencyFormat}}</p>
                    <div flex-box="0">
                        <img class="arrow" src="../images/arrow-right.png" alt="arrow" >
                    </div>
                </div>
                <div  class="item" flex-box="1" flex="cross:center" @click.stop="getPath('/relation')">
                    <div flex-box="0">
                        <img  class="logo" src="../images/personal-center/relation.png" alt="financial" >
                    </div>
                    <p flex-box="1">我的好友</p>
                    <p flex-box="0">{{relationCount}}</p>
                    <div flex-box="0">
                        <img class="arrow" src="../images/arrow-right.png" alt="arrow" >
                    </div>
                </div>
            </div>
            <div class="section seperate" flex="dir:top">
                <div  class="item" flex-box="1" flex="cross:center" @click.stop="getPath('/land-about-us.html',true)">
                    <div flex-box="0">
                        <img  class="logo" src="../images/personal-center/about-us.png" alt="financial" >
                    </div>
                    <p flex-box="1">关于我们</p>
                    <div flex-box="0">
                        <img class="arrow" src="../images/arrow-right.png" alt="arrow" >
                    </div>
                </div>
               <!-- <div  class="item" flex-box="1" flex="cross:center">
                    <div flex-box="0">
                        <img  class="logo" src="../images/personal-center/settings.png" alt="financial" >
                    </div>
                    <p flex-box="1">安全设置</p>
                    <div flex-box="0">
                        <img class="arrow" src="../images/arrow-right.png" alt="arrow" >
                    </div>
                </div>-->
            </div>
        </div>
        <div class="cantact-us">
            联系我们：{{telNumber}}
        </div>
        <div class="btn" @click.stop="logout()">
            退出登录
        </div>
        <modal  v-show="showModal" @callBack="callBack"></modal>
    </div>

</template>

<script>
    import {mapState} from 'vuex';
    import Modal from '../components/Modal';
    import {Toast} from 'mint-ui';
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
                mode:true,
                showModal: false
            }
        },
        created(){
            this.mode = window.localStorage.getItem('mode') =='true'?true:false;
            if ($device.isWeixin) {
                this.getShare();
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
                window.localStorage.setItem('mode',this.mode);
            },
            login(){
                this.$router.replace('/login');
            },
            logout(){
                $api.post('/logout')
                    .then(data => {
                        if (data.code == 200) {
                            window.location.replace('/login');
                        } else {
                            Toast('退出登录失败');
                        }

                    })
            },
            getPath(path,boolean){
                if(boolean){
                    window.location.href='/land-about-us.html';
                    return false
                }
                if(path=='/recharge'||path=='/withdraw'){
                    if (this.userVerifyStatus != 9) {
                        this.showModal = true;
                        return false;
                    }
                    window.sessionStorage.setItem('backUrl', encodeURIComponent(window.location.href.split('?')[0])+'?t='+new Date().getTime());
                }
                this.$router.push(path);
            },
            getShare(){
                wx.getShare({
                    title:'金疙瘩——个人中心'
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
