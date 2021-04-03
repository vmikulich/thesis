<template>
  <div>
    <div class="page-title">
      <h4>History of orders</h4>
      <button
        v-if="!loading"
        ref="tooltip"
        :class="`btn btn-small ${buttonActiveClass}`"
        data-tooltip="Open filter"
        data-position="left"
        @click="filterStatusHandler"
      >
        <i class="material-icons">filter_list</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div v-else>
      <HistoryFilter
        v-if="isFilterVisible"
      />
      <HistoryList />
      <Loader v-if="loadMoreStatus" />
      <div
        v-if="!loadMoreStatus && !noMoreOrders"
        class="center mb2"
        @click="loadMore"
      >
        <button class="btn waves-effect grey darken-1 btn-small">Load more</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import HistoryList from './HistoryList'
import HistoryFilter from './HistoryFilter'
import Loader from '../Loader'
import material from '../../Materialize/material'

export default {
  components: { HistoryList, HistoryFilter, Loader },

  data () {
    return {
      isFilterVisible: false,
      tooltip: null,
      loadMoreStatus: false,
      loading: false,
      step: 5,
      offset: 0,
      noMoreOrders: false
    }
  },

  computed: {
    buttonActiveClass () {
      return this.isFilterVisible ? 'active' : ''
    }
  },

  mounted () {
    this.loading = true
    const data = {
      offset: this.offset,
      limit: this.step
    }
    this.fetchOrders(data).finally(() => this.loading = false)
    this.tooltip = material.initTooltip(this.$refs.tooltip)
  },

  beforeDestroy () {
    this.tooltip.destroy()
  },

  methods: {
    ...mapActions([
      'fetchOrders'
    ]),
    filterStatusHandler () {
      this.isFilterVisible = !this.isFilterVisible
    },
    loadMore () {
      this.loadMoreStatus = true
      this.offset += this.step
      const data = {
        offset: this.offset,
        limit: this.step
      }
      this.fetchOrders(data).then((res) => {
        this.noMoreOrders = res.length < this.step
      }).finally(() => {
        this.loadMoreStatus = false
      })
    }
  }
}
</script>

<style scoped>
</style>