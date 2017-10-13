<template>
    <div class="detail-app">
        <div class="content-1 f8" flex="box:mean">
            <div @click.stop="active=0" flex="main:center">
                <p class="check-item" :class="{'active':active==0}">净值增长率 </p>
            </div>
            <div @click.stop="active=1" flex="main:center">
                <p class="check-item" :class="{'active':active==1}">净值走势  </p>
            </div>
        </div>
        <div class="content-2 seperate" flex="box:mean">
            <p>期间涨跌<span class="high-light">0.71%</span></p>
            <p>同类平均<span class="high-light">0.71%</span></p>
        </div>
        <line-chart :data="datas" :options="options" :chart-data="datas" class="chart seperate"></line-chart>
        <line-chart :data="navDatas" :options="navOptions" :chart-data="navDatas" class="chart seperate"></line-chart>
        <div class="content-3">
            <div class="duration-box f6" flex="box:mean">
                <p class="duration-check border-right border-left" :class="{'active':duration=='1m'}"
                   @click.stop="durationCheck('1m')">一个月</p>
                <p class="duration-check border-right" :class="{'active':duration=='3m'}"
                   @click.stop="durationCheck('3m')">三个月</p>
                <p class="duration-check border-right" :class="{'active':duration=='6m'}"
                   @click.stop="durationCheck('6m')">六个月</p>
                <p class="duration-check border-right" :class="{'active':duration=='1y'}"
                   @click.stop="durationCheck('1y')">一年</p>
            </div>
        </div>
    </div>
</template>

<script>
    import $api from '../tools/api';
    import '../less/fund/detail-app.less';
    import LineChart from '../components/LineChart/line';
    export default {
        name: 'detail-app',
        data(){
            return {
                active: 0,
                duration: '1m',
                datas: {},
                navDatas: {},
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
                },
                navOptions: {
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
                        display: false,
                        position: 'bottom'
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        components: {
            LineChart
        },
        created(){
            this.getCharts();
        },
        computed: {},
        methods: {
            durationCheck(str){
                this.duration = str;
                this.getCharts();
            },
            getCharts(){
                let labels = [];
                let nowData = [];
                let avgData = [];
                $api.get('/fund/info/nav/series', {
                    fundCode: this.$route.query.code,
                    period: this.duration
                })
                    .then(resp => {
                        if (resp.code == 200) {
                            if (resp.data && resp.data.length) {
                                console.log()
                                resp.data[0].navSeries.map(item => {
                                    labels.push(item.date)
                                    nowData.push(item.change)
                                    avgData.push(item.sameFundChange)
                                })
                                return resp;
                            }
                        }
                    })
                    .then(resp => {
                        this.datas = {
                            labels,
                            datasets: [
                                {
                                    label: '当前基金',
                                    backgroundColor: '#ee774c',
                                    data: nowData,
                                    borderColor: '#ee774c',
                                    fill: false,
                                    borderWidth: 1,
                                    pointBackgroundColor: 'transparent'
                                }, {
                                    label: '同类均值',
                                    backgroundColor: '#4c86ad',
                                    borderColor: '#4c86ad',
                                    data: avgData,
                                    fill: false,
                                    borderWidth: 1,
                                    pointBackgroundColor: 'transparent'
                                }
                            ]
                        }
                        console.log(this.datas.labels)
                        console.log(this.datas.datasets[0].data)
                    })
            }
        },
        destroyed(){

        }
    }
</script>
