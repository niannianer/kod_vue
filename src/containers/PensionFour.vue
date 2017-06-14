<template>
    <div class="pension-four" flex="dir:top">
        <div class="title" flex-box="0">以下数据仅适用于您的所在城市【<span>{{this.cityName}}</span>】</div>
        <ul class="content" flex-box="1">
            <li class="item" flex="box:mean">
                <p>性别</p>
                <div class="gender" flex="box:mean " >
                    <div flex="main:center cross:center">
                        <i class="active"><em></em></i>
                        <span>男</span>
                    </div>
                    <div flex="main:center cross:center">
                        <i><em></em></i>
                        <span>女</span>
                    </div>
                </div>
            </li>
            <li class="item" flex="box:mean">
                <p class="info">年龄</p>
                <p flex>
                    <input type="text" flex-box="1" :value=this.age><span flex-box="0">岁</span>
                </p>
            </li>
            <li class="item" flex="box:mean">
                <p class="info">期望退休年龄</p>
                <p flex>
                    <input type="text" flex-box="1" :value=this.retirementAge><span flex-box="0">岁</span>
                </p>
            </li>
            <li class="item" flex="box:mean">
                <p class="info">预计寿命</p>
                <p flex>
                    <input type="text" flex-box="1" :value=this.planAge><span flex-box="0">岁</span>
                </p>
            </li>
            <li class="item" flex="box:mean">
                <p class="info">税后月工资</p>
                <p flex>
                    <input type="text" flex-box="1" :value=this.wagesAfterTax><span flex-box="0">元</span>
                </p>
            </li>
            <li class="item" flex="box:mean">
                <p class="info">通货膨胀率</p>
                <p flex>
                    <input type="text" flex-box="1" :value=this.inflation><span flex-box="0">%</span>
                </p>
            </li>
        </ul>
        <div class="round" flex-box="0">
            <div class="bg">
                <div class="tip">为满足您退休后保持现有收入水平,<br/>养老金至少需要储备</div>
                <div class="total">{{this.pensionStore}}元</div>
                <div class="tip2">（*已除去社保养老金可覆盖部分）</div>
            </div>
        </div>
        <div class="footer" flex-box="0">查看推荐方案</div>
    </div>

</template>
<script>
    import "../less/pension-four.less"
    export default{
        data(){
            return {
                cityName:'北京',
                pensionStore:' 2，215，824',
                age:'123',
                gender:'1',
                retirementAge:'123',
                planAge:'132',
                wagesAfterTax:'11.11',
                inflation:'11'
            }
        }
    }
</script>
