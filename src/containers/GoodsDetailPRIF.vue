<template>
    <div v-cloak class="goods-detail-prif" flex="dir:top">
        <div class="body" flex-box="1">
            <div class="title" flex-box="1"><h2>{{lists.productAbbrName}}</h2></div>
            <div class="item " flex-box="1">
                <div class="title">业绩比较基准</div>
                <ul flex="dir:top" v-if="lists.productBenchmark" class="first">
                    <li flex="dir:left" flex-box="1">
                        <span flex-box="1">投资金额</span>
                        <span flex-box="1" style="margin-left:4.5rem;">业绩比较基准</span>
                    </li>
                    <li flex=" box:mean" v-for="item in lists.productBenchmark">
                        <span flex-box="2">{{item.range}}</span>
                        <span flex-box="1">{{item.rate}}</span>
                    </li>
                </ul>
            </div>
            <!--第二部分-->
            <div class="item" flex-box="1">
                <div class="title">基本要素</div>
                <ul>
                    <li flex="box:mean" v-if="lists.productName">
                        <span flex-box="1">产品全称</span>
                        <span flex-box="3">{{lists.productName}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productType">
                        <span flex-box="1">产品类型</span>
                        <span flex-box="3">契约型私募基金</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productScale">
                        <span flex-box="1">产品规模</span>
                        <span flex-box="3">{{lists.productScale}}(人民币)</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productPeriod">
                        <span flex-box="1">产品期限</span>
                        <span flex-box="3">{{lists.productPeriod}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productMinInvestmentValue">
                        <span flex-box="1">起投金额</span>
                        <span flex-box="3">{{lists.productMinInvestmentValue}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productIssuerShortName">
                        <span flex-box="1">发行机构</span>
                        <span flex-box="3">{{lists.productIssuerShortName}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productManager">
                        <span flex-box="1">产品管理人</span>
                        <span flex-box="3">{{lists.productManager}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productManageType">
                        <span flex-box="1">管理类型</span>
                        <span flex-box="3">{{lists.productManageType}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productStructureType">
                        <span flex-box="1">结构类型</span>
                        <span flex-box="3">{{lists.productStructureType}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productDuration">
                        <span flex-box="1">存续期限</span>
                        <span flex-box="3">{{lists.productDuration}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productCustodian">
                        <span flex-box="1">产品托管人</span>
                        <span flex-box="3">{{lists.productCustodian}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productCustomer">
                        <span flex-box="1">募集对象</span>
                        <span flex-box="3">{{lists.productCustomer}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productInterestType">
                        <span flex-box="1">付息方式</span>
                        <span flex-box="3">{{lists.productInterestType}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.extraPerformanceRemuneration">
                        <span flex-box="1">超额收益</span>
                        <span flex-box="3">{{lists.extraPerformanceRemuneration}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.exitMode">
                        <span flex-box="1">退出方式</span>
                        <span flex-box="3">{{lists.exitMode}}</span>
                    </li>
                </ul>
            </div>
            <!--第三部分-->
            <div class="item" flex-box="1"
                 v-if="lists. productApplyFee||lists.productPurchaseFee||lists.productManagerFee||lists.productCustodianFee||lists.productServiceFee||lists.productCloseDate||lists.productOpenDate">
                <div class="title">认购信息</div>
                <ul>
                    <li flex="box:mean" v-if="lists. productApplyFee">
                        <span flex-box="1">申购费</span>
                        <span flex-box="3">{{lists.productApplyFee}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productPurchaseFee">
                        <span flex-box="1">认购费</span>
                        <span flex-box="3">{{lists.productPurchaseFee}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productManagerFee">
                        <span flex-box="1">管理费</span>
                        <span flex-box="3">{{lists.productManagerFee}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productCustodianFee">
                        <span flex-box="1">托管费</span>
                        <span flex-box="3">{{lists.productCustodianFee}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productServiceFee">
                        <span flex-box="1">外包服务费</span>
                        <span flex-box="3">{{lists.productServiceFee}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productCloseDate">
                        <span flex-box="1">封闭期</span>
                        <span flex-box="3">{{lists.productCloseDate}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.productOpenDate">
                        <span flex-box="1">开放日</span>
                        <span flex-box="3">{{lists.productOpenDate}}</span>
                    </li>
                </ul>
            </div>
            <!--第四部分-->
            <div class="item" flex-box="1"
                 v-if="lists.bankAccountName||lists.bankAccountNo||lists.bankBrachName||lists.bankLargeNo">
                <div class="title">募集账户</div>
                <ul>
                    <li flex="box:mean" v-if="lists.bankAccountName">
                        <span flex-box="1">账户名称</span>
                        <span flex-box="3">{{lists.bankAccountName}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.bankAccountNo">
                        <span flex-box="1">募集账号</span>
                        <span flex-box="3">{{lists.bankAccountNo}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.bankBrachName">
                        <span flex-box="1">开户银行</span>
                        <span flex-box="3">{{lists.bankBrachName}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.bankLargeNo">
                        <span flex-box="1">大额行号</span>
                        <span flex-box="3">{{lists.bankLargeNo}}</span>
                    </li>
                </ul>
            </div>
            <!--第五部分-->
            <div class="item" flex-box="1"
                 v-if="lists. custodianAccountName||lists.custodianAccountNo||lists.custodianBrachName||lists.custodianLargeNo">
                <div class="title">托管账户</div>
                <ul>
                    <li flex="box:mean" v-if="lists. custodianAccountName">
                        <span flex-box="1">账户名称</span>
                        <span flex-box="3">{{lists.custodianAccountName}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.custodianAccountNo">
                        <span flex-box="1">募集账号</span>
                        <span flex-box="3">{{lists.custodianAccountNo}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.custodianBrachName">
                        <span flex-box="1">开户银行</span>
                        <span flex-box="3">{{lists.custodianBrachName}}</span>
                    </li>
                    <li flex="box:mean" v-if="lists.custodianLargeNo">
                        <span flex-box="1">大额行号</span>
                        <span flex-box="3">{{lists.custodianLargeNo}}</span>
                    </li>
                </ul>
            </div>
            <!--第六部分-->
            <div class="item open " flex-box="1" v-if="lists.productInvestField" @click.stop='toggle(1)'>
                <div class="title" flex="main:justify" :class="{'change':tab1==true}"><span>投资范围</span><i></i></div>
                <div v-show="tab1" class="content" v-html="lists.productInvestField"></div>
            </div>
            <!--第七部分-->
            <div class="item open" flex-box="1" v-if="lists.productRiskTreatment" @click.stop='toggle(2)'>
                <div class="title" flex="main:justify" :class="{'change':tab2==true}"><span>风控措施</span><i></i></div>
                <div v-show="tab2" class="content" v-html="lists.productRiskTreatment"></div>
            </div>
            <!--第八部分-->
            <div class="item open" flex-box="1" v-if="lists.productInformation" @click.stop='toggle(3)'>
                <div class="title" flex="main:justify" :class="{'change':tab3==true}"><span>产品亮点</span><i></i></div>
                <div v-show="tab3" class="content" v-html="lists.productInformation[0].inforValue"></div>
            </div>
            <!--第九部分-->
            <div class="item open" flex-box="1" style="border-bottom: none"
                 v-if="lists.productAttachment && lists.productAttachment.length > 0" @click.stop='toggle(4)'>
                <div class="title" flex="main:justify" :class="{'change':tab4==true}" @click.stop='toggle(4)'>
                    <span>产品附件</span><i></i></div>
                <div v-show="tab4" class="content">
                    <span style="color: #1D72C0;display: block;padding: .3rem 0;"
                          v-for="(item,index) in lists.productAttachment" :key="index"
                          @click.stop="linkpdf(item)">{{item.attachmentName}}</span>
                </div>
            </div>
            <div style="margin: .5rem"></div>
        </div>
        <!--底部-->
        <div class="buttom" flex-box="0" flex="box:mean">
            <a class="hotline" flex-box="1" href="tel:4006403606" @click.stop="hotline">咨询热线</a>
            <div class="btn" flex-box="1" :class="{'disabled':message !='立即预约' && message!='预热中'}"
                 @click.stop="link(message,lists.productUuid)">{{message}}
            </div>
        </div>

    </div>
</template>
<script>
    import wx from '../tools/wx';
    import '../less/goods-detail-PRIF.less';
    import $api from '../tools/api';
    import {telNumber} from '../tools/config';
    import {Toast} from 'mint-ui';
    import $device from '../tools/device';
    const logo = require('../images/share-icon.png');
    export default {
        name: 'goods-detail-prif',
        data(){
            return {
                lists: {},
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: false,
                telNumber,
                message: ''
            }
        },
        created(){
            this.addHive(1, 'goods-detail-prif',1014);
            this.productUuid = this.$route.query.productUuid;
            this.getDetail();
            if ($device.isWeixin) {
                this.getShare();
            }
            let event = ['_trackEvent', '高端理财详情', 'SHOW', '进入高端理财详情页', '进入高端理财详情页'];
            window._hmt.push(event);
        },
        computed: {},
        methods: {
            getDetail(){
                let params = {
                    productUuid: this.productUuid,
//                    productUuid:'fa0290f9ea5c4c2e80e07437e6f71470',
                    productType: "PRIF"

                }
                $api.get('/product/getDetail', params).then(msg => {
                    console.log(msg);
                    this.lists = msg.data;
                    if (msg.data.productStatusCode == 2) {
                        this.message = '立即预约';
                    } else if (msg.data.productStatusCode == 1) {
                        this.message = '预热中';
                    } else {
                        this.message = msg.data.productStatus;
                    }
                });
            },
            toggle(num){
                let oper = '收起';
                let item = '';
                this.addHive(0, 'goodsDetailPrif_icon_expend',101401);
                if (num == 1) {
                    this.tab1 = !this.tab1;
                    item = '投资范围';
                    if (this.tab1) {
                        oper = '打开';
                    }
                } else if (num == 2) {
                    this.tab2 = !this.tab2;
                    item = '风控措施';
                    if (this.tab2) {
                        oper = '打开';
                    }
                } else if (num == 3) {
                    this.tab3 = !this.tab3;
                    item = '产品亮点';
                    if (this.tab3) {
                        oper = '打开';
                    }
                } else if (num == 4) {
                    this.tab4 = !this.tab4;
                    item = '产品附件';
                    if (this.tab4) {
                        oper = '打开';
                    }
                }
                let event = ['_trackEvent', '私募产品详情', 'CLICK', '在私募产品详情页' + oper + item + '', '私募产品详情页-' + oper + item + ''];
                window._hmt.push(event);
            },
            link(message, productUuid){
                this.addHive(0, 'goodsDetailPrif_link_makeAppointment',101402);
                if (message == '预热中') {
                    Toast('产品在预热中，请稍后再尝试预约');
                } else if (message == '立即预约') {
                    this.$router.push({
                        path: '/make-appointment',
                        query: {
                            productUuid
                        }
                    })
//                  window.location.href='/addClient.html?u='+productUuid;
                    let event = ['_trackEvent', '私募产品详情', 'CLICK', '私募产品详情页-点击立即预约', '私募产品详情页-点击立即预约'];
                    window._hmt.push(event);
                }
            },
            linkpdf(item){
                this.addHive(0, 'goodsDetailPrif_link_pdf',101403);
                if (item.attachmentLink) {
                    let pdfUrl = item.attachmentLink;
                    let pdfName = item.attachmentName
                    pdfUrl = pdfUrl.replace(/^http\.*:/, 'https:');
                    let event = ['_trackEvent', '私募产品详情', 'CLICK', '在私募产品详情页点击产品附件', '私募产品详情页-点击产品附件'];
                    window._hmt.push(event);
                    window.location.href = '/pdf/web/viewer.html?src='
                        + encodeURIComponent(pdfUrl) + '&name=' + encodeURIComponent(pdfName);
                }

            },
            getShare(){
                $api.get('/wechat/shareInfo', {url: window.location.href})
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
            hotline(){
                let event = ['_trackEvent', '私募产品详情', 'CLICK', '私募产品详情页-点击咨询热线', '私募产品详情页-点击咨询热线'];
                window._hmt.push(event);
            }
        },
        destroyed(){
            this.addHive(2, 'goods-detail-prif',1014);
        }
    }
</script>
