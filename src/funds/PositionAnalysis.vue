<template>
    <div class="position-analysis">
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
                dataset: {
                },
                options: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 10,
                            /*usePointStyle:true*/
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        created(){
            this.getAssetAllocation();
        },
        computed: {},
        methods: {
            getAssetAllocation(){
                if (window.sessionStorage.getItem('assetAllocation')) {
                    let labels =[];
                    let data =[];
                    let assetAllocation = JSON.parse(window.sessionStorage.getItem('assetAllocation'));
                    if(assetAllocation&&assetAllocation.length){
                        assetAllocation.map(item=>{
                            labels.push(item.name);
                            data.push(item.value);
                        })
                    }
                    console.log(labels,data)
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
