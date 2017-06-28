<template>
    <div class="fixi-goods-detail">
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
                    <span class="ellipsis">{{production.isTransferFlag?'可转':'不可转'}}</span>
                </div>

                <div class="item" flex="box:mean">
                    <span>投资人条件</span>
                    <span class="ellipsis">{{production.investorQualification}}</span>
                </div>
            </div>
        </div>
        <div class="product-introduction" v-if="production.productIntroduction">
            {{{production.productIntroduction | htmlBr}}}
        </div>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import $api from '../tools/api';
    import '../less/fixi-goods-detail.less';
    export default {
        name: 'fixi-goods-detail',
        data(){
            return {
                productUuid: '',
                production: {}
            }
        },
        created(){
            this.productUuid = this.$route.query.productUuid;
            this.getGoodsDetail();
        },
        computed: {
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
            }
        },
        methods: {
            getGoodsDetail(){
                let params = {
                    productType: 'FIXI',
                    productUuid: this.productUuid
                };
                $api.get('/product/getDetail', params)
                    .then(data => {
                        if (data.code == 200) {
                            this.production = data.data;
                        } else {
                            Toast(data.msg);
                        }
                    })
            }
        },
        destroyed(){

        }
    }
</script>
