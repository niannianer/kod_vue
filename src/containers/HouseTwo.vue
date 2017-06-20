<template>
    <div class="house-two" flex="dir:top">
        <div class="main" flex-box="1">
            <div class="header">
                <div class="header-main">
                    <div>如果说婚姻是虚拟的家，那住房就是实体的家</div>
                    <div class="house-price">根据国家统计局数据，【<span class="">{{cityName}}</span>】平均房价为<span>{{cityAveragePrice}}</span>元
                    </div>
                    <div class="div-warp" flex>
                        <label flex-box="1">房产总价</label>
                        <input flex-box="0" type="number"
                               v-model.trim="cityPrice"
                               @keyup="inputKeyup"/>
                        <span flex-box="0">万元</span>
                    </div>
                    <div flex class="div-warp margin-rem" @click.stop="showPicker=true">
                        <label flex-box="1">预计几年实现买房目标？</label>
                        <span flex-box="1">{{year}}</span>
                        <span flex-box="0">年</span>
                        <span flex-box="0" class="arrow-right" flex="main:right cross:center">
                            <img src="../images/house/arrow-right.png"/>
                        </span>
                    </div>

                    <div>是否贷款?</div>

                    <div class="box-warp" flex="main:center">
                        <div class="box">
                            <div class="content">是</div>
                        </div>
                        <div class="box active">
                            <div class="content">否</div>
                        </div>
                    </div>
                </div>
                <div class="box-shadow"></div>
            </div>
            <div class="center"></div>

        </div>
        <div class="footer" flex-box="0">
            <button class="btn-overlook">查看推荐方案</button>
        </div>

        <kingold-picker v-show="showPicker" :default-index="2" :visible="showPicker"
                        title="选择年限" :list="years" @back="pickerBack"></kingold-picker>

    </div>
</template>

<script>
    import KingoldPicker from '../components/KingoldPicker'
    import {getPrice} from '../tools/city-grade';
    import '../less/house-two.less';
    let timer = null;
    export default {
        name: 'house-two',
        data(){
            return {
                cityName: '北京',
                cityCode: '',
                cityPrice: '',
                houseTotal: '',
                planYears: 0,
                loanFlag: 0,
                loanType: 1,
                loanClass: 1,
                investMoney: '',
                firstPayments: 0,
                accumulationFundLoan: 0,
                businessLoan: 0,
                showPicker: false
            }
        },
        created(){

        },
        components: {
            KingoldPicker
        },
        computed: {
            cityAveragePrice(){
                return getPrice(this.cityName);
            },
            years(){
                let array = [];
                for (let i = 1; i <= 10; i++) {
                    array.push({
                        name: `${i} 年`,
                        value: i
                    })
                }
                return array;
            },
            year(){
                if (this.planYears) {
                    return this.planYears;
                }
                return '';
            }
        },
        methods: {
            inputKeyup(){
                if (timer) {
                    clearTimeout(timer);
                }
                let that = this;
                timer = setTimeout(() => {
                    that.cityPrice = that.cityPrice.toString();
                    that.cityPrice = that.cityPrice.replace(/\D/g, '');
                    that.cityPrice = that.cityPrice.substr(0, 5);
                }, 200);
            },
            pickerBack(result){
                this.showPicker = false;
                if (result) {
                    this.planYears = result.value
                }
            }
        },
        destroyed(){

        }
    }
</script>
