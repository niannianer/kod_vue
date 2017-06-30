<template>
    <div class="fixi-goods-detail">
        <div class="warp">
            <div class="top">
                <div class="main-title ellipsis">{{production.productAbbrName}}</div>
                <div class="sub-title">预计年化收益率</div>
                <div class="rate">{{production.annualInterestRate}}</div>
                <div class="items" flex="main:jusitfy">
                    <div class="item" flex-box="1">
                        <div class="item-text">产品期限(天)</div>
                        <div class="item-number">{{parseInt(production.productPeriod)}}</div>
                    </div>
                    <div class="item" flex-box="1">
                        <div class="item-text">剩余额度(元)</div>
                        <div class="item-number">{{production.productRemainAmountValue}}</div>
                    </div>
                </div>
                <div class="progress-warp" flex>
                    <span flex-box="0">进度:</span>
                    <div flex-box="1" class="progress">
                        <div class="active" :style="{'width':production.productProgress+'%'}"></div>
                    </div>
                    <span flex-box="0">{{production.productProgress}}%</span>
                </div>
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
                    <div class="item" flex="box:mean">
                        <span>产品全称</span>
                        <span class="ellipsis">{{production.productName}}</span>
                    </div>
                    <div class="item" flex="box:mean">
                        <span>项目编号</span>
                        <span class="ellipsis">{{production.productCode}}</span>
                    </div>
                    <div class="item" flex="box:mean">
                        <span>产品规模</span>
                        <span class="ellipsis">{{production.productScale}}</span>
                    </div>

                    <div class="item" flex="box:mean">
                        <span>投资上限</span>
                        <span class="ellipsis">{{production.productMaxInvestment}}</span>
                    </div>

                    <div class="item" flex="box:mean">
                        <span>收益分配方式</span>
                        <span class="ellipsis">{{production.productInterestType}}</span>
                    </div>

                    <div class="item" flex="box:mean">
                        <span>是否可转</span>
                        <span class="ellipsis">{{production.isTransferFlag ? '可转' : '不可转'}}</span>
                    </div>

                    <div class="item" flex="box:mean">
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
        <div class="bottom" flex="box:mean">
            <button class="min-invest" :disabled="disabled" @click.stop="preInvest">{{production.productMinInvestmentValue}}起投</button>
            <button class="do-invest" :disabled="disabled" @click.stop="preInvest">立即投资</button>
        </div>

        <modal v-show="showModal" @callBack="modalBack"></modal>
        <invest-input v-show="showInvest" title="输入投资金额" @close="showInvest=false"
                      :cash-amount="accountCashAmount"
                      :min-invest="production.productMinInvestmentValue"
                      :remain-amount="production.productRemainAmountValue"
                      :step-value="production.investmentIntervalValue"
                      :uid="productUuid"
                      :rate="production.annualInterestRate"
                      :period="production.productPeriod"
                      @callBack="inputBack"></invest-input>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {Toast} from 'mint-ui';
    import $api from '../tools/api';
    import {textToHtml} from '../filters';
    import {logout} from '../tools/operation';
    import InvestInput from '../components/InvestInput';
    import Modal from '../components/Modal'
    import '../less/fixi-goods-detail.less';
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
            this.productUuid = this.$route.query.productUuid;
            this.getGoodsDetail();
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
                'userId'
            ]),
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
            disabled(){
                return !this.production.canBuy;
            },
            productIntroduction(){
                return textToHtml(this.production.productIntroduction);
            },
            productInformation(){
                return this.production.productInformation;

            },
            productAttachment(){
                return this.production.productAttachment && this.production.productAttachment.length > 0;
            }
        },
        methods: {
            setExpend(index){
                this.production.productInformation[index].expend = !this.production.productInformation[index].expend;
            },
            expendAttachment(){
                this.attachmentUp = !this.attachmentUp;
            },
            openPDF(file){
                if (file.attachmentLink) {
                    let pdfUrl = file.attachmentLink;
                    window.location.href = '/pdf/web/viewer.html?pdf=' + encodeURIComponent(pdfUrl);
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
                    // this.goStep();
                } else {

                    this.showInvest = true;
                }
            },
            goStep(){
                let {userVerifyStatus} = this;
                switch (userVerifyStatus) {
                    case 0:
                        window.location.href = '/realnameBased.html';
                        break;
                    case 1:
                        window.location.href = '/baoFoo.html?uid=' + this.$store.state.userId;
                        break;
                    case 2:
                        window.location.href = '/bindBankCard.html';
                        break;
                    case 3:
                        window.location.href = '/setPayPassword.html';
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
            }

        },
        destroyed(){

        }
    }
</script>
