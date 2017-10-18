<template>
    <div class="related-rate">
        <div class="content" v-if="hasPurchRate">
            <div class="f8 item bl" flex="cross:center">
                <p class="title" flex="cross:center">申购费率</p>
            </div>
            <div flex="cross:center box:first" class="item bl">
                <p>申购金额</p>
                <p flex="main:right">
                    费率
                </p>
            </div>
            <div flex="cross:center box:first" class="item bl" v-for="(item,index) in purchRate">
                <p>{{item.dur}}</p>
                <p class="right">{{item.feeRatio}}</p>
            </div>
        </div>
        <div class="content seperate" v-if="hasRedeemRate">
            <div class="f8 item bl" flex="cross:center">
                <p class="title" flex="cross:center">赎回费率</p>
            </div>
            <div flex="cross:center" class="item bl">
                <p flex-box="1">持有时间</p>
                <p flex-box="0">费率</p>
            </div>
            <div flex="cross:center" class="item bl" v-for="(item,index) in redRate">
                <p flex-box="1">{{item.dur}}</p>
                <p flex-box="0">{{item.feeRatio}}</p>
            </div>
        </div>
        <div class="content" :class="{'seperate':hasPurchRate||hasRedeemRate}">
            <div class="f8 item bl" flex="cross:center">
                <p class="title" flex="cross:center">基金运作费用</p>
            </div>
            <div flex="cross:center" class="item bl">
                <p flex-box="1">类型</p>
                <p flex-box="0">费率</p>
            </div>
            <div flex="cross:center" class="item bl">
                <p flex-box="1">基金托管费</p>
                <p flex-box="0">{{custodianRate}}%</p>
            </div>
            <div flex="cross:center" class="item bl">
                <p flex-box="1">基金管理费</p>
                <p flex-box="0">{{managementRate}}%</p>
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
                <p class="seperate f6">
                    申购费在申购产品时从每笔缴款资金中扣除，赎回费在开放期赎回时从赎回款项中扣除，管理费和托管费每日在产品层面计提。
                </p>
            </div>
            <div class="item-2 bl">
                <p>如何计算基金申购费用及份额？</p>
                <p class="seperate f6">
                    申购费用=申购金额-净申购金额=申购金额-[申购金额÷（1+申购费率）]
                </p>
                <p class="f6">
                    申购份额=净申购金额÷T日基金单位净值=[申购金额÷（1+费率）]÷T日基金单位净值
                </p>
                <p class="seperate f6">
                    例如：投资10,000元，假设申购费率为0.3%，T日的基金单位净值为1.1666元，其得到的份额为：
                </p>
                <p class="f6">
                    净申购金额=10000/（1+0.3%）=9970.08
                </p>
                <p class="f6">
                    申购费用=10000-9970.08=29.92
                </p>
                <p class="f6"> 申购份额=9970.08/1.1666=8546.27</p>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/fund/related-rate.less';
    export default {
        name: 'related-rate',
        data(){
            return {
                purchRate: [],
                redRate: [],
                managementRate: '',
                custodianRate: '',
                hasPurchRate: false,
                hasRedeemRate: false
            }
        },
        created(){
            this.purcaseRate();
            this.redeemRate();
            this.managementRate = window.sessionStorage.getItem('managementRate');
            this.custodianRate = window.sessionStorage.getItem('custodianRate');
        },
        computed: {},
        methods: {
            purcaseRate(){
                if (window.sessionStorage.getItem('purchRate')) {
                    this.hasPurchRate = true
                    let purchRate = JSON.parse(window.sessionStorage.getItem('purchRate'));
                    purchRate.map(item => {
                        let dur = '';
                        let feeRatio = '';
                        item.lowerLimit = item.lowerLimit / 10000;
                        item.upperLimit = item.upperLimit / 10000;
                        if (item.lowerLimit == '0') {
                            dur = 'X<' + item.upperLimit + '万元';
                            feeRatio = item.feeRatio + '%';
                        }
                        else if (isNaN(item.upperLimit)) {
                            dur = 'X≥' + item.lowerLimit + '万元';
                            feeRatio = item.fixedFee + '元';
                        }
                        else {
                            dur = item.lowerLimit + '万元≤X<' + item.upperLimit + '万元';
                            feeRatio = item.feeRatio + '%';
                        }
                        this.purchRate.push({
                            dur,
                            feeRatio
                        })
                    })
                }
            },
            redeemRate(){
                if (window.sessionStorage.getItem('redRate')) {
                    this.hasRedeemRate = true;
                    let redRate = JSON.parse(window.sessionStorage.getItem('redRate'));
                    redRate.map(item => {
                        let dur = '';
                        let feeRatio = '';
                        if (item.lowerLimit == '0') {
                            dur = 'X<' + item.upperLimit + '天';
                        }
                        else if (item.upperLimit == 'INF') {
                            dur = 'X≥' + item.lowerLimit + '天';
                        }
                        else {
                            dur = item.lowerLimit + '天≤X<' + item.upperLimit + '天';
                        }
                        feeRatio = item.feeRatio + '%';
                        this.redRate.push({
                            dur,
                            feeRatio
                        })
                    })
                }
            }
        },
        destroyed(){
        }
    }
</script>
