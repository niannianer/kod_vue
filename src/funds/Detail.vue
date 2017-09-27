<template>
    <div class="detail" flex="dir:top">
        <div class="wrap" flex-box="1">
            <div class="header">
                <p>国泰成长优选100000</p>
                <div flex="box:mean" class="tags">
                    <div flex="main:center">
                        <p class="p f6">基金类型</p>
                    </div>
                    <div flex="main:center">
                        <p class="p f6">风险等级</p>
                    </div>
                </div>
                <div flex="box:mean" class="infos">
                    <div>
                        <p class="f9">0.00%</p>
                        <p>近一年涨幅</p>
                    </div>
                    <div class="border-left">
                        <p class="f9">3.338</p>
                        <p>最新净值（07-24）</p>
                    </div>
                </div>
            </div>
            <div class="content-1 f8" flex="box:mean">
                <p class="check-item" :class="{'active':active==0}" @click.stop="active=0">净值增长率 </p>
                <p class="check-item" :class="{'active':active==1}" @click.stop="active=1">净值走势  </p>
            </div>
            <div class="content-2 seperate" flex="box:mean">
                <p class="p">期间涨跌<span class="red span">0.71%</span></p>
                <p class="p">同类平均<span class="red span">0.71%</span></p>
            </div>
            <line-chart :data="datas" :options="options" class="chart seperate"></line-chart>
            <div class="content-3">
                <div class="duration-box f6" flex="box:mean">
                    <p class="duration-check border-right" :class="{'active':durationCheck==0}"
                       @click.stop="durationCheck=0">一个月</p>
                    <p class="duration-check border-right" :class="{'active':durationCheck==1}"
                       @click.stop="durationCheck=1">三个月</p>
                    <p class="duration-check border-right" :class="{'active':durationCheck==2}"
                       @click.stop="durationCheck=2">六个月</p>
                    <p class="duration-check" :class="{'active':durationCheck==3}" @click.stop="durationCheck=3">一年</p>
                </div>
            </div>
            <div class="content-4 seperate">
                <div class="f8 item bl" flex="cross:center">
                    <p class="title" flex="cross:center">购买信息</p>
                </div>
                <div flex="cross:center" class="item bl">
                    <p flex-box="1">购买费率</p>
                    <p flex-box="0" class="line-through">1.50%</p>
                    <p flex-box="0" class="red normal">0.15</p>
                    <p flex-box="0" class="btn f6">1折</p>
                </div>
                <div flex="cross:center" class="item">
                    <p flex-box="1">起投金额</p>
                    <p flex-box="0">10.00元</p>
                </div>
            </div>
            <div class="content-4 seperate margin-bottom">
                <div class="f8 item bl" flex="cross:center">
                    <p class="title" flex="cross:center">基金概况</p>
                </div>
                <div flex="cross:center" class="item bl">
                    <p flex-box="1">分红方式</p>
                    <p flex-box="0">分红转份额</p>
                </div>
                <div flex="cross:center" class="item bl" @click.stop="pathTo('/manager')">
                    <p flex-box="1">基金经理</p>
                    <p flex-box="0">张三</p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="img">
                </div>
                <div flex="cross:center" class="item bl">
                    <p flex-box="1">基金公司</p>
                    <p flex-box="0">兴业全球</p>
                </div>
                <div flex="cross:center" class="item bl">
                    <p flex-box="1">相关费率</p>
                    <p flex-box="0"></p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="img">
                </div>
                <div flex="cross:center" class="item bl" @click.stop="pathTo('/bulletin')">
                    <p flex-box="1">基金公告</p>
                    <p flex-box="0">详细</p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="img">
                </div>
                <div flex="cross:center" class="item">
                    <p flex-box="1">持仓分析 </p>
                    <p flex-box="0">详细</p>
                    <img src="../images/arrow-right.png" alt="" flex-box="0" class="img">
                </div>
            </div>
        </div>
        <div class="bottom f8" flex-box="0" flex="box:mean">
            <p class="p yellow">+自选</p>
            <p class="p blue">定投</p>
            <p class="p red">申购（1折）</p>
        </div>
    </div>
</template>

<script>
    import '../less/fund/detail.less';
    import LineChart from '../components/LineChart/line';
    export default {
        name: 'detail',
        components: {
            LineChart
        },
        data(){
            return {
                active: 0,
                durationCheck: 0,
                datacollection: null,
                datas: {
                    labels: ['2017-01-11', '2017-02-11', '2017-03-11', '2017-04-11', '2017-05-11'],
                    datasets: [
                        {
                            label: '当前基金',
                            backgroundColor: '#417505',
                            data: [11.26, 11, 33, 22, 33],
                            borderColor: '#417505',
                            fill: false


                        }, {
                            label: '同类均值',
                            backgroundColor: '#D0021B',
                            borderColor: '#D0021B',
                            data: [25, 23],
                            fill: false
                        }
                    ]
                },
                options: {
                    tooltips: {
                        mode: 'index'
                    },
                    scales: {
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                beginAtZero: false,
                                callback: function (value, index, values) {
                                    return value + '%元';
                                }
                            },
                            gridLines: {
                                display: true,
                            }
                        }],
                        /*  yAxes: [{
                         id: 'left-y-axis',
                         type: 'linear',
                         position: 'left'
                         }, {
                         id: 'right-y-axis',
                         type: 'linear',
                         position: 'right'
                         }],*/
                        xAxes: [{
                            gridLines: {
                                display: false,
                            }
                        }]
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        created(){
        },
        computed: {},
        methods: {
            pathTo(path){
                this.$router.push('/funds'+path);
            }
        },
        destroyed(){

        }
    }
</script>
