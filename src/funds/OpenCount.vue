<template>
    <div class="open-count" flex="dir:top">
        <div class="wrap" flex-box="1">
            <div class="tip">
                请确认您的个人信息，用于基金账户的开立
            </div>
            <div class="content" >
                <div class="item bl f8" flex="cross:center">
                    <p class="item-title">真实姓名</p>
                    <input type="text" placeholder="请输入真实姓名" v-if="!isAuth" class="input">
                    <p v-else>赵壮壮</p>
                </div>
                <div class="item f8" flex="cross:center">
                    <p class="item-title">身份证号</p>
                    <input type="text" placeholder="请输入身份证号" v-if="!isAuth" class="input">
                    <p v-else>1*************************0</p>
                </div>
            </div>
            <div class="tip">
                仅限绑定与实名信息一致的借记卡
            </div>
            <div class="content" v-if="!isBindCard">
                <div class="item bl f8" flex="cross:center">
                    <p class="item-title">银行卡号</p>
                    <input type="text" placeholder="请输入银行卡号" class="input">
                </div>
                <div class="item bl f8" flex="cross:center">
                    <p class="item-title">所属银行</p>
                    <input type="text" placeholder="请输入所属银行" class="input">
                </div>
                <div class="item f8" flex="cross:center">
                    <p class="item-title">预留手机号</p>
                    <input type="text" placeholder="请输入银行预留手机号" class="input">
                </div>
            </div>
            <div class="content-1" v-else>
                <div flex class="bank-info">
                    <img :src="imgUrls[bank_code]" alt="" class="bank-logo">
                    <div>
                        <p class="title">中信银行<span class="span">（1148）</span></p>
                        <p class="info">选择金疙瘩银行卡作为基金银行卡</p>
                    </div>
                </div>
            </div>
            <div class="content seperate" >
                <div flex="cross:center" class="item">
                    <img src="../images/fund/open-count/plus.png" alt="" class="plus">
                    <p class="f8">使用新的银行卡</p>
                </div>
            </div>
            <div class="tip-box" flex>
                <img src="../images/tip.png" alt="" class="tip-img">
                <p class="f6 p">确认开户代表您同意《盈米财富基金电子交易远程服务协议》和《委托支付协议》服务协议。</p>
            </div>
        </div>
        <div class="bottom" flex-box="0">
            <p>确认基金开户</p>
        </div>
    </div>
</template>

<script>
    import * as imgUrls from '../tools/bank';
    import '../less/fund/open-count.less';
    export default {
        name: 'open-count',
        data(){
            return {
                isAuth: true,
                imgUrls,
                bank_code:'ccb',
                isBindCard:true
            }
        },
        created(){
        },
        computed: {},
        methods: {
        },
        destroyed(){

        }
    }
</script>
