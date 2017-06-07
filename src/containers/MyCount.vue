<template>
    <div flex="dir:top" flex-box="1" class="my-count">
        <div class="count-body">
            <p class="title">真实信息</p>
            <div class="info">
                <div class="item1" flex>
                    <div class="item-left" flex-box="1">真实姓名</div>
                    <div class="item-right" flex-box="0">
                    **{{investorRealName.substr(-1)}}
                    </div>
                </div>
                <div class="item2" flex>
                    <div class="item-left" flex-box="1">证件号码</div>
                    <div class="item-right" flex-box="0">
                    {{investorIdCardNo}}
                    </div>
                </div>
            </div>
            <p>银行卡信息</p>
            <div class="bank">
                <div class="bank-name">
                    <img :src="bankImg" class="bank-logo"/>
                    <span class="name">{{bank_name}}</span>
                    <div class = "bank-info">123</div>
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
    let imgNames = ['abchina', 'bankcomm', 'bankofshanghai',
        'boc', 'ccb', 'cebbank', 'cgbchina', 'cib', 'cmbc',
        'cmbchina', 'ecitic', 'hxb', 'icbc', 'pingan', 'psbc', 'spdb'];
    let imgUrls = {};
    imgNames.map(url => {
        imgUrls[url] = require(`../images/bank/${url}.png`)
    });
    export default {
        name: 'my-count',
        data(){
            return {
                telNumber
            }
        },
       computed: mapState([
            'bankUserCardNo',
            'bank_code',
            'bank_name',
            'investorRealName',

            'investorIdCardNo',
            'bankUserPhone']),
        created(){

        }
    }
</script>
<!-- 替换银行卡中的其余位数为*的实现phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'); 每隔四位一个空格 this.value = this.value.replace(/\D/g, '').replace(/....(?!$)/g, '$& ');-->