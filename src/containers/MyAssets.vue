<template>
    <div flex="dir:top" flex-box="1" class="my-assets">
        <div class="assets-body" flex-box="1">
            <div class="assets">
                <div class="title">总资产(元）</div>
                <div class="number">{{accountTotalAssets | currencyFormat}}</div>
                <div class="profit-withdraw" flex>
                    <div class="profit" flex-box="0">
                        <div class="title">累计收益(元) </div>
                        <div class="number" v-if="accountTotalInterests>=0">
                            +{{accountTotalInterests | currencyFormat}}
                        </div>
                        <div class="number" v-if="accountTotalInterests<0">-{{accountTotalInterests | currencyFormat}}
                        </div>
                    </div>
                    <div class="profit" flex-box="0">
                        <div class="title">可提现金额(元)</div>
                        <div class="number">{{accountCashAmount | currencyFormat}}</div>
                    </div>

                </div>
            </div>
            <div class="item" flex>
                <div class="item-left" flex-box="1">我的银行卡</div>
                <div class="item-right" flex-box="0" v-if="userVerifyStatus<3" @click.stop="addBankCard">
                    添加银行卡
                </div>
                <div class="item-right" flex-box="0" v-else @click.stop="getBank">
                    已绑定
                </div>
            </div>
            <div class="item" @click.stop="billList" flex>
                <div flex-box="1" class="item-left" >
                    我的账户明细
                </div>
            </div>
            <div class="item" flex v-if="userVerifyStatus!=9" @click.stop="createUser">
                <div class="item-left" flex-box="1">完成开户可随时随地投资</div>
                <div class="item-right" flex-box="0"></div>
            </div>
            <div class="tel-info">
                若更换绑定银行卡请联系：<span class="span">{{telNumber}}</span>
            </div>
        </div>
        <div class="assets-footer" flex-box="0" flex>
            <button class="btn-recharge" flex-box="1" @click.stop="recharge">充值</button>
            <button class="btn-withdraw" flex-box="1" @click.stop="withdraw">提现</button>
        </div>
        <modal v-show="showModal" @callBack="callBack"></modal>
    </div>
</template>
<script>
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    import {Toast, Indicator, MessageBox} from 'mint-ui';
    import {telNumber} from '../tools/config';
    import {submitAuthorization} from '../tools/operation';
    import Modal from '../components/Modal';
    import  '../less/my-assets.less';
    import wx from '../tools/wx';
    import $device from '../tools/device';
    let times = 0;
    export default {
        name: 'my-assets',
        data(){
            return {
                telNumber,
                timer: null,
                times: 0,
                showModal: false,
                orderBillCode: ''
            }
        },
        components: {
            Modal
        },
        created(){
            if ($device.isWeixin) {
                this.getShare();
            }
            this.getBaofoo();
            if (this.$route.query.t) {
                window.sessionStorage.setItem('fromBaoFoo', '1');
                if (window.location.href.indexOf('test') > -1) {
                    window.location.replace('https://static-test.zj-hf.cn/my-assets');
                } else {
                    window.location.replace('https://zj-static.zj-hf.cn/my-assets');
                }
            } else {
                let rechargeOrderBillCode = window.sessionStorage.getItem('rechargeOrderBillCode');
                let fromBaoFoo = window.sessionStorage.getItem('fromBaoFoo');
                if (fromBaoFoo) {
                    this.orderBillCode = rechargeOrderBillCode;
                    window.sessionStorage.removeItem('rechargeOrderBillCode');
                    window.sessionStorage.removeItem('fromBaoFoo');
                    this.getTradeRecharge();
                }
            }
            let event = ['_trackEvent', '我的资产', 'SHOW', '进入我的资产页面', '进入我的资产页面'];
            window._hmt.push(event);
        },
        computed: mapState([
            'userVerifyStatus',
            'accountTotalAssets',
            'accountTotalInterests',
            'accountCashAmount']),
        methods: {
            getBaofoo(){
                this.$store.dispatch('getAccountBaofoo');
            },
            /* 查询订单状态*/
            getTradeRecharge(){

                let rechargeBillCode = this.orderBillCode;
                if(!rechargeBillCode){
                    return false;
                }
                Indicator.open('正在等待银行返回结果...');
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
                        }else {
                            Indicator.close();
                        }

                    });
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
            addBankCard(){
                this.showModal = true;
                let event = ['_trackEvent', '我的资产', 'CLICK', '我的资产页面-绑定银行卡', '在我的资产页面点击绑定银行卡'];
                window._hmt.push(event);
                event = ['_trackEvent', '我的资产', 'SHOW', '弹出开户弹窗', '弹出开户弹窗'];
                window._hmt.push(event);
            },
            getBank(){
                let event = ['_trackEvent', '我的资产', 'CLICK', '我的资产页面-查看银行卡', '在我的资产页面点击查看银行卡'];
                window._hmt.push(event);
                this.$router.push('/my-count')
            },
            recharge(){
                let {userVerifyStatus} = this;
                if (userVerifyStatus != 9) {
                    this.showModal = true;
                    let event = ['_trackEvent', '我的资产', 'SHOW', '弹出开户弹窗', '弹出开户弹窗'];
                    window._hmt.push(event);
                    return false;
                }
                let event = ['_trackEvent', '我的资产', 'CLICK', '在我的资产页面点击充值按钮', '我的资产页面-点击充值按钮'];
                window._hmt.push(event);
                window.sessionStorage.setItem('backUrl', encodeURIComponent(window.location.href.split('?')[0]+ '?t=' + new Date().getTime()));
                this.$router.push('/recharge');

            },
            withdraw(){
                let {userVerifyStatus} = this;
                if (userVerifyStatus != 9) {
                    this.showModal = true;
                    let event = ['_trackEvent', '我的资产', 'SHOW', '弹出开户弹窗', '弹出开户弹窗'];
                    window._hmt.push(event);
                    return false;
                }
                let event = ['_trackEvent', '我的资产', 'CLICK', '在我的资产页面点击提现按钮', '我的资产页面-点击提现按钮'];
                window._hmt.push(event);
                this.$router.push('/withdraw');
            },
            createUser(){

                this.goStep(); /*直接去开户，而不需要弹框提示*/
                let event = ['_trackEvent', '我的资产', 'SHOW', '弹出开户弹窗', '弹出开户弹窗'];
                window._hmt.push(event);
            },
            callBack(result){
                this.showModal = false;
                console.log(result);
                if (result) {
                    this.goStep();
                }
            },
            getShare(){
                wx.getShare({
                    title: '金疙瘩——我的资产'
                });
            },
            billList(){
                let event = ['_trackEvent', '我的资产', 'CLICK', '在我的资产页面点击账单', '我的资产页面-点击账单'];
                window._hmt.push(event);
                this.$router.push('/account-detail');
            }
        },
        destroyed(){
            clearInterval(this.timer);
        }
    }
</script>
