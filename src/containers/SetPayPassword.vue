<template>
    <div class="set-pay-password" flex="dir:top">

        <div class="password-header" flex-box="1">
            <div class="card-text">为了保障您的账户安全，请设置交易密码</div>
            <div class="steps" flex="box:mean">
                <div class="item" flex="main:center">
                    <span class="round active">1</span>
                    <div class="line-right active"></div>
                </div>
                <div class="item" flex="main:center">
                    <span class="round active">2</span>
                    <div class="line-left active"></div>
                    <div class="line-right active"></div>
                </div>
                <div class="item" flex="main:center">
                    <span class="round active">3</span>
                    <div class="line-left active"></div>
                </div>

            </div>
            <div class="psw-img">
            </div>
            <p class="psw-title">{{pTitle}}</p>
            <div class="psw-input">
                <ul flex="main:center">
                    <li v-for=" n in 6" :class="{active:n<=password.length}"></li>
                </ul>
                <p class="error-hint" v-show="pShow">两次密码输入不一致</p>
            </div>
            <div class="psw-btn" flex="main:center">
                <button :class="{'active':btnActive}" v-show="btnShow" @click.stop="submit">完成</button>
            </div>
        </div>
        <keyboard title="键盘" flex-box="0" @callBack="callBack"></keyboard>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import EventBus from  '../tools/event-bus';
    import {Toast} from 'mint-ui';
    import Keyboard from '../components/Keyboard';
    import '../less/set-pay-password.less';
    export default {
        name: 'withdraw',
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
            let event = ['_trackEvent', '设置交易密码', 'SHOW', '进入设置交易密码页面', '进入设置交易密码页面'];
            window._hmt.push(event);
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
                        let event = ['_trackEvent', '设置交易密码', 'SHOW', '确认交易密码页面-点击完成', '确认交易密码页面-点击完成'];
                        window._hmt.push(event);
                        if (msg.code == 200) {
                            this.$router.replace('/account-complete');
                            setTimeout(() => {
                                this.$store.dispatch('getPersonalCenterMsg');
                                this.$store.dispatch('getBankInfo');
                            }, 1000);
                        } else {
                            Toast(msg.msg);
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
