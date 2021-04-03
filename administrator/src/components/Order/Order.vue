<template>
  <div>
    <div class="page-title">
      <h4>
        <router-link to="/order">Order</router-link>
        <span v-if="!isRoot">
          <i class="material-icons">keyboard_arrow_right</i>
          Add products
        </span>
      </h4>
      <button
        class="waves-effect btn grey darken-1"
        @click="openModal"
        :disabled="!order.length"
      >
        Finish
      </button>
    </div>
    <router-view />
    <div
      ref="modal"
      class="modal modal-fixed-footer"
    >
      <div class="modal-content">
        <h4 class="mb1">Your order</h4>
        <table class="highlight">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Cost</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in order"
              :key="item._id"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.cost }} $</td>
              <td>
                <i
                  class="material-icons pointer"
                  @click="removeProduct(item)"
                >
                  delete
                </i>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="order-summary">
          <p>Total cost <strong>{{ totalPrice }} $</strong></p>
        </div>
      </div>
      <div class="modal-footer">
        <button
          class="modal-action waves-effect waves-black btn-flat"
          :disabled="disabled"
          @click="closeModal"
        >
          Cancel
        </button>
        <button
          class="modal-action btn waves-effect"
          :disabled="!order.length || disabled"
          @click="onSubmit"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import M from 'materialize-css/dist/js/materialize.js'
import material from '../../Materialize/material'

export default {
  data() {
    return {
      modal: null,
      disabled: false
    }
  },

  computed: {
    ...mapGetters([
      'order'
    ]),
    isRoot () {
      return this.$route.path === '/order'
    },
    totalPrice () {
      return this.order.reduce((acc, cur) => acc + cur.cost * cur.quantity, 0)
    }
  },

  mounted() {
    this.modal = this.initModal()
  },

  beforeDestroy(){
    this.modal.destroy()
  },

  methods: {
    ...mapActions([
      'createOrder'
    ]),
    ...mapMutations([
      'removeProduct'
    ]),
    initModal() {
      return M.Modal.init(this.$refs.modal)
    },
    openModal () {
      this.modal.open()
    },
    closeModal () {
      this.modal.close()
    },
    onSubmit () {
      this.disabled = true
      const data = {
        list: this.order.map((item) => {
          delete item._id
          return item
        })
      }
      this.createOrder(data).then(() => {
        material.toast('New order has been created')
      }).catch((e) => {
        material.toast(e.error.message, e)
      }).finally(() => {
        this.modal.close()
        this.disabled = false
      })
    }
  }
}
</script>

<style scoped>
</style>