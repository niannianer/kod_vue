<template>
    <div  class="reserve-detail" flex-box="1" flex="dir:top">
        <div class="detail">
            <ul class="detail-ul">
                <li flex>
                    <div>客户保护期剩余：</div>
                    <div>{{data.protectionPeriod}}</div>
                </li>
                <li flex>
                    <div>预约单号：</div>
                    <div>{{data.reservationBillCode}}</div>
                </li>
                <li flex>
                    <div>预约时间：</div>
                    <div>{{data.reservationTime}}</div>
                </li>
                <li flex v-if="data.reservationStatus == 3">
                    <div>完成时间：</div>
                    <div>{{data.reservationFinishTime}}</div>
                </li>
                <li flex v-if="data.reservationStatus == 4">
                    <div>取消时间：</div>
                    <div>{{data.reservationCancelTime}}</div>
                </li>
                <li flex v-if="data.reservationStatus == 5">
                    <div>过期时间：</div>
                    <div>{{data.reservationOverdueTime}}</div>
                </li>
                <li flex v-if="data.reservationStatus == 3">
                    <div>认购金额：</div>
                    <div>{{data.purchaseAmount}}</div>
                </li>
            </ul>
            <ul class="detail-ul">
                <li flex>
                    <div>客户姓名：</div>
                    <div>{{data.customerName}}</div>
                </li>
                <li flex>
                    <div>联系电话：</div>
                    <div>{{data.customerMobile}}</div>
                </li>
                <li flex>
                    <div>身份证号：</div>
                    <div>{{data.customerIdCardNo}}</div>
                </li>
            </ul>
            <ul class="detail-ul">
                <li flex>
                    <div>产品名称：</div>
                    <div class="width">{{data.reservationProductName}}</div>
                </li>
                <li flex>
                    <div>业绩比较基准：</div>
                    <div>{{data.annualInterestRate}}</div>
                </li>
                <li flex>
                    <div>产品期限：</div>
                    <div>{{data.productPeriod}}</div>
                </li>
            </ul>
            <span class="icon" :class="classArr[data.reservationStatus-1]">
                <i></i>
            </span>
        </div>
        <div class="more"><a href="javascript:;" @click.stop="link(data.productUuid)">查看产品详情</a></div>
    </div>
</template>
<script>
    import '../less/reserve-detail.less';
    import {Toast, MessageBox} from 'mint-ui';
    import $api from '../tools/api';
    export default {
        name: 'reserve-detail',
        components: {},
        data(){
            return {
                classArr: ['ing', 'spread', 'finish', 'cancel', 'past'],
                productReservationUuid: '',
                data: {},
            }
        },
        methods: {
            link(productUuid){
                this.addHive(0, 'reserveDetail_link_productDetail',103601);
                let event = ['_trackEvent', '预约单详情', 'CLICK', '预约单详情-点击产品','预约单详情-点击产品'];
                window._hmt.push(event);
                $api.get('/checkProductOnStatus', {productUuid: productUuid}).then(msg => {
                    if (msg.code == 200) {
                        //
                        this.addHive(2, 'reserveDetail_to_productDetail',1036);
                        this.$router.push({
                            path: '/goods-detail-prif',
                            query: {
                                productUuid
                            }
                        })
                    } else {
                        MessageBox.alert(`产品已下架，如想查看详情，请联系客服。`, '提示').then(action => {
                        });
                    }
                });
            },
            git(productReservationUuid){
                $api.get('/reservation/detail', {productReservationUuid: productReservationUuid}).then(msg => {
                    if (msg.code == 200) {
                        this.data = msg.data;
                    }
                });
            }
        },
        mounted(){
            this.productReservationUuid = this.$route.query.productReservationUuid;
            this.git(this.productReservationUuid);
        },
        destroyed(){
            this.addHive(2, 'reserveDetail',1036);
            MessageBox.close();
        },
        created(){
            this.addHive(1, 'reserveDetail',1036);
            let event = ['_trackEvent', '预约单详情', 'SHOW', '进入我的预约单详情页', '进入我的预约单详情页'];
            window._hmt.push(event);
        }
    }
</script>
