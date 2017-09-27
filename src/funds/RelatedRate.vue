<template>
    <div class="related-rate">
        <div class="content">
            <div class="f8 item bl" flex="cross:center">
                <p class="title" flex="cross:center">申购费率</p>
            </div>
            <div flex="cross:center box:first" class="item bl">
                <p class="first">申购金额</p>
                <p class="center">费率</p>
                <div flex="main:right">
                    <p class="btn f6">金疙瘩费率</p>
                </div>
            </div>
            <div flex="cross:center box:first" class="item bl">
                <p class="first">X<50万元</p>
                <p class="center">1%</p>
                <p class="right">0.01%</p>
            </div>
            <div flex="cross:center box:first" class="item">
                <p class="first">50万元≤X<100万元</p>
                <p class="center">.6%</p>
                <p class="right">0.10%</p>
            </div>

        </div>
        <div class="content seperate">
            <div class="f8 item bl" flex="cross:center">
                <p class="title" flex="cross:center">赎回费率</p>
            </div>
            <div flex="cross:center" class="item bl">
                <p flex-box="1">持有时间</p>
                <p flex-box="0">费率</p>
            </div>
            <div flex="cross:center" class="item bl">
                <p flex-box="1">X<7天</p>
                <p flex-box="0">1%</p>
            </div>
            <div flex="cross:center" class="item bl">
                <p flex-box="1">7天≤X<365天</p>
                <p flex-box="0">0.6%</p>
            </div>
            <div flex="cross:center" class="item">
                <p flex-box="1">365天≤X<730天</p>
                <p flex-box="0">0.6%</p>
            </div>
        </div>
        <div class="content seperate">
            <div class="f8 item bl" flex="cross:center">
                <p class="title" flex="cross:center">基金运作费用</p>
            </div>
            <div flex="cross:center" class="item bl">
                <p flex-box="1">类型</p>
                <p flex-box="0">费率</p>
            </div>
            <div flex="cross:center" class="item bl">
                <p flex-box="1">基金托管费</p>
                <p flex-box="0">1%</p>
            </div>
            <div flex="cross:center" class="item bl">
                <p flex-box="1">基金管理费</p>
                <p flex-box="0">0.6%</p>
            </div>
            <div flex="cross:center" class="item-2">
                基金运作费率每天从基金资产中计提，投资者在交易过程中无需额外支付，每个工作日公告的基金净值已扣除运作费用
            </div>
        </div>
        <div class="content seperate">
            <div class="f8 item bl" flex="cross:center">
                <p class="title" flex="cross:center">费用问题</p>
            </div>
            <div class="item-2 bl">
                <p>购买基金会产生哪些费用？</p>
                <p class="seperate">
                    申购费在申购产品时从每笔缴款资金中扣除，赎回费在开放期赎回时从赎回款项中扣除，管理费和托管费每日在产品层面计提。
                </p>
            </div>
            <div class="item-2 bl">
                <p>如何计算基金申购费用及份额？</p>
                <p class="seperate">
                    申购费用=申购金额-净申购金额=申购金额-[申购金额÷（1+申购费率）]
                    申购份额=净申购金额÷T日基金单位净值=[申购金额÷（1+费率）]÷T日基金单位净值
                </p>
                <p>
                    例如：投资10,000元，假设申购费率为0.3%，T日的基金单位净值为1.1666元，其得到的份额为：
                    净申购金额=10000/（1+0.3%）=9970.08
                    申购费用=10000-9970.08=29.92
                    申购份额=9970.08/1.1666=8546.27
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/fund/related-rate.less';
    export default {
        name: 'related-rate',
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
