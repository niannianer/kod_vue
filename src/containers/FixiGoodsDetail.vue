<template>
    <div class="fixi-goods-detail">
        <div class="warp">
            <div class="master-hint" flex="cross:center main:justify" v-if="production.talentAwardMaxRate">
                <span>达人奖励系数{{production.talentAwardMaxRate}}</span>
                <span class="how" @click.stop="getMasterPage">如何获得达人奖励</span>
            </div>
            <div class="top">
                <div class="main-title ellipsis">{{production.productAbbrName}}</div>
                <div class="sub-title">预计年化收益率</div>
                <div class="rate">{{production.annualInterestRate}}</div>
                <div class="items" flex="main:jusitfy">
                    <div class="item" flex-box="1">
                        <div class="item-text">产品期限(天)</div>
                        <div class="item-number">{{productPeriod}}</div>
                    </div>
                    <div class="item" flex-box="1">
                        <div class="item-text">剩余额度(元)</div>
                        <div class="item-number">{{production.productRemainAmountValue}}</div>
                    </div>
                </div>
                <div class="progress-warp" flex="cross:center">
                    <span flex-box="0">进度:</span>
                    <div flex-box="1" class="progress">
                        <div class="active" :style="{'width':production.productProgress+'%'}"></div>
                    </div>
                    <span flex-box="0">{{production.productProgress}}%</span>
                </div>
            </div>
            <div class="ticket-wrap" v-if="production.productLabel" flex>
                <div class="ticket-item" v-for="(item,index) in production.productLabel">{{item}}</div>
            </div>
            <div class="date-warp" flex>
                <div class="date-item" flex-box="1">
                    <div class="date-info">发布日</div>
                    <div class="round-warp">
                        <div class="round active" flex="main:center cross:center">
                            <div class="inner-round"></div>
                        </div>
                        <div class="line-right" :class="{'red':step>=1}"></div>

                    </div>
                    <div class="date">{{production.productPublishDate}}</div>
                </div>
                <div class="date-item" flex-box="1">
                    <div class="date-info">起息日</div>
                    <div class="round-warp">
                        <div class="round" :class="{'active':step>=1}" flex="main:center cross:center">
                            <div class="inner-round"></div>
                        </div>
                        <div class="line-left" :class="{'red':step>=1}"></div>
                        <div class="line-right" :class="{'red':step>=2}"></div>

                    </div>
                    <div class="date">{{production.productInterestDate}}</div>
                </div>
                <div class="date-item" flex-box="1">
                    <div class="date-info">到期日</div>
                    <div class="round-warp">
                        <div class="round" :class="{'active':step>=2}" flex="main:center cross:center">
                            <div class="inner-round"></div>
                        </div>
                        <div class="line-left" :class="{'red':step>=2}"></div>
                        <div class="line-right" :class="{'red':step>=3}"></div>

                    </div>
                    <div class="date">{{production.productExpiringDate}}</div>
                </div>
                <div class="date-item" flex-box="1">
                    <div class="date-info">预期收款日</div>
                    <div class="round-warp">
                        <div class="round" :class="{'active':step>=3}" flex="main:center cross:center">
                            <div class="inner-round"></div>
                        </div>
                        <div class="line-left" :class="{'red':step>=3}"></div>
                    </div>
                    <div class="date">{{production.productPaymentDate}}</div>
                </div>
            </div>

            <div class="basic">
                <div class="basic-title">基本要素</div>
                <div class="content">
                    <div class="item" flex="box:mean" v-if="production.productName">
                        <span>产品全称</span>
                        <span class="ellipsis">{{production.productName}}</span>
                    </div>
                    <div class="item" flex="box:mean" v-if="production.productCode">
                        <span>项目编号</span>
                        <span class="ellipsis">{{production.productCode}}</span>
                    </div>
                    <div class="item" flex="box:mean" v-if="production.productScale">
                        <span>产品规模</span>
                        <span class="ellipsis">{{production.productScale}}</span>
                    </div>

                    <div class="item" flex="box:mean" v-if="production.productMaxInvestment">
                        <span>投资上限</span>
                        <span class="ellipsis">{{production.productMaxInvestment}}</span>
                    </div>

                    <div class="item" flex="box:mean" v-if="production.productInterestType">
                        <span>收益分配方式</span>
                        <span class="ellipsis">{{production.productInterestType}}</span>
                    </div>

                    <div class="item" flex="box:mean">
                        <span>是否可转</span>
                        <span class="ellipsis">{{production.isTransferFlag ? '可转' : '不可转'}}</span>
                    </div>

                    <div class="item" flex="box:mean" v-if="production.investorQualification">
                        <span>投资人条件</span>
                        <span class="ellipsis">{{production.investorQualification}}</span>
                    </div>
                </div>
            </div>
            <!--项目概况-->
            <div class="basic"
                 v-if="production.productIntroduction">
                <div class="basic-title">项目概况</div>
                <div class="basic-content outset" v-html="productIntroduction"></div>
            </div>
            <div style="height: .5rem"></div>
            <!--投资方向-->
            <div class="basic product-information" v-for="(item,index) in productInformation" :key="index">
                <div class="basic-title" @click.stop="setExpend(index)">
                    {{item.inforKey}}
                    <div class="arrow" :class="{'up':item.expend}"></div>
                </div>
                <div class="basic-content" :class="{'outset':item.expend}"
                     v-html="item.inforValue"></div>

            </div>

            <!--附件-->
            <div class="basic product-information" v-if="productAttachment">
                <div class="basic-title" @click.stop="expendAttachment()">
                    产品附件
                    <div class="arrow" :class="{'up':attachmentUp}"></div>
                </div>

                <div class="basic-content" :class="{'outset':attachmentUp}">
                    <div class="product-attachment" @click.stop="openPDF(productAttachment)"
                         v-for="(productAttachment,index) in production.productAttachment">
                        {{productAttachment.attachmentName}}
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div v-if="production.canBuy" flex="box:mean">
                <button class="min-invest" @click.stop="preInvest">{{production.productMinInvestmentValue}}元起投</button>
                <button class="do-invest" @click.stop="preInvest">立即投资</button>
            </div>
            <div v-else="production.canBuy">
                <!--预热中-->
                <div v-if="production.productStatusCode==1" class="can-not-buy" style="background: #FF6A37"
                     @click.stop="hot">
                    {{production.productStatus}}
                </div>
                <div  class="can-not-buy" v-else>{{production.productStatus}}</div>
            </div>
        </div>

        <modal v-show="showModal" @callBack="modalBack"></modal>
        <invest-input v-show="showInvest" title="输入投资金额" @close="showInvest=false"
                      :cash-amount="accountCashAmount"
                      :min-invest="production.productMinInvestmentValue"
                      :remain-amount="production.productRemainAmountValue"
                      :step-value="production.investmentIntervalValue"
                      :uid="productUuid"
                      :rate="production.expcRate"
                      :period="production.productPeriod"
                      :myInvestMax="myInvestMax"
                      @callBack="inputBack"></invest-input>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {Toast, MessageBox} from 'mint-ui';
    import $api from '../tools/api';
    import {submitAuthorization} from '../tools/operation';
    import {textToHtml, numAdd} from '../filters';
    import {logout} from '../tools/operation';
    import wx from '../tools/wx';
    import $device from '../tools/device';
    import InvestInput from '../components/InvestInput';
    import Modal from '../components/Modal'
    import '../less/fixi-goods-detail.less';
    const logo = require('../images/share-icon.png');
    export default {
        name: 'fixi-goods-detail',
        data(){
            return {
                productUuid: '',
                attachmentUp: false,
                showModal: false,
                showInvest: false,
                production: {}
            }
        },
        created(){
            this.addHive(1, 'fixi-goods-detail', 1013);
            this.$store.dispatch('getAccountBaofoo');
            this.productUuid = this.$route.query.productUuid;
            this.getGoodsDetail();
            if ($device.isWeixin) {
                this.getShare();
            }
            let event = ['_trackEvent', '定期理财详情', 'SHOW', '进入定期理财详情页', '进入定期理财详情页'];
            window._hmt.push(event);
        },
        components: {
            InvestInput,
            Modal
        },
        computed: {
            ...mapState([
                'isEligibleInvestor',
                'userVerifyStatus',
                'accountTotalAssets',
                'accountTotalInterests',
                'accountCashAmount',
                'userId',
                'investorRiskScore'
            ]),
            productPeriod(){
                if (this.production.productPeriod) {
                    return parseInt(this.production.productPeriod)
                }
                return '';
            },
            step(){
                let {
                    serverTime,
                    productInterestDate, productExpiringDate,
                    productPaymentDate
                } = this.production;
                if (!serverTime) {
                    return 0;
                }
                if (serverTime > productPaymentDate) {
                    return 3;
                }
                if (serverTime > productExpiringDate) {
                    return 2;
                }
                if (serverTime > productInterestDate) {
                    return 1;
                }

                return 0;
            },
            productIntroduction(){
                return textToHtml(this.production.productIntroduction);
            },
            productInformation(){
                return this.production.productInformation;

            },
            productAttachment(){
                return this.production.productAttachment && this.production.productAttachment.length > 0;
            },
            myInvestMax(){
                if (!this.production.productMaxInvestmentValue) {
                    return 0;
                }
                return Math.floor(this.production.productMaxInvestmentValue - (this.production.investAmount||0))

            }
        },
        methods: {
            setExpend(index){
                this.addHive(0, 'fixiGoodsDetail_item_expend', 101301);
                this.production.productInformation[index].expend = !this.production.productInformation[index].expend;
                let oper = '收起';
                if (this.production.productInformation[index].expend) {
                    oper = '打开';
                }
                let item = '';
                switch (index) {
                    case 0 :
                        item = '资金投向';
                        break;
                    case 1 :
                        item = '还款来源';
                        break;
                    case 2 :
                        item = '风险保障';
                        break;
                    case 3 :
                        item = '风险提示';
                        break;
                }
                let event = ['_trackEvent', '定期理财详情', 'CLICK', '在定期理财详情页' + oper + item + '', '定期理财详情页-' + oper + item + ''];
                window._hmt.push(event);
            },
            expendAttachment(){
                this.attachmentUp = !this.attachmentUp;
                let oper = '收起';
                if (this.attachmentUp) {
                    oper = '打开';
                }
                this.addHive(0, 'fixiGoodsDetail_item_file', 101302);
                let event = ['_trackEvent', '定期理财详情', 'CLICK', '在定期理财详情页' + oper + '产品附件', '定期理财详情页-' + oper + '产品附件'];
                window._hmt.push(event);
            },
            openPDF(item){
                this.addHive(0, 'fixiGoodsDetail_link_pdf', 101303);
                if (item.attachmentLink) {
                    let pdfUrl = item.attachmentLink;
                    let pdfName = item.attachmentName
                    pdfUrl = pdfUrl.replace(/^http\.*:/, 'https:');
                    let event = ['_trackEvent', '定期理财详情', 'CLICK', '在定期理财详情页点击产品附件', '定期理财详情页-点击产品附件'];
                    window._hmt.push(event);
                    window.location.href = '/pdf/web/viewer.html?src='
                        + encodeURIComponent(pdfUrl) + '&name=' + encodeURIComponent(pdfName);
                }
            },
            getGoodsDetail(){
                let params = {
                    productType: 'FIXI',
                    productUuid: this.productUuid
                };
                $api.get('/product/getDetail', params)
                    .then(data => {
                        if (data.code == 200) {
                            data.data.productInformation = data.data.productInformation || [];
                            data.data.productInformation.map(el => {
                                el.inforValue = textToHtml(el.inforValue);
                                el.expend = false;
                            })
                            this.production = data.data;
                            this.production.expcRate = data.data.annualInterestRateValue;
                            if (data.data.increaseInterestRateValue) {
                                this.production.expcRate = numAdd(data.data.annualInterestRateValue, data.data.increaseInterestRateValue);
                            }
                            console.log(this.production);
                        } else {
                            Toast(data.msg);
                        }
                    })
            },
            preInvest(){
                if (this.userId) {
                    this.doInvest();
                } else {
                    this.$store.dispatch('getUserInfo')
                        .then(data => {
                            if (data.code == 401) {
                                logout();
                            }
                            if (data.code == 200) {
                                this.doInvest();
                            }
                        });
                }

            },
            doInvest(){
                let {userVerifyStatus} = this;
                if (userVerifyStatus != 9) {
                    this.showModal = true;
                    let event = ['_trackEvent', '定期理财详情', 'SHOW', '弹出开户弹窗', '弹出开户弹窗'];
                    window._hmt.push(event);
                    this.addHive(5, 'fixiGoodsDetail_modal_auth');
                } else {
                    this.checkRiskAssess();
                }
                let event = ['_trackEvent', '定期理财详情', 'CLICK', '在定期理财详情页点击立即投资', '定期理财详情页-点击立即投资'];
                window._hmt.push(event);
            },
            goStep(){
                window.sessionStorage.setItem('detail', 1)
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
            modalBack(result){
                this.showModal = false;
                if (result) {
                    this.goStep();
                }
            },
            inputBack(result){
                console.log(result);
            },
            getShare(){
                let params = {
                    url: window.location.href
                }
                /*if ($device.ios) {
                 params.url = window.shareUrl;
                 }*/
                $api.get('/wechat/shareInfo', params)
                    .then(data => {
                        if (data.code == 200) {
                            this.setShare(data.data.shareInfo);
                        }
                    });
            },
            setShare(config){
                wx.config(config);
                let content = {
                    title: '金疙瘩——中高端理财产品聚集地',
                    link: window.location.href,
                    imgUrl: logo,
                    desc: '汇聚中冀独家优质资产，专业理财师团队贴心服务，智能化的定制理财解决方案。'
                }
                wx.wx.ready(() => {
                    wx.onMenuShareTimeline(content);
                    wx.onMenuShareAppMessage(content);
                });
            },
            checkRiskAssess(){
                if (!this.investorRiskScore) {
                    MessageBox({
                        title: '提示',
                        message: '根据《投资者适当性管理实施指引》，为保障您购买合适的产品，请花十秒进行投资风险承受能力测评。',
                        confirmButtonText: '去测评',
                        showCancelButton: true
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$router.push('/risk-assessment/wechat');
                        }
                    });
                } else {
                    this.showInvest = true;
                }
            },
            hot(){
                Toast('产品在预热中，请稍后再进行购买');
            },
            getMasterPage(){
                this.addHive(0, 'fixiDoodsDetail_link_financialMaster', 101304);
                window.location.href = '/land-financial-master.html';
            }


        },
        destroyed()
        {
            this.addHive(2, 'fixi-goods-detail', 1013);
        }
    }
</script>
