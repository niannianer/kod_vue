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
            <div class="tip f6" flex>
                <p flex-bpx="0">仅限绑定与实名信息一致的借记卡</p>
                <p flex-box="1" class="bank-tip" @click.stop="getBankList">支持绑卡的银行和限额</p>
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
                <span><img src="../images/tip.png" alt="" class="tip-img"></span>
                <div class="f6 p">确认开户代表您同意
                    <router-link to="/funds/serve-agreement" class="link">《盈米财富基金电子交易远程服务协议》</router-link>
                    和
                    <router-link to="/funds/pay-agreement" class="link">《委托支付协议》</router-link>
                    服务协议。
                </div>
            </div>
        </div>
        <div class="bottom">
            <button class="btn-primary btn-open" @click.stop="openCount">确认基金开户</button>
        </div>
        <kingold-picker v-if="showPicker" :default-index="0"
                        :list="ymList" @back="pickerBack"></kingold-picker>
    </div>
</template>

<script>
    import KingoldPicker from '../components/KingoldPicker'
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
                showCheckCard: true,
                showPicker: false,
                ymList: ''
            }
        },
        created(){
            this.addHive(1, 'fundsOpenCount',1057);
            let event = ['_trackEvent', '基金开户', 'SHOW', '进入基金开户页面', '进入基金开户页面'];
            window._hmt.push(event);
            this.getPickerList();
            if (window.sessionStorage.getItem('open-count')) {
                let openCountData = JSON.parse(window.sessionStorage.getItem('open-count'));
                window.sessionStorage.removeItem('open-count');
                for (let key in openCountData) {
                    this[key] = openCountData[key];
                }
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
        components: {
            KingoldPicker
        },
        methods: {
            getPickerList(){
                $api.get('/fund/account/bank/list')
                    .then(res => {
                        if (res.code == 200) {
                            console.log(res.data.list);
                            this.ymList = res.data.list;
                        }
                    });
            },
            getBankList(){
                this.addHive(0, 'fundsOpenCount_link_bankList',105701);
                this.addHive(2, 'fundsOpenCount_to_bankList',1057);
                let event = ['_trackEvent', '基金开户', 'CLICK', '基金开户-点击支持的银行', '基金开户-点击支持的银行'];
                window._hmt.push(event);
                window.sessionStorage.setItem('open-count', JSON.stringify(this.$data));
                this.$router.push({
                    path: '/bank-list',
                    query: {
                        yingmi: '1'
                    }
                })
            },
            checkBankName(){
                this.showPicker = true;
            },
            pickerBack(result){
                this.showPicker = false;
                this.paymentType = result.paymentType;
                this.bankNameYM = result.name;
                this.istip = false;
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
                this.addHive(0, 'fundsOpenCount_btn_submit',105702);
                let event = ['_trackEvent', '基金开户', 'CLICK', '基金开户-点击确认开户', '基金开户-点击确认开户'];
                window._hmt.push(event);
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
                            this.addHive(2, 'fundsOpenCount_to_fundsOpencountVerify',1057);
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
        destroyed(){
            this.addHive(2, 'fundsOpenCount',1057);
        }
    }
</script>
