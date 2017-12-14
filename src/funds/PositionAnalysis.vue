<template>
    <div class="position-analysis">
        <p class="title">资产配置明细</p>
        <pie-chart :data="dataset" :options="options" :chart-data="dataset" class="pie"></pie-chart>
    </div>
</template>

<script>
    import '../less/fund/position-analysis.less';
    import PieChart from '../components/LineChart/pie';
    export default {
        name: 'position-analysis',
        components: {
            PieChart
        },
        data(){
            return {
                dataset: {},
                options: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 10,
                            /*usePointStyle:true*/
                        }
                    },
                    tooltips: {
                        mode: 'index',
                        callbacks: {
                            label(item, data){
                                return data.datasets[0].data[item.index] + '%'
                            }
                        }

                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        created(){
            this.addHive(1, 'fundsPositionAnalysis');
            let event = ['_trackEvent', '基金持仓分析', 'SHOW', '进入基金持仓分析页面', '进入基金持仓分析页面'];
            window._hmt.push(event);
            this.getAssetAllocation();
        },
        computed: {},
        methods: {
            getAssetAllocation(){
                if (window.sessionStorage.getItem('assetAllocation')) {
                    let labels = [];
                    let data = [];
                    let assetAllocation = JSON.parse(window.sessionStorage.getItem('assetAllocation'));
                    if (assetAllocation && assetAllocation.length) {
                        assetAllocation.map(item => {
                            if (parseFloat(item.ratio)) {
                                labels.push(item.name);
                                data.push(parseFloat(item.ratio));
                            }
                        })
                    }
                    console.log(labels, data)
                    this.dataset = {
                        labels,
                        datasets: [
                            {
                                label: 'Data One',
                                backgroundColor: ['#4990E2', '#F6A623', '#9013FE', '#D70000'],
                                data,
                                borderWidth: 0
                            }
                        ]
                    }
                    console.log(this.dataset)

                }
            }
        },
        destroyed(){

        }
    }
</script>
