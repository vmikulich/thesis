<template>
  <div>
    <table
      v-if="orders.length"
      class="highlight mb2"
    >
      <thead>
        <tr>
          <th>№</th>
          <th>Date</th>
          <th>Time</th>
          <th>Sum</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
        >
          <td>{{ order.order }}</td>
          <td>{{ defineDate(order.date, 'DD.MM.YYYY') }}</td>
          <td>{{ defineDate(order.date, 'LTS') }}</td>
          <td>{{ totalOrderPrice(order.list) }} $</td>
          <td>
            <button
              class="btn btn-small grey darken-1"
              @click="infoModalHandler(order)"
            >
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="center">No orders yet.</div>
    <div
      ref="modal"
      class="modal modal-fixed-footer"
    >
      <div
        v-if="selectedOrder"
        class="modal-content"
      >
        <h4 class="mb1">Order №{{ selectedOrder.order }}</h4>
        <table class="highlight">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in selectedOrder.list"
              :key="item._id"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.cost }} $</td>
            </tr>
          </tbody>
        </table>
        <div class="order-summary">
          <p>Total cost <strong>{{ totalOrderPrice(selectedOrder.list) }} $</strong></p>
        </div>
      </div>
      <div class="modal-footer">
        <button
          class="modal-action waves-effect waves-black btn-flat"
          @click="infoModalHandler(null)"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import material from '../../Materialize/material'

export default {
  data () {
    return {
      modal: null,
      selectedOrder: null
    }
  },

  computed: {
    ...mapGetters([
      'orders'
    ])
  },

  mounted () {
    this.modal = material.initModal(this.$refs.modal)
  },

  beforeDestroy () {
    this.modal.destroy()
  },

  methods: {
    totalOrderPrice (order) {
      return order ? order.reduce((acc, cur) => acc + cur.cost * cur.quantity, 0) : ''
    },
    defineDate (date, format) {
      return moment(date).format(format)
    },
    infoModalHandler (order) {
      order ? this.modal.open() : this.modal.close()
      this.selectedOrder = order
    }
  }
}
</script>

<style lang="scss" scoped>
</style>