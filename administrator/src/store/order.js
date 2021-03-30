export default {
  state: {
    order: []
  },
  actions: {
  },

  mutations: {
    addProduct (state, payload) {
      state.order.push(payload)
    },
    removeProduct (state, payload) {
      state.order.splice(payload, 1)
    },
    clearOrder (state) {
      state.order = []
    }
  },

  getters: {
  }
}