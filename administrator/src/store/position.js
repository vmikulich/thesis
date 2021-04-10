import axios from 'axios'
import positionsService from '../services/position/index'

export default {
  state: {
    categoryPositions: []
  },
  actions: {
    async getPositions({ commit }, payload) {
      commit('setLoading', true)
      const res = await positionsService.get(axios, payload)
      commit('setCategoryPositions', res)
      commit('setLoading', false)
    },
    async createPosition({ commit }, payload) {
      commit('setLoading', true)
      const res = await positionsService.create(axios, payload)
      commit("addPosition", res)
      commit('setLoading', false)
    },
    async updatePosition(context, payload) {
      const data = {
        ...payload
      }
      delete data._id
      await positionsService.update(axios, { data, id: payload._id })
    },
    async deletePosition({ commit }, payload) {
      await positionsService.remove(axios, { id: payload._id })
      commit('deletePosition', payload)
    }
  },

  mutations: {
    setCategoryPositions(state, payload) {
      state.categoryPositions = payload;
    },
    addPosition(state, payload) {
      state.categoryPositions.push(payload)
    },
    updatePosition(state, payload) {
      const idx = state.categoryPositions.findIndex(p => p._id === payload._id)
      state.categoryPositions[idx]
    },
    deletePosition(state, payload) {
      const idx = state.categoryPositions.findIndex(p => p._id === payload._id)
      state.categoryPositions.splice(idx, 1)
    }
  },

  getters: {
    categoryPositions(state) {
      return state.categoryPositions
    }
  }
}