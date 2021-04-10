<template>
  <div>
    <div class="page-title">
      <h4>
        Review for yesterday ({{ yesterday }})
        <i
          class="material-icons black-text pointer"
          @click="openInfo"
        >
          info_outline
        </i>
      </h4>
    </div>
    <div
      v-if="overview"
      class="row"
    >
      <div class="col s12 l6">
        <div class="card light-blue lighten-2 white-text">
          <div class="card-content">
            <span class="card-title">Revenue:</span>
            <h3>{{ overview.gain.yesterday }} $</h3>
            <h3
              class="m0 mb1"
              :class="{
                'green-text text-darken-2': overview.gain.isHigher,
                'red-text': !overview.gain.isHigher
              }"
            >
              <i class="material-icons">{{ arrowDirection(overview.gain.isHigher) }}</i>
              {{ overview.gain.percent }}%
            </h3>
            <p>
              The revenue of your business was 
              {{ overview.gain.percent }}% 
              {{ aboveOrBelow(overview.orders.isHigher) }}
              average yesterday: {{ overview.gain.compare }} $ in a day.
            </p>
          </div>
        </div>
      </div>
      <div class="col s12 l6">
        <div class="card orange lighten-2 white-text">
          <div class="card-content">
            <span class="card-title">Orders:</span>
            <h3>{{ overview.orders.yesterday }} orders</h3>
            <h3
              class="m0 mb1"
              :class="{
                'green-text text-darken-2': overview.orders.isHigher,
                'red-text': !overview.orders.isHigher
              }"
            >
              <i class="material-icons">{{ arrowDirection(overview.orders.isHigher) }}</i>
              {{ overview.orders.percent }}%
            </h3>
            <p>
              The number of orders yesterday was 
              {{ overview.orders.percent }}% 
              {{ aboveOrBelow(overview.orders.isHigher) }} 
              the average: {{ overview.orders.compare }} orders in a day.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Loader v-else />
    <div
      ref="tapTarget"
      class="tap-target"
      data-target="menu"
    >
      <div class="tap-target-content">
        <h5>Why is this page needed?</h5>
        <p>The "Overview" page will show the dynamics of sales for the previous day. Comparison with averages will help you understand how your business is doing.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loader from './Loader'
import material from '../Materialize/material'
import monent from 'moment'

export default {
  data () {
    return {
      tapTarget: null
    }
  },

  components: { Loader },

  computed: {
    ...mapGetters([
      'overview'
    ]),
    yesterday () {
      return monent().add(-1, 'd').format('DD.MM.YYYY')
    }
  },

  beforeMount () {
    this.fetchOverviewData().catch((e) => {
      if (e === 'Unauthorized') {
        this.logout().then(() => this.$router.push('/login'))
      }
    })
  },

  mounted () {
    this.tapTarget = material.initTapTarget(this.$refs.tapTarget)
  },

  beforeDestroy () {
    this.tapTarget.destroy()
  },

  methods: {
    ...mapActions([
      'fetchOverviewData',
      'logout'
    ]),
    arrowDirection (status) {
      return status ? 'arrow_upward' : 'arrow_downward'
    },
    aboveOrBelow (status) {
      return status ? 'above' : 'below'
    },
    openInfo () {
      this.tapTarget.open()
    }
  }
}
</script>

<style scoped>
</style>