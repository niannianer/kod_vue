<template>
    <div class="redeem" flex="dir:top">
        <div class="wrap" flex-box="1">
            <div class="header">
                <p class="title">宏得优选100000</p>
                <p class="tip f8">可赎回份额(份)100</p>
            </div>
            <div class="content seperate">
                <div class="item bl" flex="cross:center">
                    <div flex-box="1" flex>
                        <p class="f8 item-title" flex-box="0">赎回份额</p>
                        <input type="text" placeholder="请输入赎回份额" flex-box="0" class="input f8">
                        <p class="f8" flex-box="0">份</p>
                    </div>
                    <div flex-box="0">
                        <p class="btn f6">赎回全部</p>
                    </div>
                </div>
                <div class="item f8" flex="cross:center">
                    <p class="item-title" flex-box="0">赎回总值</p>
                    <p><span class="blue span">7000.00</span>元</p>
                    <p>（不包含手续费）</p>
                </div>
            </div>
            <div class="content seperate">
                <div class="item f8" flex="cross:center">
                    <p class="item-title" flex-box="0">赎回份额</p>
                    <p class="blue">中信银行(1148)</p>
                </div>
            </div>
            <p class="f6 tip-bottom">预计赎回时间：3个交易日</p>
            <p class="f6 tip-bottom">具体时间以基金公司及银行确认时间为准</p>
        </div>
        <div class="bottom" flex-box="0">
            <p>赎回</p>
        </div>
    </div>
</template>

<script>
    import '../less/fund/redeem.less';
    export default {
        name: 'redeem',
        data(){
            return {}
        },
        created(){
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
