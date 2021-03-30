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
        <h4 class="mb1">Ваш заказ</h4>
        <table class="highlight">
          <thead>
          <tr>
            <th>Название</th>
            <th>Количество</th>
            <th>Цена</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Alvin</td>
            <td>3</td>
            <td>$0.87</td>
            <td><i class="material-icons pointer">delete</i></td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>1</td>
            <td>$3.76</td>
            <td><i class="material-icons pointer">delete</i></td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>2</td>
            <td>$7.00</td>
            <td><i class="material-icons pointer">delete</i></td>
          </tr>
          </tbody>
        </table>
        <div class="order-summary">
          <p>Общая стоимость <strong>22 231 руб.</strong></p>
        </div>
      </div>
      <div class="modal-footer">
        <button
          class="modal-action waves-effect waves-black btn-flat"
          @click="closeModal"
        >
          Cancel
        </button>
        <button
          class="modal-action btn waves-effect"
          @click="onSubmit"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.js'

export default {
  data() {
    return {
      modal: null
    }
  },

  computed: {
    isRoot () {
      return this.$route.path === '/order'
    }
  },

  mounted() {
    this.modal = this.initModal()
  },

  beforeDestroy(){
    this.modal.destroy()
  },

  methods: {
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
      this.modal.close()
    }
  }
}
</script>

<style scoped>
</style>