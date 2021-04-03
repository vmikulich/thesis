<template>
  <div>
    <Loader v-if="loading"/>
    <table
      v-else-if="positions.length"
      class="highlight"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Cost</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="position in positions"
          :key="position.id"
        >
          <td>{{ position.name }}</td>
          <td>{{ position.cost }} $</td>
          <td>
            <div class="input-field inline order-position-input">
              <input
                type="number"
                v-model="position.quantity"
                min="1"
              >
            </div>
          </td>
          <td>
            <button
              class="btn waves-effect wavers-light btn-small"
              @click="addToOrder(position)"
              :disabled="!position.quantity"
            >
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="center">You don't have any positions</div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Loader from '../Loader'
import material from '../../Materialize/material'

export default {
  components: { Loader },

  computed: {
    ...mapGetters([
      'categoryPositions',
      'loading'
    ]),
    positions() {
      return this.categoryPositions.map((item) => {
        item.quantity = 1
        return item
      })
    }
  },
  
  mounted() {
    const categoryId = this.$route.params.id
    this.getPositions(categoryId)
  },

  methods: {
    ...mapActions([
      'getPositions'
    ]),
    ...mapMutations([
      'addProduct'
    ]),
    addToOrder (position) {
      material.toast(`Added x${position.quantity}`)
      this.addProduct(position)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>