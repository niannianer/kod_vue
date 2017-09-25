<template>
    <div class="detail">
        <line-chart :data="datas" :options="options"></line-chart>
    </div>
</template>

<script>
    import LineChart from '../components/LineChart/line';
    export default {
        name: 'detail',
        components: {
            LineChart
        },
        data(){
            return {
                datacollection: null,
                datas: {
                    labels: ['2017-01-11', '2017-02-11', '2017-03-11', '2017-04-11', '2017-05-11'],
                    datasets: [
                        {
                            label: '当前基金',
                            backgroundColor: '#417505',
                            data: [1.26, 11, 33, 22, 33],
                            borderColor:'#417505',
                            fill:false,
                            pointStyle:'triangle'


                        }, {
                            label: '同类均值',
                            backgroundColor: '#D0021B',
                            borderColor:'#D0021B',
                            data: [5, 3],
                            fill:false
                        }
                    ]
                },
              /*  options: {responsive: false, maintainAspectRatio: true}*/
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display: true
                            }
                        }],
                        xAxes: [ {
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    legend: {
                        display: false
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        created(){
            this.fillData()
        },
        computed: {},
        methods: {
            fillData () {

                this.datacollection = {
                    labels: ['2017-01-11', '2017-02-11', '2017-03-11', '2017-04-11', '2017-05-11'],
                    datasets: [
                        {
                            label: '当前基金',
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            /* backgroundColor: '#f87979',*/
                            data: [1.26, 11, 33, 22, 33]
                        }, {
                            label: '同类均值',
                            /* backgroundColor: '#565689',*/
                            data: [5, 3]
                        }
                    ]
                }
            },
            getRandomInt () {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            }
        },
        destroyed(){

        }
    }
</script>
