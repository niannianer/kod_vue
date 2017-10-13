import { Pie,mixins } from 'vue-chartjs'

export default Pie.extend({
    props: ['data', 'options'],
    mixins: [mixins.reactiveProp],
    mounted () {
        // Overwriting base render method with actual data.
        this.renderChart(this.data, this.options)
    }
})
