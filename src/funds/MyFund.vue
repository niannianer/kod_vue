<template>
    <div class="my-fund">
        <div class="header">
            <div flex="box:justify cross:center">
                <div>
                    <p class="border">积极型</p>
                </div>
                <p class="f9">昨日收益（元）</p>
                <div>
                    <p class="border">用户信息</p>
                </div>
            </div>
            <p class="date">07-25</p>
            <p class="rate">-2.23</p>
            <div flex="box:mean" class="info-box">
                <div>
                    <p>总市值（元)</p>
                    <p class="data">513.12</p>
                </div>
                <div>
                    <p>累计盈亏（元）</p>
                    <p class="data">513.12</p>
                </div>
                <div>
                    <p>在途资金（元）</p>
                    <p class="data">513.12</p>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="title-box f8" flex="box:mean">
                <p class="p" :class="{'active':listNum == 0}" @click.stop="listNum = 0">我持有的基金</p>
                <p class="p" :class="{'active':listNum == 1}" @click.stop="listNum = 1">进行中</p>
                <p class="p" :class="{'active':listNum == 2}" @click.stop="listNum = 2">已完成</p>
            </div>
            <div class="list-box">
                <div class="list-item">
                    <div flex class="item-title">
                        <p flex-box="1">
                            中海上证50指数增强型证劵投资基金
                        </p>
                        <p flex-box="0">
                            指数型
                        </p>
                    </div>
                    <div flex="box:mean" class="item-info">
                        <div>
                            <p class="f8 green bold">
                                +0.01
                            </p>
                            <p class="info">
                                最新收益（元）
                            </p>
                        </div>
                        <div>
                            <p class="f8 red bold">
                                +0.04
                            </p>
                            <p class="info">
                                累计盈亏（元）
                            </p>
                        </div>
                        <div>
                            <p class="f8 bold">
                                +10.04
                            </p>
                            <p class="info"> 市值（元）</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/fund/my-fund.less';
    export default {
        name: 'my-fund',
        data(){
            return {
                listNum: 0
            }
        },
        created(){
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>
