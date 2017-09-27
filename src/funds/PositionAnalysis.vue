<template>
    <div class="position-analysis">
        <pie-chart :data="dataset" :options="options" class="pie"></pie-chart>
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
                dataset: {
                    labels: ['基金投资', '银行存款和结算备付金','其它资产','权益投资(股票)            '],
                    datasets: [
                        {
                            label: 'Data One',
                            backgroundColor: ['#4990E2','#F6A623','#9013FE','#D70000'],
                            data: [80, 10,5,5],
                            borderWidth:0
                        }
                    ]
                },
                options:{
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels:{
                            boxWidth:10,
                            /*usePointStyle:true*/
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
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
