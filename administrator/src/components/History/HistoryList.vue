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
          <td>{{ order.date }}</td>
          <td>{{ order.date }}</td>
          <td>{{ totalOrderPrice(order.list) }} $</td>
          <td>
            <button class="btn btn-small grey darken-1">
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="center">You don't have any categories</div>
    <div class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4 class="mb1">Order №5</h4>
        <table class="highlight">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alvin</td>
              <td>3</td>
              <td>$0.87</td>
            </tr>
          </tbody>
        </table>
        <div class="order-summary">
          <p>Total cost <strong>0 $</strong></p>
        </div>
      </div>
      <div class="modal-footer">
        <button class="modal-action waves-effect waves-black btn-flat">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'orders'
    ])
  },

  methods: {
    totalOrderPrice (order) {
      return order.reduce((acc, cur) => acc + cur.cost * cur.quantity, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>