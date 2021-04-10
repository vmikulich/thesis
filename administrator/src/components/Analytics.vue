<template>
  <div>
    <div class="page-title">
      <h4>Anlytics</h4>
    </div>
    <div v-show="!pending">
      <div class="average-price">
        <p>Average check <strong>{{ analytics.average }} $</strong></p>
      </div>
      <div class="analytics-block pb3">
        <h5>Revenue</h5>
        <canvas ref="gain"></canvas>
      </div>
      <div class="analytics-block">
        <h5>Orders</h5>
        <canvas ref="order"></canvas>
      </div>
    </div>
    <Loader v-if="pending" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as ChartJs from 'chart.js'
import Loader from './Loader'

ChartJs.Chart.register.apply(null, Object.values(ChartJs).filter((chartClass) => (chartClass.id)))

export default {
  components: { Loader },

  data () {
    return {
      pending: true
    }
  },

  computed: {
    ...mapGetters([
      'analytics'
    ])
  },

  mounted () {
    const gainConfig = {
      label: 'Revenue',
      color: 'rgb(255, 99, 132)'
    }
    const orderConfig = {
      label: 'Orders',
      color: 'rgb(54, 162, 235)'
    }
    this.fetchAnalyticsData().then(() => {
      gainConfig.labels = this.analytics.chart.map(item => item.label)
      gainConfig.data = this.analytics.chart.map(item => item.gain)
      const gainCtx = this.$refs.gain.getContext('2d')
      gainCtx.canvas.height = '300px'
      new ChartJs.Chart(gainCtx, this.createChartConfig(gainConfig))
      orderConfig.labels = this.analytics.chart.map(item => item.label)
      orderConfig.data = this.analytics.chart.map(item => item.order)
      const orderCtx = this.$refs.order.getContext('2d')
      orderCtx.canvas.height = '300px'
      new ChartJs.Chart(orderCtx, this.createChartConfig(orderConfig))
      this.pending = false
    }).catch((e) => {
      if (e === 'Unauthorized') {
        this.logout().then(() => this.$router.push('/login'))
      }
    })
  },

  methods: {
    ...mapActions([
      'fetchAnalyticsData',
      'logout'
    ]),
    createChartConfig ({ labels, data, label, color }) {
      return {
        type: 'line',
        options: {
          responsive: true
        },
        data: {
          labels,
          datasets: [
            {
              label,
              data,
              borderColor: color,
              steppedLine: false,
              fill: false
            }
          ]
        }
      }
    }
  }
}
</script>

<style scoped>
</style>