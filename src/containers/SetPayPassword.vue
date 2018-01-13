<template>
    <div class="set-pay-password" flex="dir:top">

        <div class="password-header" flex-box="1">
            <div class="card-text">为了保障您的账户安全，请设置交易密码</div>
            <div class="steps" flex="box:mean">
                <div class="item" flex="main:center">
                    <span class="round active" :class="{'app':isApp}">1</span>
                    <div class="line-right active" :class="{'app':isApp}"></div>
                </div>
                <div class="item" flex="main:center">
                    <span class="round active" :class="{'app':isApp}">2</span>
                    <div class="line-left active" :class="{'app':isApp}"></div>
                    <div class="line-right active" :class="{'app':isApp}"></div>
                </div>
                <div class="item" flex="main:center">
                    <span class="round active" :class="{'app':isApp}">3</span>
                    <div class="line-left active" :class="{'app':isApp}"></div>
                </div>

            </div>
            <div class="psw-img">
            </div>
            <p class="psw-title">{{pTitle}}</p>
            <div class="psw-input">
                <ul flex="main:center">
                    <li v-for=" n in 6" :class="{active:n<=password.length,'app':isApp}"></li>
                </ul>
                <p class="error-hint" v-show="pShow">两次密码输入不一致</p>
            </div>
            <div class="psw-btn" flex="main:center">
                <button :class="{'active':btnActive,'app':isApp}" v-show="btnShow" @click.stop="submit">完成</button>
            </div>
        </div>
        <keyboard title="键盘" flex-box="0" @callBack="callBack"></keyboard>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import $device from '../tools/device';
    import $api from '../tools/api';
    import {refreshApp} from '../tools/operation';
    import EventBus from  '../tools/event-bus';
    import {Toast} from 'mint-ui';
    import Keyboard from '../components/Keyboard';
    import '../less/set-pay-password.less';
    export default {
        name: 'set-pay-password',
        data(){
            return {
                pTitle: '',//
                password: '',
                storagePassword: '',
                pShow: false,
                btnActive: false,
                btnShow: false,
                isGetTicket: false/*是否已经获得现金券*/
            }
        },
        components: {
            Keyboard
        },
        created(){
            this.addHive(1, 'setPayPassword',1044);
            refreshApp();
            let event = ['_trackEvent', '设置交易密码', 'SHOW', '进入设置交易密码页面', '进入设置交易密码页面'];
            window._hmt.push(event);
        },
        computed: {
            ...mapState(['accountStatus']),
            isApp(){
                return true;
            }
        },
        methods: {
            callBack(password){
                if (password == 'only') {
                    this.password = '';
                    return
                }
                this.pShow = false;
                this.password = password;
                if (this.storagePassword.length > 2) {
                    this.pTitle = '请再次确认';
                    let event = ['_trackEvent', '设置交易密码', 'SHOW', '进入确认交易密码页面', '进入确认交易密码页面'];
                    window._hmt.push(event);
                    if (password.length >= 6) {
                        this.btnActive = true;
                    } else {
                        this.btnActive = false;
                    }
                } else {
                    this.btnShow = false;
                    if (password.length >= 6) {
                        this.storagePassword = password;
                        setTimeout(() => {
                            EventBus.$emit('clearInput');
                            this.btnShow = true;
                        }, 300);
                    }
                }
            },
            submit(){
                this.addHive(0, 'setPayPassword_btn_submit',104401);
                let event = ['_trackEvent', '设置交易密码', 'SHOW', '确认交易密码页面-点击完成', '确认交易密码页面-点击完成'];
                window._hmt.push(event);
                if (!this.btnActive) {
                    return
                }
                let isFund = 0;
                if (this.$route.query.isFund) {
                    isFund = 1;
                }
                let {password, storagePassword} = this;
                if (password == storagePassword) {
                    $api.post('/initPayPassword',
                        {
                            userPayPassword: password,
                            isFund
                        }).then(msg => {
                        if (msg.code == 200) {
                            //没有录入适当性管理信息，跳适当性录入信息页面
                            if (isFund && this.accountStatus < 3) {
                                this.addHive(2, 'setPayPassword_to_fundsInfo',1044);
                                this.$router.replace({
                                    path: '/funds/info'
                                });
                            } else if (isFund) {
                                //完成录入适当性管理信息，跳基金详情页
                                this.addHive(2, 'setPayPassword_to_fundsDetail',1044);
                                this.$router.back();
                            } else if(window.sessionStorage.getItem('newHandUrl')){
                                window.location.href = decodeURIComponent(window.sessionStorage.getItem('newHandUrl'));
                            } else {
                                this.addHive(2, 'setPayPassword_to_accountComplete',1044);
                                this.$router.replace({
                                    path: '/account-complete'
                                });
                            }
                            setTimeout(() => {

                                this.$store.dispatch('getAccountInfo');
                                this.$store.dispatch('getPersonalCenterMsg');
                                this.$store.dispatch('getBankInfo');
                            }, 1000);
                        } else {
                            Toast({
                                message: msg.msg,
                                duration: 5000
                            });
                        }
                    });
                } else {
                    this.storagePassword = '';
                    this.pShow = true;
                    this.btnShow = false;
                    this.pTitle = '';
                    EventBus.$emit('clearInputOnly');
                }
            }
        },
        destroyed(){

        }
    }
</script>
