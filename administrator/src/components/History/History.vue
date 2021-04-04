<template>
  <div>
    <div class="page-title">
      <h4>History of orders</h4>
      <button
        ref="tooltip"
        class="btn btn-small"
        :class="{
          active: isFilterVisible,
          red: isFiltered
        }"
        data-tooltip="Open filter"
        data-position="left"
        @click="filterStatusHandler"
      >
        <i class="material-icons">filter_list</i>
      </button>
    </div>
    <HistoryFilter
      v-if="isFilterVisible"
      @filter="applyFilter"
    />
    <Loader v-if="loading" />
    <div v-else>
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
import { mapActions, mapMutations } from 'vuex'
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
      noMoreOrders: false,
      isFiltered: false
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
    this.fetchOrders(data).catch((e) => {
      if (e === 'Unauthorized') {
        this.logout().then(() => this.$router.push('/login'))
      }
    }).finally(() => this.loading = false)
    this.tooltip = material.initTooltip(this.$refs.tooltip)
  },

  beforeDestroy () {
    this.tooltip.destroy()
    this.setOrders(null)
  },

  methods: {
    ...mapMutations([
      'setOrders'
    ]),
    ...mapActions([
      'fetchOrders',
      'logout'
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
    },
    applyFilter (filter) {
      this.setOrders(null)
      this.offset = 0
      this.loading = true
      this.isFiltered = Object.keys(filter).length !== 0
      const data = Object.assign({}, filter, {
        offset: this.offset,
        limit: this.step
      })
      this.fetchOrders(data).then((res) => {
        this.noMoreOrders = res.length < this.step
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
</style>