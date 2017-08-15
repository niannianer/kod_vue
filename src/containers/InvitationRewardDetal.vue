<template>
    <div v-cloak class="reserve-detail invitation" flex-box="1" flex="dir:top">
        <div class="detail" v-if="data.productType == 'PRIF'">
            <ul class="detail-ul">
                <li flex>
                    <div v-if="data.rewardStatus == 2">奖励金额（税后）：</div>
                    <div v-else>奖励金额（税前）：</div>
                    <div class="color2" v-if="data.rewardStatus == 2"><span class="color-red">{{data.payAmount | currencyFormat}}</span>元</div>
                    <div class="color2" v-else ><span class="color-red">{{data.rewardAmount | currencyFormat}}</span>元</div>
                </li>
                <li flex>
                    <div>好友投资金额：</div>
                    <div>{{data.investAmount | currencyInput}}元</div>
                </li>
                <li flex>
                    <div>奖励比列：</div>
                    <div>{{data.rewardFactor}}</div>
                </li>
            </ul>
            <ul class="detail-ul">
                <li flex>
                    <div>好友姓名：</div>
                    <div>{{data.beInvitedUserName}}</div>
                </li>
                <li flex>
                    <div>联系电话：</div>
                    <div>{{data.beInvitedMobile | mobileFormat}}</div>
                </li>
                <li flex>
                    <div>身份证号：</div>
                    <div>{{data.beInvitedIdCardNo | idCardFormat}}</div>
                </li>
                <li flex>
                    <div>地址：</div>
                    <div>{{data.beInvitedAddress}}</div>
                </li>
            </ul>
            <ul class="detail-ul">
                <li flex>
                    <div>投资产品：</div>
                    <div class="width color"><span @click.stop="link(data.productUuid)">{{data.productName}}</span></div>
                </li>
                <li flex>
                    <div>投资时间：</div>
                    <div>{{data.createTime | timeFormat}}</div>
                </li>
                <li flex v-if="data.rewardStatus == 2">
                    <div>奖励结算时间：</div>
                    <div>{{data.clearTime | timeFormat}}</div>
                </li>
            </ul>
            <span class="icon" :class="classArr[data.rewardStatus]">
                <i></i>
            </span>
        </div>
        <div class="detail" v-else>
            <ul class="detail-ul">
                <li flex>
                    <div v-if="data.rewardStatus == 2">奖励金额（税后）：</div>
                    <div v-else>奖励金额（税前）：</div>
                    <div v-if="data.rewardStatus == 2"><span class="color-red">{{data.payAmount | currencyFormat}}</span>元</div>
                    <div v-else ><span class="color-red">{{data.rewardAmount | currencyFormat}}</span>元</div>
                </li>
                <li flex>
                    <div>好友投资金额：</div>
                    <div>{{data.investAmount | currencyInput}}元</div>
                </li>
                <li flex>
                    <div>奖励比列（年化）：</div>
                    <div>{{data.rewardFactor}}</div>
                </li>
                <li flex>
                    <div>产品期限：</div>
                    <div>{{data.productPeriod}}{{data.productPeriodType | periodType}}</div>
                </li>
            </ul>
            <ul class="detail-ul">
                <li flex>
                    <div>联系电话：</div>
                    <div>{{data.beInvitedMobile | mobileFormat}}</div>
                </li>
                <li flex>
                    <div>投资产品：</div>
                    <div class="color width"><span @click.stop="link(data.productUuid)">{{data.productName}}</span></div>
                </li>
                <li flex>
                    <div>投资时间：</div>
                    <div>{{data.createTime | timeFormat}}</div>
                </li>
                <li flex v-if="data.rewardStatus == 2">
                    <div>奖励结算时间：</div>
                    <div>{{data.clearTime | timeFormat}}</div>
                </li>
            </ul>
            <span class="icon" :class="classArr[data.rewardStatus]">
                <i></i>
            </span>
        </div>
    </div>
</template>

<script>
    import '../less/reserve-detail.less';
    import {MessageBox} from 'mint-ui';
    import $api from '../tools/api';
    export default {
        name: 'reserve-detail',
        data(){
            return {
                productPeriodType:'',
                classArr:['wait','wait','accounted'],
                "data": {}
            }
        },
        methods:{
            link(productUuid){
                $api.get('/checkProductOnStatus', {productUuid: productUuid}).then(msg => {
                    if (msg.code == 200) {
                        let path = '';
                        if(this.data.productType == 'PRIF'){
                            path = '/goods-detail-prif';
                        }else{
                            path = '/fixi-goods-detail';
                        }
                        this.$router.push({
                            path,
                            query: {
                                productUuid
                            }
                        })
                    } else {
                        MessageBox.alert(`产品已下架，如想查看详情，请联系客服。`, '提示').then(action => {
                        });
                    }
                });
            }
        },
        mounted(){
            let rewardBillCode = this.$route.query.rewardBillCode;
            $api.get('/reward/detail',{rewardBillCode:rewardBillCode}).then(msg => {
                if(msg.code == 200){
                    this.data = msg.data;
                }
            })
        }
    }
</script>
