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
                    <div class="item-right" flex-box="0">
                        {{investorIdCardNo | idCardFormat}}
                    </div>
                </div>
            </div>
            <p>银行卡信息</p>
            <div class="bank">
                <div class="bank-name">
                    <img :src="bankImg" class="bank-logo"/>
                    <span class="name">{{bankName}}</span>
                    <div class="bank-info">{{bankUserCardNo | bankCardNoFormat}}</div>
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
                telNumber
            }
        },
        computed: {
            ...mapState([
                'bankUserCardNo',
                'bankCode',
                'bankName',
                'investorRealName',
                'investorIdCardNo',
                'bankUserPhone']),
            bankImg(){
                return imgUrls[this.bankCode];
            }
        },
        created(){
            let event = ['_trackEvent', '我的银行卡', 'SHOW', '进入我的银行卡页面', '进入我的银行卡页面'];
            window._hmt.push(event);
            this.addHive(1, 'my-count',1028);
        }
    }
</script>

