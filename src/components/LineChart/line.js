import { Line,mixins  } from 'vue-chartjs'

export default Line.extend({
    props: ['data', 'options'],
    mixins: [mixins.reactiveProp],
    mounted () {
        this.renderChart(this.data, this.options)
    }
})
