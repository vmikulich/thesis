<template>
  <div class="filter">
    <div class="fr">
      <div class="col order">
        <div class="input-field inline order-position-input">
          <input
            type="number"
            id="number"
            min="1"
            v-model="order"
          >
          <label for="number">Order number</label>
        </div>
      </div>
      <div class="col filter-pickers">
        <div class="input-field">
          <input
            ref="start"
            type="text"
          >
          <label>Start</label>
        </div>
        <div class="input-field">
          <input
            ref="end"
            type="text"
          >
          <label>End</label>
        </div>
      </div>
    </div>
    <button
      class="btn waves-effect wavers-light btn-small"
      :disabled="!isValid"
      @click="submitFilter"
    >
      Apply filter
    </button>
  </div>
</template>

<script>
import material from '../../Materialize/material'

export default {
  data () {
    return {
      order: '',
      start: null,
      end: null,
      isValid: true
    }
  },

  mounted () {
    this.start = material.initDatepicker(this.$refs.start, this.validate.bind(this))
    this.end = material.initDatepicker(this.$refs.end, this.validate.bind(this))
  },

  beforeDestroy () {
    this.start.destroy()
    this.end.destroy()
  },

  methods: {
    validate () {
      if (!this.start.date || !this.end.date) {
        this.isValid = true
        return
      }
      this.isValid = this.start.date < this.end.date
    },
    submitFilter () {
      const filter = {}
      if (this.order) {
        filter.order = +this.order
      }
      if (this.start.date) {
        filter.start = this.start.date
      }
      if (this.end.date) {
        filter.end = this.end.date
      }
      this.$emit('filter', filter)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>