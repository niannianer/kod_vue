<template>
    <div class="ticket-aug" flex="dir:top">
        <div class="wrap" flex-box="1" style="overflow: auto">
            <div class="header">
                <img src="../images/ticket-aug/ticket-aug-bg.jpg" alt="ticket-aug-bg">
                <p class="duration">活动时间：9月7日-9月13日</p>
            </div>
            <div class="body">
                <img class="ticket" src="../images/ticket-aug/ticket.png" alt="ticket">
                <div class="content">
                    <div class="content-title" flex="main:jusitfy">
                        <div class="stars" flex-box="1" flex="main:jusitfy cross:center">
                            <span class="star" flex-box="1"></span>
                            <span class="star" flex-box="1"></span>
                            <span class="star" flex-box="1"></span>
                            <span class="star" flex-box="1"></span>
                            <span class="star" flex-box="1"></span>
                        </div>
                        <div class="text" flex-box="0">活动规则</div>
                        <div class="stars" flex-box="1" flex="main:jusitfy cross:center">
                            <span class="star" flex-box="1"></span>
                            <span class="star" flex-box="1"></span>
                            <span class="star" flex-box="1"></span>
                            <span class="star" flex-box="1"></span>
                            <span class="star" flex-box="1"></span>
                        </div>
                    </div>
                    <div class="content-info rules">
                        <div flex>
                            <p flex-box="0">1、</p>
                            <p>活动仅限新注册及注册未绑卡用户参加，完成绑卡操作后红包自动发放至用户平台账户中，已绑卡用户无法参加活动；</p>
                        </div>
                        <div flex>
                            <p flex-box="0">2、</p>
                            <p>红包自领取之日起30天内有效，仅限购买平台90天期产品使用；</p>
                        </div>
                        <div flex>
                            <p flex-box="0">3、</p>
                            <p>活动时间2017年9月7日-2017年9月13日；</p>
                        </div>
                        <div flex>
                            <p flex-box="0">4、</p>
                            <p>平台已代扣代缴相关税费；</p>
                        </div>
                        <div flex>
                            <p flex-box="0">5、</p>
                            <p>金疙瘩保留对本活动在法律范围内的最终解释权。</p>
                        </div>
                    </div>
                </div>
                <div class="qrcode" v-if="isShared" flex-box="0">
                    <p>长按识别二维码，进入金疙瘩使用红包</p>
                    <img src="../images/qr-code.png" alt="qr-code">
                </div>
                <p class="tip">理财有风险，投资需谨慎</p>
            </div>
        </div>
        <div class="bottom" flex-box="0" flex="box:mean" v-if="!isApp">
            <p @click.stop="share">通知好友领红包</p>
            <p style="border-left:1px solid #fff " @click.stop="goStep">我要领红包</p>
        </div>
        <!--遮罩层-->
        <transition name="slide-fade" appear>
            <div class="mask" v-if="show" @click.stop="share()">
                <div>
                    分享给好友，一起赚钱
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import '../less/ticket-aug.less';
    import {submitAuthorization} from '../tools/operation';
    import wx from '../tools/wx';
    import {mapState} from 'vuex';
    import {Toast} from 'mint-ui';
    import $api from '../tools/api';
    import $device from '../tools/device';
    import requestHybrid from '../tools/hybrid';
    export default {
        name: 'ticket-aug',
        data(){
            return {
                show: false,
                isGetTicket: false,/*是否已得到现金券*/
                isApp:false,/*app端不显示底部按钮*/
                isShared:false/*站内站外（通过分享出去的链接访问视为站外）*/
            }
        },
        created(){
            this.getInfo();
            if(this.$route.query.from=='wx'){
                window.sessionStorage.removeItem('ticket-aug');
                /*站内访问时清除站外标记*/
                /*防止情景：站外访问。带上站外标记。未完成开户流程（清除站外标记）。回到站内打开活动页。*/
                let event = ['_trackEvent', '红包雨活动页', 'SHOW', '在菜单栏点击活动标题', '打开站内活动'];
                window._hmt.push(event);
            }
            if(window.sessionStorage.getItem('ticket-aug')){/*站外*/
                this.isShared = true;
                let event = ['_trackEvent', '红包雨活动页', 'SHOW', '从分享链接进入站外活动页', '进入站外活动页'];
                window._hmt.push(event);
            }
            if ($device.kingold) {
                this.isApp = true;
                requestHybrid({
                    tagname: 'title',
                    param: {
                        backtype: 0,// "0 : 后退 1 : 直接关闭 2: 弹对话框",
                        backAndRefresh: 1,
                        title:'送你一场红包雨',
                        keyboard_mode: 0//0 adjustresize 1 adjustpan
                    }
                })
                return false;
            }
            $api.get('/cashCoupon/list', {
                couponType: 1,
                startRow: 0,
                pageSize: 1
            })
                .then(resp => {
                    if (resp.code == 200) {
                        if (resp.data.couponCount) {
                            this.isGetTicket = true;
                            /*已经获得现金券*/
                        }
                    }
                })
        },
        computed: mapState([
            'userVerifyStatus',
        ]),
        methods: {
            getInfo(){
                $api.get('/getUserInfo')
                    .then(data => {
                        if (data.code == 200) {
                            this.userLoginName = data.data.userLoginName;
                            if ($device.isWeixin) {
                                this.getShare();
                            }
                        } else if (data.code == 401) {
                            if ($device.isWeixin) {
                                window.sessionStorage.setItem('logoutUrl', encodeURIComponent(window.location.href));
                                window.location.href = '/login';
                            }

                        }
                    });
            },
            getShare(){
                wx.getShare({
                    title: '好久不见，送个红包聊表想念。',
                    desc: '有钱赚的事绝对不能忘记你！大家赚才是真的赚~',
                    link: window.location.origin + '/land-ticket-aug-register.html?inviter=' + this.userLoginName,
                });
            },
            goStep(){
                let event = [];
                if(!this.isShared){/*站内*/
                    event = ['_trackEvent', '红包雨活动页', 'CLICK', '在站内活动页点击我要领红包', '站内领红包'];
                }
                else{/*站外*/
                    event = ['_trackEvent', '红包雨活动页', 'CLICK', '在站外活动页点击我要领红包', '站外领红包'];
                }
                window._hmt.push(event);
                if(this.isGetTicket){
                    Toast('您已经领取活动现金券，投资可以直接使用~');
                    return false;
                }
                let {userVerifyStatus} = this;
                switch (userVerifyStatus) {
                    case 0:
                        event = ['_trackEvent', '红包雨活动页', 'CLICK', '从活动页进入实名认证', '活动实名'];
                        window._hmt.push(event);
                        this.$router.push('/authentication');
                        break;
                    case 1:
                        event = ['_trackEvent', '红包雨活动页', 'CLICK', '从活动页进入授权页面', '活动授权'];
                        window._hmt.push(event);
                        console.log('fdddd1');
                        submitAuthorization(this.$store.state.userId);
                        console.log('fdddd2222');
                        break;
                    case 2:
                        event = ['_trackEvent', '红包雨活动页', 'CLICK', '从活动页进入绑卡页面', '活动绑卡'];
                        window._hmt.push(event);
                        this.$router.push('/bind-bank-card');
                        break;
                    case 3:
                        event = ['_trackEvent', '红包雨活动页', 'CLICK', '从活动页进入设置交易密码页面', '活动设置交易密码'];
                        window._hmt.push(event);
                        this.$router.push('/set-pay-password');
                        break;
                    case 9:
                        Toast('您已经完成实名绑卡，敬请期待下期活动~');
                        break;
                    default:
                }
            },
            share(){
                if (!this.show) {
                    this.show = true;
                    let event = [];
                    if(!this.isShared){/*站内*/
                        event = ['_trackEvent', '红包雨活动页', 'CLICK', '在站内活动页点击通知好友领红包', '站内分享'];
                        window._hmt.push(event);
                    }else{/*站外*/
                        event = ['_trackEvent', '红包雨活动页', 'CLICK', '在站外活动页点击通知好友领红包', '站外分享'];
                    }
                    window._hmt.push(event);
                } else {
                    this.show = false
                }
            },
        },
        destroyed(){

        }
    }
</script>
