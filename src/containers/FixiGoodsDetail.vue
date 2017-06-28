<template>
    <div class="fixi-goods-detail">
        <div class="top">
            <div class="main-title ellipsis">{{production.productAbbrName}}</div>
            <div class="sub-title">预计年化收益率</div>
            <div class="rate">{{production.annualInterestRate}}</div>
            <div class="items" flex="main:jusitfy">
                <div class="item" flex-box="1">
                    <div class="item-text">产品期限</div>
                    <div class="item-number">{{production.productPeriod}}</div>
                </div>
                <div class="item" flex-box="1">
                    <div class="item-text">剩余额度</div>
                    <div class="item-number">{{production.productRemainAmount}}</div>
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
                <div class="round"></div>
                <div class="date">{{production.productPublishDate}}</div>
            </div>
            <div class="date-item" flex-box="1">
                <div class="date-info">起息日</div>
                <div class="round"></div>
                <div class="date">{{production.productInterestDate}}</div>
            </div>
            <div class="date-item" flex-box="1">
                <div class="date-info">到期日</div>
                <div class="round"></div>
                <div class="date">{{production.productExpiringDate}}</div>
            </div>
            <div class="date-item" flex-box="1">
                <div class="date-info">预期收款日</div>
                <div class="round-warp">

                </div>
                <div class="date">{{production.productPaymentDate}}</div>
            </div>
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
                production: {

                }
            }
        },
        created(){
            this.productUuid = this.$route.query.productUuid;
            this.getGoodsDetail();
        },
        computed: {},
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
                        }else {
                            Toast(data.msg);
                        }
                    })
            }
        },
        destroyed(){

        }
    }
</script>
