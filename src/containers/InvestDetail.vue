<template>
    <div flex="dir:top" flex-box="1" class="invest-detail" v-cloak>
        <div class='body' flex-box="1">
            <div class='items' flex-box="0" flex="dir:top">
                <div class="bl" flex-box="1" flex>
                    <p flex-box="1">订单号</p>
                    <p flex-box="0">{{this.lists.orderBillCode}}</p>
                </div>
                <div class="bl" flex-box="1" flex>
                    <p flex-box="1">购买时间</p>
                    <p flex-box="0">{{this.lists.payedTime}}</p>
                </div>
                <div class="bl" flex-box="1" flex="box:first">
                    <p>产品名称</p>
                    <p class="product-name">{{this.lists.productAbbrName}}</p>
                </div>
                <div class="bl" flex-box="1" flex>
                    <p flex-box="1">购买金额</p>
                    <p flex-box="0">{{this.lists.orderAmount | currencyInput}}元</p>
                </div>
                <div class="bl" flex-box="1" flex>
                    <p flex-box="1">预期年化收益率</p>
                    <p flex-box="0">{{this.lists.productAnnualInterestRate}}</p>
                </div>
                <div class="bl" flex-box="1" flex>
                    <p flex-box="1">{{expectProfitTitle}}</p>
                    <p flex-box="0">{{this.lists.expectedProfitAmount}}</p>
                </div>
                <div class="bl" flex-box="1" flex>
                    <p flex-box="1">产品期限</p>
                    <p flex-box="0">{{this.lists.productPeriod}}</p>
                </div>
                <div class="bl" flex-box="1" flex>
                    <p flex-box="1">起息日</p>
                    <p flex-box="0">{{this.lists.productInterestDate}}</p>
                </div>
                <div class="bl" flex-box="1" flex>
                    <p flex-box="1">到期日</p>
                    <p flex-box="0">{{this.lists.productExpiringDate}}</p>
                </div>
                <div flex-box="1" flex v-show="this.status==1">
                    <p flex-box="1">预期收款日</p>
                    <p flex-box="0">{{this.lists.productPaymentDate}}</p>
                </div>
                <div flex-box="1" flex v-show="this.status==2">
                    <p flex-box="1">兑付日</p>
                    <p flex-box="0">{{this.lists.cashDate}}</p>
                </div>
            </div>
            <div v-if="this.lists.subcontractFilepath"><span
                style="color: #1D72C0;display: block;padding: .5rem 0 0 .8rem;" @click.stop="linkpdf">《认购相关协议》</span>
            </div>
        </div>
    </div>
</template>
<script>
    import '../less/invest-detail.less';
    import $api from '../tools/api';
    import {currencyInput} from '../filters/index.js'
    export default {
        name: 'invest-detail',
        data(){
            return {
                lists: [],
                status: this.$route.query.status,
                expectProfitTitle: ''
            }
        },
        created(){
          this.addHive(1,'invest-detail',1017);
            this.expectProfitTitle = this.status == 1 ? '预期收益' : '实际收益';
            $api.get('/investment/detail', {
                orderBillCode: this.$route.query.orderBillCode
            }).then(msg => {
                if (msg.code == 200) {
                    this.lists = msg.data;
                }
                return msg
            })
            let event = ['_trackEvent', '我的投资详情', 'SHOW', '进入我的投资详情页面', '进入我的投资详情页面'];
            window._hmt.push(event);
        },
        methods: {
            linkpdf(){
                this.addHive(0,'investDetail_link_pdf',101701);
                let pdfUrl = this.lists.subcontractFilepath;
                let pdfName = '认购相关协议';
                pdfUrl = pdfUrl.replace(/^http\.*:/, 'https:');
                window.location.href = '/pdf/web/viewer.html?src='
                    + encodeURIComponent(pdfUrl) + '&name=' + encodeURIComponent(pdfName);
            }
        }
    }
</script>
