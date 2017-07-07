<template>
    <div class="experience-fund">
        <div class="header">
            <ul>
                <li class='sum'>
                    <p class='info'>2000.00</p>
                    <p class='title'>体验金总额（元）</p>
                </li>
            </ul>
            <ul flex >
                <li class="detail" flex-box="1">
                    <p class='info'>200.00</p>
                    <p class='title'>已收收益（元）</p>
                </li>
                <li class="detail" flex-box="1">
                    <p class='info'>200.00</p>
                    <p class='title'>待领取体验金（元）</p>
                </li>
                <li class="detail" flex-box="1">
                    <p class='info'>200.00</p>
                    <p class='title'>待收收益（元）</p>
                </li>
            </ul>
        </div>
        <div class="body">
            <div class="section seperate">
                <p class="tip">体验金领取、计息后会自动转入您的账户余额</p>
            </div>
            <div class="section seperate experience-list">
                <div class="item" flex="dir:top">
                    <div class="item-body" flex-box="1">
                        <div class="bl" flex>
                            <div flex-box="1" class="title">体验金名称</div>
                            <div flex-box="0" class="period">7天</div>
                        </div>
                        <div flex class="item-detail">
                            <div flex-box="1">
                                <p class="info">10000.00</p>
                                <p>金额</p>
                            </div>
                            <div flex-box="1">
                                <p class="info">10.00%</p>
                                <p>年化收益率</p>
                            </div>
                            <div flex-box="1">
                                <p class="info">15.00元</p>
                                <p>预期收益</p>
                            </div>
                        </div>
                        <div>
                            <p class="item-tip">投资28天及以上定期理财累计28000可领取</p>
                        </div>
                    </div>
                    <button class="disabled" flex-box="1">
                        去投资
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/experience-fund.less'
    export default {
        name: 'experience-fund',
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
