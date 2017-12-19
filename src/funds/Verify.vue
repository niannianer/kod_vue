<template>
    <div class="verify">
        <p class="tip">验证码已发送至{{starPhone}}，请输入收到的验证码</p>
        <div class="content" flex>
            <input type="text" v-model="verifyCode" flex-box="0" class="input" placeholder="短信验证码" maxlength="6">
            <p class="btn" flex="cross:center main:center" flex-box="1" @click.stop="reSend" v-if="verifyTimeLeft<=0">{{verifyText}}</p>
            <p flex-box="1" class="btn disable" flex="cross:center main:center" v-else>{{verifyTimeLeft}}</p>
        </div>
        <p class="confirm" @click.stop="confirm">确认</p>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {Toast} from 'mint-ui';
    import $api from '../tools/api';
    import '../less/fund/verify.less';
    export default {
        name: 'verify',
        data(){
            return {
                verifyCode: '',
                accountName: '',
                identityNo: '',
                paymentType: '',
                paymentNo: '',
                starPhone: '',
                verifyTimeLeft: '',
                verifyText: '重新发送',
                type: '',
                phone: ''
            }
        },
        created(){
            this.addHive(1, 'fundsVerify');
            let event = ['_trackEvent', '基金开户验证', 'SHOW', '进入基金开户验证页面', '进入基金开户验证页面'];
            window._hmt.push(event);
            console.log(this.isSetPayPassword);
            let phone = this.$route.query.phone;
            this.starPhone = phone.substr(0, 3) + '****' + phone.substr(7);
            this.verifyTimeLeft = 59;
            this.timeCount();
            this.phone = this.$route.query.phone;
            this.accountName = decodeURIComponent(this.$route.query.accountName);
            this.identityNo = decodeURIComponent(this.$route.query.identityNo);
            this.paymentType = this.$route.query.paymentType;
            this.paymentNo = this.$route.query.paymentNo;
            this.type = this.$route.query.type;
        },
        computed: {
            ...mapState(['isSetPayPassword','accountStatus','investorRiskScore'])
        },
        methods: {
            reSend(){
                this.addHive(0, 'fundsVerify_btn_getVerify');
                let event = ['_trackEvent', '基金开户验证', 'CLICK', '基金开户验证-点击获取验证码', '基金开户验证-点击获取验证码'];
                window._hmt.push(event);
                let {accountName, identityNo, paymentType, paymentNo, phone, type} = this;
                $api.post('/fund/account/open/prepare', {
                    accountName,
                    identityNo,
                    paymentType,
                    paymentNo,
                    phone,
                    type
                })
                    .then(resp => {
                        if (resp.code == 200) {
                            this.verifyTimeLeft = 59;
                            this.timeCount();
                        }
                    })
            },
            timeCount(){
                this.timer = setTimeout(() => {
                    this.verifyTimeLeft = this.verifyTimeLeft - 1;
                    if (this.verifyTimeLeft >= 1) {
                        this.timeCount();
                    }
                }, 1000);
            },
            clearTimeCount(){
                this.verifyTimeLeft = 0;
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            confirm(){
                this.addHive(0, 'fundsVerify_btn_confirmVerify');
                let event = ['_trackEvent', '基金开户验证', 'CLICK', '基金开户验证-点击确认', '基金开户验证-点击确认'];
                window._hmt.push(event);
                if (!this.verifyCode || this.verifyCode.length != 6) {
                    Toast('请输入正确的验证码')
                    return
                }
                let {accountName, identityNo, paymentType, paymentNo, phone, verifyCode, type} = this;
                $api.post('/fund/account/open/confirm', {
                    accountName,
                    identityNo,
                    paymentType,
                    paymentNo,
                    phone,
                    verifyCode,
                    type
                })
                    .then(resp => {
                        if (resp.code == 200) {
                            setTimeout(()=>{
                                this.$store.dispatch('getAccountInfo');
                                this.$store.dispatch('getPaymentInfo');
                                if(this.investorRiskScore !=0 ){
                                    this.$store.dispatch('getRiskInfo');
                                }
                            },100)
                            if (!this.isSetPayPassword) {
                                this.addHive(2, 'fundsVerify_to_setPayPass');
                                this.$router.replace({
                                    path: '/set-pay-password',
                                    query: {
                                        isFund: 1
                                    }
                                })
                            } else if (this.accountStatus < 3) {
                                this.addHive(2, 'fundsVerify_to_fundsInfo');
                                this.$router.replace({
                                    path: '/funds/info'
                                });
                            } else {
                                this.addHive(2, 'fundsVerify_to_lastPage');
                                this.$router.back();
                            }
                        }
                        else {
                            Toast(resp.msg);
                        }
                    })
            }
        },
        destroyed(){
            this.addHive(2, 'fundsVerify');
        }
    }
</script>
