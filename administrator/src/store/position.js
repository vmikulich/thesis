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
      // await axios.get(`http://localhost:5000/api/position/${payload}`)
      //   .then(res => {
      //     context.commit('setCategoryPositions', res.data)
      //     context.commit('setLoading', false)
      //   })
    },
    async createPosition({ commit }, payload) {
      commit('setLoading', true)
      const res = await positionsService.create(axios, payload)
      commit("addPosition", res)
      commit('setLoading', false)
      // axios.post(`http://localhost:5000/api/position`, payload)
      //   .then((res) => {
      //     commit("addPosition", res.data)
      //     commit('setLoading', false)
      //   })
    },
    async updatePosition(context, payload) {
      const data = {
        ...payload
      }
      delete data._id
      await positionsService.update(axios, { data, id: payload._id })
      // return axios.patch(`http://localhost:5000/api/position/${payload._id}`,{data, id: payload._id})
      //  .then(() => context.commit('updatePosition', payload));
    },
    async deletePosition({ commit }, payload) {
      await positionsService.remove(axios, { id: payload._id })
      commit('deletePosition', payload)
      // axios.delete(`http://localhost:5000/api/position/${payload._id}`)
      //   .then(() => context.commit('deletePosition', payload))
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