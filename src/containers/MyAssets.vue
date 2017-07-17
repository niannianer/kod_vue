<template>
    <div flex="dir:top" flex-box="1" class="my-assets">
        <div class="assets-body" flex-box="1">
            <div class="assets">
                <div class="title">总资产(元）
                    <router-link class="account-list" :to="{path:'/account-detail'}">账单</router-link>
                </div>
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
    import {telNumber} from '../tools/config';
    import {submitAuthorization} from '../tools/operation';
    import Modal from '../components/Modal';
    import  '../less/my-assets.less';
    import wx from '../tools/wx';
    import $device from '../tools/device';
    let times=0;
    export default {
        name: 'my-assets',
        data(){
            return {
                telNumber,
                timer: null,
                times:0,
                showModal: false
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
            if(this.$route.query.t){
                if(window.location.href.indexOf('test')>-1){
                    window.location.replace('https://static-test.zj-hf.cn/my-assets');
                }else {
                    window.location.replace('https://zj-static.zj-hf.cn/my-assets');
                }

            }
        },
        computed: mapState([
            'userVerifyStatus',
            'accountTotalAssets',
            'accountTotalInterests',
            'accountCashAmount']),
        methods: {
            getBaofoo(){
                setTimeout(() => {
                    times++;
                    if(times>=3){
                      return;
                    }
                    this.$store.dispatch('getAccountBaofoo');
                    this.$store.dispatch('getBankInfo');
                    this.$store.dispatch('getUserInfo');
                    this.getBaofoo();
                }, 3000);
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
            },
            getBank(){
                this.$router.push('/my-count')
            },
            recharge(){
                let {userVerifyStatus} = this;
                if (userVerifyStatus != 9) {
                    this.showModal = true;
                    return false;
                }
                window.sessionStorage.setItem('backUrl', encodeURIComponent(window.location.href.split('?')[0]));
                this.$router.push('/recharge');

            },
            withdraw(){
                let {userVerifyStatus} = this;
                if (userVerifyStatus != 9) {
                    this.showModal = true;
                    return false;
                }
                this.$router.push('/withdraw');
            },
            createUser(){
                this.showModal = true;
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
                    title:'金疙瘩——我的资产'
                });
            }
        },
        destroyed(){
            clearInterval(this.timer);
        }
    }
</script>
