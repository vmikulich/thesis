import axios from 'axios'
import orderService from '../services/order/index'

export default {
  state: {
    order: []
  },
  actions: {
    async createOrder ({ commit }, payload) {
      await orderService.create(axios, payload)
      commit('clearOrder')
    }
  },

  mutations: {
    addProduct (state, payload) {
      const orderItem = Object.assign({}, {
        name: payload.name,
        cost: payload.cost,
        quantity: +payload.quantity,
        _id: payload._id
      })
      const candidate = state.order.find(item => item._id === orderItem._id)
      if (candidate) {
        candidate.quantity += orderItem.quantity
      } else {
        state.order.push(orderItem)
      }
    },
    removeProduct (state, payload) {
      const index = state.order.findIndex(item => item._id === payload._id)
      state.order.splice(index, 1)
    },
    clearOrder (state) {
      state.order = []
    }
  },

  getters: {
    order (state) {
      return state.order
    }
  }
}