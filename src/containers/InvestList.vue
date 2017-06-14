<template>
    <div v-cloak class="invest-list" id="invest-list" flex-box="1" flex="dir:top">
        <div class="tabs" flex flex-box="0">
            <div flex-box="1" class="tab" :class="{'active':status==1}" @click.stop="changeTab(1)">
                <div class="tab-item">进行中（{{underway.investmentCount}}）</div>
            </div>
            <div flex-box="1" class="tab" :class="{'active':status==2}" @click.stop="changeTab(2)">
                <div class="tab-item">已结束（{{finished.investmentCount}}）</div>

            </div>
        </div>
        <div class="item-list" v-show="status == 1" flex-box="1">
            <div class="item" v-for="(item,index) in underway.investmentList" :key="index">
                <router-link :to="{path:'/invest-detail',query:{orderBillCode:item.orderBillCode,status:1}}">
                    <ul class="item-ul">
                        <li flex>
                            <div>产品名称：</div>
                            <div class="width">{{item.productAbbrName}}</div>
                        </li>
                        <li flex>
                            <div>购买金额：</div>
                            <div>{{item.orderAmount}}元</div>
                        </li>
                        <li flex>
                            <div>预期年化收益率：</div>
                            <div>{{item.productAnnualInterestRate}}</div>
                        </li>
                        <li flex>
                            <div>到期日：</div>
                            <div>{{item.productExpiringDate}}</div>
                        </li>
                        <li flex>
                            <div>购买时间：</div>
                            <div>{{item.payedTime}}</div>
                        </li>
                    </ul>
                    <div class="icon"></div>
                </router-link>
            </div>
        </div>
        <div class="item-list" v-show="status == 2" flex-box="1">
            <div class="item" v-for="(item,index) in finished.investmentList" :key="index">
                <router-link :to="{path:'/invest-detail',query:{orderBillCode:item.orderBillCode,status:2}}">
                    <ul class="item-ul">
                        <li flex>
                            <div>产品名称：</div>
                            <div class="width">{{item.productAbbrName}}</div>
                        </li>
                        <li flex>
                            <div>购买金额：</div>
                            <div>{{item.orderAmount}}元</div>
                        </li>
                        <li flex>
                            <div>预期年化收益率：</div>
                            <div>{{item.productAnnualInterestRate}}</div>
                        </li>
                        <li flex>
                            <div>到期日：</div>
                            <div>{{item.productExpiringDate}}</div>
                        </li>
                        <li flex>
                            <div>购买时间：</div>
                            <div>{{item.payedTime}}</div>
                        </li>
                    </ul>
                    <div class="icon"></div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import '../less/invest-list.less';
    import $api from '../tools/api';
    export default {
        name: 'invest-list',
        data(){
            return {
                status: 1,
                underway:{},
                finished:{}
            }
        },
        methods: {
            changeTab(status){
                this.status = status;
            },
            get(status){
                $api.get('/investment/list',{status:status}).then(msg => {
                    if(msg.code == 200){
                        if(status == 1){
                            this.underway = msg.data;
                        }else if(status == 2){
                            this.finished = msg.data;
                        }
                    }
                });
            }
        },
        mounted(){
            this.get(1);
            this.get(2);
        }
    }
</script>
