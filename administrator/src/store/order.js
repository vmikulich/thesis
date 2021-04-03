import axios from 'axios'
import orderService from '../services/order/index'

export default {
  state: {
    orders: [],
    order: []
  },
  actions: {
    async fetchOrders ({ commit }, payload) {
      const res = await orderService.fetch(axios, payload)
      commit('setOrders', res)
      return res
    },
    async createOrder ({ commit }, payload) {
      await orderService.create(axios, payload)
      commit('clearOrder')
    }
  },

  mutations: {
    setOrders (state, payload) {
      state.orders = state.orders.concat(payload)
    },
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
    },
    orders (state) {
      return state.orders
    }
  }
}