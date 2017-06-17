<template>
    <div v-cloak class="pension-five" flex-box="1" flex="dir:top">
        <div class="wrapp" flex-box="1">
            <div class="header">
                <div class="main">
                    <div class="tabs" flex-box="0" flex>
                        <div flex-box="1" class="tab" @click.stop="changeTab('a')" :class="{'active':tab=='a'}">
                            <div class="tab-item">方案A</div>
                        </div>
                        <div flex-box="1" class="tab" @click.stop="changeTab('b')" :class="{'active':tab=='b'}">
                            <div class="tab-item" >方案B</div>

                        </div>
                        <div flex-box="1" class="tab" @click.stop="changeTab('c')" :class="{'active':tab=='c'}">
                            <div class="tab-item">方案C</div>
                        </div>
                    </div>
                    <div class="content">
                        <p class="h-title">预期组合年化收益率</p>
                        <p class="pate">6.5%</p>
                        <div flex class="cont-div">
                            <div>首次投资：</div>
                            <div>10000元</div>
                        </div>
                        <div flex class="cont-div">
                            <div>每期续投：</div>
                            <div>2000元</div>
                        </div>
                    </div>
                </div>
                <div class="box-shadows"></div>
            </div>
            <div class="lists">
                <h6 class="title">配置详情</h6>
                <ul class="items-ul">
                    <li>
                        <div flex class="item-div">
                            <div class="div-left">惠普1号普惠1号</div>
                            <div class="div-right">推荐配比50%</div>
                        </div>
                        <div flex class="item-div">
                            <div class="div-left">产品期限：6个月</div>
                            <div class="div-right">预期年化收益率：6%</div>
                        </div>
                        <p class="link"><router-link :to="{path:'/invest-detail'}">查看详情</router-link></p>
                    </li>
                    <li>
                        <div flex class="item-div">
                            <div class="div-left">惠普1号普惠1号</div>
                            <div class="div-right">推荐配比50%</div>
                        </div>
                        <div flex class="item-div">
                            <div class="div-left">产品期限：6个月</div>
                            <div class="div-right">预期年化收益率：6%</div>
                        </div>
                        <p class="link"><router-link :to="{path:'/invest-detail'}">查看详情</router-link></p>
                    </li>
                </ul>
            </div>
            <!-- <div class="item" v-for="(item,index) in lists" :key="index">
                <div class="fund-name">{{item.name}}</div>
                <div flex="dir:left" class="fund-middle">
                    <div class="rate" flex-box="1">
                        <div>{{item.rate}}</div>
                        <div class="sub-text">业绩基准</div>
                    </div>
                    <div class="cycle" flex-box="1">
                        <div>{{item.cycle}}</div>
                        <div class="sub-text">期限</div>
                    </div>
                    <div class="progress" flex-box="0">
                        <cicle-progress :width-size="50" :progress="item.progress"></cicle-progress>
                    </div>
                </div>
            </div> -->
        </div>
        <div class="button" flex-box="0">
            <button>返回修改</button>
        </div>
    </div>
</template>

<script>
    import '../less/pension-five.less';
    export default {
        name: 'pension-five',
        data(){
            return {
                tab: 'a',
                lists: [
                   ]
            };
        },
        computed: {
            
        },
        methods: {
            changeTab(tab){
                this.tab = tab;
                
            }
        }
    }
</script>
