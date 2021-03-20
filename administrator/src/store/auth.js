import axios from 'axios'
import authService from '../services/auth/index'

export default {
  state: {
    token: null
  },

  actions: {
    async login ({ commit }, payload) {
      const res = await authService.login(axios, payload)
      localStorage.setItem('token', res.token)
      axios.defaults.headers.common['Authorization'] = res.token
      commit('setToken', res.token)
    },
    async signup (context, payload) {
      await authService.signup(axios, payload)
    },
    logout ({ commit }) {
      commit('setToken', null)
      delete axios.defaults.headers.common['Authorization']
      localStorage.clear()
    },
    authenticate ({ commit }, payload) {
      commit('setToken', payload)
      axios.defaults.headers.common['Authorization'] = payload
      localStorage.setItem('token', payload)
    },
  },

  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  },

  getters: {
    token (state) {
      return state.token
    },
    isAuthenticated (state) {
      return !!state.token
    }
  }
}