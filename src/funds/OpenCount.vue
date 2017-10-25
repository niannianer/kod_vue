<template>
    <div class="open-count" ref="openCount">
        <div class="wrap">
            <div class="tip">
                请确认您的个人信息，用于基金账户的开立
            </div>
            <div class="content">
                <div class="item bl f8" flex="cross:center">
                    <p class="item-title">真实姓名</p>
                    <input type="text" placeholder="请输入真实姓名" v-if="userVerifyStatus==0" class="input"
                           v-model="accountName">
                    <p v-else>{{investorRealName}}</p>
                </div>
                <div class="item f8" flex="cross:center">
                    <p class="item-title">身份证号</p>
                    <input type="text" placeholder="请输入身份证号" v-if="userVerifyStatus==0" class="input"
                           v-model="identityNo">
                    <p v-else>{{investorIdCardNo}}</p>
                </div>
            </div>
            <div class="tip">
                仅限绑定与实名信息一致的借记卡
            </div>
            <div class="content-1" v-if="userVerifyStatus>2&&showCheckCard" @click.stop="useNewCard=false">
                <div flex class="bank-info" :class="{'abandon':useNewCard}">
                    <img :src="imgUrls.yingmi[bankType]" alt="" class="bank-logo">
                    <div>
                        <p class="title">{{bankName}}<span class="span">（{{bankCardNoShort}}）</span></p>
                        <p class="info">选择金疙瘩银行卡作为基金银行卡</p>
                    </div>
                </div>
            </div>
            <div class="content seperate" v-if="userVerifyStatus>2&&showCheckCard" @click.stop="useNewCard=true">
                <div flex="cross:center" class="item">
                    <img src="../images/fund/open-count/plus.png" alt="" class="plus">
                    <p class="f8">使用新的银行卡</p>
                </div>
            </div>
            <div class="content" v-if="!(userVerifyStatus>2)||useNewCard">
                <div class="item bl f8" flex="cross:center">
                    <p class="item-title" flex-box="0">银行卡号</p>
                    <input type="text" flex-box="1" placeholder="请输入银行卡号" class="input" v-model="paymentNo"
                           @input="change"
                           @propertychange="change">
                </div>
                <div class="item bl f8" flex="cross:center" @click.stop="checkBankName">
                    <p class="item-title" flex-box="0">所属银行</p>
                    <p flex-box="1" :class="{'nametip':istip}">{{bankNameYM}}</p>
                    <img flex-box="0" src="../images/arrow-right.png" alt="" class="img">
                    <!--   <input type="text" placeholder="请输入所属银行" class="input" >-->
                </div>
                <div class="item f8" flex="cross:center">
                    <p class="item-title">预留手机号</p>
                    <input type="text" placeholder="请输入银行预留手机号" class="input" v-model="phone">
                </div>
            </div>
            <div class="tip-box" flex>
                <img src="../images/tip.png" alt="" class="tip-img" flex-box="0">
                <p class="f6 p" flex-box="1">确认开户代表您同意《盈米财富基金电子交易远程服务协议》和《委托支付协议》服务协议。</p>
            </div>
        </div>
        <div class="bottom">
            <button class="btn-primary btn-open" @click.stop="openCount">确认基金开户</button>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {mapState} from 'vuex';
    import * as imgUrls from '../tools/bank';
    import '../less/fund/open-count.less';
    import $api from '../tools/api';
    import $fun, {checkPhone} from '../tools/fun';
    export default {
        name: 'open-count',
        data(){
            return {
                imgUrls,
                useNewCard: false,
                accountName: '',
                identityNo: '',
                paymentNo: '',
                bankNameYM: '请输入所属银行',
                istip: true,
                phone: '',
                paymentType: '',
                bankType: '',
                showCheckCard:true
            }
        },
        created(){
            Toast('bank1')
            if (window.sessionStorage.getItem('open-count')) {
                let openCountData = JSON.parse(window.sessionStorage.getItem('open-count'));
                window.sessionStorage.removeItem('open-count');
                for (let key in openCountData) {
                    this[key] = openCountData[key];
                }
            }
            if (window.sessionStorage.getItem('bank-info')) {
                let bankInfo = JSON.parse(window.sessionStorage.getItem('bank-info'));
                window.sessionStorage.removeItem('bank-info')
                this.bankNameYM = bankInfo.name;
                this.istip = false;
                this.paymentType = bankInfo.paymentType;
            }
            if (this.investorRealName) {
                this.accountName = this.investorRealName;
            }
            if (this.investorIdCardNo) {
                this.identityNo = this.investorIdCardNo;
            }

            if (this.bankUserCardNo) {
                this.getBankType();
            }
        },
        computed: {
            ...mapState([
                'userVerifyStatus', 'investorRealName', 'investorIdCardNo', 'bankUserCardNo', 'bankCode', 'bankName', 'bankUserPhone'
            ]),
            bankCardNoShort(){
                return this.bankUserCardNo.substring(this.bankUserCardNo.length - 4);
            }
        },
        methods: {
            checkBankName(){
                window.sessionStorage.setItem('open-count', JSON.stringify(this.$data));
                this.$router.push({
                    path: '/bank-list',
                    query: {
                        yingmi: '1'
                    }
                })
            },
            getBankType(){
                $api.get('/fund/account/bank/info', {
                    bankCardNo: this.bankUserCardNo
                })
                    .then(resp => {
                        if (resp.code == 200) {
                            this.bankType = resp.data.paymentType
                        }
                        if (resp.code == 5602) {

                            this.showCheckCard = false;
                            this.useNewCard = true;
                        }
                    })
            },
            change(){
                this.paymentNo = this.paymentNo.replace(/\D/g, '').replace(/....(?!$)/g, '$& ');
                let card = this.paymentNo.replace(/[^\d]/g, '');
                if (card.length < 6) {
                    this.istip = true
                    this.bankNameYM = '请输入所属银行'
                }
                else if (card.length == 6) {
                    $api.get('/fund/account/bank/info', {
                        bankCardNo: card
                    }).then(resp => {
                        if (resp.code == 200) {
                            this.istip = false
                            this.bankNameYM = resp.data.name
                            this.paymentType = resp.data.paymentType
                        }
                    })
                }
            },
            checkAuthInput(){
                if (!$fun.valiRealName(this.accountName)) {
                    Toast('请输入真实姓名');
                    return false
                }
                if (!$fun.valiIdCard(this.identityNo)) {
                    Toast('请输入正确身份证号');
                    return false
                }
                return true
            },
            checkBankInput(){
                let bankUserCardNo = this.paymentNo.replace(/[^\d]/g, '');
                if (bankUserCardNo.length < 6) {
                    Toast('请输入正确银行卡号')
                    return false
                }
                if (!this.paymentType) {
                    Toast('请输入所属银行')
                    return false
                }
                if (!checkPhone(this.phone)) {
                    Toast('手机号输入有误')
                    return false
                }
                return true
            },
            openCount(){
                let type = 1;
                if (this.userVerifyStatus == 0) {
                    type = 0;
                    if (!this.checkAuthInput()) {
                        return
                    }
                }
                let paymentNo = this.paymentNo.replace(/[^\d]/g, '');
                let paymentType = this.paymentType;
                let phone = this.phone;

                if (this.userVerifyStatus < 3 || this.useNewCard) {/*页面输入绑卡信息*/
                    if (!this.checkBankInput()) {
                        return
                    }
                } else {
                    paymentNo = this.bankUserCardNo;
                    phone = this.bankUserPhone;
                    paymentType = this.bankType;

                }
                let {accountName, identityNo} = this;

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
                            this.$router.replace({
                                path: '/funds/verify',
                                query: {
                                    accountName: encodeURIComponent(accountName),
                                    identityNo: encodeURIComponent(identityNo),
                                    paymentType,
                                    paymentNo,
                                    phone,
                                    type
                                }
                            })
                        } else {
                            Toast(resp.msg)
                        }
                    })
            }
        },
        watch: {
            investorRealName(){
                if (this.investorRealName) {
                    this.accountName = this.investorRealName;
                }
            },
            investorIdCardNo(){
                if (this.investorIdCardNo) {
                    this.identityNo = this.investorIdCardNo;
                }
            },
            bankUserCardNo(){
                if (this.bankUserCardNo) {
                    this.getBankType();
                }
            }
        },
        mounted(){
            this.$refs.openCount.style.minHeight = window.innerHeight + 'px';
        },
        destroyed()
        {

        }
    }
</script>
