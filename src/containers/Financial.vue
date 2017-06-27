<template>
    <div v-cloak class="financail" flex-box="1" flex="dir:top">
        <div class="tabs" flex flex-box="0">
            <div flex-box="1" class="tab" @click.stop="changeTab(1)">
                <div class="tab-item" :class="{'active':tab==1}">高端理财</div>
            </div>
            <div flex-box="1" class="tab" @click.stop="changeTab(2)">
                <div class="tab-item" :class="{'active':tab==2}">定期理财</div>
            </div>
        </div>
        <div class="item-list" flex-box="1" v-if="tab==1">
            <div class="item" v-for="(item,index) in lists" :key="index">
                <div class="fund-name">{{item.productName}}</div>
                <div flex="dir:left" class="fund-middle">
                    <div class="rate" flex-box="1">
                        <div>{{item.annualInterestRate}}</div>
                        <div class="sub-text">业绩基准</div>
                    </div>
                    <div class="cycle" flex-box="1">
                        <div flex="main:center">{{item.productPeriod}}</div>
                        <div class="sub-text" flex="main:center">期限</div>
                    </div>
                    <div class="progress" flex-box="0">
                        <cicle-progress :width-size="50" :progress="item.productProgress"></cicle-progress>
                    </div>
                </div>
            </div>
        </div>
        <div class="item-list" flex-box="1" v-else>
            <div class="item" v-for="(item,index) in lists" :class="{'stat': item.productStatus =='已告罄'  }">
                <div class="fund-name">{{item.productName}}</div>
                <div flex="dir:left" class="fund-middle-fix" >
                    <div class="rate" flex-box="1">
                        <div>{{item.annualInterestRate}}</div>
                        <div class="sub-text">预计年化收益率</div>
                    </div>
                    <div class="cycle" flex-box="3">
                        <div flex="main:center">{{item.productPeriod}}</div>
                        <div class="sub-text" flex="main:center">期限</div>
                    </div>
                    <div class="status" flex-box="0" flex="cross:center">
                        <span>{{item.productStatus}}</span>
                    </div>
                </div>
                <div class="progress" >
                    <div class="done" :style="'width:' + item. productProgress+ '%'"></div>
                    <div class="round" :style="'left:' +( item. productProgress-1) + '%'">
                        <div></div>
                    </div>
                </div>
                <div class="buttom">{{item.productMinInvestment}}</div>
            </div>
        </div>
        <!--遮罩层-->
        <div class="mask" v-show="show">
            <div class="content">
                <h2  style="color:black;">合格投资者登记</h2>
                <div class="main">
                    根据《私募投资基金募集行为管理办法》之规定，金疙瘩只对“具有相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元，且个人资产不低于300万元或者最近三年个人年均 收入不低于50万元”的特定合格投资者宣传、推介相关私募投资基金产品。请您详细阅读本提示并接受此个人资产不低于300万元或者最近三年个人年均 收入不低于50万元”的特定合格投资者宣传、推介相关私募投资基金产品。请您详细阅读本提示并接受此个人资产不低于300万元或者最近三年个人年均 收入不低于50万元”的特定合格投资者宣传、推介相关私募投资基金产品。请您详细阅读本提示并接受此个人资产不低于300万元或者最近三年个人年均 收入不低于50万元”的特定合格投资者宣传、推介相关私募投资基金产品。请您详细阅读本提示并接受此认定，方可获得金疙瘩私募投资基金产品宣传推介服务.
                </div>
                <p class="confirm"><i  :class="{'active':check==true}" ></i>本人承诺符合上述合格投资者条件并完成调查问卷。</p>
                <div class="btn disable" disabled="disabled">确认</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import '../less/financial.less';
    import CicleProgress from '../components/CicleProgress/CicleProgress';
    import $api from '../tools/api';
    export default {
        name: 'financial',
        components: {
            CicleProgress
        },
        data(){
            return {
                check:false,
                show:false,
                tab: 2,
                lists: [ ]
            };
        },
        computed: {
            count(){
                return this.$store.state.count
            }
        },
        methods: {
            changeTab(tab){
              this.tab = tab;
                this.getGoodsList();
            },
            getGoodsList(){
                let params = {
                    pageSize: 10,
                    startRow: 1,
//                    productType:tab
                };
                if(this.tab == 1){
                    params.productType = "PRIF"
                }
                else if(this.tab==2){
                    params.productType = "FIXI"
                }
                $api.get('/product/getList', params).then( msg => {
                    console.log (msg);
                    this.lists = msg.data.productList;
                });
            }
        },
        created(){
//            this.getGoodsList();

        },

    }
</script>
