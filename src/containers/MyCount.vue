<template>
    <div flex="dir:top" flex-box="1" class="my-count">
        <div class="count-body">
            <p class="title">实名信息</p>
            <div class="info">
                <div class="item1" flex>
                    <div class="item-left" flex-box="1">真实姓名</div>
                    <div class="item-right" flex-box="0">
                        {{investorRealName.replace(/.(?=.)/g, '*')}}
                    </div>
                </div>
                <div class="item2" flex>
                    <div class="item-left" flex-box="1">证件号码</div>
                    <div class="item-right idCard" flex-box="0">
                        {{investorIdCardNo | idCardFormat}}
                    </div>
                </div>
            </div>
            <div class="bank">
                <div class="bank-name bf-card" flex="cross:center" v-if="baofooCard.bankName">
                    <div flex-box="0">
                        <img :src="baofooCard.bankImg" class="bank-logo"/>
                    </div>
                    <div flex-box="1">
                        <span class="name">{{baofooCard.bankName}}</span>
                        <div class="bank-info">{{baofooCard.bankUserCardNo | bankCardNoFormat}}</div>
                    </div>
                </div>
                <div class="bank-name ym-card" flex="cross:center" v-if="yingmiCard.name" :class="{'shadow': baofooCard.bankName}">
                    <img src="../images/fund/jijin-text.png" class="jj-text"/>
                    <div flex-box="0">
                        <img :src="yingmiCard.bankImg" class="bank-logo"/>
                    </div>
                    <div flex-box="1">
                        <span class="name">{{yingmiCard.name}}</span>
                        <div class="bank-info">{{yingmiCard.paymentNo | bankCardNoFormat}}</div>
                    </div>
                </div>
            </div>
            <div class="tel-info">
                如需换卡，请联系客服：<span class="span">{{telNumber}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import $api from '../tools/api';
    import {telNumber} from '../tools/config';
    import  '../less/my-count.less';
    import * as imgUrls from '../tools/bank';
    export default {
        name: 'my-count',
        data(){
            return {
                telNumber,
                yingmiCard: {},
                baofooCard: {}
            }
        },
        computed: {
            ...mapState([
                'investorRealName',
                'investorIdCardNo',
                'bankUserPhone']),
        },
        created(){
            let event = ['_trackEvent', '我的银行卡', 'SHOW', '进入我的银行卡页面', '进入我的银行卡页面'];
            window._hmt.push(event);
            this.addHive(1, 'my-count',1028);
            this.bankCardAll();
        },
        methods: {
            bankCardAll(){
                $api.get('/getUserBankCardAll').then(resp => {
                    if(resp.code == 200){
                        this.yingmiCard = resp.data.yingmiCard || {};
                        this.yingmiCard.bankImg = imgUrls.yingmi[this.yingmiCard.paymentType||'bank:003'];
                        this.baofooCard = resp.data.baofooCard || {};
                        this.baofooCard.bankImg = imgUrls[this.baofooCard.bankCode];
                    }
                });
            }
        }
    }
</script>

