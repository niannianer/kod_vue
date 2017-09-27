import { Pie } from 'vue-chartjs'

export default Pie.extend({
    props: ['data', 'options'],
    mounted () {
        // Overwriting base render method with actual data.
        this.renderChart(this.data, this.options)
    }
})
